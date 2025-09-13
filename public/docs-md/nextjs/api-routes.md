# API Routes

API routes provide a straightforward solution to build your API with Next.js. Any file inside the `pages/api` directory is mapped to `/api/*` and will be treated as an API endpoint instead of a page.

## Creating API Routes

### Pages Router

Create a file in `pages/api` directory:

```js
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
```

This creates an API endpoint at `/api/hello`.

### App Router

In the App Router, create a file in the `app/api` directory:

```js
// app/api/hello/route.js
export async function GET(request) {
  return new Response('Hello, Next.js!')
}
```

## HTTP Methods

API routes can handle different HTTP methods:

```js
// pages/api/user.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    res.status(200).json({ message: 'User created' })
  } else if (req.method === 'GET') {
    // Process a GET request
    res.status(200).json({ users: [] })
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
```

## Request Helpers

API routes provide access to the request body, query parameters, and cookies:

```js
// pages/api/user.js
export default function handler(req, res) {
  // Get data from the request body
  const { name, email } = req.body
  
  // Get query parameters
  const { id } = req.query
  
  // Get cookies
  const token = req.cookies.token
  
  res.status(200).json({ name, email, id, token })
}
```

## Middleware

You can use middleware to process requests before they reach the API route:

```js
// pages/api/user.js
import { withAuth } from '@/lib/auth'

export default withAuth(function handler(req, res) {
  // This will only run if user is authenticated
  res.status(200).json({ message: 'Protected route' })
})
```

## Response Helpers

Next.js provides several response helpers to make responses easier:

```js
// pages/api/user.js
export default function handler(req, res) {
  res.status(200)
    .setHeader('Content-Type', 'application/json')
    .send({ message: 'Hello' })
}
```

## Dynamic API Routes

Dynamic API routes can be created by wrapping the file name in square brackets:

```js
// pages/api/user/[id].js
export default function handler(req, res) {
  const { id } = req.query
  res.status(200).json({ userId: id })
}
```

This creates an API endpoint at `/api/user/1`, `/api/user/2`, etc.

## Catch-all API Routes

Catch-all routes can be created by wrapping the file name in double square brackets:

```js
// pages/api/post/[...slug].js
export default function handler(req, res) {
  const { slug } = req.query
  // slug is an array: ['first', 'second']
  res.status(200).json({ slug })
}
```

This creates API endpoints like `/api/post/first`, `/api/post/first/second`, etc.