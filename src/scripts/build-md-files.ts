import "./load-env";
import fs from "fs";
import path from "path";
import { glob } from "glob";
import ts from "typescript";
import {
  BUILT_FRAMEWORKS,
  DEFAULT_FRAMEWORK,
  FORKED_SLUGS,
  docsHref,
  isFramework,
  type Framework,
} from "../lib/framework";
import { SITE_NAME, SITE_URL, links } from "../config/site";
import {
  REGISTRY_ADD_ARGS,
  REGISTRY_BASE_URL,
  REGISTRY_COMPONENTS_JSON,
  REGISTRY_NAMESPACE,
  REGISTRY_URL_TEMPLATE,
  addArgsFor,
  resolveAddArg,
} from "../lib/registry";
import { resolveMotion, resolveUsage, type ShowcaseSnippet } from "../lib/snippet";
import { extractCode, extractMotionCode } from "../lib/code";
import { pageHeading } from "../lib/docs-source";
import { pageSeo } from "../lib/page-seo";
import registry from "../../registry.json";
import { countComponents } from "../lib/component-count";

function safeWriteFileSync(filePath: string, data: string, encoding: BufferEncoding = 'utf-8') {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      fs.writeFileSync(filePath, data, encoding);
      return;
    } catch (err) {
      if (attempt === 4) throw err;
      const end = Date.now() + 150;
      while (Date.now() < end) {}
    }
  }
}

/** The `{COMPONENT_COUNT}` a page prints, resolved from the same registry. */
const COMPONENT_COUNT = String(countComponents(registry.items as { name: string }[]));

/**
 * The site values a page imports and prints — as `{SITE_NAME}` in prose,
 * `${REGISTRY_NAMESPACE}` inside a snippet's template literal, or
 * `command={REGISTRY_ADD_ARGS}` as a prop. The web build evaluates them; the
 * mirror is a text dump of the source, so it substitutes the same values here.
 */
const PAGE_CONSTANTS: Record<string, string> = {
  COMPONENT_COUNT,
  SITE_NAME,
  SITE_URL,
  REGISTRY_NAMESPACE,
  REGISTRY_BASE_URL,
  REGISTRY_URL_TEMPLATE,
  REGISTRY_ADD_ARGS,
};

const CONSTANT_NAMES = Object.keys(PAGE_CONSTANTS).join("|");

const resolvePageConstants = (md: string) =>
  md
    // A bare-constant prop becomes a template literal, so the <Cli> rule below
    // reads it like any other command.
    .replace(new RegExp(`=\\{(${CONSTANT_NAMES})\\}`, "g"), (_, name: string) => `={\`${PAGE_CONSTANTS[name]}\`}`)
    .replace(new RegExp(`\\$?\\{(${CONSTANT_NAMES})\\}`, "g"), (_, name: string) => PAGE_CONSTANTS[name]);

/** Items that ship a Motion twin beside their GSAP default. */
const MOTION_TWINS = new Set(
  (registry.items as { name: string }[])
    .map((item) => item.name)
    .filter((name) => name.endsWith("-motion"))
    .map((name) => name.replace(/-motion$/, "")),
);

/** The dynamic route segment, as it appears on disk. */
const FRAMEWORK_SEGMENT = "[framework]";

/**
 * Mirrors `resolveSegments` in components/site/cli.tsx for the `add` case, in
 * the site's default form: `add button.json utils` → `add https://…/r/button.json
 * utils`. Other commands
 * (`init`, `registry add …`, `install gsap`) pass through untouched.
 */
const expandCliShorthand = (command: string) => {
  const add = command.match(/^add\s+(.+)$/);
  if (!add) return command;
  return `add ${add[1].trim().split(/\s+/).map((arg) => resolveAddArg(arg)).join(" ")}`;
};

