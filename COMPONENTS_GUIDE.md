# Algorize UI Component System - Professional Guide

This guide explains the complete component system architecture, including how to add, edit, and delete components in the Algorize UI platform.

## 📁 Component Structure Overview

The Algorize UI component system follows a well-defined structure that separates documentation from implementation while maintaining consistency across all components.

### Directory Structure
```
src/
├── app/
│   └── docs/
│       └── [framework]/             # Dynamic segment: "nextjs" | "reactjs"
│           ├── layout.tsx           # Restricts the segment; noindexes non-default
│           ├── <component-name>/
│           │   ├── page.mdx         # Documentation page — one file, both frameworks
│           │   └── <component>.tsx  # Page-local demo source, if any
│           └── installation/        # A forked guide: differs throughout
│               ├── page.tsx         # Picks the content module + metadata
│               └── _content/
│                   ├── nextjs.mdx
│                   └── reactjs.mdx
├── components/
│   ├── custom/blocks/               # The shipped library (registry source)
│   ├── site/                        # Docs-site chrome — never shipped
│   └── ui/                          # Generic UI primitives
├── lib/
│   ├── framework.ts                 # FRAMEWORKS, FORKED_SLUGS, docsHref, guards
│   └── snippet.ts                   # Snippet variant maps + resolver
├── scripts/                         # Automation and drift checks
└── public/
    ├── docs-md/                     # Markdown mirrors, one per framework
    └── r/                           # Built registry JSON
```

> The `[framework]` folder is a literal directory name, not a placeholder. Quote it
> in shell commands so the brackets are not treated as a glob.


## 🔀 Framework rules (read once, then forget)

The docs serve two frameworks — `/docs/nextjs/…` and `/docs/reactjs/…` — from one
source tree. Almost nothing you write needs to know that. Three rules keep it that
way, and `npm run check:frameworks` enforces all three, so a mistake fails the
build rather than reaching a reader.

**1. Never import from `next/*` in a shipped component.** One source has to compile
in a Vite app as well as this one. If you need a link or an image, take the element
as a prop:

```tsx
export function MyBlock({ linkComponent: Link = "a" }: { linkComponent?: React.ElementType }) {
  return <Link href="/somewhere">Go</Link>;
}
```

Next.js users pass `linkComponent={Link}` to get prefetching back; everyone else
gets a working `<a>` for free. For a browser-only library, use `React.lazy` behind a
mounted gate rather than `next/dynamic` — see `DataMapsBlock.tsx`.

**2. Never hardcode `/docs/nextjs/…` in a doc page.** Use `<DocLink to="hero">`,
which resolves against whichever framework the reader is in. A markdown link like
`[Hero](/docs/nextjs/hero)` is retargeted automatically, but raw JSX is not.

**3. Default every code snippet to a plain string.** A string means *identical in
both frameworks*, which is true for almost every page. Only escalate when the code
genuinely differs:

```ts
usage: `import { Thing } from "@/components/custom/blocks/Thing";`   // normal
usage: { nextjs: `…`, reactjs: `…` }                                  // rare
```

If both branches end up identical, or the `reactjs` branch still imports from
`next/*`, the check will tell you.

Prose that differs by a sentence uses `<ForFramework only="reactjs">`. A page that
differs *throughout* — only `installation` and `first-app` today — forks into
`_content/nextjs.mdx` + `_content/reactjs.mdx` behind a `page.tsx`, and must be
listed in `FORKED_SLUGS` **and** use `buildDocsMetadata`, or it will be sitemapped
and noindexed at the same time.

---

## ➕ Adding New Components

### 1. Create Component Directory
Create a new directory under the framework segment, named in kebab-case. The
`[framework]` folder is a real directory — quote the path so your shell does not
treat the brackets as a glob:

```bash
mkdir "src/app/docs/[framework]/new-component"
```

