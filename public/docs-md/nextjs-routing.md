# Pages & Routing

Next.js uses a file-system based router where folders are used to define routes.

## File-based Routing

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

## Creating Routes

To create a route, create a `page.js` file inside the `app` directory:

```jsx
// app/page.js
export default function Home() {
  return Hello, Home page!
}
```

```jsx
// app/about/page.js
export default function About() {
  return About Us
}
```

## Dynamic Routes

To create dynamic routes, wrap the folder name in square brackets:

```bash
app/
└── blog/
    ├── page.js         → /blog
    └── [slug]/
        └── page.js     → /blog/:slug
```

Access the dynamic parameter in your component:

```jsx
// app/blog/[slug]/page.js
export default function Post({ params }) {
  return Post: {params.slug}
}

export async function generateMetadata({ params }) {
  return {
    title: `Post: ${params.slug}`
  }
}
```

## Nested Routes

Create nested layouts by adding a `layout.js` file in a folder:

```jsx
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    
      Dashboard Navigation
      {children}
    
  )
}
```

```jsx
// app/dashboard/page.js
export default function DashboardPage() {
  return Dashboard
}
```

```jsx
// app/dashboard/settings/page.js
export default function SettingsPage() {
  return Settings
}
```

## Route Groups

Organize routes without affecting the URL path by using route groups (folders in parentheses):

```bash
app/
├── (marketing)/
│   ├── page.js          → /
│   └── about/
│       └── page.js      → /about
└── (shop)/
    ├── layout.js
    ├── page.js          → /shop
    └── cart/
        └── page.js      → /shop/cart
```

## Parallel Routes

Render multiple pages in the same layout using slots:

```jsx
// app/layout.js
export default function Layout({ children, dashboard }) {
  return (
    
      {children}
      {dashboard}
    
  )
}
```

```bash
app/
├── layout.js
├── page.js
└── @dashboard/
    └── page.js
```

## Loading UI

Create loading states for better user experience:

```jsx
// app/dashboard/loading.js
export default function Loading() {
  return Loading dashboard...
}
```

## Error Handling

Handle errors gracefully with error boundaries:

```jsx
// app/dashboard/error.js
'use client'
 
export default function Error({ error, reset }) {
  return (
    
      Something went wrong!
       reset()}>Try again
    
  )
}
```

## Route Handlers

Create API endpoints with Route Handlers:

```js
// app/api/route.js
export async function GET(request) {
  const data = { message: 'Hello from API' }
  return Response.json(data)
}
```

## Link Component

Use the `Link` component for client-side navigation:

```jsx

export default function Navigation() {
  return (
    
      Home
      About
    
  )
}
```

## Programmatic Navigation

Navigate programmatically using the `useRouter` hook:

```jsx
'use client'

export default function Button() {
  const router = useRouter()
  
  return (
     router.push('/dashboard')}>
      Go to Dashboard
    
  )
}

---

**Component Path:** `nextjs\routing\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
