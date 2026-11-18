"use client";

import type {
  ButtonHTMLAttributes,
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowDown,
  ArrowUp,
  BarChart2,
  CornerDownLeft,
  Home,
  Inbox,
  Layers,
  type LucideIcon,
  Plus,
  Search,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. TYPES & DATA CONTRACTS
// ============================================================================

/**
 * Available visual variants for CommandPalette.
 * Pass the variant name via the `variant` prop (e.g. `variant="linear"`).
 * New variants can be added to this union and handled in `VARIANT_STYLES`.
 */
export type CommandPaletteVariant = "linear" | (string & {});

export interface CommandPaletteItemType {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  tag?: string;
  shortcuts?: string[];
  keywords?: string[];
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandPaletteGroupType {
  heading: string;
  items: CommandPaletteItemType[];
}

export interface CommandPaletteProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** The design variant of the command palette. Default is "linear". */
  variant?: CommandPaletteVariant;
  /** Whether the modal dialog is open (controlled mode). */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Callback fired when dialog open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Placeholder text for the search box trigger button. */
  triggerPlaceholder?: string;
  /** Search input placeholder inside the modal dialog. */
  placeholder?: string;
  /** Grouped command items. Defaults to items matching the Linear variant. */
  groups?: CommandPaletteGroupType[];
  /** Callback fired when any item is selected. */
  onSelect?: (item: CommandPaletteItemType) => void;
  /** Optional custom shortcuts shown in trigger (e.g. ["Ctrl", "K"]). */
  shortcuts?: string[];
  /** Custom accent color override. */
  color?: string;
  /** Additional className applied to the trigger box. */
  triggerClassName?: string;
}

export interface CommandPaletteTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  shortcuts?: string[];
}

// Default items matching the Linear-style command palette
export const DEFAULT_COMMAND_PALETTE_GROUPS: CommandPaletteGroupType[] = [
  {
    heading: "Recent",
    items: [
      {
        id: "recent-projects",
        label: "Projects",
        icon: Layers,
        shortcuts: ["G", "P"],
        keywords: ["kanban", "boards", "tasks", "workspaces"],
      },
      {
        id: "recent-home",
        label: "Home",
        icon: Home,
        shortcuts: ["G", "H"],
        keywords: ["dashboard", "main", "overview"],
      },
      {
        id: "recent-settings",
        label: "Settings",
        icon: Settings,
        shortcuts: ["G", "S"],
        keywords: ["preferences", "account", "profile"],
      },
    ],
  },
  {
    heading: "Go to",
    items: [
      {
        id: "goto-home",
        label: "Home",
        icon: Home,
        shortcuts: ["G", "H"],
        keywords: ["dashboard", "main", "overview"],
      },
      {
        id: "goto-inbox",
        label: "Inbox",
        icon: Inbox,
        shortcuts: ["G", "I"],
        keywords: ["notifications", "messages", "alerts"],
      },
      {
        id: "goto-projects",
        label: "Projects",
        icon: Layers,
        shortcuts: ["G", "P"],
        keywords: ["kanban", "boards", "tasks"],
      },
      {
        id: "goto-reports",
        label: "Reports",
        icon: BarChart2,
        shortcuts: ["G", "R"],
        keywords: ["insights", "data", "sales", "analytics"],
      },
      {
        id: "goto-settings",
        label: "Settings",
        icon: Settings,
        shortcuts: ["G", "S"],
        keywords: ["preferences", "account", "profile"],
      },
    ],
  },
  {
    heading: "Actions",
    items: [
      {
        id: "action-new-project",
        label: "New project",
        icon: Plus,
        shortcuts: ["C"],
        keywords: ["create", "add", "make", "new"],
      },
    ],
  },
];

// Variant style registry — add future variants here
const VARIANT_STYLES: Record<
  string,
  { wrapper: string; header: string; activeItem: string }
> = {
  linear: {
    wrapper: "border border-zinc-200/90 dark:border-zinc-800/90",
    header: "border-b border-zinc-100 dark:border-zinc-800/80",
    activeItem:
      "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100",
  },
};

// ============================================================================
// 2. TRIGGER SEARCH BOX (Initial State)
// ============================================================================

