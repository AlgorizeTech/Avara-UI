"use client";
import { CodeBlocks } from "@/components/custom/ui/codeblocks";
import { CodeRenderer } from "./code-renderer";
import type { BuiltinLanguage } from "shiki";

import { cn } from "@/lib/utils";
import CodeCopy from "./code-copy";
import { ReactIcon } from "@/assets/icons/react";
import { TypeScriptIcon } from "@/assets/icons/typescript";
import { JSXIcon } from "@/assets/icons/jsx";
import { JavaScriptIcon } from "@/assets/icons/javascript";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { transformTsxToJsx } from "@/lib/tsx-to-jsx-transformer";

type LanguageType = 'tsx' | 'jsx';

type CodeBlockClientProps = {
  code: string;
  lang: BuiltinLanguage;
  fileName?: string | null;
};

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
}: CodeBlockClientProps): ReactElement => {
  // State for language selection and transformed code
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('tsx');
  const [transformedCode, setTransformedCode] = useState<string>(code);
  const [displayLang, setDisplayLang] = useState<BuiltinLanguage>(lang);

  // Transform code when language selection changes
  useEffect(() => {
    const transformCode = async () => {
      if (selectedLanguage === 'jsx') {
        const transformed = await transformTsxToJsx(code);
        setTransformedCode(transformed);
        setDisplayLang('jsx');
      } else {
        setTransformedCode(code);
        setDisplayLang(lang);
      }
    };

    transformCode();
  }, [code, selectedLanguage, lang]);

  return <CodeBlocks code={transformedCode} language={displayLang} />;
};
