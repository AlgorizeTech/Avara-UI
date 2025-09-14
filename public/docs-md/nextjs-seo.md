# SEO & Meta

Next.js provides powerful tools to optimize your application for search engines.

## Metadata

### Static Metadata

Define static metadata in your layout or page:

```jsx
// app/layout.js

export const metadata = {
  title: 'My App',
  description: 'My awesome Next.js application',
}

export default function RootLayout({ children }) {
  return (
    
      {children}
    
  )
}
```

### Dynamic Metadata

Generate metadata dynamically based on page content:

```jsx
// app/products/[id]/page.js
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
  
  return (
    
      {product.name}
      {product.description}
    
  )
}
```

## Open Graph

Add Open Graph tags for social sharing:

```jsx
// app/page.js
export const metadata = {
  title: 'My Page',
  description: 'Description of my page',
  openGraph: {
    title: 'My Page Title',
    description: 'Description for social sharing',
    url: 'https://myapp.com',
    siteName: 'My App',
    images: [
      {
        url: 'https://myapp.com/og-image.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return My Page
}
```

## Twitter Cards

Add Twitter card metadata:

```jsx
// app/page.js
export const metadata = {
  title: 'My Page',
  description: 'Description of my page',
  twitter: {
    card: 'summary_large_image',
    title: 'My Page Title',
    description: 'Description for Twitter',
    creator: '@myusername',
    images: ['https://myapp.com/twitter-image.jpg'],
  },
}

export default function Page() {
  return My Page
}
```

## Structured Data

Add structured data (JSON-LD) for rich results:

```jsx
// app/products/[id]/page.js

async function getProduct(id) {
  const res = await fetch(`https://api.example.com/products/${id}`)
  return res.json()
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
    },
  } satisfies WithContext
  
  return (

      {product.name}
      {product.description}
    
  )
}
```

## Canonical URLs

Specify canonical URLs to prevent duplicate content issues:

```jsx
// app/page.js
export const metadata = {
  alternates: {
    canonical: 'https://myapp.com',
  },
}

export default function Page() {
  return My Page
}
```

## Robots Meta

Control search engine crawling:

```jsx
// app/page.js
export const metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Page() {
  return My Page
}
```

## Sitemap

Generate a sitemap for your application:

```js
// app/sitemap.js
export default async function sitemap() {
  const products = await fetch('https://api.example.com/products').then(res => res.json())
  
  const productUrls = products.map((product) => ({
    url: `https://myapp.com/products/${product.id}`,
    lastModified: new Date(),
  }))
  
  const urls = [
    {
      url: 'https://myapp.com',
      lastModified: new Date(),
    },
    {
      url: 'https://myapp.com/about',
      lastModified: new Date(),
    },
    ...productUrls,
  ]
  
  return urls
}
```

## Robots.txt

Create a robots.txt file:

```txt
# public/robots.txt
User-Agent: *
Allow: /

Sitemap: https://myapp.com/sitemap.xml
```

## Internationalization

Add hreflang tags for internationalization:

```jsx
// app/page.js
export const metadata = {
  alternates: {
    canonical: 'https://myapp.com',
    languages: {
      'en-US': 'https://myapp.com/en-US',
      'de-DE': 'https://myapp.com/de-DE',
    },
  },
}

export default function Page() {
  return My Page
}
```

## Viewport Meta

Control viewport settings:

```jsx
// app/layout.js
export const metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({ children }) {
  return (
    
      {children}
    
  )
}
```

## Verification Meta

Add verification tags for search console:

```jsx
// app/layout.js
export const metadata = {
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
    other: {
      me: ['my-email', 'my-link'],
    },
  },
}

export default function RootLayout({ children }) {
  return (
    
      {children}
    
  )
}
```

## Best Practices

1. **Use descriptive titles** and meta descriptions
2. **Implement Open Graph** for social sharing
3. **Add Twitter cards** for better Twitter engagement
4. **Include structured data** for rich results
5. **Specify canonical URLs** to prevent duplicate content
6. **Create a sitemap** for better crawling
7. **Use hreflang tags** for internationalization
8. **Optimize images** with descriptive alt text
9. **Implement proper heading hierarchy**
10. **Use semantic HTML** for better accessibility

---

**Component Path:** `nextjs\seo\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js Documentation site for live previews and interactive examples.
