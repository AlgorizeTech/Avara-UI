'use client';

import React from 'react';

interface VitePressTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}

export function VitePressTable({ headers, rows, className = "" }: VitePressTableProps) {
  return (
    <div className={`my-6 overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {headers.map((header, index) => (
              <th 
                key={index} 
                className="px-4 py-3 text-left text-sm font-semibold text-foreground border-r border-border last:border-r-0"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="border-b border-border hover:bg-muted/50 transition-colors duration-150"
            >
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className="px-4 py-3 text-sm text-foreground/80 border-r border-border last:border-r-0"
                >
                  {typeof cell === 'string' ? (
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                      {cell}
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Alternative component for inline markdown tables with VitePress styling
export function VitePressMarkdownTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <div className="vitepress-table">
        {children}
      </div>
    </div>
  );
}