export function CommandPaletteTrigger({
  placeholder = "Search anything...",
  shortcuts = ["Ctrl", "K"],
  className,
  onClick,
  ...props
}: CommandPaletteTriggerProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator?.userAgent) {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  const displayShortcuts = useMemo(() => {
    if (isMac && shortcuts[0]?.toLowerCase() === "ctrl") {
      return ["⌘", ...shortcuts.slice(1)];
    }
    return shortcuts;
  }, [isMac, shortcuts]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex h-9.5 w-full max-w-xs sm:max-w-sm items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 px-3 py-1.5 text-sm text-zinc-500 transition-all hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-600/30 cursor-pointer",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 truncate">
        <Search className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
        <span className="font-normal text-zinc-500 dark:text-zinc-400 text-sm truncate">
          {placeholder}
        </span>
      </div>
      <div className="flex items-center gap-1 shrink-0 select-none ml-2">
        {displayShortcuts.map((key, idx) => (
          <kbd
            key={idx}
            className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-1.5 text-[11px] font-medium font-mono text-zinc-400 dark:text-zinc-400"
          >
            {key}
          </kbd>
        ))}
      </div>
    </button>
  );
}

// ============================================================================
// 3. PALETTE CONTENT (Inside Modal)
// ============================================================================

export interface CommandPaletteContentProps {
  variant?: CommandPaletteVariant;
  placeholder?: string;
  groups: CommandPaletteGroupType[];
  onSelect?: (item: CommandPaletteItemType) => void;
  onClose?: () => void;
  isDialog?: boolean;
  className?: string;
}

