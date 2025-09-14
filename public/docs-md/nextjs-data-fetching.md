# Data Fetching

Next.js provides several ways to fetch data depending on your use case.

## Server Components (Recommended)

Server Components are the default in the App Router and allow you to fetch data directly in your React components:

```jsx
// Server Component - runs on the server
async function getData() {
  const res = await fetch('https://api.example.com/data')
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page() {
  const data = await getData()
 
  return {data.map(item => {item.name})}
}
```

## Server Actions

Server Actions allow you to run server code directly from your components:

```jsx
// actions.js
'use server'
 
export async function addItem(data) {
  const res = await fetch('https://api.example.com/items', {
    method: 'POST',
    body: JSON.stringify(data),
  })
 
  const item = await res.json()
  return item
}
```

```jsx
// page.jsx

export default function Page() {
  return (

      Add Item
    
  )
}
```

## Client-side Fetching

For client-side data fetching, use libraries like SWR or React Query:

```jsx
'use client'

const fetcher = (url) => fetch(url).then((res) => res.json())
 
export default function Profile() {
  const { data, error, isLoading } = useSWR('/api/profile', fetcher)
 
  if (error) return Failed to load
  if (isLoading) return Loading...
 
  return Hello {data.name}!
}
```

## Caching Data

Next.js automatically caches fetch requests. You can customize caching behavior:

```jsx
// Force-cache (default)
fetch('https://api.example.com/data', { cache: 'force-cache' })
 
// No-store (bypass cache)
fetch('https://api.example.com/data', { cache: 'no-store' })
 
// Revalidate (ISR)
fetch('https://api.example.com/data', { next: { revalidate: 3600 } })
```

## Revalidating Data

You can revalidate data programmatically:

```jsx
'use server'

export async function revalidate() {
  revalidatePath('/blog')
}
```

## Environment Variables

Use environment variables for API endpoints:

```bash
# .env.local
API_URL=https://api.example.com
NEXT_PUBLIC_API_URL=https://api.example.com
```

```jsx
// Server Component
const apiUrl = process.env.API_URL
 
// Client Component
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

## Error Handling

Handle errors gracefully in your data fetching:

```jsx
async function getData() {
  try {
    const res = await fetch('https://api.example.com/data')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return { error: 'Failed to load data' }
  }
}
```

## Loading States

Create loading states for better UX:

```jsx
// loading.js
export default function Loading() {
  return Loading...
}
```

## Best Practices

1. **Use Server Components** for data fetching when possible
2. **Handle errors** gracefully
3. **Use caching** to improve performance
4. **Validate data** before using it
5. **Use environment variables** for API endpoints

---

**Component Path:** `nextjs\data-fetching\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js Documentation site for live previews and interactive examples.