/**
 * Expands one MDX file into the URL paths it is actually published at.
 *
 * The docs tree lives under a dynamic `[framework]` segment, so the on-disk path
 * is `[framework]/accordion` while the real URLs are `nextjs/accordion` and
 * `reactjs/accordion`. Without this, the flattening below produced a file named
 * literally `[framework]-accordion.md` — the right *number* of files, so a count
 * check passes, but under names no route ever requests.
 */
function urlPathsFor(urlPath: string): string[] {
  if (!urlPath.includes(FRAMEWORK_SEGMENT)) return [urlPath];
  return BUILT_FRAMEWORKS.map((framework) =>
    urlPath.replace(FRAMEWORK_SEGMENT, framework),
  );
}

const docsPath = path.join(__dirname, "../app/docs");
const publicPath = path.join(__dirname, "../../public");
const mdOutputPath = path.join(publicPath, "docs-md");

// Ensure the output directory exists
if (!fs.existsSync(mdOutputPath)) {
  fs.mkdirSync(mdOutputPath, { recursive: true });
}

interface MdxFile {
  path: string;
  content: string;
  relativePath: string;
  urlPath: string;
}

/** One example from a page's `<ExampleShowcase examples={[…]}>`. */
type ShowcaseExample = {
  title?: string;
  subheading?: string;
  description?: string;
  propNotes?: { lead?: string; prop: string; value?: string; effect: string }[];
  usage?: ShowcaseSnippet;
};

/** Stands in for anything a page imports that the mirror has no use for: icons, components, helpers. */
const placeholder: unknown = new Proxy(function () {}, {
  get: (_, key) => (key === Symbol.toPrimitive ? () => "" : placeholder),
  apply: () => placeholder,
  construct: () => placeholder as object,
});

/**
 * Runs a page's exports and returns the value of each expression.
 *
 * A page's usage snippets are ordinary JavaScript: template literals that include
 * each other, and helpers such as `bentoJsx(onAction)`. Running them is the only
 * way to get the exact strings the page renders.
 */
function evaluatePage(statements: string[], expressions: string[]): unknown[] {
  const script = `${statements.join("\n")}\n__results = [${expressions.join(",\n")}];`;
  const { outputText } = ts.transpileModule(script, {
    fileName: "page.tsx",
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.None,
      jsx: ts.JsxEmit.React,
      alwaysStrict: false,
    },
  });
  const values: Record<PropertyKey, unknown> = { ...PAGE_CONSTANTS, links, extractCode, extractMotionCode };
  const scope = new Proxy(values, {
    has: () => true,
    get(target, key) {
      if (key === Symbol.unscopables) return undefined;
      if (key in target) return target[key];
      return key in globalThis ? (globalThis as Record<PropertyKey, unknown>)[key] : placeholder;
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  });
  new Function("scope", `with (scope) {\n${outputText}\n}`)(scope);
  return values.__results as unknown[];
}

/** An example as the page shows it: heading, summary, prop notes, then its Usage tab. */
function exampleToMarkdown(example: ShowcaseExample, level: number, framework: Framework): string {
  const lines = [`${"#".repeat(level)} ${example.title ?? ""}`];
  const summary = example.subheading ?? example.description;
  if (summary) lines.push(summary);
  if (example.propNotes?.length) {
    lines.push(
      example.propNotes
        .map(({ lead, prop, value, effect }) => {
          const code = value ? `${prop}=${value}` : prop;
          return `- ${lead ? `${lead} ` : ""}\`${code}\` ${effect}`;
        })
        .join("\n"),
    );
  }
  const usage = resolveUsage(resolveMotion(example.usage, "gsap"), framework);
  if (typeof usage === "string") lines.push("```tsx\n" + usage.trim() + "\n```");
  return lines.join("\n\n");
}