export function CommandPaletteContent({
  variant = "linear",
  placeholder = "Search pages, projects and actions",
  groups,
  onSelect,
  onClose,
  isDialog = true,
  className,
}: CommandPaletteContentProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus search input upon opening
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Filter items across groups
  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;

    return groups
      .map((group) => {
        const filteredItems = group.items.filter((item) => {
          if (item.label.toLowerCase().includes(q)) return true;
          if (item.tag?.toLowerCase().includes(q)) return true;
          if (item.keywords?.some((k) => k.toLowerCase().includes(q)))
            return true;
          return false;
        });
        return {
          ...group,
          items: filteredItems,
        };
      })
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  // Flattened list for continuous arrow navigation
  const flatItems = useMemo(() => {
    return filteredGroups.flatMap((group) => group.items);
  }, [filteredGroups]);

  // Keep active index in bounds
  useEffect(() => {
    if (activeIndex >= flatItems.length) {
      setActiveIndex(Math.max(0, flatItems.length - 1));
    }
  }, [flatItems.length, activeIndex]);

  // Keyboard navigation inside palette
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1 < flatItems.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev - 1 >= 0 ? prev - 1 : Math.max(0, flatItems.length - 1),
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = flatItems[activeIndex];
        if (selected && !selected.disabled) {
          selected.onSelect?.();
          onSelect?.(selected);
          onClose?.();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
    },
    [flatItems, activeIndex, onSelect, onClose],
  );

  // Scroll active item into view
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const activeEl = container.querySelector(
      `[data-palette-index="${activeIndex}"]`,
    ) as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const variantStyles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.linear;

  let globalIndexCounter = -1;

  return (
    <div
      data-variant={variant}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-all",
        variantStyles.wrapper,
        className,
      )}
    >
      {/* Top Search Input */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4",
          variantStyles.header,
        )}
      >
        <Search className="h-5 w-5 shrink-0 text-zinc-400 dark:text-zinc-500" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm sm:text-base font-normal text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {isDialog && (
          <kbd
            onClick={onClose}
            className="inline-flex cursor-pointer items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 px-2 py-0.5 text-xs font-medium text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition select-none"
          >
            Esc
          </kbd>
        )}
      </div>

      {/* Items Scrollable List */}
      <div
        ref={listRef}
        className="max-h-[340px] min-h-[140px] overflow-y-auto p-2 sm:p-2.5 space-y-3 [scrollbar-width:auto] [scrollbar-color:auto] [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:my-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:[border:4px_solid_transparent] [&::-webkit-scrollbar-thumb]:[background-clip:content-box] [&::-webkit-scrollbar-thumb]:bg-[#d4d4d8] hover:[&::-webkit-scrollbar-thumb]:bg-[#a1a1aa] dark:[&::-webkit-scrollbar-thumb]:bg-[#3f3f46] dark:hover:[&::-webkit-scrollbar-thumb]:bg-[#52525b] [&::-webkit-scrollbar-button]:hidden"
        role="listbox"
      >
        {filteredGroups.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center text-center text-sm text-zinc-400 dark:text-zinc-500">
            <p>No results found for &ldquo;{query}&rdquo;</p>
            <p className="text-xs text-zinc-400/80 mt-1">
              Try searching for &quot;Projects&quot;, &quot;Home&quot;, or
              &quot;Settings&quot;
            </p>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.heading} className="space-y-1">
              <div className="px-3 py-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {group.heading}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  globalIndexCounter += 1;
                  const itemIndex = globalIndexCounter;
                  const isActive = activeIndex === itemIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      data-palette-index={itemIndex}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        if (!item.disabled) {
                          item.onSelect?.();
                          onSelect?.(item);
                          onClose?.();
                        }
                      }}
                      onMouseEnter={() => setActiveIndex(itemIndex)}
                      className={cn(
                        "group flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors rounded-xl",
                        isActive
                          ? variantStyles.activeItem
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40",
                        item.disabled && "cursor-not-allowed opacity-50",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {Icon && (
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              isActive
                                ? "text-zinc-900 dark:text-zinc-100"
                                : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300",
                            )}
                          />
                        )}
                        <span className="truncate font-normal">
                          {item.label}
                        </span>
                        {item.tag && (
                          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {item.shortcuts && item.shortcuts.length > 0 && (
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          {item.shortcuts.map((shortcut, sIdx) => (
                            <kbd
                              key={sIdx}
                              className={cn(
                                "inline-flex h-5 min-w-5 items-center justify-center rounded border px-1.5 text-[11px] font-medium font-mono",
                                isActive
                                  ? "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
                                  : "border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/60 text-zinc-400 dark:text-zinc-500",
                              )}
                            >
                              {shortcut}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Instructions Bar */}
      <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 px-4 py-2.5 text-xs text-zinc-400 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-0.5 text-[10px]">
                <ArrowUp className="h-3 w-3" />
              </kbd>
              <kbd className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-0.5 text-[10px]">
                <ArrowDown className="h-3 w-3" />
              </kbd>
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">Move</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-[10px]">
              <CornerDownLeft className="h-3 w-3" />
            </kbd>
            <span className="text-zinc-500 dark:text-zinc-400">Open</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. MAIN EXPORTED COMPONENT (Search Box initially -> Modal on click)
// ============================================================================

export function CommandPalette({
  variant = "linear",
  open,
  defaultOpen = false,
  onOpenChange,
  triggerPlaceholder = "Search anything...",
  placeholder = "Search pages, projects and actions",
  groups = DEFAULT_COMMAND_PALETTE_GROUPS,
  onSelect,
  shortcuts = ["Ctrl", "K"],
  className,
  triggerClassName,
  color,
  ...props
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (nextState: boolean) => {
      if (isControlled) {
        onOpenChange?.(nextState);
      } else {
        setInternalOpen(nextState);
      }
    },
    [isControlled, onOpenChange],
  );

  // Global keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setOpen]);

  // Portal anchor target for dialog modal
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const setAnchor = useCallback((node: HTMLSpanElement | null) => {
    setPortalTarget(node ? node.ownerDocument.body : null);
  }, []);

  const containerStyle =
    color && color !== "primary" && color !== "default"
      ? ({
          "--primary": color,
        } as CSSProperties)
      : undefined;

  return (
    <div
      style={containerStyle}
      className={cn(
        "relative inline-block w-full max-w-xs sm:max-w-sm",
        className,
      )}
      {...props}
    >
      {/* Anchor for SSR / iframe portal */}
      <span ref={setAnchor} hidden />

      {/* 1. Initial Search Box Trigger */}
      <CommandPaletteTrigger
        placeholder={triggerPlaceholder}
        shortcuts={shortcuts}
        onClick={() => setOpen(true)}
        className={triggerClassName}
      />

      {/* 2. Floating Command Palette Modal Dialog with darkened overlay */}
      {isOpen &&
        portalTarget &&
        createPortal(
          <div
            style={containerStyle}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] bg-black/40 dark:bg-black/70 backdrop-blur-xs px-4"
          >
            {/* Backdrop click to dismiss */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            {/* Palette Dialog Box */}
            <div className="z-50 w-full max-w-xl animate-in fade-in zoom-in-95 duration-150">
              <CommandPaletteContent
                variant={variant}
                placeholder={placeholder}
                groups={groups}
                onSelect={onSelect}
                onClose={() => setOpen(false)}
                isDialog={true}
              />
            </div>
          </div>,
          portalTarget,
        )}
    </div>
  );
}

export default CommandPalette;
