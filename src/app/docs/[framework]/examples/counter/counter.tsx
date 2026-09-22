'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Simple Counter</h2>
      <p className="text-4xl font-semibold text-center my-6">{count}</p>
      <div className="flex justify-center gap-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  )
}