const parseAt = (source: string, start: number) =>
  ts.createSourceFile("page.tsx", source.slice(start), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

/**
 * A JSX `<table>` as a Markdown table. Tags go before code comes back, or a type
 * such as `Partial<Record<K, V>>` would be read as one. Pipes are escaped, or
 * they would end a cell.
 */
function tableToMarkdown(table: string, restore: (text: string) => string): string {
  const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(([, row]) =>
    [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) =>
      restore(cell.replace(/\{" "\}/g, " ").replace(/<\/?[A-Za-z][^<>]*>/g, ""))
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\|/g, "\\|"),
    ),
  );
  if (!rows.length) return "";
  const line = (cells: string[]) => `| ${cells.join(" | ")} |`;
  return [line(rows[0]), line(rows[0].map(() => "---")), ...rows.slice(1).map(line)].join("\n");
}

/** A link wrapping a whole card holds headings and paragraphs; Markdown link text is one line. */
const linkText = (text: string) =>
  text.replace(/<\/?[A-Za-z][^<>]*>/g, " ").replace(/\s+/g, " ").trim();

/**
 * Converts MDX to plain Markdown for one framework.
 *
 * Code is set aside first and put back last, so what strips JSX from the prose
 * never reaches a snippet. Stripping it from snippets is how the mirror used to
 * publish `return ( );` where a page shows `<Accordion … />`.
 */
