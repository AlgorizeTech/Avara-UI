'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="p-6 rounded-lg border border-border max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Simple Counter</h2>
      <p className="text-4xl font-semibold text-center my-6">{count}</p>
      <div className="flex justify-center gap-4">
        <button 
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button 
          className="px-4 py-2 bg-muted text-foreground rounded hover:bg-foreground/10 transition-colors"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  )
}