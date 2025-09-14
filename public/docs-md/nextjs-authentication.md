# Authentication

Next.js provides several approaches to implement authentication in your application.

## NextAuth.js (Recommended)

NextAuth.js is the easiest way to add authentication to Next.js applications:

```bash
npm install next-auth
```

### Configuration

```js
// app/api/auth/[...nextauth]/route.js

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

### Client Component

```jsx
// app/components/LoginButton.js
'use client'

export default function LoginButton() {
  const { data: session } = useSession()
  
  if (session) {
    return (
      <>
        Signed in as {session.user.email} 
         signOut()}>Sign out
      
    )
  }
  
  return (
    <>
      Not signed in 
       signIn()}>Sign in
    
  )
}
```

### Server Component

```jsx
// app/page.js

export default async function Page() {
  const session = await getServerSession(authOptions)
  
  return (
    
      {session ? (
        Signed in as {session.user.email}
      ) : (
        Not signed in
      )}
    
  )
}
```

## Custom Authentication

Implement custom authentication with JWT and cookies:

### API Route for Login

```js
// app/api/login/route.js

export async function POST(request) {
  const { email, password } = await request.json()
  
  // Validate credentials (implement your logic)
  if (email === 'user@example.com' && password === 'password') {
    // Create JWT token
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))
    
    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
      sameSite: 'strict',
    })
    
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  )
}
```

### Middleware for Protection

```js
// middleware.js

export async function middleware(request) {
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}
```

### Client Component for Login

```jsx
// app/components/LoginForm.js
'use client'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    if (response.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      const data = await response.json()
      setError(data.error)
    }
  }
  
  return (

        Email
         setEmail(e.target.value)}
          required
        />

        Password
         setPassword(e.target.value)}
          required
        />
      
      {error && {error}}
      Login
    
  )
}
```

## Session Management

### Check Authentication Status

```jsx
// app/lib/auth.js

export async function getUserFromToken() {
  const token = cookies().get('auth-token')?.value
  
  if (!token) return null
  
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )
    return verified.payload
  } catch (error) {
    return null
  }
}
```

### Protected Server Component

```jsx
// app/dashboard/page.js

export default async function DashboardPage() {
  const user = await getUserFromToken()
  
  if (!user) {
    redirect('/login')
  }
  
  return (
    
      Dashboard
      Welcome, {user.email}!
    
  )
}
```

## Logout Implementation

```js
// app/api/logout/route.js

export async function POST() {
  cookies().delete('auth-token')
  return NextResponse.json({ success: true })
}
```

```jsx
// app/components/LogoutButton.js
'use client'

export default function LogoutButton() {
  const router = useRouter()
  
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }
  
  return Logout
}
```

## Best Practices

1. **Use HTTPS** in production
2. **Store secrets** in environment variables
3. **Set secure cookie options** (httpOnly, secure, sameSite)
4. **Implement proper password hashing** for custom auth
5. **Use JWT** for stateless authentication
6. **Implement refresh tokens** for long-lived sessions
7. **Add rate limiting** to authentication endpoints
8. **Validate and sanitize** all input
9. **Use middleware** to protect routes
10. **Implement proper error handling** without revealing sensitive information

---

**Component Path:** `nextjs\authentication\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js Documentation site for live previews and interactive examples.