function convertMdxToMd(content: string, framework: Framework): string {
  const held: string[] = [];
  const hold = (text: string) => `\u0000${held.push(text) - 1}\u0000`;
  const restore = (text: string): string =>
    text.includes("\u0000")
      ? restore(text.replace(/\u0000(\d+)\u0000/g, (_, index: string) => held[Number(index)]))
      : text;

  let mdContent = content.replace(/```[\s\S]*?```/g, hold);

  // Remove import statements
  mdContent = mdContent.replace(/^import\s+.*?from\s+.*?;?\s*$/gm, '');
  mdContent = mdContent.replace(/^import\s+.*?\{[\s\S]*?\}\s+from\s+.*?;?\s*$/gm, '');

  // Take the exports out of the prose; the examples below read them.
  const statements: string[] = [];
  for (;;) {
    const match = /^export\s+const\s+(\w+)/m.exec(mdContent);
    if (!match) break;
    const statement = parseAt(mdContent, match.index).statements[0];
    if (match[1] !== "metadata") statements.push(statement.getText().replace(/^export\s+/, ""));
    mdContent = mdContent.slice(0, match.index) + mdContent.slice(match.index + statement.end);
  }

  // Each <ExampleShowcase> becomes its examples, once the exports have run.
  const showcases: { marker: string; expression: string; level: number }[] = [];
  for (let index = mdContent.indexOf("<ExampleShowcase"); index >= 0; ) {
    const file = parseAt(mdContent, index);
    const first = file.statements[0];
    const element = first && ts.isExpressionStatement(first) ? first.expression : undefined;
    if (!element || !ts.isJsxSelfClosingElement(element)) {
      index = mdContent.indexOf("<ExampleShowcase", index + 1);
      continue;
    }
    const attribute = (name: string) =>
      element.attributes.properties.find(
        (prop): prop is ts.JsxAttribute => ts.isJsxAttribute(prop) && prop.name.getText(file) === name,
      )?.initializer;
    const examples = attribute("examples");
    const level = attribute("headingLevel")?.getText(file) === "{2}" ? 2 : 3;
    const marker = `\u0001${showcases.length}\u0001`;
    if (examples && ts.isJsxExpression(examples) && examples.expression) {
      showcases.push({ marker, expression: examples.expression.getText(file), level });
    }
    mdContent = mdContent.slice(0, index) + marker + mdContent.slice(index + element.end);
    index = mdContent.indexOf("<ExampleShowcase", index);
  }
  const results = evaluatePage(statements, showcases.map((showcase) => showcase.expression));
  showcases.forEach(({ marker, level }, position) => {
    const examples = results[position] as ShowcaseExample[];
    mdContent = mdContent.replace(
      marker,
      () => hold(examples.map((example) => exampleToMarkdown(example, level, framework)).join("\n\n")),
    );
  });

  // Resolve the site values the page prints through JSX expressions.
  mdContent = resolvePageConstants(mdContent);

  // <RegistryConfig /> renders the components.json entry `registry add` writes.
  mdContent = mdContent.replace(
    /<RegistryConfig\s*\/>/g,
    () => hold('```json\n' + REGISTRY_COMPONENTS_JSON + '\n```')
  );

  // Convert JSX components to markdown equivalents

  // Convert <AI dir="left"/> to nothing (remove it)
  mdContent = mdContent.replace(/<AI\s+dir="[^"]*"\s*\/>/g, '');
  
  // Convert complex <Tabs> components to simple markdown
  mdContent = mdContent.replace(
    /<Tabs[^>]*>[\s\S]*?<TabsContent\s+value="preview"[^>]*>([\s\S]*?)<\/TabsContent>[\s\S]*?<TabsContent\s+value="code"[^>]*>([\s\S]*?)<\/TabsContent>[\s\S]*?<\/Tabs>/g,
    (match, previewContent, codeContent) => {
      // Extract component renderer if present
      const componentMatch = previewContent.match(/<ComponentRenderer[^>]*\/>/);
      const codeBlockMatch = codeContent.match(/<CodeBlock\s+filePath="([^"]+)"\s*\/>/);
      
      let result = '## Preview\n\n';
      if (componentMatch) {
        result += 'Interactive component preview available in the web version.\n\n';
      }
      
      result += '## Code\n\n';
      if (codeBlockMatch) {
        const filePath = codeBlockMatch[1];
        result += `See implementation in: \`${filePath}\`\n\n`;
      }
      
      return result;
    }
  );
  
  // Convert simple <PMTabs> to markdown
  mdContent = mdContent.replace(
    /<PMTabs>([\s\S]*?)<\/PMTabs>/g,
    (match, content) => {
      // Extract tab contents
      const npmMatch = content.match(/<NPMTabContent>([\s\S]*?)<\/NPMTabContent>/);
      const pnpmMatch = content.match(/<PNPMTabContent>([\s\S]*?)<\/PNPMTabContent>/);
      const yarnMatch = content.match(/<YarnTabContent>([\s\S]*?)<\/YarnTabContent>/);
      const bunMatch = content.match(/<BunTabContent>([\s\S]*?)<\/BunTabContent>/);
      
      let result = '';
      
      if (npmMatch) {
        result += '### NPM\n' + npmMatch[1].trim() + '\n\n';
      }
      if (pnpmMatch) {
        result += '### PNPM\n' + pnpmMatch[1].trim() + '\n\n';
      }
      if (yarnMatch) {
        result += '### Yarn\n' + yarnMatch[1].trim() + '\n\n';
      }
      if (bunMatch) {
        result += '### Bun\n' + bunMatch[1].trim() + '\n\n';
      }
      
      return result;
    }
  );
  
  // Convert <Cli> component to code block. The page writes `add foo.json` as
  // shorthand for one of our items; expand it exactly as <Cli> does on the web,
  // or the markdown would tell a reader to run a command the CLI rejects.
  mdContent = mdContent.replace(
    /<Cli\s+command=\{`([^`]+)`\}\s*\/>/g,
    (_, command: string) => hold('```bash\nnpx shadcn@latest ' + expandCliShorthand(command) + '\n```')
  );

  // Convert <Installation name="…"> to the command it renders. The web
  // component also lists dependencies read from registry.json; the CLI
  // installs those itself, so the command alone is enough here.
  mdContent = mdContent.replace(
    /<Installation\s+name="([^"]+)"[^>]*\/>/g,
    (_, name: string) => hold(
      'Add the component by URL — no setup needed:\n\n' +
      '```bash\n' +
      `npx shadcn@latest ${addArgsFor(name, "url")}\n` +
      '```\n\n' +
      `Or register the ${REGISTRY_NAMESPACE} registry once per project and add it by name:\n\n` +
      '```bash\n' +
      `npx shadcn@latest ${REGISTRY_ADD_ARGS}\n` +
      `npx shadcn@latest ${addArgsFor(name, "namespace")}\n` +
      '```' +
      // Dual components: the same file, built on Motion instead of GSAP.
      (MOTION_TWINS.has(name)
        ? '\n\nOr the Motion build (same props, same file — install one):\n\n' +
          '```bash\n' +
          `npx shadcn@latest ${addArgsFor(`${name}-motion`, "url")}\n` +
          '```'
        : ''))
  );
  // <InstallGroup> only wraps several <Installation>s; drop the wrapper.
  mdContent = mdContent.replace(/<\/?InstallGroup>/g, '');
  
  // Convert <CodeBlock> to a reference
  mdContent = mdContent.replace(
    /<CodeBlock\s+filePath="([^"]+)"\s*\/>/g,
    'Code available at: `$1`'
  );
  
  // Convert <ComponentRenderer> to a description
  mdContent = mdContent.replace(
    /<ComponentRenderer[^>]*\/>/g,
    '*Interactive component preview available in the web version.*'
  );
  
  // Inline code joins the fenced code, then the JSX that means something in
  // Markdown becomes its equivalent.
  mdContent = mdContent.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  mdContent = mdContent.replace(/<code[^>]*>([\s\S]*?)<\/code>/g, (_, code: string) =>
    // `{`a<b>`}` is how JSX spells text that would otherwise parse as a tag.
    hold(`\`${code.trim().replace(/^\{[`"]([\s\S]*)[`"]\}$/, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">")}\``),
  );
  mdContent = mdContent.replace(/\{`([^`\n]*)`\}/g, "$1");
  mdContent = mdContent.replace(/`[^`\n]+`/g, hold);
  mdContent = mdContent.replace(
    /<ForFramework\s+only="(\w+)"\s*>([\s\S]*?)<\/ForFramework>/g,
    (_, only: string, inner: string) => (only === framework ? inner : ''),
  );
  mdContent = mdContent.replace(
    /<DocLink\s+to="([^"#]+)(#[^"]*)?"[^>]*>([\s\S]*?)<\/DocLink>/g,
    (_, slug: string, hash: string | undefined, text: string) =>
      `[${linkText(text)}](${SITE_URL}${docsHref(framework, slug)}${hash ?? ''})`,
  );
  mdContent = mdContent.replace(
    /<a\s[^>]*?href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    (_, href: string, text: string) => `[${linkText(text)}](${href.startsWith('/') ? SITE_URL + href : href})`,
  );
  mdContent = mdContent.replace(/<table[\s\S]*?<\/table>/g, (table) => hold(tableToMarkdown(table, restore)));
  mdContent = mdContent.replace(
    /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g,
    (_, level: string, text: string) => `\n${'#'.repeat(Number(level))} ${text.trim()}\n`,
  );
  mdContent = mdContent.replace(/<McpClientPanel\s+client="(\w+)"[^>]*>/g, '\n**Client: $1**\n');

  // Remove any remaining JSX tags and convert to markdown where possible
  mdContent = mdContent.replace(/<\/?[A-Za-z][^<>]*>/g, '');
  mdContent = mdContent.replace(/\{" "\}/g, ' ');

  // Indentation left by JSX would read as a code block. List nesting stays.
  mdContent = mdContent.replace(/^[ \t]+(?![-*\d])/gm, '');

  // Clean up extra whitespace
  mdContent = mdContent.replace(/\n\s*\n\s*\n/g, '\n\n');

  return restore(mdContent).trim();
}

