import ComponentSEO from '@/components/seo/ComponentSEO'
import Breadcrumb from '@/components/seo/Breadcrumb'

interface ComponentTemplateProps {
  componentName: string
  description: string
  category?: string
  examples?: string[]
  relatedComponents?: string[]
  children: React.ReactNode
  installationCode?: string
  usageCode?: string
  propsTable?: Array<{
    prop: string
    type: string
    default?: string
    description: string
  }>
}

// Docs type scale on the ink ladder: Cooper headings at weight 400, 15px
// body at 60%, ink-tint surfaces instead of greys.
const H2 = 'font-serif text-2xl leading-8 font-normal text-foreground mb-6'
const H3 = 'font-serif text-lg leading-7 font-normal text-foreground mb-2'
const BODY = 'text-[15px] leading-[1.8] text-foreground/60'
const TAG = 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-foreground/10 text-foreground/60 border border-foreground/10'
const CODE_FIGURE = 'rounded-xl bg-foreground/[0.03] p-1.5'
const CODE_PANEL =
  'rounded-md bg-background px-5 py-4 overflow-x-auto font-mono text-[13px] leading-[1.7] text-foreground/75'
const TH =
  'px-3 py-2 lg:px-4 lg:py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-foreground/60 bg-foreground/[0.07] border-b border-foreground/[0.06]'
const TD = 'px-3 py-2 lg:px-4 lg:py-2.5 align-baseline'
const CHIP = 'font-mono text-[12px] leading-[1.55]'

export function ComponentTemplate({
  componentName,
  description,
  category = 'UI Components',
  examples = [],
  relatedComponents = [],
  children,
  installationCode,
  usageCode,
  propsTable = []
}: ComponentTemplateProps) {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Documentation', url: '/docs' },
    { name: componentName, url: `/docs/${componentName.toLowerCase()}`, current: true }
  ]

  return (
    <>
      <ComponentSEO
        componentName={componentName}
        description={description}
        category={category}
        examples={examples}
        relatedComponents={relatedComponents}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        {/* Component Header */}
        <header className="mb-8">
          <h1 className="font-serif text-2xl leading-8 font-normal text-foreground mb-6">
            {componentName} Component
          </h1>
          <p className={BODY}>
            {description}
          </p>
          
          {/* Component Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {category}
            </span>
            <span className={TAG}>React</span>
            <span className={TAG}>Tailwind CSS</span>
            <span className={TAG}>Framer Motion</span>
          </div>
        </header>

        {/* Component Demo */}
        <section className="mb-12">
          <h2 className={H2}>Preview</h2>
          <div className="rounded-xl border border-foreground/[0.06] p-0 bg-card">
            {children}
          </div>
        </section>

        {/* Installation Section */}
        {installationCode && (
          <section className="mb-12">
            <h2 className={H2}>Installation</h2>
            <div className={CODE_FIGURE}>
              <pre className={CODE_PANEL}>
                <code>{installationCode}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Usage Section */}
        {usageCode && (
          <section className="mb-12">
            <h2 className={H2}>Usage</h2>
            <div className={CODE_FIGURE}>
              <pre className={CODE_PANEL}>
                <code>{usageCode}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Props Table */}
        {propsTable.length > 0 && (
          <section className="mb-12">
            <h2 className={H2}>Props</h2>
            <div className="[overflow-x:auto] rounded-xl border border-foreground/[0.06] bg-foreground/[0.05]">
              <table className="w-full border-collapse text-[13px] text-foreground/55">
                <thead>
                  <tr>
                    <th className={TH}>Prop</th>
                    <th className={`${TH} border-l`}>Type</th>
                    <th className={`${TH} border-l`}>Default</th>
                    <th className={`${TH} border-l`}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {propsTable.map((prop, index) => (
                    <tr
                      key={index}
                      className="border-b border-foreground/[0.08] last:border-b-0 hover:bg-foreground/[0.07] transition-colors"
                    >
                      <td className={TD}>
                        <span className={`${CHIP} font-medium text-foreground`}>
                          {prop.prop}
                        </span>
                      </td>
                      <td className={TD}>
                        <span className={`${CHIP} text-foreground/70`}>
                          {prop.type}
                        </span>
                      </td>
                      <td className={`${TD} font-mono text-[12px] text-foreground/70`}>
                        {prop.default || '-'}
                      </td>
                      <td className={`${TD} text-[12.5px] leading-relaxed text-foreground/55`}>
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Related Components */}
        {relatedComponents.length > 0 && (
          <section className="mb-12">
            <h2 className={H2}>Related Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedComponents.map((component) => (
                <a
                  key={component}
                  href={`/docs/${component.toLowerCase()}`}
                  className="group block p-4 rounded-xl border border-foreground/[0.06] bg-foreground/[0.03] hover:bg-foreground/[0.07] transition-colors"
                >
                  <h3 className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors">
                    {component}
                  </h3>
                  <p className="text-[12px] text-foreground/40 mt-1">
                    Explore the {component} component
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section for SEO */}
        <section className="mb-12">
          <h2 className={H2}>Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className={H3}>
                How do I customize the {componentName} component?
              </h3>
              <p className={BODY}>
                You can customize the {componentName} component by modifying the Tailwind CSS classes 
                or by passing custom props. All components are built with flexibility in mind.
              </p>
            </div>
            
            <div>
              <h3 className={H3}>
                Is the {componentName} component accessible?
              </h3>
              <p className={BODY}>
                Yes, all components including {componentName} follow WCAG accessibility guidelines 
                and include proper ARIA attributes, keyboard navigation, and screen reader support.
              </p>
            </div>
            
            <div>
              <h3 className={H3}>
                Can I use {componentName} with TypeScript?
              </h3>
              <p className={BODY}>
                Absolutely! All components are built with TypeScript and include full type definitions 
                for better development experience and type safety.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ComponentTemplate