import { getDocContent, getDocPaths } from '@/lib/docs'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export default function DocPage({ params }: { params: { slug: string } }) {
  const content = getDocContent(params.slug)
  
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