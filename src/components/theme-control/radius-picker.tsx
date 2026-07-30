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
  const { state, setRadius } = useThemeCustomizer();
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
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Radius
        </span>
        <input
          type="number"
          step="0.05"
          min="0"
          max="5"
          value={inputValue}
          onChange={handleCustomInputChange}
          className="w-12 h-7 text-xs font-medium text-center rounded-md border border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          title="Custom radius value"
        />
      </div>

      {/* Preset buttons */}
      <div className="flex gap-1.5">
        {RADIUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setRadius(option.value)}
            className={cn(
              "flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer border outline-none focus-visible:ring-2 focus-visible:ring-ring",
              radius === option.value
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
