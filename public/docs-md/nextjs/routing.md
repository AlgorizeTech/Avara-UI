# Pages & Routing

Next.js uses a file-system based router where folders are used to define routes. Each folder represents a route segment that maps to a URL segment.

## File-based Routing

Next.js has two different routers:

1. **App Router** - The new router introduced in Next.js 13 that uses React Server Components
2. **Pages Router** - The original router that is still supported

### App Router

The App Router works in the `app` directory where each folder represents a route segment. A special `page.js` file is used to make route segments publicly accessible.

```jsx
// app/page.js
export default function Page() {
  return <h1>Hello, Home page!</h1>
}

// app/dashboard/page.js
export default function Page() {
  return <h1>Hello, Dashboard!</h1>
}
```

This creates two routes:
- `/` → renders the Home page
- `/dashboard` → renders the Dashboard page

### Dynamic Routes

Dynamic routes can be created by wrapping a folder name in square brackets: `[folderName]`

```jsx
// app/blog/[slug]/page.js
export default function Post({ params }) {
  return <h1>Post: {params.slug}</h1>
}
```

This creates a route like `/blog/first-post` where `first-post` is passed as the `slug` parameter.

### Route Groups

Route groups can be created by wrapping a folder name in parentheses: `(folderName)`. These folders don't affect the URL path.

```jsx
// app/(marketing)/about/page.js
export default function Page() {
  return <h1>About Us</h1>
}

// app/(shop)/products/page.js
export default function Page() {
  return <h1>Products</h1>
}
```

Both routes are accessible at `/about` and `/products` respectively.

## Linking and Navigating

Next.js provides the `Link` component for client-side navigation between routes.

```jsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/dashboard">
      Dashboard
    </Link>
  )
}
```

For programmatic navigation, use the `useRouter` hook:

```jsx
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```