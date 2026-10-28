'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Enhanced analytics for better SEO insights
export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Page views and web vitals are handled by GoogleAnalytics / WebVitals
    if (typeof window !== 'undefined' && window.gtag) {
      // Enhanced tracking for component pages
      if (pathname.startsWith('/docs/') && pathname !== '/docs') {
        const componentName = pathname.split('/').pop()
        window.gtag('event', 'component_view', {
          component_name: componentName,
          component_category: getComponentCategory(componentName || ''),
          page_path: pathname
        })
      }

      // Track search queries for SEO insights
      const searchQuery = searchParams.get('search')
      if (searchQuery) {
        window.gtag('event', 'search', {
          search_term: searchQuery,
          page_path: pathname
        })
      }
    }
  }, [pathname, searchParams])

  return null
}

// Component categorization for analytics
function getComponentCategory(componentName: string): string {
  const categories = {
    'UI Components': ['button', 'card', 'badge', 'tabs', 'dropdown', 'navbar', 'footer'],
    'Form Components': ['login', 'signin', 'password', 'multiselector', 'search'],
    'Animation Components': ['flipwords', 'textreveal', 'sparklestext', 'shimmer', 'loaders'],
    'Layout Components': ['hero', 'pricing', 'testimonial', 'portfolio', 'filetree'],
    'Interactive Components': ['carousel', 'network', 'copybutton', 'colorpalette', 'gradient']
  }

  for (const [category, components] of Object.entries(categories)) {
    if (components.includes(componentName)) {
      return category
    }
  }
  return 'Other'
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

export default Analytics