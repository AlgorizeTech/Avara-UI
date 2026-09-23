"use client";
import { CodeBlocks } from "@/components/custom/ui/codeblocks";
import type { BuiltinLanguage } from "shiki";

import CodeCopy, { type LanguageType } from "./code-copy";
import { ReactIcon } from "@/assets/icons/react";
import { TypeScriptIcon } from "@/assets/icons/typescript";
import { JSXIcon } from "@/assets/icons/jsx";
import { JavaScriptIcon } from "@/assets/icons/javascript";
import type { ReactElement } from "react";
import { useState, useEffect, useRef } from "react";
import { transformTsxToJsx } from "@/lib/tsx-to-jsx-transformer";
import { cn } from "@/lib/utils";

/**
 * Re-skins the shared <CodeBlocks> viewer as the docs code panel: 13px/1.7
 * mono, 20px/16px padding, a faint always-visible copy glyph and a quiet
 * Show More bar. CodeBlocks ships to users through the registry, so its own
 * classes stay untouched and the docs restyle it from the outside — every
 * selector here is anchored on its root (`>div`) so nothing leaks into the
 * highlighted markup. The `.shiki` metrics come from unlayered rules in
 * globals.css, which only an !important utility can override.
 */
export const CODE_SURFACE = cn(
  // Root: the inset panel paints the surface, so CodeBlocks' own fill and
  // top rule go.
  "[&>div]:border-t-0 [&>div]:bg-transparent",
  // Content wrapper padding moves onto the <pre> below.
  "[&>div>div>div]:p-0",
  "[&_.shiki]:!px-5 [&_.shiki]:!py-4 [&_.shiki]:!font-mono [&_.shiki]:!text-[13px] [&_.shiki]:!leading-[1.7]",
  "[&_.shiki-pending]:!px-5 [&_.shiki-pending]:!py-4 [&_.shiki-pending]:!font-mono [&_.shiki-pending]:!text-[13px] [&_.shiki-pending]:!leading-[1.7]",
  // Copy button (the root's only direct <button>): a faint glyph, not a chip.
  "[&>div>button]:top-2.5 [&>div>button]:right-2.5 [&>div>button]:p-1.5 [&>div>button]:border-0 [&>div>button]:bg-transparent [&>div>button]:opacity-100 [&>div>button]:text-foreground/30 [&>div>button]:backdrop-blur-none",
  "[&>div>button:hover]:bg-transparent [&>div>button:hover]:text-foreground/60 [&>div>button_svg]:size-3.5",
  // Show More / Show Less bar (the div after the content) and its pill.
  "[&>div>div+div]:bg-transparent [&>div>div+div]:border-foreground/[0.06] [&>div>div+div]:py-3",
  "[&>div>div+div_button]:h-8 [&>div>div+div_button]:border-0 [&>div>div+div_button]:bg-foreground/[0.04] [&>div>div+div_button]:text-[12px] [&>div>div+div_button]:font-medium [&>div>div+div_button]:text-foreground/70",
  "[&>div>div+div_button:hover]:bg-foreground/10 [&>div>div+div_button:hover]:text-foreground",
);

/**
 * The docs code figure: an ink-tint frame, a 40px bar and an inset
 * `bg-background` panel for the code. Shared by the standalone block below
 * and the MDX `pre` override, so every code sample on the site reads the same.
 */
export function CodeFrame({
  header,
  children,
  className,
}: {
  /** Bar content — a filename, tabs, a switch. Omit for a bar-less panel. */
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "not-prose relative w-full overflow-hidden rounded-xl bg-foreground/[0.03]",
        !header && "pt-1.5",
        className,
      )}
    >
      {header && (
        <div className="flex min-h-10 flex-wrap items-center justify-between gap-x-3 gap-y-1 py-1 pl-5 pr-1.5">
          {header}
        </div>
      )}
      <div className="px-1.5 pb-1.5">
        <div className={cn("overflow-hidden rounded-md bg-background", CODE_SURFACE)}>
          {children}
        </div>
      </div>
    </div>
  );
}

type CodeBlockClientProps = {
  code: string;
  lang: BuiltinLanguage;
  fileName?: string | null;
  /**
   * Supply both to hoist the TS/JS switch into a parent's chrome — the
   * Sandbox draws it in its own header bar, alongside the tab pills. Omit
   * them and this block renders its own header with the switch inside.
   */
  selectedLanguage?: LanguageType;
  onLanguageChange?: (language: LanguageType) => void;
};

