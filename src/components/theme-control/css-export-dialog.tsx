'use client';

import * as React from 'react';
import { useThemeCustomizer, type ExportMode } from '@/contexts/theme-customizer-context';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, ClipboardCopy, FileCode2, Moon, Sun, SunMoon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { CodeRenderer } from '@/components/custom/ui/code-renderer';

export function CSSExportDialog() {
  const { generateCSS } = useThemeCustomizer();
  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [exportMode, setExportMode] = React.useState<ExportMode>('both');
  const [cssCode, setCssCode] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setCssCode(generateCSS(exportMode));
    }
  }, [open, exportMode, generateCSS]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="flex items-center gap-2 w-full justify-center h-9 px-4 bg-primary hover:opacity-90 text-primary-foreground rounded-lg text-sm font-medium transition-all shadow-sm cursor-pointer"
        >
          <ClipboardCopy className="w-4 h-4" />
          <span>Copy Code</span>
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] bg-background border border-border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header Section */}
          <div className="flex flex-col p-5 border-b border-border bg-muted/20 gap-4 relative">
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>

            <div className="flex items-start gap-3.5 pr-8">
              {/* Title Left Icon with BG and Border */}
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0 shadow-xs">
                <FileCode2 className="w-5 h-5" />
              </div>

              <div>
                <Dialog.Title className="text-lg font-bold tracking-tight text-foreground">
                  Export Theme Variables
                </Dialog.Title>
                <Dialog.Description className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  Copy and paste this code into your root css file (e.g., <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground border border-border">globals.css</code>).
                </Dialog.Description>
              </div>
            </div>

            {/* Mode Selectors Placed Below Description */}
            <div className="flex items-center gap-2 pt-1">
              <div className="grid grid-cols-3 w-full sm:w-auto p-1 bg-muted/60 dark:bg-black/40 rounded-xl border border-border text-xs font-medium gap-1">
                <button
                  onClick={() => setExportMode('both')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold select-none border border-transparent",
                    exportMode === 'both'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                  )}
                >
                  <SunMoon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Both (Default)</span>
                </button>

                <button
                  onClick={() => setExportMode('light')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold select-none border border-transparent",
                    exportMode === 'light'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                  )}
                >
                  <Sun className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Light Only</span>
                </button>

                <button
                  onClick={() => setExportMode('dark')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold select-none border border-transparent",
                    exportMode === 'dark'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                  )}
                >
                  <Moon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Dark Only</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Code Block Container with Top & Bottom Border */}
          <div className="flex-1 overflow-auto p-4 bg-background text-foreground border-t border-b border-border relative text-xs sm:text-sm font-mono">
            <CodeRenderer code={cssCode} lang="css" />
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end">
            <button
              onClick={copyToClipboard}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm cursor-pointer",
                copied 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "bg-primary hover:opacity-90 text-primary-foreground"
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={copied ? 'check' : 'copy'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
