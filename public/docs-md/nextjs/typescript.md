# TypeScript

Next.js provides built-in support for TypeScript with zero configuration needed. Add TypeScript to your project to catch errors early and improve developer experience.

## Getting Started

### New Projects

Create a new Next.js project with TypeScript:

```bash
npx create-next-app@latest --typescript
```

### Existing Projects

Add TypeScript to an existing Next.js project:

1. Install TypeScript and related types:
```bash
npm install --save-dev typescript @types/react @types/node @types/react-dom
```

2. Create a `tsconfig.json` file:
```bash
touch tsconfig.json
```

3. Start the development server:
```bash
npm run dev
```

Next.js will automatically configure TypeScript for you.

## Configuration

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
    "baseUrl": ".",
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

Configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

Use in your code:
```tsx
import { Button } from '@/components/Button'
import { formatDate } from '@/lib/utils'
```

## Type Safety in Next.js

### Pages Router

#### getStaticProps

```tsx
import { GetStaticProps } from 'next'

type Post = {
  id: string
  title: string
  content: string
}

type Props = {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch('https://api.example.com/posts')
  const posts: Post[] = await res.json()

  return {
    props: {
      posts,
    },
  }
}

export default function Blog({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

#### getServerSideProps

```tsx
import { GetServerSideProps } from 'next'

type User = {
  id: string
  name: string
}

type Props = {
  user: User
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const res = await fetch(`https://api.example.com/user/${context.params?.id}`)
  const user: User = await res.json()

  return {
    props: {
      user,
    },
  }
}

export default function Profile({ user }: Props) {
  return <div>Hello {user.name}!</div>
}
```

#### getStaticPaths

```tsx
import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  const paths = posts.map((post: { id: string }) => ({
    params: { id: post.id },
  }))

  return { paths, fallback: false }
}
```

### App Router

#### Server Components

```tsx
// app/page.tsx
type Post = {
  id: string
  title: string
  content: string
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

#### Client Components

```tsx
// components/Counter.tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

## API Routes

### Pages Router

```ts
// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
```

### App Router

```ts
// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ name: 'John Doe' })
}
```

## Custom Types

### Global Types

Create a `types/` directory for global types:

```ts
// types/post.ts
export type Post = {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Module Declarations

Extend Next.js types in `next-env.d.ts`:

```ts
// next-env.d.ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

## React Types

### Component Props

```tsx
import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Event Handlers

```tsx
import { ChangeEvent, FormEvent } from 'react'

export default function Form() {
  const [name, setName] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submitted:', name)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={handleChange} 
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Hooks

### Custom Hooks

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
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

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
```

## Environment Variables

Type environment variables:

```ts
// next-env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
    DATABASE_URL: string
    JWT_SECRET: string
  }
}
```

Use in your code:
```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const databaseUrl = process.env.DATABASE_URL
```

## Error Handling

### Type-safe Error Handling

```tsx
type Result<T> = {
  data?: T
  error?: Error
  loading: boolean
}

async function fetchData<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { data, loading: false }
  } catch (error) {
    return { error: error as Error, loading: false }
  }
}
```

## Testing with TypeScript

### Jest Configuration

```ts
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
}
```

### Test Files

```tsx
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../components/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## Best Practices

### Strict Mode

Enable strict TypeScript settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type-only Imports

Use type-only imports for types:

```ts
import type { Post } from '@/types/post'
import { getPosts } from '@/lib/api' // Regular import for values
```

### Utility Types

Use TypeScript utility types:

```ts
// Partial
type UpdatePost = Partial<Post>

// Pick
type PostSummary = Pick<Post, 'id' | 'title'>

// Omit
type PostWithoutContent = Omit<Post, 'content'>

// Record
type PostsById = Record<string, Post>
```

### Generics

Use generics for reusable components:

```tsx
type ListProps<T> = {
  items: T[]
  renderItem: (item: T) => ReactNode
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
```

## Troubleshooting

### Common Errors

1. **Cannot find module**:
   Check path aliases in `tsconfig.json`

2. **Type is not assignable**:
   Check type definitions and ensure they match

3. **Property does not exist**:
   Add missing properties or use optional chaining (`?.`)

### Performance

1. Use `incremental: true` in `tsconfig.json`
2. Enable project references for large projects
3. Use `composite: true` for monorepos

### Migration Tips

1. Start with `allowJs: true` to mix JS and TS
2. Rename files from `.js` to `.tsx`
3. Add types gradually
4. Use `any` temporarily but replace with proper types

## Advanced Features

### Decorators

Enable experimental decorators:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### JSX Factories

Customize JSX factory:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@emotion/react"
  }
}
```

### Project References

Use project references for monorepos:

```json
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    { "path": "../shared" }
  ]
}
```