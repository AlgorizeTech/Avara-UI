# Introduction to Next.js

Next.js is a React framework that gives you building blocks to create web applications. By providing structure, features, and optimizations, Next.js helps you build production-ready React applications that scale.

## Component Philosophy

Build software faster with complete code ownership, no wrapper package, and total styling freedom.

    {/* Glyph stays on one line: MDX parses children of a multi-line JSX element as
        block content, which would wrap it in the custom  (mb-4) and push it 8px
        off-centre, since flex centres the margin box. */}
    ⚡
    No Wrapper Package
    
      There is no library to install and version. The CLI writes each component's source into your codebase, so you own it and there is no lock-in.

    🎨
    100% Customizability
    
      Modify styles, animations, and behaviors directly within your components/custom folder.

    🧩
    Dependencies Per Component
    
      Each component declares only what it imports — usually lucide-react, gsap or framer-motion, and often nothing at all. Its page lists them before you install.

## What is Next.js?

Next.js is an open-source React framework created by Vercel that enables developers to build production-ready web applications. It provides a powerful set of features out of the box, including:

- **Server-side rendering** for better performance and SEO
- **Static site generation** for blazing-fast websites
- **Automatic code splitting** for optimized bundles
- **File-based routing** for intuitive project structure
- **API routes** for building backend endpoints
- **Image optimization** for responsive images
- **Built-in CSS support** with various styling options
- **Fast refresh** for instant feedback during development

## Why Use Next.js?

### Performance

Next.js is optimized for performance right out of the box:

- **Automatic Code Splitting**: Only load the code needed for each page
- **Server-side Rendering**: Pre-render pages on the server for faster initial loads
- **Static Site Generation**: Generate static HTML files at build time
- **Image Optimization**: Automatic image optimization with the `next/image` component
- **Font Optimization**: Built-in font optimization with `next/font`

### Developer Experience

Next.js provides an exceptional developer experience:

- **Fast Refresh**: See changes instantly without losing component state
- **TypeScript Support**: First-class TypeScript support with zero configuration
- **ESLint Integration**: Built-in ESLint configuration with Next.js specific rules
- **Built-in Testing Tools**: Easy testing setup with Jest and React Testing Library

### Scalability

Next.js applications can scale from simple websites to complex enterprise applications:

- **Incremental Static Regeneration**: Update static pages after build time
- **Middleware**: Run code before the request is completed
- **Edge Runtime**: Deploy functions closer to users for better performance
- **Monorepo Support**: Organize large applications with multiple packages

## Core Features

### File-based Routing

Next.js uses a file-system based router where folders are used to define routes:

```bash
app/
├── page.js        → /
├── about/
│   └── page.js    → /about
└── blog/
    ├── page.js    → /blog
    └── [slug]/
        └── page.js → /blog/:slug
```

### Server Components

React Server Components in Next.js allow you to render components on the server, reducing bundle size and improving performance:

```tsx
// This component runs on the server
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return {data.title}
}
```

### Data Fetching

Next.js provides several ways to fetch data:

```tsx
// Server-side fetching in Server Components
async function Page() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  
  return {data.title}
}
```

---

**Component Path:** `nextjs\index\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
