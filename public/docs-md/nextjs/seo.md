# SEO & Meta

Next.js provides powerful tools for search engine optimization and meta tag management.

## Metadata

### App Router Metadata

In the App Router, you can define metadata in your layout or page files:

```jsx
// app/layout.js
import { Metadata } from 'next'

export const metadata = {
  title: 'My App',
  description: 'My awesome Next.js app',
}

export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### Dynamic Metadata

Generate metadata dynamically based on page content:

```jsx
// app/products/[id]/page.js
import { Metadata } from 'next'

async function getProduct(id) {
  const res = await fetch(`https://api.example.com/products/${id}`)
  return res.json()
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id)
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)
  
  return <div>{product.name}</div>
}
```

## Meta Tags

### Built-in Meta Components

Use Next.js built-in components for common meta tags:

```jsx
// app/page.js
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="description" content="My page description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Hello World</h1>
      </div>
    </>
  )
}
```

### Open Graph Tags

Add social media meta tags:

```jsx
// app/page.js
import Head from 'next/head'

export default function Page() {
  return (
    <Head>
      <title>My Amazing Article</title>
      <meta name="description" content="Learn about amazing things" />
      
      {/* Open Graph */}
      <meta property="og:title" content="My Amazing Article" />
      <meta property="og:description" content="Learn about amazing things" />
      <meta property="og:image" content="https://example.com/og-image.jpg" />
      <meta property="og:url" content="https://example.com/article" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My Amazing Article" />
      <meta name="twitter:description" content="Learn about amazing things" />
      <meta name="twitter:image" content="https://example.com/og-image.jpg" />
    </Head>
  )
}
```

## Structured Data

Add structured data for rich results:

```jsx
// app/page.js
import Head from 'next/head'

export default function RecipePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Party Coffee Cake',
    // ... more structured data
  }

  return (
    <Head>
      <title>Party Coffee Cake Recipe</title>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}
```

## Canonical URLs

Specify canonical URLs to prevent duplicate content issues:

```jsx
// app/page.js
import Head from 'next/head'

export default function Page() {
  return (
    <Head>
      <link rel="canonical" href="https://example.com/original-article" />
    </Head>
  )
}
```

## Robots Meta Tags

Control search engine crawling:

```jsx
// app/page.js
import Head from 'next/head'

export default function Page() {
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  )
}
```

## Sitemap Generation

Create a sitemap for your Next.js app:

```js
// pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
  const baseUrl = 'https://example.com'
  
  const staticPages = [
    '',
    '/about',
    '/contact'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${baseUrl}${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default function Sitemap() {
  return null
}
```

## robots.txt

Create a robots.txt file:

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

## Internationalization

Set up hreflang tags for international sites:

```jsx
// app/page.js
import Head from 'next/head'

export default function Page() {
  return (
    <Head>
      <link rel="alternate" hrefLang="en" href="https://example.com/en" />
      <link rel="alternate" hrefLang="es" href="https://example.com/es" />
      <link rel="alternate" hrefLang="x-default" href="https://example.com" />
    </Head>
  )
}
```

## Performance for SEO

### Core Web Vitals

Optimize for Core Web Vitals:

```jsx
// app/page.js
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      {/* Always specify width and height to prevent CLS */}
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
      />
    </div>
  )
}
```

### Font Optimization

Use next/font for optimized font loading:

```jsx
// app/layout.js
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

## Analytics

Add analytics for tracking SEO performance:

```jsx
// app/layout.js
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  )
}
```

## Testing SEO

Use tools to test your SEO implementation:

1. Google Search Console
2. PageSpeed Insights
3. Lighthouse
4. Rich Results Test

Run Lighthouse in development:
```bash
npx lighthouse http://localhost:3000
```