"use client";

import { useState, useEffect, isValidElement, ReactElement } from "react";
import { CodeBlocks } from "@/components/custom/ui/codeblocks";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CodeElementProps {
  className?: string;
  children?: React.ReactNode;
}

const normalizeLanguage = (lang: string): string => {
  const normalized = lang.toLowerCase().trim();

  const aliases: Record<string, string> = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'sh': 'bash',
    'shell': 'bash',
    'zsh': 'bash',
    'fish': 'bash',
    'powershell': 'powershell',
    'ps1': 'powershell',
    'cmd': 'batch',
    'bat': 'batch',
    'yml': 'yaml',
    'md': 'markdown',
    'mdx': 'markdown',
    'rb': 'ruby',
    'rs': 'rust',
    'kt': 'kotlin',
    'cs': 'csharp',
    'cpp': 'cpp',
    'c++': 'cpp',
    'cxx': 'cpp',
    'cc': 'cpp',
    'hpp': 'cpp',
    'hxx': 'cpp',
    'h': 'c',
    'php': 'php',
    'go': 'go',
    'java': 'java',
    'scala': 'scala',
    'swift': 'swift',
    'dart': 'dart',
    'sql': 'sql',
    'mysql': 'sql',
    'postgresql': 'sql',
    'sqlite': 'sql',
    'toml': 'toml',
    'xml': 'xml',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'stylus': 'stylus',
    'json': 'json',
    'jsonc': 'jsonc',
    'json5': 'json5',
    'vue': 'vue',
    'svelte': 'svelte',
    'astro': 'astro',
    'dockerfile': 'dockerfile',
    'docker': 'dockerfile',
    'makefile': 'makefile',
    'make': 'makefile',
    'nginx': 'nginx',
    'apache': 'apache',
    'ini': 'ini',
    'cfg': 'ini',
    'conf': 'ini',
    'env': 'dotenv',
    'gitignore': 'gitignore',
    'ignore': 'gitignore',
    'diff': 'diff',
    'patch': 'diff',
    'log': 'log',
    'txt': 'text',
    'text': 'text',
    'plain': 'text',
  };

  return aliases[normalized] || normalized;
};

export function CodeBlock({ children }: CodeBlockProps) {
  const [rawCode, setRawCode] = useState<string>("");
  const [detectedLanguage, setDetectedLanguage] = useState<string>("tsx");

  // Extract raw text and language from MDX pre/code children
  useEffect(() => {
    let code = "";
    let language = "tsx";

    if (isValidElement(children) && children.props) {
      const codeElement = children as ReactElement<CodeElementProps>;

      if (codeElement.props.className) {
        const match = codeElement.props.className.match(/language-(\w+)/);
        if (match) {
          language = normalizeLanguage(match[1]);
        }
      }

      if (typeof codeElement.props.children === "string") {
        code = codeElement.props.children;
      } else if (codeElement.props.children) {
        const extractText = (node: React.ReactNode): string => {
          if (typeof node === "string") return node;
          if (Array.isArray(node)) return node.map(extractText).join("");
          if (isValidElement(node) && node.props && typeof node.props === 'object' && 'children' in node.props) {
            return extractText((node.props as { children: React.ReactNode }).children);
          }
          return "";
        };
        code = extractText(codeElement.props.children);
      }
    } else if (typeof children === "string") {
      code = children;
    }

    setRawCode(code.trim());
    setDetectedLanguage(language);
  }, [children]);

  if (!rawCode) return null;

  // Direct 100% component reuse of CodeBlocks
  return <CodeBlocks code={rawCode} language={detectedLanguage} />;
}
