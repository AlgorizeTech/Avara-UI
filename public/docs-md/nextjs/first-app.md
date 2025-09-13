# Creating Your First App

Learn how to build your first Next.js application step by step. This guide will walk you through creating a simple blog application with routing, data fetching, and styling.

## Prerequisites

Before starting, make sure you have:
- Node.js 18.17 or later installed
- A basic understanding of React
- A text editor (VS Code recommended)

## Creating the Project

Create a new Next.js application:

```bash
npx create-next-app@latest my-blog --typescript --app
cd my-blog
```

This creates a new Next.js project with TypeScript and the App Router.

## Project Structure

After creation, your project structure should look like this:

```
my-blog/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── next.config.js
├── package.json
├── README.md
├── tsconfig.json
└── .gitignore
```

## Understanding the Files

### Root Layout (app/layout.tsx)

The root layout wraps all pages in your application:

```tsx
// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A simple blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Home Page (app/page.tsx)

The home page is the entry point of your application:

```tsx
// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to My Blog</h1>
    </main>
  )
}
```

## Adding Global Styles

Create a global CSS file at `app/globals.css`:

```css
/* app/globals.css */
:root {
  --max-width: 1100px;
  --border-radius: 12px;
  --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
    'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
    'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;

  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;

  --primary-glow: conic-gradient(
    from 180deg at 50% 50%,
    #16abff33 0deg,
    #0885ff33 55deg,
    #54d6ff33 120deg,
    #0071ff33 160deg,
    transparent 360deg
  );
  --secondary-glow: radial-gradient(
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

a {
  color: inherit;
  text-decoration: none;
}
```

## Creating a Header Component

Create a header component at `components/header.tsx`:

```tsx
// components/header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className={pathname === '/blog' ? 'active' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

Update your root layout to include the header:

```tsx
// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A simple blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

## Adding a Blog Page

Create a blog page at `app/blog/page.tsx`:

```tsx
// app/blog/page.tsx
type Post = {
  id: number
  title: string
  excerpt: string
  date: string
}

const posts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    excerpt: 'Learn the basics of Next.js and how to build your first application.',
    date: '2023-01-15',
  },
  {
    id: 2,
    title: 'Understanding React Server Components',
    excerpt: 'Explore the power of React Server Components in Next.js 13+.',
    date: '2023-01-20',
  },
  {
    id: 3,
    title: 'Optimizing Performance in Next.js',
    excerpt: 'Discover techniques to make your Next.js apps faster and more efficient.',
    date: '2023-01-25',
  },
]

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <div>
        {posts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <time>{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  )
}
```

## Creating Dynamic Routes

Create a dynamic route for individual blog posts at `app/blog/[id]/page.tsx`:

```tsx
// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation'

type Post = {
  id: number
  title: string
  content: string
  date: string
}

const posts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    content: 'This is the full content of the first blog post...',
    date: '2023-01-15',
  },
  {
    id: 2,
    title: 'Understanding React Server Components',
    content: 'This is the full content of the second blog post...',
    date: '2023-01-20',
  },
  {
    id: 3,
    title: 'Optimizing Performance in Next.js',
    content: 'This is the full content of the third blog post...',
    date: '2023-01-25',
  },
]

export default function Post({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === Number(params.id))

  if (!post) {
    notFound()
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div>
        <p>{post.content}</p>
      </div>
    </article>
  )
}
```

## Adding an About Page

Create an about page at `app/about/page.tsx`:

```tsx
// app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a simple blog built with Next.js.</p>
    </div>
  )
}
```

## Styling with CSS Modules

Create a CSS module for the header at `components/header.module.css`:

```css
/* components/header.module.css */
.nav {
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
}

.nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
}

.nav a {
  color: #0070f3;
  text-decoration: none;
}

.nav a:hover,
.nav a.active {
  text-decoration: underline;
}
```

Update the header component to use the CSS module:

```tsx
// components/header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './header.module.css'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.nav}>
      <nav>
        <ul>
          <li>
            <Link href="/" className={pathname === '/' ? styles.active : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className={pathname === '/blog' ? styles.active : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className={pathname === '/about' ? styles.active : ''}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

## Fetching Data from an API

Update the blog page to fetch data from an API:

```tsx
// app/blog/page.tsx
type Post = {
  id: number
  title: string
  excerpt: string
  date: string
}

async function getPosts(): Promise<Post[]> {
  // In a real app, you would fetch from an API
  // const res = await fetch('https://api.example.com/posts')
  // return res.json()
  
  // For this example, we'll return mock data
  return [
    {
      id: 1,
      title: 'Getting Started with Next.js',
      excerpt: 'Learn the basics of Next.js and how to build your first application.',
      date: '2023-01-15',
    },
    {
      id: 2,
      title: 'Understanding React Server Components',
      excerpt: 'Explore the power of React Server Components in Next.js 13+.',
      date: '2023-01-20',
    },
    {
      id: 3,
      title: 'Optimizing Performance in Next.js',
      excerpt: 'Discover techniques to make your Next.js apps faster and more efficient.',
      date: '2023-01-25',
    },
  ]
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <div>
      <h1>Blog</h1>
      <div>
        {posts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <time>{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  )
}
```

## Adding Image Optimization

Add an image to your about page:

```tsx
// app/about/page.tsx
import Image from 'next/image'

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a simple blog built with Next.js.</p>
      <Image
        src="/profile.jpg"
        alt="Profile picture"
        width={200}
        height={200}
      />
    </div>
  )
}
```

Place an image at `public/profile.jpg` to display.

## Adding Metadata

Add metadata to your pages:

```tsx
// app/blog/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | My Blog',
  description: 'Read the latest articles on Next.js and web development.',
}

// ... rest of the component
```

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | My Blog',
  description: 'Learn more about this Next.js blog.',
}

// ... rest of the component
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Building for Production

Build your application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deploying Your Application

Deploy your Next.js application to Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect and deploy your Next.js app

## Next Steps

After creating your first app, consider:

1. [Adding authentication](/docs/authentication) to protect routes
2. [Implementing data fetching](/docs/data-fetching) with real APIs
3. [Styling with Tailwind CSS](/docs/styling)
4. [Adding testing](/docs/testing) to ensure quality
5. [Optimizing performance](/docs/performance) with built-in features
6. [Setting up CI/CD](/docs/deployment) for automated deployments

## Troubleshooting

### Common Issues

1. **Page not found**: Check that your file paths match the route structure
2. **CSS not loading**: Verify that you've imported global styles correctly
3. **Image not displaying**: Ensure images are in the `public` directory
4. **TypeScript errors**: Check that your types match the data structure

### Debugging Tips

1. Use the browser's developer tools to inspect elements and network requests
2. Check the terminal for build errors
3. Use `console.log` statements to debug server components
4. Enable React Developer Tools for component debugging

## Conclusion

Congratulations! You've created your first Next.js application with routing, data fetching, and styling. This foundation will help you build more complex applications as you continue learning Next.js.

Continue exploring the documentation to learn about advanced features like API routes, middleware, internationalization, and more.