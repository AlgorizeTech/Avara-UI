# Middleware

Middleware in Next.js allows you to run code before a request is completed. It can modify the response by rewriting, redirecting, modifying headers, or setting cookies.

## Getting Started

Create a `middleware.js` file at the root of your project:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Clone the request headers and set a new header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware', 'hello')

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}

export const config = {
  matcher: '/about/:path*',
}
```

## Configuration

### Matcher

Use the `matcher` option to define which paths the middleware should run on:

```js
// middleware.js
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### Conditional Paths

Use matchers to conditionally apply middleware:

```js
// middleware.js
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
}
```

## Common Use Cases

### Authentication

Protect routes with authentication checks:

```js
// middleware.js
import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  const verified = verifyToken(token)
  if (!verified) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}
```

### Internationalization

Implement internationalized routing:

```js
// middleware.js
import { NextResponse } from 'next/server'

const SUPPORTED_LOCALES = ['en', 'es', 'fr']
const DEFAULT_LOCALE = 'en'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if pathname has a locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return
  
  // Redirect to default locale if no locale is present
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
}
```

### Logging

Log requests for analytics:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  console.log('Request:', {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
  })
  
  return NextResponse.next()
}
```

### CORS Headers

Set CORS headers for API routes:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

## Response Modification

### Redirects

Redirect users to different paths:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  
  // Redirect old paths to new paths
  if (url.pathname === '/old-page') {
    url.pathname = '/new-page'
    return NextResponse.redirect(url)
  }
  
  // Permanent redirect
  if (url.pathname === '/permanent-redirect') {
    url.pathname = '/destination'
    return NextResponse.redirect(url, 301)
  }
  
  return NextResponse.next()
}
```

### Rewrites

Rewrite URLs without changing the browser address:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  
  // Rewrite /blog/:slug to /articles/:slug
  if (url.pathname.startsWith('/blog/')) {
    url.pathname = url.pathname.replace('/blog/', '/articles/')
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}
```

### Headers

Modify request and response headers:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Modify request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-custom-header', 'custom-value')
  
  // Create response with modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Add response headers
  response.headers.set('x-response-header', 'response-value')
  
  return response
}
```

## Cookies

### Setting Cookies

Set cookies in middleware:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  
  response.cookies.set('theme', 'dark', {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    path: '/',
  })
  
  return response
}
```

### Reading Cookies

Read cookies in middleware:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const theme = request.cookies.get('theme')?.value
  
  const response = NextResponse.next()
  
  // Set a custom header based on cookie value
  if (theme) {
    response.headers.set('x-theme', theme)
  }
  
  return response
}
```

### Deleting Cookies

Delete cookies in middleware:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  
  response.cookies.delete('theme')
  
  return response
}
```

## Advanced Patterns

### Chaining Middleware

Create multiple middleware functions:

```js
// middleware.js
import { NextResponse } from 'next/server'

// Authentication middleware
function withAuth(request) {
  const token = request.cookies.get('token')?.value
  return token ? true : false
}

// Logging middleware
function withLogging(request) {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)
  return true
}

export function middleware(request) {
  // Apply logging to all requests
  withLogging(request)
  
  // Apply authentication to protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!withAuth(request)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### Conditional Middleware

Apply middleware conditionally based on request properties:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = /bot|crawl|spider|slurp/i.test(userAgent)
  
  // Different handling for bots
  if (isBot) {
    const response = NextResponse.next()
    response.headers.set('x-is-bot', 'true')
    return response
  }
  
  // Different handling for mobile users
  const isMobile = /mobile|android|iphone/i.test(userAgent)
  if (isMobile) {
    const url = request.nextUrl.clone()
    url.pathname = `/mobile${url.pathname}`
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}
```

## Error Handling

Handle errors in middleware gracefully:

```js
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  try {
    // Your middleware logic
    const response = NextResponse.next()
    
    // Potentially failing operation
    const result = someOperation()
    
    response.headers.set('x-result', result)
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    
    // Return a safe response
    return NextResponse.next()
  }
}
```

## Testing Middleware

### Unit Testing

Test middleware functions:

```js
// __tests__/middleware.test.js
import { NextResponse } from 'next/server'
import { middleware } from '../middleware'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => ({
      headers: {
        set: jest.fn(),
      },
      cookies: {
        set: jest.fn(),
      },
    })),
    redirect: jest.fn(),
  },
}))

describe('Middleware', () => {
  it('should add custom header', () => {
    const request = {
      headers: new Headers(),
      nextUrl: { pathname: '/' },
      cookies: {
        get: jest.fn(() => ({ value: 'token123' })),
      },
    }
    
    const response = middleware(request)
    
    expect(NextResponse.next).toHaveBeenCalled()
  })
})
```

## Best Practices

### Performance

1. Keep middleware lightweight
2. Avoid heavy computations
3. Use caching when possible
4. Minimize external API calls

### Security

1. Validate all inputs
2. Sanitize user data
3. Use secure cookies
4. Implement proper error handling

### Organization

1. Keep middleware files organized
2. Use descriptive names for middleware functions
3. Document complex middleware logic
4. Separate concerns into different middleware functions

### Debugging

1. Use logging for debugging
2. Test middleware in isolation
3. Monitor middleware performance
4. Handle errors gracefully

## Limitations

### Runtime Environment

Middleware runs in the Edge Runtime, which has some limitations:

- No Node.js APIs (fs, path, etc.)
- Limited npm packages
- No direct database connections

### Size Limits

Middleware has size limitations:
- Maximum 1MB for the compiled middleware
- Avoid importing large dependencies

### Execution Time

Middleware should execute quickly:
- Aim for < 100ms execution time
- Avoid blocking operations
- Use async operations carefully

## Migration from Previous Versions

If you're migrating from older Next.js versions:

1. Update import statements:
```js
// Old
import { NextRequest, NextFetchEvent } from 'next/server'

// New
import { NextRequest, NextResponse } from 'next/server'
```

2. Update middleware function signature:
```js
// Old
export function middleware(req, ev) { }

// New
export function middleware(request) { }
```

3. Update config object:
```js
// Old
export const config = {
  matcher: ['/dashboard/:path*'],
}

// New (same syntax, but different behavior)
export const config = {
  matcher: ['/dashboard/:path*'],
}
```