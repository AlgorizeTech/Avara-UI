# Introduction to Next.js

Next.js is a React framework that gives you building blocks to create web applications. By providing structure, features, and optimizations, Next.js helps you build production-ready React applications that scale.

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

```
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

```jsx
// This component runs on the server
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

### Data Fetching

Next.js provides several ways to fetch data:

```jsx
// Server-side fetching in Server Components
async function Page() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  
  return <div>{data.title}</div>
}
```

### Image Optimization

The `next/image` component automatically optimizes images:

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile picture"
      width={400}
      height={400}
    />
  )
}
```

### API Routes

Build API endpoints as part of your Next.js application:

```js
// app/api/hello/route.js
export async function GET(request) {
  return new Response('Hello, Next.js!')
}
```

## Getting Started

### Quick Start

Create a new Next.js application:

```bash
npx create-next-app@latest
```

### Manual Installation

Add Next.js to an existing project:

```bash
npm install next react react-dom
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## Project Structure

### App Router (Recommended)

```
my-app/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── api/
│   └── [slug]/
│       └── page.js
├── public/
├── components/
├── lib/
└── styles/
```

### Pages Router (Legacy)

```
my-app/
├── pages/
│   ├── index.js
│   ├── about.js
│   └── api/
│       └── hello.js
├── public/
├── components/
├── lib/
└── styles/
```

## Comparison with Other Frameworks

### Next.js vs Create React App

| Feature | Next.js | Create React App |
|---------|---------|------------------|
| Server-side Rendering | ✅ | ❌ |
| File-based Routing | ✅ | ❌ |
| API Routes | ✅ | ❌ |
| Image Optimization | ✅ | ❌ |
| Built-in Optimization | ✅ | Limited |
| Deployment | Vercel Optimized | Manual |

### Next.js vs Gatsby

| Feature | Next.js | Gatsby |
|---------|---------|--------|
| Data Sources | Any | GraphQL |
| Build Time | Fast | Slower for large sites |
| Dynamic Content | Easy | Requires additional setup |
| Learning Curve | Moderate | Steeper |

## Use Cases

Next.js is suitable for a wide range of applications:

### Websites and Landing Pages

Perfect for marketing sites, portfolios, and landing pages with static site generation.

### E-commerce Applications

Ideal for e-commerce sites with dynamic product catalogs and real-time inventory.

### Dashboards and Admin Panels

Great for internal tools and admin panels with authentication and data visualization.

### Content-Rich Applications

Excellent for blogs, news sites, and content management systems.

### Progressive Web Apps

Built-in support for PWA features like service workers and offline functionality.

## Community and Ecosystem

### Official Resources

- [Documentation](https://nextjs.org/docs)
- [Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [GitHub Repository](https://github.com/vercel/next.js)
- [Learn Next.js](https://nextjs.org/learn)

### Community

- [Vercel Community](https://vercel.community/)
- [Discord Server](https://discord.gg/bUG2bvbtHy)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)

### Extensions and Plugins

- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Styled JSX](https://github.com/vercel/styled-jsx) for CSS-in-JS
- [SWR](https://swr.vercel.app/) for data fetching
- [Next.js Commerce](https://nextjs.org/commerce) for e-commerce

## Enterprise Features

### Security

Next.js includes built-in security features:

- **Automatic HTTPS** with Vercel deployment
- **Content Security Policy** support
- **Cross-site Scripting (XSS) Protection**
- **Cross-site Request Forgery (CSRF) Protection**

### Monitoring

- **Vercel Analytics** for real-time performance monitoring
- **Error Reporting** with detailed stack traces
- **Performance Insights** for optimization recommendations

### Internationalization

Built-in support for internationalized routing:

```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
  },
}
```

## Learning Resources

### Official Tutorials

1. [Learn Next.js](https://nextjs.org/learn) - Interactive course
2. [Documentation](https://nextjs.org/docs) - Comprehensive guides
3. [Examples](https://github.com/vercel/next.js/tree/canary/examples) - Sample projects

### Community Tutorials

- YouTube channels dedicated to Next.js
- Blog posts and articles
- Online courses on platforms like Udemy and Coursera

## Migration from Other Frameworks

### From Create React App

1. Install Next.js dependencies
2. Move pages to the `pages` directory
3. Update routing to file-based system
4. Configure CSS and assets

### From Gatsby

1. Replace GraphQL queries with direct data fetching
2. Convert pages to Next.js file structure
3. Update image components to `next/image`
4. Migrate plugins to Next.js equivalents

## Conclusion

Next.js is a powerful framework that combines the best of React with additional features needed for production applications. Whether you're building a simple website or a complex enterprise application, Next.js provides the tools and optimizations needed to create fast, scalable, and maintainable web applications.

Continue to the [Installation Guide](/docs/nextjs/installation) to get started with your first Next.js project, or explore the [Core Features](/docs/nextjs/routing) to learn more about what Next.js can do.