import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { createSlug } from './lib/utils';
import { CodeBlock } from './components/ui/code-block';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/site/tabs';
import { Cli } from './components/site/cli';
import { Installation, InstallGroup } from './components/site/installation';
import { AIButton } from './components/site/ai-button';
import { DocLink, MdxLink } from './components/site/doc-link';
import { ForFramework } from './components/site/for-framework';
import { InjectablePropNote } from './components/site/injectable-prop-note';
import { OtherFrameworkGuide } from './components/site/other-framework-guide';
import { RegistryConfig } from './components/site/registry-config';
import {
  PackageManagerTabs as PMTabs,
  PMTabContent,
  NPMTabContent,
  PNPMTabContent,
  YarnTabContent,
  BunTabContent,
} from './components/site/package-manager-tabs';

/** Elements HTML allows inside a <p>, among those MDX prose produces. */
const INLINE_TAGS = new Set([
  'a', 'abbr', 'b', 'br', 'code', 'del', 'em', 'i', 'img', 'kbd',
  'mark', 's', 'small', 'span', 'strong', 'sub', 'sup', 'u',
]);

/**
 * Whether `children` may sit inside a <p>.
 *
 * MDX wraps any line of prose in a paragraph, including a line holding a
 * component that renders a <div> or a <p> — and a <p> around those is invalid
 * HTML that React cannot hydrate. Components not known to be inline count as
 * block, so a doubtful paragraph falls back to a <div> rather than breaking.
 */
