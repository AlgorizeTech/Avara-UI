# Interactive Counter Example

This example demonstrates a simple counter component using React's useState hook in a Next.js application.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/nextjs/examples/counter/counter.tsx`

## Multi-file Example

Here's a more complex example with multiple files:

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/nextjs/examples/counter/app-page.tsx`

## Implementation

### Simple Counter Component

```tsx
// src/app/docs/nextjs/examples/counter/counter.tsx
'use client'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    
      Simple Counter
      {count}
      
         setCount(count + 1)}
        >
          Increment
        
         setCount(0)}
        >
          Reset

  )
}
```

### Multi-file Implementation

#### Main App Page

```tsx
// src/app/docs/nextjs/examples/counter/app-page.tsx

export default function CounterApp() {
  return (
    
      Counter App

        Get Started

  )
}
```

#### Counter Component

```tsx
// src/app/docs/nextjs/examples/counter/counter-component.tsx
'use client'

interface CounterProps {
  initialCount?: number
}

export default function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount)
  
  return (
    
      {count}
      
         setCount(count + 1)}>Increment
         setCount(count - 1)}>Decrement
         setCount(initialCount)}>Reset

  )
}
```

#### Button Component

```tsx
// src/app/docs/nextjs/examples/counter/button-component.tsx
'use client'

interface ButtonProps extends ButtonHTMLAttributes {
  variant?: 'primary' | 'secondary' | 'outline'
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
  }
  
  return (
    
      {children}
    
  )
}
```

## Key Concepts

1. **Client Components**: The counter uses the `'use client'` directive to enable React hooks
2. **State Management**: useState hook manages the counter state
3. **Component Composition**: Multiple components work together in the multi-file example
4. **TypeScript**: Strong typing with interfaces and props
5. **Styling**: Tailwind CSS for consistent styling
6. **Accessibility**: Proper button semantics and focus states

## Best Practices

1. **Use Client Components** only when necessary (state, effects, event handlers)
2. **Type Props** with TypeScript interfaces
3. **Extract Components** for reusability
4. **Use Utility Classes** for consistent styling
5. **Handle Edge Cases** like resetting to initial values
6. **Provide Good UX** with visual feedback and clear actions

---

**Component Path:** `nextjs\examples\counter\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js Documentation site for live previews and interactive examples.