/** What a mirror is and where the page it mirrors lives, for a reader given only this file. */
function withFrontMatter(markdown: string, source: string, urlPath: string, framework: Framework): string {
  const slug = urlPath.split('/').slice(1).join('/') || undefined;
  const heading = pageHeading(source) ?? slug ?? SITE_NAME;
  const pathname = !slug
    ? '/docs'
    : docsHref(FORKED_SLUGS.includes(slug) ? framework : DEFAULT_FRAMEWORK, slug);
  const description = slug ? pageSeo(slug, heading, source).description : undefined;
  const url = `${SITE_URL}${pathname}`;

  return [
    '---',
    `title: ${JSON.stringify(heading)}`,
    ...(description ? [`description: ${JSON.stringify(description)}`] : []),
    `url: ${url}`,
    '---',
    '',
    markdown,
    '',
    '---',
    '',
    `Live previews and every example: ${url}`,
    '',
  ].join('\n');
}

/**
 * Finds all MDX files in the docs directory
 */
async function findMdxFiles(): Promise<MdxFile[]> {
  // `page.mdx` covers the 99 pages that are a single document. The forked guides
  // — installation and first-app — instead keep one MDX per framework under a
  // private `_content/` folder, chosen by a sibling `page.tsx`. Without the
  // second pattern their markdown mirrors would silently go stale.
  const patterns = [
    path.join(docsPath, "**/page.mdx").replace(/\\/g, '/'),
    path.join(docsPath, "**/_content/*.mdx").replace(/\\/g, '/'),
  ];
  const files = (await Promise.all(patterns.map((p) => glob(p)))).flat();

  return files.filter(filePath => {
    // A forked guide names its framework in the filename, so it must be dropped
    // when that framework is switched off — otherwise turning React off would
    // still publish reactjs-installation.md for a URL that now 404s.
    const forked = filePath.replace(/\\/g, '/').match(/\/_content\/([^/]+)\.mdx$/);
    return !forked || (BUILT_FRAMEWORKS as readonly string[]).includes(forked[1]);
  }).map(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(docsPath, filePath);
    // Extract component name from path (remove \page.mdx and normalize slashes)
    let urlPath = relativePath.replace(/\\page\.mdx$/, '').replace(/\/page\.mdx$/, '').replace(/\\/g, '/');
    // The docs landing page sits at the root, with no segment to strip.
    if (urlPath === 'page.mdx') urlPath = '';

    // `[framework]/installation/_content/reactjs.mdx` publishes at
    // `reactjs/installation`: the private folder drops out and the filename is
    // itself the framework, so it replaces the dynamic segment rather than
    // expanding into every framework the way a shared page does.
    // The `.mdx` has to be stripped explicitly here: the two replaces above only
    // strip it as part of `page.mdx`, so a `_content` file keeps its extension
    // and would flatten into `nextjs.mdx-installation.md`.
    const forked = urlPath.match(/^(.*)\/_content\/([^/]+)\.mdx$/);
    if (forked) {
      urlPath = forked[1].replace(FRAMEWORK_SEGMENT, forked[2]);
    }

    return {
      path: filePath,
      content,
      relativePath,
      urlPath
    };
  });
}

