# TypeScript Support

Next.js provides built-in TypeScript support with zero configuration needed.

## Getting Started

Create a new TypeScript project:

```bash
npx create-next-app@latest --typescript
```

Or add TypeScript to an existing project:

```bash
npm install --save-dev typescript @types/react @types/node @types/react-dom
```

Create a `tsconfig.json` file:

```bash
touch tsconfig.json
```

Start the development server:

```bash
npm run dev
```

Next.js will automatically configure TypeScript for you.

## Basic TypeScript Usage

### Page Components

```tsx
// app/page.tsx

interface User {
  id: number
  name: string
  email: string
}

async function getUsers(): Promise {
  const res = await fetch('https://api.example.com/users')
  return res.json()
}

export default async function HomePage(): Promise {
  const users = await getUsers()
  
  return (
    
      Users
      
        {users.map(user => (
          
            {user.name} - {user.email}
          
        ))}

  )
}
```

### Server Components

```tsx
// app/products/[id]/page.tsx

interface Product {
  id: string
  name: string
  price: number
  description: string
}

async function getProduct(id: string): Promise {
  try {
    const res = await fetch(`https://api.example.com/products/${id}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}): Promise {
  const product = await getProduct(params.id)
  
  if (!product) {
    notFound()
  }
  
  return (
    
      {product.name}
      {product.description}
      ${product.price}
    
  )
}
```

### Client Components

```tsx
// app/components/Counter.tsx
'use client'

interface CounterProps {
  initialCount?: number
}

export default function Counter({
  initialCount = 0,
}: CounterProps): ReactElement {
  const [count, setCount] = useState(initialCount)
  
  return (
    
      Count: {count}
       setCount(count + 1)}>Increment
       setCount(count - 1)}>Decrement
       setCount(initialCount)}>Reset
    
  )
}
```

## TypeScript Configuration

### tsconfig.json

Next.js automatically generates a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### Path Aliases

Use path aliases for cleaner imports:

```ts
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/hooks/*": ["hooks/*"]
    }
  }
}
```

```tsx
// app/page.tsx

export default function Page() {
  // ...
}
```

## Type Definitions

### Next.js Built-in Types

```tsx
// app/layout.tsx

export const metadata: Metadata = {
  title: 'My App',
  description: 'My awesome Next.js app',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    
      {children}
    
  )
}
```

### Route Parameters

```tsx
// app/blog/[slug]/page.tsx

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function BlogPost({
  params,
  searchParams,
}: PageProps): ReactElement {
  return (
    
      Blog Post: {params.slug}
      Page: {searchParams.page || '1'}
    
  )
}
```

### API Routes

```ts
// app/api/users/route.ts

interface User {
  id: number
  name: string
  email: string
}

export async function GET(request: NextRequest) {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ]
  
  return NextResponse.json({ users })
}

export async function POST(request: NextRequest) {
  const body: User = await request.json()
  
  // Process user data...
  
  return NextResponse.json({ message: 'User created', user: body })
}
```

## React Types

### Component Props

```tsx
// app/components/Button.tsx

interface ButtonProps extends ButtonHTMLAttributes {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-medium rounded focus:outline-none focus:ring-2'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return (
    
      {children}
    
  )
}
```

### Hooks

```tsx
// app/hooks/useLocalStorage.ts

export function useLocalStorage(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  
  // Update localStorage when state changes
  const setValue: (value: T | ((val: T) => T)) => void = useCallback(
    (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        
        setStoredValue(valueToStore)
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue]
  )
  
  return [storedValue, setValue]
}
```

## Error Handling

### Type-safe Error Handling

```tsx
// app/lib/api.ts
interface ApiError {
  message: string
  status: number
  code?: string
}

export async function fetchWithErrorHandling(
  url: string,
  options?: RequestInit
): Promise {
  try {
    const response = await fetch(url, options)
    
    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(`${errorData.message} (${errorData.status})`)
    }
    
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API Error: ${error.message}`)
    }
    throw new Error('An unknown error occurred')
  }
}
```

## Best Practices

1. **Use strict mode** in tsconfig.json for better type safety
2. **Define interfaces** for complex objects
3. **Use union types** for finite sets of values
4. **Leverage generics** for reusable components
5. **Type API responses** to catch errors early
6. **Use React.FC** or explicit return types for components
7. **Type event handlers** properly
8. **Use utility types** like Partial, Pick, Omit
9. **Enable incremental compilation** for faster builds
10. **Use path aliases** for cleaner imports

---

**Component Path:** `nextjs\typescript\page.mdx`

<<<<<<< HEAD
**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
=======
**Web Version:** Visit the interactive version at the corresponding URL on the Next.js Documentation site for live previews and interactive examples.
>>>>>>> 8e21847a0a67777192006855ac652c1bf8ef7b1d
