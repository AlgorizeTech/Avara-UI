'use client';

import * as React from 'react';
import { useThemeCustomizer } from '@/contexts/theme-customizer-context';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, ClipboardCopy, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function CSSExportDialog() {
  const { generateCSS } = useThemeCustomizer();
  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [cssCode, setCssCode] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setCssCode(generateCSS());
    }
  }, [open, generateCSS]);

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
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
            <div>
              <Dialog.Title className="text-lg font-semibold text-foreground">
                Theme CSS
              </Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground mt-1">
                Copy and paste this code into your root css file (e.g., globals.css).
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          
          <div className="flex-1 overflow-auto p-5 bg-zinc-950 text-zinc-50 relative">
            <pre className="text-[13px] leading-relaxed font-mono whitespace-pre-wrap">
              <code>{cssCode}</code>
            </pre>
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
