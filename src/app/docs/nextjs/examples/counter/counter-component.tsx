'use client'

import { useState } from 'react'
import Button from '@/app/docs/button/button'

interface CounterProps {
  initialCount?: number
}

export default function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount)
  
  return (
    <div className="text-center">
      <p className="text-5xl font-bold my-6">{count}</p>
      <div className="flex justify-center gap-3">
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button variant="secondary" onClick={() => setCount(count - 1)}>Decrement</Button>
        <Button variant="outline" onClick={() => setCount(initialCount)}>Reset</Button>
      </div>
    </div>
  )
}