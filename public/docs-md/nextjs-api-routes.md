# API Routes

API Routes allow you to create API endpoints as part of your Next.js application.

## Creating Routes

Create API endpoints by creating a `route.js` file inside the `app/api` directory:

```js
// app/api/hello/route.js
export async function GET(request) {
  return new Response('Hello, Next.js!')
}
```

## HTTP Methods

Support different HTTP methods:

```js
// app/api/users/route.js

export async function GET() {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ]
  return NextResponse.json({ users })
}
 
export async function POST(request) {
  const data = await request.json()
  // Process data...
  return NextResponse.json({ message: 'User created' })
}
 
export async function PUT(request) {
  const data = await request.json()
  // Update data...
  return NextResponse.json({ message: 'User updated' })
}
 
export async function DELETE(request) {
  // Delete data...
  return NextResponse.json({ message: 'User deleted' })
}
```

## Request Object

Access request data:

```js
// app/api/users/route.js
export async function POST(request) {
  // Get JSON data
  const data = await request.json()
  
  // Get form data
  const formData = await request.formData()
  
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  // Get headers
  const authHeader = request.headers.get('authorization')
  
  return new Response('Data received')
}
```

## Response Object

Return different types of responses:

```js
// JSON response
export async function GET() {
  return NextResponse.json({ message: 'Hello World' })
}
 
// Text response
export async function GET() {
  return new Response('Hello World')
}
 
// Redirect
export async function GET() {
  return NextResponse.redirect('https://nextjs.org')
}
 
// Headers
export async function GET() {
  return new Response('Hello World', {
    headers: {
      'Content-Type': 'text/plain',
      'X-Custom-Header': 'value'
    }
  })
}
```

## Dynamic Routes

Create dynamic API routes:

```bash
app/
└── api/
    └── users/
        ├── route.js        → /api/users
        └── [id]/
            └── route.js    → /api/users/:id
```

```js
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params
  // Fetch user with id...
  return NextResponse.json({ id, name: 'John Doe' })
}
```

## Middleware

Protect API routes with middleware:

```js
// app/api/protected/route.js

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || authHeader !== 'Bearer secret-token') {
    return new Response('Unauthorized', { status: 401 })
  }
  
  return NextResponse.json({ message: 'Protected data' })
}
```

## Error Handling

Handle errors in API routes:

```js
export async function GET() {
  try {
    // Some operation that might fail
    const data = await fetchData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
```

## CORS

Handle CORS in API routes:

```js
export async function GET() {
  return NextResponse.json(
    { message: 'Hello from API' },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}
 
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

## Best Practices

1. **Use descriptive route names**
2. **Handle all HTTP methods** your API supports
3. **Validate input data**
4. **Handle errors gracefully**
5. **Use environment variables** for secrets
6. **Implement proper authentication**
7. **Rate limit** public APIs
8. **Log requests** for debugging

---

**Component Path:** `nextjs\api-routes\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