### 2. Implement Component
Create the main component file (`new-component.tsx`):
```tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface NewComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Define your props here
  variant?: "default" | "primary" | "secondary";
}

const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-md border p-4",
          variant === "primary" && "border-blue-500 bg-blue-50",
          variant === "secondary" && "border-gray-500 bg-gray-50",
          className
        )}
        {...props}
      />
    );
  }
);

NewComponent.displayName = "NewComponent";

export default NewComponent;
```

### 3. Create Documentation Page
Create `page.mdx` in your component directory:
```mdx
export const metadata = {
  title: 'New Component - Algorize UI',
  description: 'Description of your new component',
};

import { CodeBlock } from "@/components/site/code-block";
import { ComponentRenderer } from "@/components/site/component-renderer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/site/tabs";

import NewComponent from "./new-component";

# New Component

Description of your component and its use cases.

## Preview

<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">
    <ComponentRenderer component={<NewComponent>Content</NewComponent>} />
  </TabsContent>
  <TabsContent value="code">
    <CodeBlock filePath="src/app/docs/[framework]/new-component/new-component.tsx" />
  </TabsContent>
</Tabs>

## Installation

<Tabs defaultValue="cli">
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">
    <Cli command="add new-component.json" />
  </TabsContent>
  <TabsContent value="manual">
    <CodeBlock filePath="src/app/docs/[framework]/new-component/new-component.tsx" />
  </TabsContent>
</Tabs>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "primary" \| "secondary"` | `"default"` | Component variant |
```

### 4. Generate Component Registry
Run the component generation script:
```bash
npm run generate:components
```

### 5. Build Registry
Run the registry build script:
```bash
npm run build:registry
```

## ✏️ Editing Components

### 1. Modify Component Implementation
Edit the component file in `src/app/docs/[component-name]/[component-name].tsx`:
- Update props interface
- Modify component logic
- Adjust styling classes

### 2. Update Documentation
Edit the `page.mdx` file:
- Update component description
- Modify examples
- Update props table
- Add new usage examples

### 3. Update Variants
If you have component variants, update them in their respective files:
- `src/app/docs/[component-name]/[variant-name].tsx`

### 4. Rebuild Registry
After making changes, rebuild the component registry:
```bash
npm run build:registry
```

## 🗑️ Deleting Components

### 1. Remove Component Directory
Delete the entire component directory:
```bash
rm -rf "src/app/docs/[framework]/component-to-delete"
```

### 2. Remove Registry File
Delete the corresponding registry file:
```bash
rm public/registry/component-to-delete.json
```

### 3. Update Navigation (if needed)
Edit `src/constants/navigation.ts` to remove the component from navigation if it was listed.

### 4. Rebuild Components List
Regenerate the components list:
```bash
npm run generate:components
```

### 5. Rebuild Registry
Rebuild the component registry:
```bash
npm run build:registry
```

## 🏗️ Component Architecture

### Component Files Structure
Each component directory typically contains:
- `[component-name].tsx` - Main component implementation
- `page.mdx` - Documentation page
- `[variant].tsx` - Component variants
- Supporting files for complex components

### Component Implementation Standards
1. **TypeScript First**: All components use TypeScript with strict typing
2. **Forward Refs**: Components implement React.forwardRef for accessibility
3. **Tailwind CSS**: Styling uses Tailwind utility classes
4. **cn Utility**: Class names are merged using the cn utility
5. **Display Names**: Components have proper displayName properties
6. **Props Interface**: Clear prop interfaces with defaults

### Documentation Standards
1. **Metadata**: Each page has proper metadata for SEO
2. **Preview/Code Tabs**: Interactive examples with live preview
3. **Installation Guide**: CLI and manual installation instructions
4. **Props Documentation**: Comprehensive props table
5. **Usage Examples**: Multiple usage scenarios
6. **Best Practices**: Guidelines for component usage

## 🛠️ Development Scripts

### Component Management
| Script | Description |
|--------|-------------|
| `npm run generate:components` | Auto-generate components list |
| `npm run build:registry` | Build component registry JSON files |
| `npm run watch:components` | Watch for component changes |

### Build Process
1. **Component Discovery**: Script scans the `src/app/docs/[framework]/` directory
2. **Registry Generation**: Creates JSON files in `public/registry/`
3. **Documentation Build**: MDX files are processed by Next.js
4. **Static Export**: Site is exported as static files

## 📦 Component Registry System

### Registry Structure
Each component has a JSON file in `public/registry/`:
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "title": "Button",
  "description": "A customizable button component",
  "author": "Reche Soares",
  "type": "registry:ui",
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": [],
  "cssVars": {
    "dark": {},
    "light": {}
  },
  "files": [
    {
      "path": "button.tsx",
      "content": "...",
      "type": "registry:ui"
    }
  ]
}
```

