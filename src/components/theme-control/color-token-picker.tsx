'use client';

import * as React from 'react';
import { useThemeCustomizer } from '@/contexts/theme-customizer-context';
import { oklchToHex, hexToOklch, isValidHex } from '@/lib/color-utils';
import type { ColorToken } from '@/lib/theme-presets';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Palette } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ColorTokenPickerProps {
  token: ColorToken;
  mode: 'light' | 'dark';
  label?: string;
}

export function ColorTokenPicker({ token, mode, label }: ColorTokenPickerProps) {
  const { getColorToken, setColorToken } = useThemeCustomizer();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const currentValue = getColorToken(mode, token);
  
  // Use a fallback for initial render if currentValue is not yet available
  const [localHex, setLocalHex] = React.useState('#000000');
  
  React.useEffect(() => {
    if (currentValue) {
      setLocalHex(oklchToHex(currentValue));
    }
  }, [currentValue]);

  const [popoverPos, setPopoverPos] = React.useState({ top: 0, left: 0, width: 220 });
  
  const updatePosition = React.useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const popoverWidth = 220;
      
      let left = rect.right - popoverWidth;
      // Prevent going off left edge
      if (left < 10) left = 10;
      
      setPopoverPos({
        top: rect.bottom + window.scrollY + 8,
        left: left,
        width: popoverWidth
      });
    }
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isOutsideContainer = containerRef.current && !containerRef.current.contains(target);
      const isOutsidePopover = popoverRef.current && !popoverRef.current.contains(target);
      
      if (isOutsideContainer && isOutsidePopover) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalHex(value);
    
    if (isValidHex(value)) {
      setColorToken(mode, token, hexToOklch(value));
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalHex(value);
    setColorToken(mode, token, hexToOklch(value));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  return (
    <div className="relative flex items-center justify-between gap-3 py-1.5" ref={containerRef}>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 capitalize truncate">
        {label || token.replace('-', ' ')}
      </span>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        aria-expanded={isOpen}
      >
        <span 
          className="w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm"
          style={{ backgroundColor: localHex }}
        />
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 w-[52px] text-left">
          {localHex.toUpperCase()}
        </span>
      </button>

      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="absolute z-[9999]" style={{ top: popoverPos.top, left: popoverPos.left, width: popoverPos.width }}>
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="w-full p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl shadow-zinc-200/20 dark:shadow-black/40"
                onKeyDown={handleKeyDown}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Edit Color</span>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-mono">#</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={localHex.replace('#', '')}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '');
                          handleHexChange({ ...e, target: { ...e.target, value: `#${val}` } } as any);
                        }}
                        maxLength={6}
                        className="w-full pl-6 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm font-mono text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
                      />
                    </div>
                    
                    <div className="relative w-8 h-8 rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0 cursor-pointer">
                      <input
                        type="color"
                        value={localHex}
                        onChange={handleColorPickerChange}
                        className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer opacity-0"
                      />
                      <div 
                        className="w-full h-full pointer-events-none"
                        style={{ backgroundColor: localHex }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