function isPhrasing(children: ReactNode, inline: ReadonlySet<unknown>): boolean {
  return Children.toArray(children).every((child) => {
    if (!isValidElement(child)) return true;
    const { type } = child;
    const allowed =
      type === Fragment || (typeof type === 'string' ? INLINE_TAGS.has(type) : inline.has(type));
    return allowed && isPhrasing((child.props as { children?: ReactNode }).children, inline);
  });
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const mapped: MDXComponents = {
    ...components,

    h1: ({ children, ...props }: React.ComponentProps<'h1'>) => {
      const id = createSlug(children?.toString() || '');
      return (
        <h1
          id={id}
          className="font-serif text-2xl font-normal leading-8 text-foreground mb-6 mt-0"
          {...props}
        >
          {children}
        </h1>
      );
    },

    h2: ({ children, ...props }: React.ComponentProps<'h2'>) => {
      const id = createSlug(children?.toString() || '');
      return (
        <h2
          id={id}
          className="font-serif text-2xl font-normal leading-8 text-foreground mb-6 mt-16 first:mt-0"
          {...props}
        >
          {children}
        </h2>
      );
    },

    h3: ({ children, ...props }: React.ComponentProps<'h3'>) => {
      const id = createSlug(children?.toString() || '');
      return (
        <h3 id={id} className="font-serif text-lg font-normal leading-7 text-foreground mb-4 mt-10 first:mt-0" {...props}>
          {children}
        </h3>
      );
    },

    h4: ({ children, ...props }: React.ComponentProps<'h4'>) => {
      const id = createSlug(children?.toString() || '');
      return (
        <h4
          id={id}
          className="font-serif text-[15px] font-normal leading-[1.25] tracking-[-0.01em] text-foreground mb-2 mt-6 first:mt-0"
          {...props}
        >
          {children}
        </h4>
      );
    },

    // A real <p> wherever the HTML allows one, so search engines and screen
    // readers see paragraphs. Lines that hold a block component stay a <div>
    // with the same look (see isPhrasing).
    p: ({ children, ...props }: React.ComponentProps<'p'>) => {
      const className = "mb-6 text-[15px] leading-[1.8] text-foreground/60";
      return isPhrasing(children, inline) ? (
        <p className={className} {...props}>
          {children}
        </p>
      ) : (
        <div className={className} {...props}>
          {children}
        </div>
      );
    },

    ul: ({ children, ...props }: React.ComponentProps<'ul'>) => {
      return (
        <ul className="list-disc list-inside mb-8 space-y-1 text-[15px] leading-[1.8] text-foreground/60" {...props}>
          {children}
        </ul>
      );
    },

    ol: ({ children, ...props }: React.ComponentProps<'ol'>) => {
      return (
        <ol className="list-decimal list-inside mb-8 space-y-1 text-[15px] leading-[1.8] text-foreground/60" {...props}>
          {children}
        </ol>
      );
    },

    li: ({ children, ...props }: React.ComponentProps<'li'>) => {
      return (
        <li className="text-foreground/60" {...props}>
          {children}
        </li>
      );
    },

    blockquote: ({ children, ...props }: React.ComponentProps<'blockquote'>) => {
      return (
        <blockquote
          className="my-6 rounded-xl border border-primary/15 bg-primary/5 p-4 text-[13px] leading-relaxed text-foreground/50 font-normal not-italic [&_p]:before:content-none [&_p]:after:content-none [&_strong]:font-medium [&_strong]:text-primary"
          {...props}
        >
          {children}
        </blockquote>
      );
    },

    code: ({ children, className, ...props }: React.ComponentProps<'code'>) => {
      // If this code element has a language class, it's part of a pre block
      // and will be handled by our CodeBlock component, so return as-is
      if (className?.includes('language-')) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      // Otherwise, it's inline code, so style it appropriately
      return (
        <code
          className="bg-foreground/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono text-foreground/70 whitespace-nowrap"
          {...props}
        >
          {children}
        </code>
      );
    },

    pre: ({ children, className, id, style }: React.ComponentProps<'pre'>) => {
      // Only pass safe props that are compatible with div elements
      return (
        <CodeBlock className={className} id={id} style={style}>
          {children}
        </CodeBlock>
      );
    },

    table: ({ children, ...props }: React.ComponentProps<'table'>) => {
      return (
        <div className="my-6 w-full max-w-full overflow-x-auto lg:overflow-x-hidden bg-transparent [scrollbar-width:thin] cursor-pointer">
          <table
            className="w-full max-w-full min-w-[35rem] lg:min-w-60 table-auto border-collapse rounded-xl border border-foreground/[0.06] bg-foreground/[0.04] text-left text-[13px] cursor-pointer overflow-hidden"
            {...props}
          >
            {children}
          </table>
        </div>
      );
    },

    thead: ({ children, ...props }: React.ComponentProps<'thead'>) => {
      return (
        <thead
          className="bg-transparent border-b border-foreground/[0.06] text-[11px] font-semibold uppercase tracking-[0.06em] text-foreground/60 cursor-pointer"
          {...props}
        >
          {children}
        </thead>
      );
    },

    tbody: ({ children, ...props }: React.ComponentProps<'tbody'>) => {
      return (
        <tbody className="divide-y divide-foreground/[0.08] cursor-pointer" {...props}>
          {children}
        </tbody>
      );
    },

    tr: ({ children, ...props }: React.ComponentProps<'tr'>) => {
      return (
        <tr
          className="hover:bg-foreground/[0.07] transition-colors duration-150 cursor-pointer"
          {...props}
        >
          {children}
        </tr>
      );
    },

    th: ({ children, ...props }: React.ComponentProps<'th'>) => {
      return (
        <th
          className="px-4 py-2.5 text-left text-[11px] font-semibold text-foreground/60 bg-foreground/[0.07] uppercase tracking-[0.06em] border-b border-r border-foreground/[0.06] last:border-r-0 whitespace-normal [overflow-wrap:anywhere] [&_code]:whitespace-normal cursor-pointer"
          {...props}
        >
          {children}
        </th>
      );
    },

    td: ({ children, ...props }: React.ComponentProps<'td'>) => {
      return (
        <td className="px-4 py-2.5 text-[13px] text-foreground/55 border-r border-foreground/[0.06] last:border-r-0 align-top first:font-medium first:text-foreground whitespace-normal [overflow-wrap:anywhere] [&_code]:whitespace-normal cursor-pointer" {...props}>
          {children}
        </td>
      );
    },

    // Routed through MdxLink so a prose link written as
    // `[Hero](/docs/nextjs/hero)` follows the reader's framework instead of
    // dropping them back into the Next.js tree.
    a: MdxLink,

    strong: ({ children, ...props }: React.ComponentProps<'strong'>) => {
      return (
        <strong className="font-semibold text-foreground" {...props}>
          {children}
        </strong>
      );
    },

    em: ({ children, ...props }: React.ComponentProps<'em'>) => {
      return (
        <em className="italic" {...props}>
          {children}
        </em>
      );
    },

    hr: ({ ...props }: React.ComponentProps<'hr'>) => {
      return <hr className="my-10 border-foreground/[0.08]" {...props} />;
    },

    // Strikethrough text (GitHub Flavored Markdown)
    del: ({ children, ...props }: React.ComponentProps<'del'>) => {
      return (
        <del className="line-through opacity-70" {...props}>
          {children}
        </del>
      );
    },

    // Task list checkboxes
    input: ({ type, checked, disabled, ...props }: React.ComponentProps<'input'>) => {
      if (type === 'checkbox') {
        return (
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="mr-2 accent-primary"
            {...props}
          />
        );
      }
      return <input type={type} {...props} />;
    },

    // Keyboard keys
    kbd: ({ children, ...props }: React.ComponentProps<'kbd'>) => {
      return (
        <kbd
          className="inline-flex items-center rounded-md border border-foreground/[0.08] bg-foreground/[0.04] px-1.5 py-0.5 text-[12px] font-mono text-foreground/70"
          {...props}
        >
          {children}
        </kbd>
      );
    },

    // Highlighted text
    mark: ({ children, ...props }: React.ComponentProps<'mark'>) => {
      return (
        <mark className="bg-primary/20 text-foreground px-1 rounded" {...props}>
          {children}
        </mark>
      );
    },

    // Subscript and superscript
    sub: ({ children, ...props }: React.ComponentProps<'sub'>) => {
      return (
        <sub className="text-xs" {...props}>
          {children}
        </sub>
      );
    },

    sup: ({ children, ...props }: React.ComponentProps<'sup'>) => {
      return (
        <sup className="text-xs" {...props}>
          {children}
        </sup>
      );
    },

    // Custom components
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Cli,
    Installation,
    InstallGroup,
    AI: AIButton,
    DocLink,
    ForFramework,
    InjectablePropNote,
    OtherFrameworkGuide,
    RegistryConfig,
    PMTabs,
    PMTabContent,
    NPMTabContent,
    PNPMTabContent,
    YarnTabContent,
    BunTabContent,
  };

  // The mapped components that render phrasing content, so a paragraph made of
  // them can be a real <p>.
  const inline = new Set<unknown>([
    mapped.a,
    mapped.code,
    mapped.strong,
    mapped.em,
    mapped.del,
    mapped.kbd,
    mapped.mark,
    mapped.sub,
    mapped.sup,
    DocLink,
  ]);

  return mapped;
}