'use client';

import * as React from 'react';
import { useThemeCustomizer } from '@/contexts/theme-customizer-context';
import { cn } from '@/lib/utils';
import { Square } from 'lucide-react';

const RADIUS_OPTIONS = [
  { value: 0, label: '0' },
  { value: 0.3, label: '0.3' },
  { value: 0.5, label: '0.5' },
  { value: 0.75, label: '0.75' },
  { value: 1.0, label: '1.0' },
];

export function RadiusPicker() {
  const { state, setRadius } = useThemeCustomizer();
  const radius = state.radius;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Radius
        </label>
        <div 
          className="w-12 h-6 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 transition-all duration-300"
          style={{ borderRadius: `${radius}rem` }}
          title={`Preview: ${radius}rem`}
        />
      </div>
      
      <div className="flex gap-1.5">
        {RADIUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setRadius(option.value)}
            className={cn(
              "flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
              "border outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
              radius === option.value
                ? "bg-zinc-900 text-zinc-50 border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-sm"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
