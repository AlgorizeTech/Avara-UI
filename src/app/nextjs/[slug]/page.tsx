import { getDocContent, getDocPaths } from '@/lib/docs'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

// Make the component async and await params
export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params Promise
  const { slug } = await params
  const content = getDocContent(slug)
 
  if (!content) {
    notFound()
  }
 
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

// Generate static paths for all documentation pages
export async function generateStaticParams() {
  const paths = getDocPaths()
  return paths.map((slug) => ({
    slug,
  }))
}