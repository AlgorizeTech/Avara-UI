'use client';

import React from 'react';

interface MdxTableProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'bordered';
  responsive?: boolean;
  striped?: boolean;
}

export function MdxTable({
  children,
  className = '',
  variant = 'default',
  responsive = true,
  striped = false,
}: MdxTableProps) {
  // Extract text content from React children
  const extractTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (typeof children === 'number') {
      return children.toString();
    }
    if (React.isValidElement(children)) {
      return extractTextFromChildren((children.props as { children?: React.ReactNode }).children);
    }
    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join('');
    }
    return '';
  };

  // Enhanced markdown table detection and parsing
  const parseMarkdownTable = (markdown: string) => {
    // Clean and normalize the input
    const normalizedText = markdown
      .replace(/\r\n/g, '\n') // Normalize line endings
      .replace(/\r/g, '\n')
      .trim();

    if (!normalizedText) return { headers: [], rows: [], alignments: [] };

    const lines = normalizedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // More robust table detection
    const tableLines = lines.filter(line => {
      // Must contain at least one pipe and not be just pipes/spaces/dashes
      return line.includes('|') && /[^\s\-|]/.test(line);
    });

    if (tableLines.length < 2) return { headers: [], rows: [], alignments: [] };

    // Find potential separator line (contains dashes and pipes)
    let separatorIndex = -1;
    let headerLine = '';

    for (let i = 0; i < tableLines.length; i++) {
      const line = tableLines[i];
      // Separator line: contains dashes, pipes, colons, and spaces only
      if (/^[\s\-:|]+$/.test(line) && line.includes('-')) {
        separatorIndex = i;
        if (i > 0) {
          headerLine = tableLines[i - 1];
        }
        break;
      }
    }

    // If no separator found, try to detect table structure differently
    if (separatorIndex === -1 || !headerLine) {
      // Look for consistent pipe patterns
      const potentialHeaders = tableLines.filter(
        line => line.split('|').length > 2 && !line.match(/^\s*\|[\s\-:|]*\|\s*$/)
      );

      if (potentialHeaders.length === 0) return { headers: [], rows: [], alignments: [] };

      headerLine = potentialHeaders[0];
      separatorIndex = tableLines.indexOf(headerLine);
    }

    // Parse headers
    const parseTableRow = (line: string): string[] => {
      // Remove leading/trailing pipes and split
      const cleaned = line.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
      return cleaned
        .split('|')
        .map(cell => cell.trim())
        .filter((cell, index, arr) => {
          // Keep all cells, even empty ones in the middle
          return index < arr.length;
        });
    };

    const headers = parseTableRow(headerLine);

    if (headers.length === 0) return { headers: [], rows: [], alignments: [] };

    // Parse alignment from separator line if it exists
    const alignments: ('left' | 'center' | 'right')[] = [];
    if (separatorIndex >= 0 && separatorIndex < tableLines.length) {
      const separatorLine = tableLines[separatorIndex];
      const alignCells = parseTableRow(separatorLine);

      alignCells.forEach(cell => {
        const trimmed = cell.trim();
        if (trimmed.startsWith(':') && trimmed.endsWith(':')) {
          alignments.push('center');
        } else if (trimmed.endsWith(':')) {
          alignments.push('right');
        } else {
          alignments.push('left');
        }
      });
    }

    // Ensure alignments match header count
    while (alignments.length < headers.length) {
      alignments.push('left');
    }

    // Parse data rows (skip header and separator)
    const dataLines = tableLines.filter((line, index) => {
      const isHeader = line === headerLine;
      const isSeparator = index === separatorIndex;
      const isValidDataRow =
        !isHeader && !isSeparator && /[^\s\-:|]/.test(line) && line.includes('|');
      return isValidDataRow;
    });

    const rows = dataLines.map(line => {
      const cells = parseTableRow(line);

      // Normalize row length to match headers
      const normalizedCells = [...cells];
      while (normalizedCells.length < headers.length) {
        normalizedCells.push('');
      }

      return normalizedCells.slice(0, headers.length);
    });

    return { headers, rows, alignments };
  };

  const markdownText = extractTextFromChildren(children);
  const { headers, rows, alignments } = parseMarkdownTable(markdownText);

  const getVariantStyles = () => {
    // `[overflow-x:auto]`, not the bare `overflow-x-auto` class: globals.css
    // restyles that class name with !important table-wrapper rules.
    const baseContainer = responsive ? '[overflow-x:auto]' : '';
    // Shared by every variant: the docs table type scale on the ink ladder.
    const th =
      'px-3 py-2 lg:px-4 lg:py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-foreground/60';
    const td = 'px-3 py-2 lg:px-4 lg:py-2.5 text-[13px] text-foreground/55 align-baseline';

    switch (variant) {
      case 'minimal':
        return {
          container: `my-6 ${baseContainer}`,
          table: 'w-full border-collapse',
          thead: 'border-b border-foreground/[0.08]',
          th,
          tbody: '',
          tr: 'border-b border-foreground/[0.06] hover:bg-foreground/[0.04] transition-colors last:border-b-0',
          td,
        };
      case 'bordered':
        return {
          container: `my-6 ${baseContainer}`,
          table:
            'w-full border-collapse border border-foreground/[0.06] rounded-xl overflow-hidden bg-foreground/[0.05]',
          thead: 'bg-foreground/[0.07] border-b border-foreground/[0.06]',
          th: `${th} border-r border-foreground/[0.06] last:border-r-0`,
          tbody: '',
          tr: 'border-b border-foreground/[0.08] hover:bg-foreground/[0.07] transition-colors last:border-b-0',
          td: `${td} border-r border-foreground/[0.06] last:border-r-0`,
        };
      default:
        return {
          container: `my-8 ${baseContainer} not-prose rounded-xl border border-foreground/[0.06] bg-foreground/[0.05]`,
          table: 'w-full border-collapse',
          thead: 'bg-foreground/[0.07] border-b border-foreground/[0.06]',
          th: `${th} border-l border-foreground/[0.06] first:border-l-0`,
          tbody: '',
          tr: 'border-b border-foreground/[0.08] hover:bg-foreground/[0.07] transition-colors last:border-b-0',
          td,
        };
    }
  };

  const styles = getVariantStyles();

  // Helper function to get text alignment class
  const getAlignmentClass = (alignment: 'left' | 'center' | 'right') => {
    switch (alignment) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  // Enhanced cell content rendering with comprehensive markdown support
  const renderCellContent = (content: string) => {
    if (!content || content.trim() === '') {
      return <span className="font-mono text-[12px] text-foreground/40">–</span>;
    }

    const processedContent = content.trim();
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    // Combined regex for all markdown patterns
    const markdownRegex =
      /(`[^`]*`|\*\*[^*]+\*\*|__[^_]+__|(?<!\*)\*[^*]+\*(?!\*)|(?<!_)_[^_]+_(?!_)|\[([^\]]+)\]\(([^)]+)\)|~~[^~]+~~)/g;

    let match;
    while ((match = markdownRegex.exec(processedContent)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        elements.push(processedContent.slice(currentIndex, match.index));
      }

      const matchedText = match[0];

      // Handle inline code
      if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
        const codeContent = matchedText.slice(1, -1);
        elements.push(
          // Plain monospace, not a chip. A span, not <code>: globals.css
          // restyles every <code> in a table cell.
          <span
            key={match.index}
            className="font-mono text-[12px] leading-[1.55] text-foreground/80"
          >
            {codeContent}
          </span>
        );
      }
      // Handle bold text (**text** or __text__)
      else if (
        (matchedText.startsWith('**') && matchedText.endsWith('**')) ||
        (matchedText.startsWith('__') && matchedText.endsWith('__'))
      ) {
        const boldContent = matchedText.slice(2, -2);
        elements.push(
          <strong key={match.index} className="font-semibold text-foreground">
            {boldContent}
          </strong>
        );
      }
      // Handle italic text (*text* or _text_)
      else if (
        (matchedText.startsWith('*') && matchedText.endsWith('*') && !matchedText.includes('**')) ||
        (matchedText.startsWith('_') && matchedText.endsWith('_') && !matchedText.includes('__'))
      ) {
        const italicContent = matchedText.slice(1, -1);
        elements.push(
          <em key={match.index} className="italic">
            {italicContent}
          </em>
        );
      }
      // Handle strikethrough (~~text~~)
      else if (matchedText.startsWith('~~') && matchedText.endsWith('~~')) {
        const strikeContent = matchedText.slice(2, -2);
        elements.push(
          <span key={match.index} className="line-through text-foreground/40">
            {strikeContent}
          </span>
        );
      }
      // Handle links [text](url)
      else if (matchedText.includes('[') && matchedText.includes('](')) {
        const linkMatch = matchedText.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          elements.push(
            <a
              key={match.index}
              href={linkMatch[2]}
              className="text-primary hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkMatch[1]}
            </a>
          );
        }
      }

      currentIndex = match.index + matchedText.length;
    }

    // Add remaining text
    if (currentIndex < processedContent.length) {
      elements.push(processedContent.slice(currentIndex));
    }

    // If no markdown was found, handle special cases
    if (elements.length === 0) {
      // Handle special characters and symbols
      if (processedContent === '-' || processedContent === '—') {
        return <span className="font-mono text-[12px] text-foreground/40">–</span>;
      }

      // Handle checkboxes and status indicators
      if (['✓', '✔', '✅', 'true', 'yes', 'Y'].includes(processedContent)) {
        return <span className="text-green-600 dark:text-green-400">✓</span>;
      }
      if (['✗', '✘', '❌', 'false', 'no', 'N'].includes(processedContent)) {
        return <span className="text-red-600 dark:text-red-400">✗</span>;
      }

      // Handle badges/tags (text in square brackets)
      if (
        processedContent.startsWith('[') &&
        processedContent.endsWith(']') &&
        !processedContent.includes('](')
      ) {
        const badgeContent = processedContent.slice(1, -1);
        return (
          <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {badgeContent}
          </span>
        );
      }

      // Handle numbers (add monospace for better alignment)
      if (/^\d+(\.\d+)?%?$/.test(processedContent)) {
        return <span className="font-mono tabular-nums">{processedContent}</span>;
      }

      // Handle version numbers
      if (/^v?\d+\.\d+(\.\d+)?(-\w+)?$/.test(processedContent)) {
        return <span className="font-mono text-[12px]">{processedContent}</span>;
      }

      return processedContent;
    }

    return <>{elements}</>;
  };

  if (headers.length === 0) {
    return <div className="text-[13px] text-destructive">Invalid table format</div>;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`${styles.th} ${getAlignmentClass(alignments[index] || 'left')}`}
              >
                {renderCellContent(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${styles.tr} ${
                striped && rowIndex % 2 === 1 ? 'bg-foreground/[0.03]' : ''
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`${styles.td} ${getAlignmentClass(alignments[cellIndex] || 'left')}`}
                >
                  {renderCellContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
