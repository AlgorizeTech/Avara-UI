import fs from "fs";
import path from "path";

import { parse } from "@babel/parser";
import _traverse, { type NodePath } from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";

/**
 * Lifts one example straight out of the preview it renders.
 *
 * The Usage tab used to be a hand-written parallel copy of the demo, which is
 * why the two drifted: nothing failed when someone edited a preview and left
 * the snippet behind. Here the preview *is* the source. A demo exports one
 * component per docs example, its default export composes them so the rendering
 * is unchanged, and this reads that component's real text back out — together
 * with the imports and module-scope values it depends on, and nothing else.
 *
 * Runs at build time only (MDX module scope), like `extractCode`.
 */

// The CJS/ESM interop these two need under tsx/Next's loader.
const traverse = (_traverse as unknown as { default?: typeof _traverse }).default ?? _traverse;
const generate = (_generate as unknown as { default?: typeof _generate }).default ?? _generate;

const DEMOS_DIR = "src/preview/demos";

/** A top-level thing the extracted example might depend on. */
type Declaration = {
  /** Order in the file, so output keeps the author's reading order. */
  index: number;
  /** Every name this statement introduces (`const { a, b } = …` gives two). */
  names: string[];
  node: t.Statement;
};

const parseFile = (source: string) =>
  parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

/** Names a declaration binds at module scope. */
function boundNames(node: t.Statement): string[] {
  if (t.isFunctionDeclaration(node) || t.isClassDeclaration(node)) {
    return node.id ? [node.id.name] : [];
  }
  if (t.isVariableDeclaration(node)) {
    return node.declarations.flatMap((d) => Object.keys(t.getBindingIdentifiers(d.id)));
  }
  if (t.isTSTypeAliasDeclaration(node) || t.isTSInterfaceDeclaration(node)) {
    return [node.id.name];
  }
  if (t.isExportNamedDeclaration(node) && node.declaration) {
    return boundNames(node.declaration);
  }
  return [];
}

/** Every identifier referenced anywhere inside a node. */
function referencedNames(node: t.Node): Set<string> {
  const found = new Set<string>();
  traverse(
    t.file(t.program([t.isStatement(node) ? node : t.expressionStatement(node as t.Expression)])),
    {
      Identifier(p: NodePath<t.Identifier>) {
        // Skip the non-referential positions: `{ key: value }` keys, member
        // properties, and the parameter names the example declares itself.
        const { parent } = p;
        if (t.isObjectProperty(parent) && parent.key === p.node && !parent.computed) return;
        if (t.isMemberExpression(parent) && parent.property === p.node && !parent.computed) return;
        if (t.isJSXAttribute(parent as t.Node)) return;
        found.add(p.node.name);
      },
      JSXIdentifier(p: NodePath<t.JSXIdentifier>) {
        // <Foo> and <Foo.Bar> reference Foo; attribute names do not.
        if (t.isJSXAttribute(p.parent)) return;
        if (t.isJSXMemberExpression(p.parent) && p.parent.property === p.node) return;
        found.add(p.node.name);
      },
      TSTypeReference(p: NodePath<t.TSTypeReference>) {
        if (t.isIdentifier(p.node.typeName)) found.add(p.node.typeName.name);
      },
    },
  );
  return found;
}

const print = (node: t.Node) =>
  generate(node, { jsescOption: { minimal: true }, retainLines: false }).code;

/**
 * Reads one exported example out of a demo file as standalone source.
 *
 * @param demoFile  File name inside `src/preview/demos`, e.g. `cart-demo.tsx`.
 * @param exportName Name of the exported example component.
 */
export function extractExample(demoFile: string, exportName: string): string {
  const filePath = path.join(process.cwd(), DEMOS_DIR, demoFile);
  const source = fs.readFileSync(filePath, "utf-8");
  const ast = parseFile(source);

  const imports: t.ImportDeclaration[] = [];
  const declarations: Declaration[] = [];
  let target: t.Statement | undefined;
  let targetIsDefault = false;

  ast.program.body.forEach((node, index) => {
    if (t.isImportDeclaration(node)) {
      imports.push(node);
      return;
    }

    const inner = t.isExportNamedDeclaration(node) && node.declaration ? node.declaration : node;
    const names = boundNames(inner as t.Statement);

    if (names.includes(exportName)) {
      target = inner as t.Statement;
      targetIsDefault = false;
      return;
    }
    if (names.length) declarations.push({ index, names, node: inner as t.Statement });
  });

  if (!target) {
    throw new Error(
      `extractExample: "${exportName}" is not exported from ${demoFile}. ` +
        `Exports found: ${declarations.flatMap((d) => d.names).join(", ") || "none"}`,
    );
  }

  // Walk the dependency graph out from the example: whatever it names, plus
  // whatever those name, until nothing new turns up.
  const needed = new Set<string>();
  const queue: t.Node[] = [target];
  while (queue.length) {
    for (const name of referencedNames(queue.pop()!)) {
      if (needed.has(name)) continue;
      const decl = declarations.find((d) => d.names.includes(name));
      if (!decl) {
        needed.add(name); // an import, or a global — resolved below
        continue;
      }
      needed.add(name);
      queue.push(decl.node);
    }
  }

  // Keep only the import specifiers the example actually reaches.
  const usedImports = imports
    .map((decl) => {
      const specifiers = decl.specifiers.filter((s) => needed.has(s.local.name));
      return specifiers.length ? { ...decl, specifiers } : null;
    })
    .filter(Boolean) as t.ImportDeclaration[];

  const usedDeclarations = declarations
    .filter((d) => d.names.some((n) => needed.has(n)))
    .sort((a, b) => a.index - b.index);

  // The example becomes the file's default export, so the snippet is a page a
  // reader can paste as-is.
  const exported = targetIsDefault
    ? target
    : t.exportDefaultDeclaration(
        target as t.FunctionDeclaration | t.ClassDeclaration | t.Expression,
      );

  const blocks = [
    ...usedImports.map(print),
    ...usedDeclarations.map((d) => print(d.node)),
    print(exported),
  ];

  const directive = /^\s*(["'])use client\1;/.test(source) ? '"use client";\n' : "";

  return `${directive}${directive ? "\n" : ""}${blocks.join("\n\n")}\n`.trimEnd() + "\n";
}
