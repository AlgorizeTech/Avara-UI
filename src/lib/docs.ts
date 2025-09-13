import fs from 'fs'
import path from 'path'

const DOCS_PATH = path.join(process.cwd(), 'public/docs-md/nextjs')

export function getDocPaths() {
  if (!fs.existsSync(DOCS_PATH)) {
    return []
  }
  
  const files = fs.readdirSync(DOCS_PATH)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
    .map(slug => slug === 'index' ? 'index' : slug)
}

export function getDocContent(slug: string) {
  // Handle index page
  const fileName = slug === 'index' ? 'index.md' : `${slug}.md`
  const filePath = path.join(DOCS_PATH, fileName)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const content = fs.readFileSync(filePath, 'utf8')
  return content
}