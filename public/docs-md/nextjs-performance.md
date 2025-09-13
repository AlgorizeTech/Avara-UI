# Performance Optimization

Next.js provides several built-in optimizations to improve your application's performance.

## Rendering Methods

### Static Site Generation (SSG)

Pre-render pages at build time:

```jsx
// app/products/page.js
async function getProducts() {
  const res = await fetch('https://api.example.com/products')
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    
      {products.map(product => (
        {product.name}
      ))}
    
  )
}

// This page will be statically generated at build time
```

### Server-Side Rendering (SSR)

Pre-render pages on each request:

```jsx
// app/products/page.js
export const dynamic = 'force-dynamic'

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store' // Disable caching
  })
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    
      {products.map(product => (
        {product.name}
      ))}
    
  )
}
```

### Incremental Static Regeneration (ISR)

Update static pages after build time:

```jsx
// app/products/page.js
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 } // Revalidate at most every 60 seconds
  })
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    
      {products.map(product => (
        {product.name}
      ))}
    
  )
}
```

## Code Splitting

Next.js automatically code splits your application by route:

```jsx
// app/components/HeavyComponent.js
'use client'

export default function HeavyComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // Heavy computation
    const result = performHeavyComputation()
    setData(result)
  }, [])
  
  return {data}
}

function performHeavyComputation() {
  // Simulate heavy computation
  let result = 0
  for (let i = 0; i  import('../components/HeavyComponent'))

export default function Home() {
  return (
    
      Home Page

  )
}
```

## Image Optimization

Use the `next/image` component for automatic optimization:

```jsx

export default function Page() {
  return (
    
  )
}
```

## Font Optimization

Use the `next/font` module for automatic font optimization:

```jsx
// app/layout.js

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    
      {children}
    
  )
}
```

## Script Optimization

Use the `next/script` component for third-party scripts:

```jsx
// app/page.js

export default function Home() {
  return (
    
      Home Page

  )
}
```

## Caching Strategies

### Request Memoization

Next.js automatically memoizes fetch requests:

```jsx
// This request will be memoized
const res1 = await fetch('https://api.example.com/data')

// This request will use the cached result
const res2 = await fetch('https://api.example.com/data')
```

### Data Cache

Control caching with the `cache` option:

```jsx
// Force cache (default)
const res1 = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
})

// No store (bypass cache)
const res2 = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})
```

### Revalidation

Control revalidation with the `revalidate` option:

```jsx
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 } // Revalidate every 60 seconds
})
```

## Bundle Analysis

Analyze your bundle size:

```bash
npm run build
npm run analyze
```

```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Next.js config
})
```

## Lazy Loading

Lazy load components and imports:

```jsx
// app/page.js
'use client'

// Lazy load component
const ExpensiveComponent = dynamic(() => import('../components/ExpensiveComponent'))

// Lazy load library
const loadLodash = () => import('lodash')

export default function Home() {
  const [showComponent, setShowComponent] = useState(false)
  
  const handleClick = async () => {
    // Lazy load library on demand
    const _ = await loadLodash()
    console.log(_.capitalize('hello world'))
    
    setShowComponent(true)
  }
  
  return (
    
      Load Component
      {showComponent && }
    
  )
}
```

## Prefetching

Prefetch pages for faster navigation:

```jsx

export default function Navigation() {
  return (
    
      About
      Products {/* Prefetched by default */}
    
  )
}
```

## Best Practices

1. **Use SSG** for static content
2. **Use ISR** for dynamic content that changes infrequently
3. **Use SSR** only when necessary
4. **Optimize images** with next/image
5. **Use dynamic imports** for heavy components
6. **Leverage automatic code splitting**
7. **Analyze bundle size** regularly
8. **Implement proper caching strategies**
9. **Use font optimization** with next/font
10. **Lazy load non-critical resources**

---

**Component Path:** `nextjs\performance\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