### Registry Generation Process
1. **Component Scanning**: Script identifies all components
2. **File Extraction**: Component files are read and processed
3. **Metadata Collection**: Component metadata is gathered
4. **JSON Creation**: Registry JSON files are generated
5. **Validation**: Generated files are validated

## 🔧 Advanced Component Features

### 1. Client Components
Use `'use client'` directive for components requiring:
- React hooks (useState, useEffect)
- Event handlers
- Browser APIs

### 2. Server Components
Components without client-side interactivity can remain as Server Components for better performance.

### 3. Component Composition
Components can be composed of other components:
```tsx
import Button from "./button";
import Icon from "./icon";

const ButtonWithIcon = ({ icon, children, ...props }) => (
  <Button {...props}>
    <Icon name={icon} />
    {children}
  </Button>
);
```

### 4. Dynamic Imports
For large components, use dynamic imports:
```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./heavy-component"));
```

## 🧪 Testing Components

### Unit Testing
Components should have unit tests in `__tests__` directories:
```tsx
import { render, screen } from "@testing-library/react";
import Button from "../button";

test("renders button with correct text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
```

### Integration Testing
Test component interactions and state changes:
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../counter";

test("increments count when clicked", () => {
  render(<Counter />);
  const button = screen.getByText("Increment");
  fireEvent.click(button);
  expect(screen.getByText("1")).toBeInTheDocument();
});
```

## 📈 Performance Optimization

### 1. Code Splitting
Components are automatically code-split by Next.js based on routes.

### 2. Bundle Analysis
Use the bundle analyzer to identify large components:
```bash
npm run build:analyze
```

### 3. Lazy Loading
Implement lazy loading for non-critical components:
```tsx
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./expensive-component"));

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

## 🔒 Security Considerations

### 1. Sanitization
All user inputs should be sanitized before rendering.

### 2. Type Safety
TypeScript provides compile-time safety against many vulnerabilities.

### 3. Dependency Management
Regularly update dependencies to patch security vulnerabilities.

## 🎨 Design System Integration

### 1. Consistent Styling
All components use the same Tailwind CSS configuration.

### 2. Theme Support
Components support both light and dark themes.

### 3. Responsive Design
Components are mobile-first and responsive.

### 4. Accessibility
Components follow WCAG guidelines for accessibility.

## 🚀 Deployment Workflow

### 1. Local Development
```bash
npm run dev
```

### 2. Testing
```bash
npm run test
npm run lint
```

### 3. Building
```bash
npm run build
```

### 4. Exporting
```bash
npm run export
```

### 5. Deployment
Deploy the `out` directory to your hosting provider.

## 🤝 Contributing Guidelines

### 1. Branch Strategy
- Create feature branches from `main`
- Use descriptive branch names (`feature/new-component`)

### 2. Pull Requests
- Include component implementation
- Add documentation
- Update registry
- Include tests if applicable

### 3. Code Review
- Follow component standards
- Ensure proper typing
- Validate accessibility
- Check performance impact

### 4. Versioning
- Follow semantic versioning
- Update package.json version
- Create changelog entries

This comprehensive guide provides everything needed to work with the Algorize UI component system professionally, from adding new components to maintaining existing ones.