# Authentication

Next.js provides several approaches to implement authentication in your applications.

## NextAuth.js

NextAuth.js is the most popular authentication solution for Next.js applications.

### Installation

```bash
npm install next-auth
```

### Configuration

Create a `[...nextauth].js` file in `pages/api/auth`:

```js
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to validate credentials
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
```

### Provider Configuration

Add the session provider to your app:

```jsx
// pages/_app.js
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

### Client-side Usage

```jsx
// components/LoginButton.js
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```

### Server-side Usage

```jsx
// pages/admin.js
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default function Admin({ session }) {
  return <div>Admin page - Hello {session.user.name}</div>
}
```

### Session Management

Access session data in components:

```jsx
// components/UserProfile.js
import { useSession } from "next-auth/react"

export default function UserProfile() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return <div>Loading...</div>
  }
  
  if (status === "unauthenticated") {
    return <div>Not signed in</div>
  }
  
  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <img src={session.user.image} alt="Profile" />
    </div>
  )
}
```

## Custom Authentication

### JWT-based Authentication

Implement JWT authentication with cookies:

```js
// lib/auth.js
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export async function login(username, password) {
  // Validate credentials
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })
    return token
  }
  throw new Error('Invalid credentials')
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
```

### Middleware Authentication

Protect routes with middleware:

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

### API Route Protection

Protect API routes:

```js
// pages/api/protected.js
import { verifyToken } from '@/lib/auth'

export default function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  const verified = verifyToken(token)
  if (!verified) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  
  res.status(200).json({ message: 'Protected data' })
}
```

## OAuth Providers

### Google OAuth

```js
// pages/api/auth/[...nextauth].js
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // ... other options
}
```

### Facebook OAuth

```js
// pages/api/auth/[...nextauth].js
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  // ... other options
}
```

## Session Storage

### Database Sessions

Store sessions in a database:

```js
// pages/api/auth/[...nextauth].js
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // ... providers
  ],
  // ... other options
}
```

### Custom Session Callbacks

Modify session data:

```js
// pages/api/auth/[...nextauth].js
export const authOptions = {
  providers: [
    // ... providers
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.user.role = user?.role ?? token?.role
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    }
  }
}
```

## Security Best Practices

### Environment Variables

Store secrets in environment variables:

```env
# .env.local
NEXTAUTH_SECRET=your_secret_key
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
```

### Secure Cookies

Configure secure cookies:

```js
// pages/api/auth/[...nextauth].js
export const authOptions = {
  // ... other options
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: true,
        path: '/',
        secure: true
      }
    }
  }
}
```

### CSRF Protection

NextAuth.js includes built-in CSRF protection:

```js
// pages/api/auth/[...nextauth].js
export const authOptions = {
  // ... other options
  csrfToken: true
}
```

## Testing Authentication

### Mocking Sessions in Tests

```js
// __tests__/auth.test.js
import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import Component from '../components/Component'

const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { name: 'Test User' }
}

test('renders with authenticated user', () => {
  render(
    <SessionProvider session={mockSession}>
      <Component />
    </SessionProvider>
  )
  
  expect(screen.getByText('Test User')).toBeInTheDocument()
})
```