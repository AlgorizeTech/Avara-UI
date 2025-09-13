import { getDocContent } from '@/lib/docs'
import ReactMarkdown from 'react-markdown'

export default function NextJsIndex() {
  const content = getDocContent('index')
  
  if (!content) {
    return (
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h1>Next.js Documentation</h1>
        <p>Welcome to the Next.js documentation.</p>
      </div>
    )
  }
  
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}