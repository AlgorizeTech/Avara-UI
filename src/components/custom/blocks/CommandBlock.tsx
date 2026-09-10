"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// ==========================================
// 1. CONTEXT
// ==========================================
interface CommandContextType {
  /** When false the caller owns filtering and every item stays visible. */
  shouldFilter: boolean;
  search: string;
  setSearch: (search: string) => void;
  /**
   * The command root node itself, held in state rather than a ref. A ref shared
   * through context makes every read of this context a ref read during render.
   */
  command: HTMLDivElement | null;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

function useCommand() {
  const context = useContext(CommandContext);
  if (!context)
    throw new Error("Command components must be used within a <Command> root.");
  return context;
}

// ==========================================
// 2. ROOT COMPONENT
// ==========================================
export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  shouldFilter?: boolean;
}

export function Command({
  className,
  shouldFilter = true,
  children,
  ...props
}: CommandProps) {
  const [search, setSearch] = useState("");
  const [command, setCommand] = useState<HTMLDivElement | null>(null);

  // High-performance DOM-based keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const node = command;
      if (!node) return;

      const items = Array.from(
        node.querySelectorAll('[cmdk-item="true"]:not([hidden])'),
      ) as HTMLElement[];
      if (!items.length) return;

      const currentIndex = items.findIndex(
        (item) => item.getAttribute("data-selected") === "true",
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex =
          currentIndex + 1 < items.length ? currentIndex + 1 : 0;
        items.forEach((i) => i.removeAttribute("data-selected"));
        items[nextIndex].setAttribute("data-selected", "true");
        items[nextIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextIndex =
          currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
        items.forEach((i) => i.removeAttribute("data-selected"));
        items[nextIndex].setAttribute("data-selected", "true");
        items[nextIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentIndex !== -1) items[currentIndex].click();
      }
    };

    command?.addEventListener("keydown", handleKeyDown);
    return () => command?.removeEventListener("keydown", handleKeyDown);
  }, [command]);

  // Auto-select the first visible item when search changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const node = command;
      if (!node) return;
      const items = Array.from(
        node.querySelectorAll('[cmdk-item="true"]:not([hidden])'),
      ) as HTMLElement[];
      items.forEach((i) => i.removeAttribute("data-selected"));
      if (items.length > 0) items[0].setAttribute("data-selected", "true");
    }, 0);
    return () => clearTimeout(timer);
  }, [search, command]);

  return (
    <CommandContext.Provider value={{ search, setSearch, command, shouldFilter }}>
      <div
        ref={setCommand}
        cmdk-root="true"
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-xl bg-white dark:bg-[#050505] text-foreground border border-border shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
}

// ==========================================
// 3. DIALOG WRAPPER
// ==========================================
export interface CommandDialogProps extends CommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandDialog({
  open,
  onOpenChange,
  children,
  className,
  ...props
}: CommandDialogProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  // Resolves the document this dialog actually lives in, which is not always
  // the global one — previews portal components into an iframe. Resolving in a
  // callback ref rather than reading a ref during render keeps render pure, and
  // a null target doubles as the "not mounted yet" signal that guards SSR.
  const setAnchor = useCallback((node: HTMLSpanElement | null) => {
    setPortalTarget(node ? node.ownerDocument.body : null);
  }, []);

  useEffect(() => {
    const doc = portalTarget?.ownerDocument ?? document;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) doc.addEventListener("keydown", handleEscape);
    return () => doc.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange, portalTarget]);

  if (!portalTarget || !open) return <span ref={setAnchor} hidden />;

  return (
    <>
      <span ref={setAnchor} hidden />
      {createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-zinc-950/50 dark:bg-zinc-950/80 backdrop-blur-sm">
          <div
            className="fixed inset-0 z-40"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />
          <div className="z-50 w-full max-w-xl animate-in fade-in zoom-in-95 slide-in-from-top-[10%] duration-200 px-4 sm:px-0">
            <Command
              className={cn(
                "shadow-2xl h-auto border-none ring-1 ring-zinc-200 dark:ring-zinc-800",
                className,
              )}
              {...props}
            >
              {children}
            </Command>
          </div>
        </div>,
        portalTarget,
      )}
    </>
  );
}

// ==========================================
// 4. SUB-COMPONENTS
// ==========================================
export function CommandInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { search, setSearch } = useCommand();

  return (
    <div
      className="flex items-center border-b border-border px-3"
      cmdk-input-wrapper=""
    >
      <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden p-1",
        className,
      )}
      cmdk-list="true"
      role="listbox"
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandEmpty({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { search, command } = useCommand();
  const [hasResults, setHasResults] = useState(true);

  useEffect(() => {
    // Slight delay to allow items to apply their hidden attributes based on search
    const timer = setTimeout(() => {
      if (!command) return;
      const visibleItems = command.querySelectorAll(
        '[cmdk-item="true"]:not([hidden])',
      );
      setHasResults(visibleItems.length > 0);
    }, 10);
    return () => clearTimeout(timer);
  }, [search, command]);

  if (hasResults) return null;

  return (
    <div
      className={cn("py-6 text-center text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandGroup({
  heading,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { heading?: string }) {
  return (
    <div
      cmdk-group="true"
      className={cn(
        "overflow-hidden p-1 text-foreground",
        // Magic CSS: Hide group if it contains no visible items
        "hidden [&:has([cmdk-item=true]:not([hidden]))]:block",
        className,
      )}
      {...props}
    >
      {heading && (
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

export function CommandSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("-mx-1 h-px bg-muted", className)}
      {...props}
    />
  );
}

export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value?: string;
  onSelect?: (value: string) => void;
}

/**
 * Flattens a node tree to its text. Filtering used to read
 * `itemRef.current.textContent` during render, which is empty on the first pass
 * — an item could not match a search until something re-rendered it.
 */
function textFromChildren(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromChildren).join("");
  if (React.isValidElement(node)) {
    return textFromChildren(
      (node.props as { children?: React.ReactNode }).children,
    );
  }
  return "";
}

export function CommandItem({
  className,
  value,
  onSelect,
  children,
  ...props
}: CommandItemProps) {
  const { search, command, shouldFilter } = useCommand();
  const itemRef = useRef<HTMLDivElement>(null);

  // Extract text content for fuzzy matching if no explicit value is provided
  const textValue = value || textFromChildren(children);
  // With `shouldFilter={false}` the caller owns the list and every item
  // stays visible, however the query reads.
  const isMatch =
    !shouldFilter ||
    !search ||
    textValue.toLowerCase().includes(search.toLowerCase());

  const handleSelect = () => {
    if (onSelect) onSelect(textValue);
  };

  const handleMouseEnter = () => {
    if (!command) return;
    const items = command.querySelectorAll('[cmdk-item="true"]');
    items.forEach((i) => i.removeAttribute("data-selected"));
    itemRef.current?.setAttribute("data-selected", "true");
  };

  return (
    <div
      ref={itemRef}
      cmdk-item="true"
      hidden={!isMatch}
      onClick={handleSelect}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
        "data-[selected=true]:bg-muted dark:data-[selected=true]:bg-zinc-800",
        "data-[selected=true]:text-foreground dark:data-[selected=true]:text-zinc-50",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
