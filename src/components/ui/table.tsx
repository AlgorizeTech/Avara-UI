import React from 'react';

interface TableProps {
  headers: string[];
  rows: string[][];
  className?: string;
  variant?: 'default' | 'striped' | 'bordered' | 'minimal';
}

export function Table({ headers, rows, className = "", variant = 'default' }: TableProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'striped':
        return {
          table: "w-full border-collapse rounded-xl overflow-hidden shadow-lg bg-card",
          thead: "bg-primary text-primary-foreground",
          th: "px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider",
          tbody: "divide-y divide-border",
          tr: "even:bg-muted/50 hover:bg-primary/5 transition-all duration-200",
          td: "px-6 py-4 text-sm text-foreground"
        };
      case 'bordered':
        return {
          table: "w-full border-collapse border-2 border-border rounded-lg overflow-hidden shadow-md",
          thead: "bg-muted border-b-2 border-border",
          th: "border-r border-border px-6 py-3 text-left text-xs font-semibold text-foreground/80 uppercase tracking-wider last:border-r-0",
          tbody: "bg-card",
          tr: "border-b border-border hover:bg-muted transition-colors",
          td: "border-r border-border px-6 py-4 text-sm text-foreground last:border-r-0"
        };
      case 'minimal':
        return {
          table: "w-full border-collapse",
          thead: "border-b-2 border-border",
          th: "px-4 py-3 text-left text-sm font-semibold text-foreground",
          tbody: "",
          tr: "border-b border-border hover:bg-muted/50 transition-colors",
          td: "px-4 py-3 text-sm text-foreground/80"
        };
      default:
        return {
          table: "w-full border-collapse rounded-lg overflow-hidden shadow-sm border border-border bg-card",
          thead: "bg-muted",
          th: "px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border",
          tbody: "divide-y divide-border",
          tr: "hover:bg-muted/50 transition-all duration-150 hover:shadow-sm",
          td: "px-6 py-4 text-sm text-foreground"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`my-8 w-full overflow-x-auto ${className}`}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.td}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Enhanced markdown-style table component
interface MarkdownTableProps {
  children: React.ReactNode;
  variant?: 'default' | 'striped' | 'bordered' | 'minimal';
}

export function MarkdownTable({ children, variant = 'default' }: MarkdownTableProps) {
  const getTableStyles = () => {
    switch (variant) {
      case 'striped':
        return "w-full border-collapse rounded-xl overflow-hidden shadow-lg bg-card";
      case 'bordered':
        return "w-full border-collapse border-2 border-border rounded-lg overflow-hidden shadow-md";
      case 'minimal':
        return "w-full border-collapse";
      default:
        return "w-full border-collapse rounded-lg overflow-hidden shadow-sm border border-border bg-card";
    }
  };

  return (
    <div className="my-8 w-full overflow-x-auto">
      <table className={getTableStyles()}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getHeadStyles = () => {
    switch (variant) {
      case 'striped':
        return "bg-primary text-primary-foreground";
      case 'bordered':
        return "bg-muted border-b-2 border-border";
      case 'minimal':
        return "border-b-2 border-border";
      default:
        return "bg-muted";
    }
  };

  return (
    <thead className={getHeadStyles()}>
      {children}
    </thead>
  );
}

export function TableBody({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getBodyStyles = () => {
    switch (variant) {
      case 'striped':
        return "divide-y divide-border";
      case 'bordered':
        return "bg-card";
      case 'minimal':
        return "";
      default:
        return "divide-y divide-border";
    }
  };

  return (
    <tbody className={getBodyStyles()}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getRowStyles = () => {
    switch (variant) {
      case 'striped':
        return "even:bg-muted/50 hover:bg-primary/5 transition-all duration-200";
      case 'bordered':
        return "border-b border-border hover:bg-muted transition-colors";
      case 'minimal':
        return "border-b border-border hover:bg-muted/50 transition-colors";
      default:
        return "hover:bg-muted/50 transition-all duration-150 hover:shadow-sm";
    }
  };

  return (
    <tr className={getRowStyles()}>
      {children}
    </tr>
  );
}

export function TableHeader({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getHeaderStyles = () => {
    switch (variant) {
      case 'striped':
        return "px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider";
      case 'bordered':
        return "border-r border-border px-6 py-3 text-left text-xs font-semibold text-foreground/80 uppercase tracking-wider last:border-r-0";
      case 'minimal':
        return "px-4 py-3 text-left text-sm font-semibold text-foreground";
      default:
        return "px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border";
    }
  };

  return (
    <th className={getHeaderStyles()}>
      {children}
    </th>
  );
}

export function TableCell({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getCellStyles = () => {
    switch (variant) {
      case 'striped':
        return "px-6 py-4 text-sm text-foreground";
      case 'bordered':
        return "border-r border-border px-6 py-4 text-sm text-foreground last:border-r-0";
      case 'minimal':
        return "px-4 py-3 text-sm text-foreground/80";
      default:
        return "px-6 py-4 text-sm text-foreground";
    }
  };

  return (
    <td className={getCellStyles()}>
      {children}
    </td>
  );
}

// Status badge component for tables
export function StatusBadge({ status, children }: { status: 'success' | 'warning' | 'error' | 'info'; children: React.ReactNode }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case 'warning':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case 'error':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case 'info':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {children}
    </span>
  );
}
