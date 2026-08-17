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
  const iconProps = { className: "w-4 h-4 mr-2" };

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
    <div className="not-prose relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex min-w-0 items-center">
          {getLanguageIcon(displayLang)}
          <span className="truncate text-xs font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {fileName ?? displayLang}
          </span>
          {isTransforming && (
            <span
              aria-hidden
              className="ml-2 h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-zinc-300 dark:border-zinc-600 border-t-transparent"
            />
          )}
        </div>

        {canToggle && (
          <CodeCopy
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange ?? setOwnLanguage}
          />
        )}
      </div>

      <CodeBlocks code={transformedCode} language={displayLang} />
    </div>
  );
};
