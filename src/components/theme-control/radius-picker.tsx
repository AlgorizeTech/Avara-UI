'use client';

import * as React from 'react';
import { useThemeCustomizer } from '@/contexts/theme-customizer-context';
import { cn } from '@/lib/utils';

const RADIUS_OPTIONS = [
  { value: 0, label: '0' },
  { value: 0.3, label: '0.3' },
  { value: 0.5, label: '0.5' },
  { value: 0.75, label: '0.75' },
  { value: 1.0, label: '1.0' },
];

export function RadiusPicker() {
  const { state, setRadius, hydrated } = useThemeCustomizer();
  const radius = state.radius;
  const [inputValue, setInputValue] = React.useState<string>(String(radius));

  React.useEffect(() => {
    setInputValue(String(radius));
  }, [radius]);

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    setInputValue(valStr);
    const parsed = parseFloat(valStr);
    if (!isNaN(parsed) && parsed >= 0) {
      setRadius(parsed);
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Title + Custom Radius Input */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/35">
          Radius
        </span>
        <input
          type="number"
          step="0.05"
          min="0"
          max="5"
          value={inputValue}
          onChange={handleCustomInputChange}
          className="w-12 h-7 text-[12px] tabular-nums text-center rounded-md border border-foreground/10 bg-foreground/[0.03] text-foreground/50 focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          title="Custom radius value"
        />
      </div>

      {/* Preset buttons */}
      <div className="flex gap-1.5">
        {RADIUS_OPTIONS.map((option) => {
          const isActive = hydrated && radius === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setRadius(option.value)}
              className={cn(
                "flex-1 py-1.5 text-[12px] font-medium tabular-nums rounded-lg transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "bg-foreground/[0.05] text-foreground/40 hover:text-foreground/70"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
