# Performance

Next.js provides several built-in performance optimizations to help you build fast web applications.

## Automatic Optimizations

### Code Splitting

Next.js automatically splits your code into smaller bundles:

```jsx
// This component will only be loaded when the route is visited
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/HeavyComponent'))

export default function Home() {
  return (
    <div>
      <DynamicComponent />
    </div>
  )
}
```

### Prefetching

Next.js automatically prefetches pages in the background:

```jsx
import Link from 'next/link'

export default function Home() {
  return (
    <Link href="/dashboard" prefetch={false}>
      Dashboard
    </Link>
  )
}
```

## Image Optimization

Next.js optimizes images automatically with the `next/image` component:

```jsx
import Image from 'next/image'

export default function Home() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={400}
      height={400}
      priority // For above-the-fold images
    />
  )
}
```

## Font Optimization

Next.js optimizes font loading with the `next/font` module:

```jsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <h1>Hello World</h1>
    </main>
  )
}
```

## Script Optimization

Next.js provides the `next/script` component for optimized third-party script loading:

```jsx
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        strategy="lazyOnload"
      />
    </>
  )
}
```

## Caching Strategies

### Static Site Generation (SSG)

Pre-render pages at build time for maximum performance:

```jsx
export async function getStaticProps() {
  return {
    props: {
      // Data fetched at build time
    },
    revalidate: 60 // Revalidate at most once every 60 seconds
  }
}
```

### Incremental Static Regeneration (ISR)

Update static pages after build time:

```jsx
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: 'blocking' // Or true/false
  }
}
```

## Bundle Analysis

Analyze your bundle size with the built-in bundle analyzer:

```bash
npm install @next/bundle-analyzer
```

```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})
```

Run with:
```bash
ANALYZE=true npm run build
```

## Lazy Loading

### Component Lazy Loading

```jsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('../components/HeavyComponent'),
  { 
    loading: () => <p>Loading...</p>,
    ssr: false // Disable server-side rendering
  }
)
```

### Module Lazy Loading

```jsx
import dynamic from 'next/dynamic'

const Markdown = dynamic(
  () => import('react-markdown').then((mod) => mod.default),
  { ssr: false }
)
```

## Web Vitals

Next.js is optimized for Core Web Vitals:

### Largest Contentful Paint (LCP)

Optimize with:
- Image component
- Font optimization
- Server-side rendering

### First Input Delay (FID)

Optimize with:
- Code splitting
- Reducing JavaScript bundle size

### Cumulative Layout Shift (CLS)

Optimize with:
- Setting explicit width and height on images
- Reserving space for dynamic content

## Caching Headers

Configure caching headers in `next.config.js`:

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          }
        ]
      }
    ]
  }
}
```

## Server Components

React Server Components in the App Router reduce bundle size:

```jsx
// app/page.js - This is a Server Component by default
import './styles.css' // Only loaded on the server

// This data fetching happens on the server
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  
  return (
    <main>
      <h1>{data.title}</h1>
      {/* Client components can be imported */}
    </main>
  )
}
```

## Route Segments

Use route groups to organize related pages without affecting URL structure:

```jsx
// app/(shop)/products/page.js
// app/(shop)/cart/page.js
// Both accessible at /products and /cart
```

## Middleware Optimization

Use middleware efficiently:

```js
// middleware.js
export function middleware(request) {
  // Only run for specific paths
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Apply authentication checks
  }
}

export const config = {
  matcher: ['/api/:path*'],
}
```