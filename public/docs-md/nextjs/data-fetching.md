# Data Fetching

Next.js provides several ways to fetch data depending on when and where you need it:

## Server-side Data Fetching

### Server Components (App Router)

In the App Router, components are Server Components by default. You can fetch data directly in these components using async/await:

```jsx
// app/dashboard/page.js
async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json()
}

export default async function Dashboard({ params }) {
  const data = await getData()
 
  return <div>{data.message}</div>
}
```

### getStaticProps (Pages Router)

For pre-rendering static pages at build time:

```jsx
// pages/index.js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/...')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  return <div>{data.message}</div>
}
```

### getServerSideProps (Pages Router)

For server-side rendering on each request:

```jsx
// pages/profile.js
export async function getServerSideProps(context) {
  const res = await fetch(`https://api.example.com/user/${context.params.id}`)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

export default function Profile({ data }) {
  return <div>{data.name}</div>
}
```

## Client-side Data Fetching

For client-side data fetching, you can use any library like fetch, axios, or SWR.

### Using SWR

SWR is a React Hooks library for data fetching created by Vercel:

```jsx
'use client'
 
import useSWR from 'swr'
 
const fetcher = (url) => fetch(url).then((res) => res.json())
 
export default function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)
 
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
 
  return <div>Hello {data.name}!</div>
}
```

### Using React Query/TanStack Query

```jsx
'use client'
 
import { useQuery } from '@tanstack/react-query'
 
async function fetchUser() {
  const res = await fetch('/api/user')
  return res.json()
}
 
export default function Profile() {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  })
 
  if (isLoading) return <div>Loading...</div>
 
  return <div>Hello {data.name}!</div>
}
```

## Caching and Revalidation

Next.js automatically caches fetch requests in Server Components:

```jsx
// Revalidate data every 60 seconds
const res = await fetch('https://api.example.com/...', {
  next: { revalidate: 60 }
})
```

For on-demand revalidation, use the revalidateTag or revalidatePath functions:

```jsx
// app/actions.js
'use server'
 
import { revalidateTag } from 'next/cache'
 
export async function revalidate() {
  revalidateTag('collection')
}
```