/**
 * Main function to convert all MDX files to MD
 */
async function buildMdFiles(): Promise<void> {
  console.log('🚀 Starting MD file generation from MDX files...');
  
  try {
    const mdxFiles = await findMdxFiles();
    console.log(`📁 Found ${mdxFiles.length} MDX files to convert`);

    // Clear previous output first. The script only ever wrote files, never
    // removed them, so a page that was renamed or a framework that was switched
    // off left its mirror behind indefinitely — served, stale, and looking
    // exactly like a current one.
    if (fs.existsSync(mdOutputPath)) {
      for (const stale of fs.readdirSync(mdOutputPath)) {
        if (stale.endsWith('.md') && stale !== 'README.md') {
          try {
            fs.unlinkSync(path.join(mdOutputPath, stale));
          } catch {}
        }
      }
    }
    
    // Create index of all generated MD files
    const mdIndex: Array<{
      name: string;
      path: string;
      url: string;
      originalMdx: string;
    }> = [];
    
    const failures: string[] = [];

    for (const mdxFile of mdxFiles) {
      try {
        // Ensure output directory exists
        if (!fs.existsSync(mdOutputPath)) {
          fs.mkdirSync(mdOutputPath, { recursive: true });
        }

        // One source file publishes at one URL per built framework, converted
        // for each: `"use client"` and <ForFramework> branches differ. Emitting
        // both means ai-button — which derives the filename straight from the
        // current pathname — resolves on either route with no special-casing.
        for (const urlPath of urlPathsFor(mdxFile.urlPath)) {
          // Create the output path with clean naming that matches the URL structure
          const cleanName = urlPath === '' ? 'index' : urlPath.replace(/\//g, '-');
          const outputFileName = `${cleanName}.md`;
          const outputPath = path.join(mdOutputPath, outputFileName);

          const segment = urlPath.split('/')[0];
          const framework = isFramework(segment) ? segment : DEFAULT_FRAMEWORK;
          const mdContent = withFrontMatter(
            convertMdxToMd(mdxFile.content, framework),
            mdxFile.content,
            urlPath,
            framework,
          );

          // Write the MD file
          safeWriteFileSync(outputPath, mdContent, 'utf-8');

          // Add to index
          mdIndex.push({
            name: urlPath || 'docs',
            path: `/docs-md/${outputFileName}`,
            url: `/docs/${urlPath}`,
            originalMdx: mdxFile.relativePath
          });

          console.log(`✅ Generated: ${outputFileName} (from ${mdxFile.relativePath})`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${mdxFile.relativePath}:`, error);
        failures.push(mdxFile.relativePath);
      }
    }
    
    if (failures.length > 0) {
      throw new Error(`build-md-files: could not convert ${failures.join(', ')}`);
    }

    // Both of these are green-build failures otherwise: the per-file catch above
    // logs and continues, so a docs-tree rename that stops the glob matching, or
    // a dynamic segment that never got expanded, would leave the script
    // "succeeding" with nothing usable on disk.
    if (mdIndex.length === 0) {
      throw new Error(
        'build-md-files: produced 0 files — the docs glob matched nothing. Did the ' +
        'docs tree move?'
      );
    }

    const malformed = mdIndex.filter((file) => /[[\]]/.test(file.path));
    if (malformed.length > 0) {
      throw new Error(
        `build-md-files: ${malformed.length} output name(s) contain an unexpanded ` +
        `dynamic segment, e.g. ${malformed[0].path}. Add it to urlPathsFor().`
      );
    }

    // Write the index file
    const indexContent = {
      generatedAt: new Date().toISOString(),
      totalFiles: mdIndex.length,
      files: mdIndex.sort((a, b) => a.name.localeCompare(b.name))
    };
    
    safeWriteFileSync(
      path.join(mdOutputPath, 'index.json'),
      JSON.stringify(indexContent, null, 2),
      'utf-8'
    );
    
    // Create a README for the MD directory
    const readmeContent = `# ${SITE_NAME} - Markdown Files

This directory contains auto-generated Markdown versions of all MDX documentation pages.

**Generated at:** ${new Date().toISOString()}
**Total files:** ${mdIndex.length}

## Available Files

${mdIndex.map(file => `- [${file.name}](${file.path}) - Source: \`${file.originalMdx}\``).join('\n')}

## Usage

You can access these files directly via URL:
- Base URL: \`/docs-md/{framework}-{page}.md\`
- Example: \`/docs-md/nextjs-button.md\` for the button component documentation

## Note

These are simplified Markdown versions of the original MDX files. For the full interactive experience with live code previews, visit the original documentation pages.
`;
    
    safeWriteFileSync(path.join(mdOutputPath, 'README.md'), readmeContent, 'utf-8');
    
    console.log(`🎉 Successfully generated ${mdIndex.length} MD files!`);
    console.log(`📋 Index written to: /public/docs-md/index.json`);
    console.log(`📖 README written to: /public/docs-md/README.md`);
    
  } catch (error) {
    console.error('💥 Error during MD generation:', error);
    process.exit(1);
  }
}

// Run the script
buildMdFiles().catch(console.error);