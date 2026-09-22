import Counter from './counter-component'
import Button from '@/app/docs/[framework]/examples/button/button'

export default function CounterApp() {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Counter App</h1>
      <Counter />
      <div className="mt-6 text-center">
        <Button variant="default">Get Started</Button>
      </div>
    </div>
  )
}