/** Source languages the TSX→JSX transformer has types to strip. */
const TRANSFORMABLE_LANGS: BuiltinLanguage[] = ['tsx', 'typescript'];

/** What the code is highlighted as once types are stripped. */
const JS_EQUIVALENT: Partial<Record<string, BuiltinLanguage>> = {
  tsx: 'jsx',
  typescript: 'javascript',
};

/** True for source the TS/JS switch can actually convert. */
export const isTransformable = (lang: BuiltinLanguage): boolean =>
  TRANSFORMABLE_LANGS.includes(lang);

// Function to get the appropriate icon for each language
const getLanguageIcon = (language: string): ReactElement | null => {
  const iconProps = { className: "size-3.5 mr-2 shrink-0" };

  switch (language.toLowerCase()) {
    case 'tsx':
    case 'react':
      return <ReactIcon {...iconProps} />;
    case 'jsx':
      return <JSXIcon {...iconProps} />;
    case 'typescript':
    case 'ts':
      return <TypeScriptIcon {...iconProps} />;
    case 'javascript':
    case 'js':
    case 'mjs':
    case 'cjs':
      return <JavaScriptIcon {...iconProps} />;
    default:
      return null;
  }
};

export const CodeBlockClient = ({
  code,
  lang,
  fileName,
  selectedLanguage: controlledLanguage,
  onLanguageChange,
}: CodeBlockClientProps): ReactElement => {
  // Only source that actually carries types gets the switch — a bash or css
  // snippet has nothing to convert.
  const canToggle = isTransformable(lang);
  const isControlled = controlledLanguage !== undefined;

  // State for language selection and transformed code
  const [ownLanguage, setOwnLanguage] = useState<LanguageType>('tsx');
  const selectedLanguage = controlledLanguage ?? ownLanguage;

  const [transformedCode, setTransformedCode] = useState<string>(code);
  const [displayLang, setDisplayLang] = useState<BuiltinLanguage>(lang);
  const [isTransforming, setIsTransforming] = useState(false);

  // Stripping types runs Babel + Prettier in the browser, so the result is
  // cached and flipping back to JS is instant.
  const jsxCache = useRef<{ source: string; output: string } | null>(null);

  const showJsx = canToggle && selectedLanguage === 'jsx';

  // Transform code when language selection changes
  useEffect(() => {
    if (!showJsx) {
      setTransformedCode(code);
      setDisplayLang(lang);
      setIsTransforming(false);
      return;
    }

    const jsLang = JS_EQUIVALENT[lang] ?? 'jsx';

    if (jsxCache.current?.source === code) {
      setTransformedCode(jsxCache.current.output);
      setDisplayLang(jsLang);
      return;
    }

    // A slow transform must not land after the reader has switched back to TS.
    let cancelled = false;
    setIsTransforming(true);
    transformTsxToJsx(code)
      .then((output) => {
        if (cancelled) return;
        jsxCache.current = { source: code, output };
        setTransformedCode(output);
        setDisplayLang(jsLang);
      })
      .catch((error) => {
        console.warn('TSX → JSX transform failed:', error);
      })
      .finally(() => {
        if (!cancelled) setIsTransforming(false);
      });

    return () => {
      cancelled = true;
    };
  }, [code, lang, showJsx]);

  // Hoisted into the Sandbox header — render the code alone.
  if (isControlled) {
    return <CodeBlocks code={transformedCode} language={displayLang} />;
  }

  // Standalone (an mdx <CodeBlock filePath="..." />): this block owns the
  // header, so the switch has somewhere to live.
  return (
    <CodeFrame
      header={
        <>
          <div className="flex min-w-0 items-center">
            {getLanguageIcon(displayLang)}
            <span className="truncate text-[13px] font-medium text-foreground/60">
              {fileName ?? displayLang}
            </span>
            {isTransforming && (
              <span
                aria-hidden
                className="ml-2 h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-foreground/20 border-t-transparent"
              />
            )}
          </div>

          {canToggle && (
            <CodeCopy
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange ?? setOwnLanguage}
            />
          )}
        </>
      }
    >
      <CodeBlocks code={transformedCode} language={displayLang} />
    </CodeFrame>
  );
};
