import fs from "fs";
import path from "path";
import { glob } from "glob";
import { BUILT_FRAMEWORKS } from "../lib/framework";
import { REGISTRY_ADD_ARGS, REGISTRY_NAMESPACE, addArgsFor, resolveAddArg } from "../lib/registry";
import { stripUseClient } from "../lib/snippet";
import registry from "../../registry.json";

/** Items that ship a Framer Motion twin beside their GSAP default. */
const MOTION_TWINS = new Set(
  (registry.items as { name: string }[])
    .map((item) => item.name)
    .filter((name) => name.endsWith("-framer"))
    .map((name) => name.replace(/-framer$/, "")),
);

/** The dynamic route segment, as it appears on disk. */
const FRAMEWORK_SEGMENT = "[framework]";

/**
 * Mirrors `resolveSegments` in components/site/cli.tsx for the `add` case:
 * `add button.json utils` → `add @algorize-ui/button utils`. Other commands
 * (`init`, `registry add …`, `install gsap`) pass through untouched.
 */
const expandCliShorthand = (command: string) => {
  const add = command.match(/^add\s+(.+)$/);
  if (!add) return command;
  return `add ${add[1].trim().split(/\s+/).map((arg) => resolveAddArg(arg)).join(" ")}`;
};

/**
 * Applies the page's React rule to a whole markdown document.
 *
 * The mirror is a dump of the MDX source, so a directive shows up as the first
 * line inside a snippet's template literal — ``usageDefault = `"use client";``.
 * Only the opening of each literal is handed to the shared stripper, so prose
 * that merely *mentions* the directive is never touched.
 */
const stripUseClientFromSnippets = (md: string) =>
  md.replace(/(=\s*`)((?:[^\n]*\n){0,2})/g, (_match, opener: string, head: string) =>
    opener + stripUseClient(head),
  );

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

/**
 * Converts MDX content to plain Markdown by removing:
 * - React imports
 * - Export statements
 * - JSX components and replacing with markdown equivalents
 * - Metadata exports
 */
function convertMdxToMd(content: string, componentPath: string): string {
  let mdContent = content;

  // Remove export statements for metadata
  mdContent = mdContent.replace(/^export\s+const\s+metadata\s*=\s*{[\s\S]*?};/gm, '');
  
  // Remove import statements
  mdContent = mdContent.replace(/^import\s+.*?from\s+.*?;?\s*$/gm, '');
  
  // Remove JSX component imports that are on separate lines
  mdContent = mdContent.replace(/^import\s+.*?\{[\s\S]*?\}\s+from\s+.*?;?\s*$/gm, '');
  
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
    (_, command: string) => '```bash\nnpx shadcn@latest ' + expandCliShorthand(command) + '\n```'
  );

  // Convert <Installation name="…"> to the command it renders. The web
  // component also lists dependencies read from registry.json; the CLI
  // installs those itself, so the command alone is enough here.
  mdContent = mdContent.replace(
    /<Installation\s+name="([^"]+)"[^>]*\/>/g,
    (_, name: string) =>
      `Register the ${REGISTRY_NAMESPACE} registry once per project, then add the component:\n\n` +
      '```bash\n' +
      `npx shadcn@latest ${REGISTRY_ADD_ARGS}\n` +
      `npx shadcn@latest ${addArgsFor(name)}\n` +
      '```' +
      // Dual components: the same file, built on Framer Motion instead of GSAP.
      (MOTION_TWINS.has(name)
        ? '\n\nOr the Motion build (same props, same file — install one):\n\n' +
          '```bash\n' +
          `npx shadcn@latest ${addArgsFor(`${name}-framer`)}\n` +
          '```'
        : '')
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
  
  // Remove any remaining JSX tags and convert to markdown where possible
  mdContent = mdContent.replace(/<[^>]+>/g, '');
  
  // Clean up extra whitespace
  mdContent = mdContent.replace(/\n\s*\n\s*\n/g, '\n\n');
  mdContent = mdContent.trim();
  
  // Add component path reference
  const pathReference = `\n\n---\n\n**Component Path:** \`${componentPath}\`\n\n**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.\n`;
  
  return mdContent + pathReference;
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
        if (stale.endsWith('.md')) fs.unlinkSync(path.join(mdOutputPath, stale));
      }
    }
    
    // Create index of all generated MD files
    const mdIndex: Array<{
      name: string;
      path: string;
      url: string;
      originalMdx: string;
    }> = [];
    
    for (const mdxFile of mdxFiles) {
      try {
        const mdContent = convertMdxToMd(mdxFile.content, mdxFile.relativePath);

        // Ensure output directory exists
        if (!fs.existsSync(mdOutputPath)) {
          fs.mkdirSync(mdOutputPath, { recursive: true });
        }

        // One source file publishes at one URL per built framework. The content
        // is identical until snippets resolve per framework; emitting both now
        // means ai-button — which derives the filename straight from the current
        // pathname — resolves on either route with no special-casing.
        for (const urlPath of urlPathsFor(mdxFile.urlPath)) {
          // Create the output path with clean naming that matches the URL structure
          const cleanName = urlPath === '' ? 'index' : urlPath.replace(/\//g, '-');
          const outputFileName = `${cleanName}.md`;
          const outputPath = path.join(mdOutputPath, outputFileName);

          // The page renders `"use client"` only for Next.js (see resolveUsage
          // in lib/snippet.ts); the mirror has to make the same edit, or the
          // React markdown would disagree with the React page it mirrors.
          const frameworkContent = urlPath.startsWith("nextjs")
            ? mdContent
            : stripUseClientFromSnippets(mdContent);

          // Write the MD file
          fs.writeFileSync(outputPath, frameworkContent, 'utf-8');

          // Add to index
          mdIndex.push({
            name: urlPath || 'docs',
            path: `/docs/${outputFileName}`,
            url: `/docs/${urlPath}`,
            originalMdx: mdxFile.relativePath
          });

          console.log(`✅ Generated: ${outputFileName} (from ${mdxFile.relativePath})`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${mdxFile.relativePath}:`, error);
      }
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
    
    fs.writeFileSync(
      path.join(mdOutputPath, 'index.json'),
      JSON.stringify(indexContent, null, 2),
      'utf-8'
    );
    
    // Create a README for the MD directory
    const readmeContent = `# Algorize UI - Markdown Files

This directory contains auto-generated Markdown versions of all MDX documentation pages.

**Generated at:** ${new Date().toISOString()}
**Total files:** ${mdIndex.length}

## Available Files

${mdIndex.map(file => `- [${file.name}](${file.path}) - Source: \`${file.originalMdx}\``).join('\n')}

## Usage

You can access these files directly via URL:
- Base URL: \`/docs/{filename}.md\`
- Example: \`/docs/button.md\` for the button component documentation

## Note

These are simplified Markdown versions of the original MDX files. For the full interactive experience with live code previews, visit the original documentation pages.
`;
    
    fs.writeFileSync(path.join(mdOutputPath, 'README.md'), readmeContent, 'utf-8');
    
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