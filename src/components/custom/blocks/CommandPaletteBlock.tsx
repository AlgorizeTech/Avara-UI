"use client";

import type {
  ButtonHTMLAttributes,
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
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
  ArrowLeft,
  ArrowUp,
  BarChart2,
  Check,
  CornerDownLeft,
  CreditCard,
  Delete,
  FileText,
  Folder,
  Hash,
  HelpCircle,
  Home,
  Inbox,
  Layers,
  LifeBuoy,
  Link2,
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
 * Available visual & interactive variants for CommandPalette.
 * Pass the variant name via the `variant` prop (`"linear"`, `"nested"`, `"inline"`, or `"ai"`).
 */
export type CommandPaletteVariant =
  | "linear"
  | "nested"
  | "inline"
  | "ai"
  | (string & {});

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

export interface NestedPaletteOption {
  id: string;
  label: string;
  tag?: string;
  keywords?: string[];
  renderIcon?: () => ReactNode;
}

export interface NestedPaletteState {
  status: string;
  assignee: string;
  priority: string;
  project: string;
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
  /** Grouped command items (used by the "linear" variant). */
  groups?: CommandPaletteGroupType[];
  /** Callback fired when any item is selected. */
  onSelect?: (item: CommandPaletteItemType) => void;
  /** Optional custom shortcuts shown in trigger (e.g. ["Ctrl", "K"]). */
  shortcuts?: string[];
  /** Custom accent color override. */
  color?: string;
  /** Additional className applied to the trigger box. */
  triggerClassName?: string;
  /** Context badge ID shown in the "nested" variant header (default: "AVA-214"). */
  contextId?: string;
  /** Context item title shown as the primary group heading in the "nested" variant. */
  contextTitle?: string;
  /** Initial values for the "nested" variant (status, assignee, priority, project). */
  nestedState?: NestedPaletteState;
  /** Callback when a nested option changes in the "nested" variant. */
  onNestedStateChange?: (next: NestedPaletteState) => void;
}

export interface CommandPaletteTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  shortcuts?: string[];
}

// ============================================================================
// 2. CUSTOM MICRO-ICONS FOR NESTED VARIANT (Status, Priority, Avatar)
// ============================================================================

export function StatusIcon({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const base = cn("h-4 w-4 shrink-0", className);
  switch (status) {
    case "Backlog":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
      );
    case "Todo":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "In progress":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 2a6 6 0 0 0 0 12V2Z" fill="currentColor" />
        </svg>
      );
    case "In review":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 2a6 6 0 1 0 6 6H8V2Z" fill="currentColor" />
        </svg>
      );
    case "Done":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <circle cx="8" cy="8" r="6.5" fill="currentColor" />
          <path
            d="M5.25 8.25L7.1 10.1L10.9 6.1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:stroke-zinc-900"
          />
        </svg>
      );
    case "Canceled":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5.75 5.75L10.25 10.25M10.25 5.75L5.75 10.25"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

export function PriorityIcon({
  priority,
  className,
}: {
  priority: string;
  className?: string;
}) {
  const base = cn("h-4 w-4 shrink-0", className);
  switch (priority) {
    case "No priority":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <rect x="2.5" y="7.25" width="2.5" height="1.5" rx="0.75" fill="currentColor" />
          <rect x="6.75" y="7.25" width="2.5" height="1.5" rx="0.75" fill="currentColor" />
          <rect x="11" y="7.25" width="2.5" height="1.5" rx="0.75" fill="currentColor" />
        </svg>
      );
    case "Urgent":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <rect x="2" y="2" width="12" height="12" rx="3" fill="currentColor" />
          <path
            d="M8 5v3.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="dark:stroke-zinc-900"
          />
          <circle
            cx="8"
            cy="10.9"
            r="0.85"
            fill="white"
            className="dark:fill-zinc-900"
          />
        </svg>
      );
    case "High":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <rect x="2.5" y="9.5" width="2.5" height="4" rx="0.75" fill="currentColor" />
          <rect x="6.75" y="6.5" width="2.5" height="7" rx="0.75" fill="currentColor" />
          <rect x="11" y="3.5" width="2.5" height="10" rx="0.75" fill="currentColor" />
        </svg>
      );
    case "Medium":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <rect x="2.5" y="9.5" width="2.5" height="4" rx="0.75" fill="currentColor" />
          <rect x="6.75" y="6.5" width="2.5" height="7" rx="0.75" fill="currentColor" />
          <rect
            x="11"
            y="3.5"
            width="2.5"
            height="10"
            rx="0.75"
            fill="currentColor"
            fillOpacity="0.28"
          />
        </svg>
      );
    case "Low":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={base}>
          <rect x="2.5" y="9.5" width="2.5" height="4" rx="0.75" fill="currentColor" />
          <rect
            x="6.75"
            y="6.5"
            width="2.5"
            height="7"
            rx="0.75"
            fill="currentColor"
            fillOpacity="0.28"
          />
          <rect
            x="11"
            y="3.5"
            width="2.5"
            height="10"
            rx="0.75"
            fill="currentColor"
            fillOpacity="0.28"
          />
        </svg>
      );
    default:
      return null;
  }
}

function AssigneeAvatar({ assignee }: { assignee: string }) {
  if (assignee === "No assignee") {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-dashed border-zinc-400 dark:border-zinc-500" />
    );
  }
  const initials = assignee
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (assignee === "Lena Ortiz") {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 dark:bg-zinc-200 text-[9px] font-semibold text-white dark:text-zinc-900 select-none">
        {initials}
      </span>
    );
  }

  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-[9px] font-semibold text-zinc-600 dark:text-zinc-300 select-none">
      {initials}
    </span>
  );
}

// ============================================================================
// 3. DEFAULT DATA
// ============================================================================

// Default items for the "linear" variant
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

// Default state & options for the "nested" variant
export const DEFAULT_NESTED_PALETTE_STATE: NestedPaletteState = {
  status: "In progress",
  assignee: "Lena Ortiz",
  priority: "High",
  project: "Lifecycle emails",
};

const NESTED_STATUS_OPTIONS: NestedPaletteOption[] = [
  { id: "status-backlog", label: "Backlog", keywords: ["later", "queue"] },
  { id: "status-todo", label: "Todo", keywords: ["open", "next"] },
  { id: "status-in-progress", label: "In progress", keywords: ["active", "doing"] },
  { id: "status-in-review", label: "In review", keywords: ["pr", "reviewing"] },
  { id: "status-done", label: "Done", keywords: ["completed", "finished"] },
  { id: "status-canceled", label: "Canceled", keywords: ["closed", "dropped"] },
];

const NESTED_ASSIGNEE_OPTIONS: NestedPaletteOption[] = [
  { id: "assignee-none", label: "No assignee", keywords: ["unassigned", "clear"] },
  { id: "assignee-lena", label: "Lena Ortiz", tag: "You", keywords: ["me", "self"] },
  { id: "assignee-marcus", label: "Marcus Chen", keywords: ["mc"] },
  { id: "assignee-priya", label: "Priya Nair", keywords: ["pn"] },
  { id: "assignee-tomas", label: "Tomás Rivera", keywords: ["tomas", "tr"] },
  { id: "assignee-aiko", label: "Aiko Tanaka", keywords: ["at"] },
];

const NESTED_PRIORITY_OPTIONS: NestedPaletteOption[] = [
  { id: "priority-none", label: "No priority", keywords: ["clear", "none"] },
  { id: "priority-urgent", label: "Urgent", keywords: ["p0", "critical"] },
  { id: "priority-high", label: "High", keywords: ["p1", "important"] },
  { id: "priority-medium", label: "Medium", keywords: ["p2", "normal"] },
  { id: "priority-low", label: "Low", keywords: ["p3", "minor"] },
];

const NESTED_PROJECT_OPTIONS: NestedPaletteOption[] = [
  { id: "project-none", label: "No project", keywords: ["clear", "remove"] },
  { id: "project-lifecycle", label: "Lifecycle emails", keywords: ["email", "marketing"] },
  { id: "project-onboarding", label: "Onboarding v2", keywords: ["welcome", "growth"] },
  { id: "project-design", label: "Design system", keywords: ["ui", "components"] },
  { id: "project-mobile", label: "Mobile app", keywords: ["ios", "android"] },
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
  nested: {
    wrapper: "border border-zinc-200/90 dark:border-zinc-800/90",
    header: "border-b border-zinc-100 dark:border-zinc-800/80",
    activeItem:
      "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100",
  },
  inline: {
    wrapper: "border border-zinc-200/90 dark:border-zinc-800/90",
    header: "border-b border-zinc-100 dark:border-zinc-800/80",
    activeItem:
      "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100",
  },
  ai: {
    wrapper: "border border-zinc-200/90 dark:border-zinc-800/90",
    header: "border-b border-zinc-100 dark:border-zinc-800/80",
    activeItem:
      "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100",
  },
};

const SLIM_SCROLLBAR_CLASS =
  "[scrollbar-width:auto] [scrollbar-color:auto] [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:my-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:[border:4px_solid_transparent] [&::-webkit-scrollbar-thumb]:[background-clip:content-box] [&::-webkit-scrollbar-thumb]:bg-[#d4d4d8] hover:[&::-webkit-scrollbar-thumb]:bg-[#a1a1aa] dark:[&::-webkit-scrollbar-thumb]:bg-[#3f3f46] dark:hover:[&::-webkit-scrollbar-thumb]:bg-[#52525b] [&::-webkit-scrollbar-button]:hidden";

const NESTED_SLIDE_KEYFRAMES = `
@keyframes cp-pill-in {
  0% {
    opacity: 0;
    transform: translateX(24px);
    max-width: 0px;
    padding-left: 0px;
    padding-right: 0px;
    margin-right: -10px;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    max-width: 120px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 0px;
  }
}
@keyframes cp-pill-out {
  0% {
    opacity: 1;
    transform: translateX(0);
    max-width: 120px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 0px;
  }
  100% {
    opacity: 0;
    transform: translateX(24px);
    max-width: 0px;
    padding-left: 0px;
    padding-right: 0px;
    margin-right: -10px;
  }
}
@keyframes cp-list-in-right {
  0% { opacity: 0; transform: translateX(24px); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes cp-list-out-left {
  0% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(-24px); }
}
@keyframes cp-list-in-left {
  0% { opacity: 0; transform: translateX(-24px); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes cp-list-out-right {
  0% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(24px); }
}
`;

// ============================================================================
// 4. TRIGGER SEARCH BOX (Initial State)
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
// 5. NESTED PALETTE CONTENT (Contextual Multi-Level Sub-menus)
// ============================================================================

type NestedPage = "root" | "status" | "assignee" | "priority" | "project";

interface NestedCommandPaletteContentProps {
  placeholder?: string;
  contextId: string;
  contextTitle: string;
  nestedState: NestedPaletteState;
  onNestedStateChange: (next: NestedPaletteState) => void;
  onSelect?: (item: CommandPaletteItemType) => void;
  onClose?: () => void;
  isDialog?: boolean;
  className?: string;
}

function NestedCommandPaletteContent({
  placeholder = "Type a command or search",
  contextId,
  contextTitle,
  nestedState,
  onNestedStateChange,
  onSelect,
  onClose,
  isDialog = true,
  className,
}: NestedCommandPaletteContentProps) {
  const [page, setPage] = useState<NestedPage>("root");
  const [direction, setDirection] = useState<"forward" | "back" | null>(null);
  const [exitingPage, setExitingPage] = useState<{
    page: NestedPage;
    direction: "forward" | "back";
  } | null>(null);
  const [exitingPill, setExitingPill] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const exitTimerRef = useRef<number | null>(null);

  const variantStyles = VARIANT_STYLES.nested;

  useEffect(() => {
    inputRef.current?.focus();
  }, [page]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  const pillLabelFor = (target: NestedPage): string | null => {
    switch (target) {
      case "status":
        return "Status";
      case "assignee":
        return "Assignee";
      case "priority":
        return "Priority";
      case "project":
        return "Project";
      default:
        return null;
    }
  };

  const navigateTo = useCallback(
    (nextPage: NestedPage) => {
      if (nextPage === page) return;
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }

      const dir: "forward" | "back" = nextPage === "root" ? "back" : "forward";
      setDirection(dir);
      setExitingPage({ page, direction: dir });

      if (nextPage === "root") {
        setExitingPill(pillLabelFor(page));
      } else {
        setExitingPill(null);
      }

      exitTimerRef.current = window.setTimeout(() => {
        setExitingPage(null);
        setExitingPill(null);
      }, 380);

      setPage(nextPage);
      setQuery("");
      setActiveIndex(0);
    },
    [page],
  );

  const rootGroups = useMemo(() => {
    const primaryItems: Array<{
      id: string;
      label: string;
      currentValue: string;
      shortcuts: string[];
      keywords: string[];
      subPage: NestedPage;
      renderIcon: () => ReactNode;
    }> = [
      {
        id: "nested-status",
        label: "Change status...",
        currentValue: nestedState.status,
        shortcuts: ["S"],
        keywords: ["status", "state", "todo", "done", "progress", "backlog"],
        subPage: "status",
        renderIcon: () => (
          <StatusIcon
            status={nestedState.status}
            className="text-zinc-500 dark:text-zinc-400"
          />
        ),
      },
      {
        id: "nested-assignee",
        label: "Assign to...",
        currentValue: nestedState.assignee,
        shortcuts: ["A"],
        keywords: ["assign", "assignee", "owner", "member", "person"],
        subPage: "assignee",
        renderIcon: () => <AssigneeAvatar assignee={nestedState.assignee} />,
      },
      {
        id: "nested-priority",
        label: "Set priority...",
        currentValue: nestedState.priority,
        shortcuts: ["P"],
        keywords: ["priority", "urgent", "high", "medium", "low"],
        subPage: "priority",
        renderIcon: () => (
          <PriorityIcon
            priority={nestedState.priority}
            className="text-zinc-500 dark:text-zinc-400"
          />
        ),
      },
      {
        id: "nested-project",
        label: "Move to project...",
        currentValue: nestedState.project,
        shortcuts: ["Shift", "P"],
        keywords: ["project", "move", "folder", "lifecycle"],
        subPage: "project",
        renderIcon: () => (
          <Folder className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
        ),
      },
    ];

    const moreItems: Array<{
      id: string;
      label: string;
      shortcuts: string[];
      keywords: string[];
      renderIcon: () => ReactNode;
      action: () => void;
    }> = [
      {
        id: "nested-copy-link",
        label: "Copy issue link",
        shortcuts: ["Ctrl", "Shift", "C"],
        keywords: ["url", "link", "share", "copy"],
        renderIcon: () => (
          <Link2 className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
        ),
        action: () => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).catch(() => {});
          }
          onSelect?.({ id: "nested-copy-link", label: "Copy issue link" });
          onClose?.();
        },
      },
      {
        id: "nested-copy-id",
        label: "Copy issue ID",
        shortcuts: ["Ctrl", "."],
        keywords: ["id", "identifier", "copy", contextId.toLowerCase()],
        renderIcon: () => (
          <Hash className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
        ),
        action: () => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(contextId).catch(() => {});
          }
          onSelect?.({ id: "nested-copy-id", label: `Copy ${contextId}` });
          onClose?.();
        },
      },
      {
        id: "nested-create-sub",
        label: "Create sub-issue",
        shortcuts: ["Shift", "C"],
        keywords: ["sub", "child", "add", "new", "issue"],
        renderIcon: () => (
          <Plus className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
        ),
        action: () => {
          onSelect?.({ id: "nested-create-sub", label: "Create sub-issue" });
          onClose?.();
        },
      },
    ];

    const q = query.trim().toLowerCase();
    const filterFn = (item: {
      label: string;
      currentValue?: string;
      keywords: string[];
    }) => {
      if (!q) return true;
      return (
        item.label.toLowerCase().includes(q) ||
        item.currentValue?.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
      );
    };

    const groups: Array<{
      heading: string;
      items: Array<{
        id: string;
        label: string;
        currentValue?: string;
        shortcuts: string[];
        renderIcon: () => ReactNode;
        onExecute: () => void;
      }>;
    }> = [];

    const filteredPrimary = primaryItems.filter(filterFn).map((item) => ({
      id: item.id,
      label: item.label,
      currentValue: item.currentValue,
      shortcuts: item.shortcuts,
      renderIcon: item.renderIcon,
      onExecute: () => navigateTo(item.subPage),
    }));
    if (filteredPrimary.length > 0) {
      groups.push({ heading: contextTitle, items: filteredPrimary });
    }

    const filteredMore = moreItems.filter(filterFn).map((item) => ({
      id: item.id,
      label: item.label,
      shortcuts: item.shortcuts,
      renderIcon: item.renderIcon,
      onExecute: item.action,
    }));
    if (filteredMore.length > 0) {
      groups.push({ heading: "More", items: filteredMore });
    }

    return groups;
  }, [nestedState, query, contextId, contextTitle, navigateTo, onSelect, onClose]);

  const getSubPageMeta = useCallback(
    (targetPage: NestedPage, filterText: string) => {
      const q = filterText.trim().toLowerCase();
      const filterOpts = (opts: NestedPaletteOption[]) =>
        !q
          ? opts
          : opts.filter(
              (o) =>
                o.label.toLowerCase().includes(q) ||
                o.tag?.toLowerCase().includes(q) ||
                o.keywords?.some((k) => k.toLowerCase().includes(q)),
            );

      switch (targetPage) {
        case "status":
          return {
            pill: "Status",
            placeholder: "Change status to...",
            currentValue: nestedState.status,
            options: filterOpts(NESTED_STATUS_OPTIONS).map((opt) => ({
              ...opt,
              renderIcon: () => (
                <StatusIcon
                  status={opt.label}
                  className="text-zinc-500 dark:text-zinc-400"
                />
              ),
              onChoose: () => {
                onNestedStateChange({ ...nestedState, status: opt.label });
                onSelect?.({ id: opt.id, label: opt.label });
                onClose?.();
              },
            })),
          };
        case "assignee":
          return {
            pill: "Assignee",
            placeholder: "Assign to...",
            currentValue: nestedState.assignee,
            options: filterOpts(NESTED_ASSIGNEE_OPTIONS).map((opt) => ({
              ...opt,
              renderIcon: () => <AssigneeAvatar assignee={opt.label} />,
              onChoose: () => {
                onNestedStateChange({ ...nestedState, assignee: opt.label });
                onSelect?.({ id: opt.id, label: opt.label });
                onClose?.();
              },
            })),
          };
        case "priority":
          return {
            pill: "Priority",
            placeholder: "Set priority to...",
            currentValue: nestedState.priority,
            options: filterOpts(NESTED_PRIORITY_OPTIONS).map((opt) => ({
              ...opt,
              renderIcon: () => (
                <PriorityIcon
                  priority={opt.label}
                  className="text-zinc-500 dark:text-zinc-400"
                />
              ),
              onChoose: () => {
                onNestedStateChange({ ...nestedState, priority: opt.label });
                onSelect?.({ id: opt.id, label: opt.label });
                onClose?.();
              },
            })),
          };
        case "project":
          return {
            pill: "Project",
            placeholder: "Move to project...",
            currentValue: nestedState.project,
            options: filterOpts(NESTED_PROJECT_OPTIONS).map((opt) => ({
              ...opt,
              renderIcon: () => (
                <Folder className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
              ),
              onChoose: () => {
                onNestedStateChange({ ...nestedState, project: opt.label });
                onSelect?.({ id: opt.id, label: opt.label });
                onClose?.();
              },
            })),
          };
        default:
          return null;
      }
    },
    [nestedState, onNestedStateChange, onSelect, onClose],
  );

  const subPageMeta = useMemo(
    () => getSubPageMeta(page, query),
    [getSubPageMeta, page, query],
  );

  const flatCount = useMemo(() => {
    if (page === "root") {
      return rootGroups.reduce((acc, g) => acc + g.items.length, 0);
    }
    return subPageMeta?.options.length ?? 0;
  }, [page, rootGroups, subPageMeta]);

  useEffect(() => {
    if (activeIndex >= flatCount) {
      setActiveIndex(Math.max(0, flatCount - 1));
    }
  }, [flatCount, activeIndex]);

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

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1 < flatCount ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev - 1 >= 0 ? prev - 1 : Math.max(0, flatCount - 1),
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (page === "root") {
          const flat = rootGroups.flatMap((g) => g.items);
          flat[activeIndex]?.onExecute();
        } else if (subPageMeta) {
          subPageMeta.options[activeIndex]?.onChoose();
        }
      } else if (e.key === "Backspace" && !query && page !== "root") {
        e.preventDefault();
        navigateTo("root");
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
    },
    [flatCount, page, rootGroups, subPageMeta, activeIndex, query, navigateTo, onClose],
  );

  const renderPageItems = (targetPage: NestedPage, isExitingView: boolean) => {
    if (targetPage === "root") {
      if (rootGroups.length === 0) {
        return (
          <div className="flex h-32 flex-col items-center justify-center text-center text-sm text-zinc-400 dark:text-zinc-500">
            <p>No commands found for &ldquo;{query}&rdquo;</p>
          </div>
        );
      }

      let idxCounter = -1;
      return (
        <div className="space-y-3">
          {rootGroups.map((group) => (
            <div key={group.heading} className="space-y-1">
              <div className="px-3 py-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {group.heading}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  idxCounter += 1;
                  const itemIndex = idxCounter;
                  const isActive = !isExitingView && activeIndex === itemIndex;

                  return (
                    <div
                      key={item.id}
                      data-palette-index={isExitingView ? undefined : itemIndex}
                      role="option"
                      aria-selected={isActive}
                      onClick={isExitingView ? undefined : item.onExecute}
                      onMouseEnter={
                        isExitingView
                          ? undefined
                          : () => setActiveIndex(itemIndex)
                      }
                      className={cn(
                        "group flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors rounded-xl",
                        isActive
                          ? variantStyles.activeItem
                          : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.renderIcon()}
                        <span className="truncate font-normal">
                          {item.label}
                        </span>
                        {item.currentValue && (
                          <span className="truncate text-xs sm:text-[13px] text-zinc-400 dark:text-zinc-500 font-normal">
                            {item.currentValue}
                          </span>
                        )}
                      </div>

                      {item.shortcuts.length > 0 && (
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
          ))}
        </div>
      );
    }

    const meta = isExitingView ? getSubPageMeta(targetPage, "") : subPageMeta;
    if (!meta || meta.options.length === 0) {
      return (
        <div className="flex h-32 flex-col items-center justify-center text-center text-sm text-zinc-400 dark:text-zinc-500">
          <p>No matches for &ldquo;{query}&rdquo;</p>
        </div>
      );
    }

    return (
      <div className="space-y-0.5">
        {meta.options.map((opt, idx) => {
          const isActive = !isExitingView && activeIndex === idx;
          const isSelected = meta.currentValue === opt.label;

          return (
            <div
              key={opt.id}
              data-palette-index={isExitingView ? undefined : idx}
              role="option"
              aria-selected={isActive}
              onClick={isExitingView ? undefined : opt.onChoose}
              onMouseEnter={
                isExitingView ? undefined : () => setActiveIndex(idx)
              }
              className={cn(
                "group flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors rounded-xl",
                isActive
                  ? variantStyles.activeItem
                  : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40",
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                {opt.renderIcon()}
                <span className="truncate font-normal">{opt.label}</span>
                {opt.tag && (
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">
                    {opt.tag}
                  </span>
                )}
              </div>

              {isSelected && (
                <Check className="h-4 w-4 shrink-0 text-zinc-700 dark:text-zinc-200" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      data-variant="nested"
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-all",
        variantStyles.wrapper,
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: NESTED_SLIDE_KEYFRAMES }} />

      {/* Top Search Input Row with Context Pill(s) */}
      <div
        className={cn(
          "flex items-center gap-2.5 px-4 py-3.5 sm:px-5 sm:py-4",
          variantStyles.header,
        )}
      >
        {/* Fixed-size icon slot so Search & Back occupy identical space (zero shift) */}
        {page === "root" ? (
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center">
            <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          </span>
        ) : (
          <button
            type="button"
            onClick={() => navigateTo("root")}
            aria-label="Go back"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        {/* Issue Context Badge (position locked regardless of Search/Back swap) */}
        <button
          type="button"
          onClick={() => page !== "root" && navigateTo("root")}
          className={cn(
            "inline-flex shrink-0 items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 select-none",
            page !== "root" &&
              "cursor-pointer hover:bg-zinc-200/70 dark:hover:bg-zinc-700/70 transition",
          )}
        >
          {contextId}
        </button>

        {/* Sub-menu Pill: glides in slowly from right, glides out slowly on back */}
        {subPageMeta ? (
          <span
            key={page}
            style={{
              animation: "cp-pill-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both",
            }}
            className="inline-flex shrink-0 items-center overflow-hidden whitespace-nowrap rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 select-none"
          >
            {subPageMeta.pill}
          </span>
        ) : exitingPill ? (
          <span
            aria-hidden="true"
            style={{
              animation:
                "cp-pill-out 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
            className="pointer-events-none inline-flex shrink-0 items-center overflow-hidden whitespace-nowrap rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 select-none"
          >
            {exitingPill}
          </span>
        ) : null}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          placeholder={subPageMeta ? subPageMeta.placeholder : placeholder}
          className="w-full min-w-0 bg-transparent text-sm sm:text-[15px] font-normal text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
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
            className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 px-2 py-0.5 text-xs font-medium text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition select-none"
          >
            Esc
          </kbd>
        )}
      </div>

      {/* Scrollable List Body — synchronized 380ms slow slide matching the header pill */}
      <div
        ref={listRef}
        className={cn(
          "relative max-h-[340px] min-h-[140px] overflow-y-auto overflow-x-hidden p-2 sm:p-2.5",
          SLIM_SCROLLBAR_CLASS,
        )}
        role="listbox"
      >
        {exitingPage && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 p-2 sm:p-2.5"
            style={{
              animation:
                exitingPage.direction === "forward"
                  ? "cp-list-out-left 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards"
                  : "cp-list-out-right 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            {renderPageItems(exitingPage.page, true)}
          </div>
        )}

        <div
          key={page}
          style={
            direction
              ? {
                  animation:
                    direction === "forward"
                      ? "cp-list-in-right 380ms cubic-bezier(0.22, 1, 0.36, 1) both"
                      : "cp-list-in-left 380ms cubic-bezier(0.22, 1, 0.36, 1) both",
                }
              : undefined
          }
        >
          {renderPageItems(page, false)}
        </div>
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
            <span className="text-zinc-500 dark:text-zinc-400">
              {page === "root" ? "Open" : "Choose"}
            </span>
          </div>

          {page !== "root" && (
            <button
              type="button"
              onClick={() => navigateTo("root")}
              className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200 transition"
            >
              <kbd className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-[10px]">
                <Delete className="h-3 w-3" />
              </kbd>
              <span className="text-zinc-500 dark:text-zinc-400">Back</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5B. AI PALETTE CONTENT (Search + Ask AI with Skeleton & Typewriter Streaming)
// ============================================================================

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn("h-3.5 w-3.5 shrink-0", className)}>
      <path
        d="M8 1.75L9.45 6.55L14.25 8L9.45 9.45L8 14.25L6.55 9.45L1.75 8L6.55 6.55L8 1.75Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type AiAnswerSegment =
  | { type: "text"; content: string }
  | { type: "cite"; num: number };

interface AiSourceItem {
  id: string;
  title: string;
  path: string;
  index: number;
}

interface AiKnowledgeEntry {
  id: string;
  question: string;
  keywords: string[];
  durationLabel: string;
  segments: AiAnswerSegment[];
  sources: AiSourceItem[];
}

const AI_KNOWLEDGE_BASE: AiKnowledgeEntry[] = [
  {
    id: "ai-export-csv",
    question: "How do I export a report to CSV?",
    keywords: ["export", "report", "csv", "download", "schedule", "rows"],
    durationLabel: "Answered from 3 pages in 1.8s",
    segments: [
      {
        type: "text",
        content: "Open the report, choose Export at the top right and pick CSV. ",
      },
      { type: "cite", num: 1 },
      {
        type: "text",
        content:
          " The file downloads at once for up to 50,000 rows; larger reports are emailed to you as a link. ",
      },
      { type: "cite", num: 1 },
      { type: "text", content: " " },
      { type: "cite", num: 3 },
      {
        type: "text",
        content:
          " To get the same file every week, turn on a scheduled export from the same menu. ",
      },
      { type: "cite", num: 2 },
    ],
    sources: [
      { id: "src-export", title: "Export a report", path: "Help › Reports", index: 1 },
      { id: "src-scheduled", title: "Scheduled exports", path: "Help › Reports", index: 2 },
      { id: "src-limits", title: "Plan limits", path: "Help › Billing", index: 3 },
    ],
  },
  {
    id: "ai-invite-teammates",
    question: "How do I invite teammates?",
    keywords: ["invite", "teammate", "team", "member", "role", "user", "add"],
    durationLabel: "Answered from 3 pages in 1.5s",
    segments: [
      {
        type: "text",
        content: "Go to Settings › Team and click Invite member at the top right. ",
      },
      { type: "cite", num: 1 },
      {
        type: "text",
        content:
          " Enter one or more email addresses, choose a workspace role (Admin, Editor, or Viewer), and send. ",
      },
      { type: "cite", num: 1 },
      { type: "text", content: " " },
      { type: "cite", num: 2 },
      {
        type: "text",
        content:
          " Pending invitations stay valid for 7 days and can be resent anytime from the Members list. ",
      },
      { type: "cite", num: 3 },
    ],
    sources: [
      { id: "src-team", title: "Invite workspace members", path: "Help › Team", index: 1 },
      { id: "src-roles", title: "Roles & permissions", path: "Help › Security", index: 2 },
      { id: "src-pending", title: "Manage pending invites", path: "Help › Team", index: 3 },
    ],
  },
  {
    id: "ai-api-key",
    question: "Where do I find my API key?",
    keywords: ["api", "key", "token", "secret", "developer", "auth"],
    durationLabel: "Answered from 3 pages in 1.4s",
    segments: [
      {
        type: "text",
        content: "Open Settings › Developer › API keys to view or generate keys. ",
      },
      { type: "cite", num: 1 },
      {
        type: "text",
        content:
          " Secret keys are displayed only once when created, so copy and store them safely in your environment variables. ",
      },
      { type: "cite", num: 1 },
      { type: "text", content: " " },
      { type: "cite", num: 2 },
      {
        type: "text",
        content:
          " You can rotate or revoke any key immediately with zero downtime for active webhooks. ",
      },
      { type: "cite", num: 3 },
    ],
    sources: [
      { id: "src-apikeys", title: "Managing API keys", path: "Help › Developer", index: 1 },
      { id: "src-env", title: "Authentication best practices", path: "Help › Security", index: 2 },
      { id: "src-rotate", title: "Rotating secret keys", path: "Help › Developer", index: 3 },
    ],
  },
];

const AI_NO_MATCH_SEGMENTS: AiAnswerSegment[] = [
  {
    type: "text",
    content:
      "I couldn't find this in the help center, so I won't guess. Someone on the support team can answer it.",
  },
];

const AI_GOTO_ITEMS: CommandPaletteItemType[] = [
  {
    id: "ai-goto-home",
    label: "Home",
    icon: Home,
    shortcuts: ["G", "H"],
    keywords: ["dashboard", "overview", "main"],
  },
  {
    id: "ai-goto-reports",
    label: "Reports",
    icon: BarChart2,
    shortcuts: ["G", "R"],
    keywords: ["analytics", "csv", "charts"],
  },
  {
    id: "ai-goto-billing",
    label: "Billing",
    icon: CreditCard,
    shortcuts: ["G", "B"],
    keywords: ["plan", "invoices", "limits", "payment"],
  },
  {
    id: "ai-goto-settings",
    label: "Settings",
    icon: Settings,
    shortcuts: ["G", "S"],
    keywords: ["preferences", "team", "api", "account"],
  },
];

function matchAiKnowledge(questionText: string): AiKnowledgeEntry | null {
  const normalized = questionText.trim().toLowerCase();
  if (!normalized) return null;

  const exact = AI_KNOWLEDGE_BASE.find(
    (entry) => entry.question.toLowerCase() === normalized,
  );
  if (exact) return exact;

  const matched = AI_KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((kw) => normalized.includes(kw)),
  );
  return matched ?? null;
}

function getSegmentsCharLength(segments: AiAnswerSegment[]): number {
  return segments.reduce(
    (sum, seg) => sum + (seg.type === "text" ? seg.content.length : 1),
    0,
  );
}

interface AiCommandPaletteContentProps {
  placeholder?: string;
  onSelect?: (item: CommandPaletteItemType) => void;
  onClose?: () => void;
  isDialog?: boolean;
  className?: string;
}

function AiCommandPaletteContent({
  placeholder = "Search or ask a question",
  onSelect,
  onClose,
  isDialog = true,
  className,
}: AiCommandPaletteContentProps) {
  const [view, setView] = useState<"search" | "ai">("search");
  const [exitingAiPill, setExitingAiPill] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // AI response streaming state
  const [askedTitle, setAskedTitle] = useState("");
  const [matchedEntry, setMatchedEntry] = useState<AiKnowledgeEntry | null>(
    null,
  );
  const [aiPhase, setAiPhase] = useState<"loading" | "streaming" | "done">(
    "loading",
  );
  const [visibleChars, setVisibleChars] = useState(0);
  const [activeSourceIdx, setActiveSourceIdx] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadingTimerRef = useRef<number | null>(null);
  const streamIntervalRef = useRef<number | null>(null);
  const pillExitTimerRef = useRef<number | null>(null);

  const variantStyles = VARIANT_STYLES.ai;

  const clearAiTimers = useCallback(() => {
    if (loadingTimerRef.current !== null) {
      window.clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
    if (streamIntervalRef.current !== null) {
      window.clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [view, askedTitle]);

  useEffect(() => {
    return () => {
      clearAiTimers();
      if (pillExitTimerRef.current !== null) {
        window.clearTimeout(pillExitTimerRef.current);
      }
    };
  }, [clearAiTimers]);

  const askQuestion = useCallback(
    (rawQuestion: string) => {
      const clean = rawQuestion.trim();
      if (!clean) return;

      clearAiTimers();
      if (pillExitTimerRef.current !== null) {
        window.clearTimeout(pillExitTimerRef.current);
        pillExitTimerRef.current = null;
      }

      const entry = matchAiKnowledge(clean);
      const targetSegments = entry ? entry.segments : AI_NO_MATCH_SEGMENTS;
      const totalChars = getSegmentsCharLength(targetSegments);

      setExitingAiPill(false);
      setView("ai");
      setQuery("");
      setAskedTitle(clean);
      setMatchedEntry(entry);
      setAiPhase("loading");
      setVisibleChars(0);
      setActiveSourceIdx(0);

      // Phase 1: Skeleton state (~1.05s), then Phase 2: Stream text from start to finish
      loadingTimerRef.current = window.setTimeout(() => {
        setAiPhase("streaming");
        let count = 0;
        streamIntervalRef.current = window.setInterval(() => {
          count += 2;
          if (count >= totalChars) {
            setVisibleChars(totalChars);
            setAiPhase("done");
            if (streamIntervalRef.current !== null) {
              window.clearInterval(streamIntervalRef.current);
              streamIntervalRef.current = null;
            }
          } else {
            setVisibleChars(count);
          }
        }, 18);
      }, 1050);
    },
    [clearAiTimers],
  );

  const goBackToSearch = useCallback(() => {
    clearAiTimers();
    setExitingAiPill(true);
    setView("search");
    setQuery("");
    setActiveIndex(0);

    if (pillExitTimerRef.current !== null) {
      window.clearTimeout(pillExitTimerRef.current);
    }
    pillExitTimerRef.current = window.setTimeout(() => {
      setExitingAiPill(false);
    }, 380);
  }, [clearAiTimers]);

  // Filtered root rows
  const filteredSuggested = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AI_KNOWLEDGE_BASE;
    return AI_KNOWLEDGE_BASE.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query]);

  const filteredGoto = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AI_GOTO_ITEMS;
    return AI_GOTO_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query]);

  const rootFlatRows = useMemo(() => {
    const rows: Array<{ id: string; onExecute: () => void }> = [];
    for (const qItem of filteredSuggested) {
      rows.push({
        id: qItem.id,
        onExecute: () => askQuestion(qItem.question),
      });
    }
    for (const gItem of filteredGoto) {
      rows.push({
        id: gItem.id,
        onExecute: () => {
          onSelect?.(gItem);
          onClose?.();
        },
      });
    }
    if (rows.length === 0 && query.trim()) {
      rows.push({
        id: "ai-ask-custom",
        onExecute: () => askQuestion(query),
      });
    }
    return rows;
  }, [filteredSuggested, filteredGoto, query, askQuestion, onSelect, onClose]);

  useEffect(() => {
    if (activeIndex >= rootFlatRows.length) {
      setActiveIndex(Math.max(0, rootFlatRows.length - 1));
    }
  }, [rootFlatRows.length, activeIndex]);

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

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (view === "search") {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev + 1 < rootFlatRows.length ? prev + 1 : 0,
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev - 1 >= 0 ? prev - 1 : Math.max(0, rootFlatRows.length - 1),
          );
        } else if (e.key === "Tab") {
          e.preventDefault();
          if (query.trim()) {
            askQuestion(query);
          } else {
            askQuestion(AI_KNOWLEDGE_BASE[0].question);
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          const trimmed = query.trim();
          if (trimmed && filteredSuggested.length === 0 && filteredGoto.length === 0) {
            askQuestion(trimmed);
          } else if (rootFlatRows[activeIndex]) {
            rootFlatRows[activeIndex].onExecute();
          } else if (trimmed) {
            askQuestion(trimmed);
          }
        } else if (e.key === "Escape") {
          e.preventDefault();
          onClose?.();
        }
        return;
      }

      // AI answer view keyboard handling
      const sourceCount = matchedEntry ? matchedEntry.sources.length : 1;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSourceIdx((prev) => (prev + 1 < sourceCount ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSourceIdx((prev) =>
          prev - 1 >= 0 ? prev - 1 : Math.max(0, sourceCount - 1),
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (query.trim()) {
          askQuestion(query);
        } else if (aiPhase === "done") {
          if (matchedEntry) {
            const chosen = matchedEntry.sources[activeSourceIdx];
            if (chosen) {
              onSelect?.({ id: chosen.id, label: chosen.title, icon: FileText });
              onClose?.();
            }
          } else {
            onSelect?.({
              id: "ai-contact-support",
              label: "Contact support",
              icon: LifeBuoy,
            });
            onClose?.();
          }
        }
      } else if (e.key === "Backspace" && !query) {
        e.preventDefault();
        goBackToSearch();
      } else if (e.key === "Escape") {
        e.preventDefault();
        goBackToSearch();
      }
    },
    [
      view,
      rootFlatRows,
      activeIndex,
      query,
      filteredSuggested.length,
      filteredGoto.length,
      askQuestion,
      onClose,
      matchedEntry,
      aiPhase,
      activeSourceIdx,
      onSelect,
      goBackToSearch,
    ],
  );

  const renderStreamedSegments = (segments: AiAnswerSegment[]) => {
    let remaining = visibleChars;
    const nodes: ReactNode[] = [];

    segments.forEach((seg, idx) => {
      if (remaining <= 0) return;

      if (seg.type === "text") {
        const slice = seg.content.slice(0, remaining);
        remaining -= slice.length;
        nodes.push(<span key={`txt-${idx}`}>{slice}</span>);
      } else {
        remaining -= 1;
        nodes.push(
          <span
            key={`cite-${idx}`}
            className="mx-0.5 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800 px-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 align-baseline select-none"
          >
            {seg.num}
          </span>,
        );
      }
    });

    return nodes;
  };

  let rowIdx = -1;

  return (
    <div
      data-variant="ai"
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-all",
        variantStyles.wrapper,
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: NESTED_SLIDE_KEYFRAMES }} />

      {/* Top Search / Follow-up Input Row */}
      <div
        className={cn(
          "flex items-center gap-2.5 px-4 py-3.5 sm:px-5 sm:py-4",
          variantStyles.header,
        )}
      >
        {/* Fixed-size icon slot so Search & Back never jump */}
        {view === "search" ? (
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center">
            <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          </span>
        ) : (
          <button
            type="button"
            onClick={goBackToSearch}
            aria-label="Back to search"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        {/* Ask AI Pill: glides slowly in from right, glides out slowly on back */}
        {view === "ai" ? (
          <span
            style={{
              animation: "cp-pill-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both",
            }}
            className="inline-flex shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 select-none"
          >
            <SparkleIcon className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Ask AI</span>
          </span>
        ) : exitingAiPill ? (
          <span
            aria-hidden="true"
            style={{
              animation:
                "cp-pill-out 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
            className="pointer-events-none inline-flex shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 select-none"
          >
            <SparkleIcon className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Ask AI</span>
          </span>
        ) : null}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          placeholder={view === "ai" ? "Ask a follow-up" : placeholder}
          className="w-full min-w-0 bg-transparent text-sm sm:text-[15px] font-normal text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
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
            onClick={view === "ai" ? goBackToSearch : onClose}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 px-2 py-0.5 text-xs font-medium text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition select-none"
          >
            Esc
          </kbd>
        )}
      </div>

      {/* Body Area */}
      {view === "search" ? (
        <div
          ref={listRef}
          className={cn(
            "max-h-[340px] min-h-[140px] overflow-y-auto p-2 sm:p-2.5 space-y-3",
            SLIM_SCROLLBAR_CLASS,
          )}
          role="listbox"
        >
          {/* Suggested questions */}
          {filteredSuggested.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Suggested questions
              </div>
              <div className="space-y-0.5">
                {filteredSuggested.map((qItem) => {
                  rowIdx += 1;
                  const idx = rowIdx;
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={qItem.id}
                      data-palette-index={idx}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => askQuestion(qItem.question)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={cn(
                        "group flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition-colors rounded-xl",
                        isActive
                          ? variantStyles.activeItem
                          : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40",
                      )}
                    >
                      <HelpCircle className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                      <span className="truncate font-normal">
                        {qItem.question}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Go to navigation */}
          {filteredGoto.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Go to
              </div>
              <div className="space-y-0.5">
                {filteredGoto.map((item) => {
                  rowIdx += 1;
                  const idx = rowIdx;
                  const isActive = activeIndex === idx;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      data-palette-index={idx}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        onSelect?.(item);
                        onClose?.();
                      }}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={cn(
                        "group flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors rounded-xl",
                        isActive
                          ? variantStyles.activeItem
                          : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {Icon && (
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0",
                              isActive
                                ? "text-zinc-900 dark:text-zinc-100"
                                : "text-zinc-400 dark:text-zinc-500",
                            )}
                          />
                        )}
                        <span className="truncate font-normal">
                          {item.label}
                        </span>
                      </div>

                      {item.shortcuts && item.shortcuts.length > 0 && (
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          {item.shortcuts.map((sc, sIdx) => (
                            <kbd
                              key={sIdx}
                              className={cn(
                                "inline-flex h-5 min-w-5 items-center justify-center rounded border px-1.5 text-[11px] font-medium font-mono",
                                isActive
                                  ? "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
                                  : "border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/60 text-zinc-400 dark:text-zinc-500",
                              )}
                            >
                              {sc}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Direct Ask AI prompt when typed query has no built-in match */}
          {filteredSuggested.length === 0 &&
            filteredGoto.length === 0 &&
            query.trim() && (
              <div className="space-y-1">
                <div className="px-3 py-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  Ask AI
                </div>
                <div
                  data-palette-index={0}
                  role="option"
                  aria-selected={true}
                  onClick={() => askQuestion(query)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm rounded-xl",
                    variantStyles.activeItem,
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <SparkleIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    <span className="truncate">
                      Ask AI: &ldquo;{query.trim()}&rdquo;
                    </span>
                  </div>
                  <kbd className="inline-flex h-5 items-center justify-center rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 px-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-300">
                    ↵
                  </kbd>
                </div>
              </div>
            )}
        </div>
      ) : (
        /* AI Answer & Streaming Body */
        <div
          className={cn(
            "max-h-[380px] overflow-y-auto px-5 py-4 space-y-4",
            SLIM_SCROLLBAR_CLASS,
          )}
        >
          {/* Question Title + Status Line */}
          <div className="space-y-1.5">
            <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
              {askedTitle}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
              <SparkleIcon
                className={cn(
                  "h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500",
                  aiPhase !== "done" && "animate-pulse",
                )}
              />
              <span>
                {aiPhase === "loading"
                  ? "Searching the help center"
                  : aiPhase === "streaming"
                    ? matchedEntry
                      ? "Searching the help center"
                      : "Searching the help center"
                    : matchedEntry
                      ? matchedEntry.durationLabel
                      : "Searched the help center: no match"}
              </span>
            </div>
          </div>

          {/* Phase 1: Skeleton Bars OR Phase 2/3: Streamed Answer */}
          {aiPhase === "loading" ? (
            <div className="space-y-2.5 pt-1">
              <div className="h-3 w-[96%] rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
              <div className="h-3 w-[89%] rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
              <div className="h-3 w-[54%] rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
              {renderStreamedSegments(
                matchedEntry ? matchedEntry.segments : AI_NO_MATCH_SEGMENTS,
              )}
              {aiPhase === "streaming" && (
                <span className="ml-0.5 inline-block h-3.5 w-1.5 align-middle rounded-xs bg-zinc-400 dark:bg-zinc-500 animate-pulse" />
              )}
            </p>
          )}

          {/* Sources Section (matched) OR Contact Support (unmatched) */}
          {matchedEntry ? (
            <div className="space-y-2 pt-1">
              <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Sources
              </div>

              {aiPhase === "loading" ? (
                <div className="flex items-center justify-between py-1.5 opacity-45">
                  <div className="flex items-center gap-2.5 min-w-0 text-sm">
                    <FileText className="h-4 w-4 shrink-0 text-zinc-400" />
                    <span className="truncate text-zinc-600 dark:text-zinc-300">
                      {matchedEntry.sources[0].title}
                    </span>
                    <span className="truncate text-xs text-zinc-400">
                      {matchedEntry.sources[0].path}
                    </span>
                  </div>
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 text-[11px] font-medium text-zinc-400">
                    1
                  </span>
                </div>
              ) : (
                <div className="space-y-0.5 -mx-2">
                  {matchedEntry.sources.map((src, idx) => {
                    const isActive =
                      aiPhase === "done" && activeSourceIdx === idx;
                    return (
                      <div
                        key={src.id}
                        onClick={() => {
                          onSelect?.({
                            id: src.id,
                            label: src.title,
                            icon: FileText,
                          });
                          onClose?.();
                        }}
                        onMouseEnter={() => setActiveSourceIdx(idx)}
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-sm transition-colors",
                          isActive
                            ? variantStyles.activeItem
                            : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50",
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                          <span className="truncate font-normal">
                            {src.title}
                          </span>
                          <span className="truncate text-xs text-zinc-400 dark:text-zinc-500">
                            {src.path}
                          </span>
                        </div>
                        <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 ml-2">
                          {src.index}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            aiPhase === "done" && (
              <div className="pt-1 -mx-2">
                <div
                  onClick={() => {
                    onSelect?.({
                      id: "ai-contact-support",
                      label: "Contact support",
                      icon: LifeBuoy,
                    });
                    onClose?.();
                  }}
                  className="flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <LifeBuoy className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
                    <span className="font-normal">Contact support</span>
                  </div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    Usually within a few hours
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}

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
            <span className="text-zinc-500 dark:text-zinc-400">
              {view === "ai" && matchedEntry ? "Sources" : "Move"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-[10px]">
              <CornerDownLeft className="h-3 w-3" />
            </kbd>
            <span className="text-zinc-500 dark:text-zinc-400">Open</span>
          </div>

          {view === "search" ? (
            <button
              type="button"
              onClick={() =>
                askQuestion(query.trim() || AI_KNOWLEDGE_BASE[0].question)
              }
              className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200 transition"
            >
              <kbd className="inline-flex h-4.5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 text-[10px] font-mono">
                Tab
              </kbd>
              <span className="text-zinc-500 dark:text-zinc-400">Ask AI</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={goBackToSearch}
              className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200 transition"
            >
              <kbd className="inline-flex h-4.5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 text-[10px] font-mono">
                Esc
              </kbd>
              <span className="text-zinc-500 dark:text-zinc-400">Back</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. PALETTE CONTENT DISPATCHER (Handles "linear", "nested", "inline", "ai")
// ============================================================================

export interface CommandPaletteContentProps {
  variant?: CommandPaletteVariant;
  placeholder?: string;
  groups: CommandPaletteGroupType[];
  onSelect?: (item: CommandPaletteItemType) => void;
  onClose?: () => void;
  isDialog?: boolean;
  className?: string;
  contextId?: string;
  contextTitle?: string;
  nestedState?: NestedPaletteState;
  onNestedStateChange?: (next: NestedPaletteState) => void;
}

export function CommandPaletteContent({
  variant = "linear",
  placeholder = "Search pages, projects and actions",
  groups,
  onSelect,
  onClose,
  isDialog = true,
  className,
  contextId = "AVA-214",
  contextTitle = "Rewrite the welcome email",
  nestedState,
  onNestedStateChange,
}: CommandPaletteContentProps) {
  const [internalNested, setInternalNested] = useState<NestedPaletteState>(
    nestedState ?? DEFAULT_NESTED_PALETTE_STATE,
  );

  const resolvedNestedState = nestedState ?? internalNested;
  const handleNestedChange = useCallback(
    (next: NestedPaletteState) => {
      if (onNestedStateChange) {
        onNestedStateChange(next);
      } else {
        setInternalNested(next);
      }
    },
    [onNestedStateChange],
  );

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus search input only when opened inside a dialog modal
  useEffect(() => {
    if (isDialog && variant !== "nested" && variant !== "ai") {
      inputRef.current?.focus();
    }
  }, [isDialog, variant]);

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

  if (variant === "nested") {
    return (
      <NestedCommandPaletteContent
        placeholder={
          placeholder === "Search pages, projects and actions"
            ? "Type a command or search"
            : placeholder
        }
        contextId={contextId}
        contextTitle={contextTitle}
        nestedState={resolvedNestedState}
        onNestedStateChange={handleNestedChange}
        onSelect={onSelect}
        onClose={onClose}
        isDialog={isDialog}
        className={className}
      />
    );
  }

  if (variant === "ai") {
    return (
      <AiCommandPaletteContent
        placeholder={
          placeholder === "Search pages, projects and actions"
            ? "Search or ask a question"
            : placeholder
        }
        onSelect={onSelect}
        onClose={onClose}
        isDialog={isDialog}
        className={className}
      />
    );
  }

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
        className={cn(
          "max-h-[340px] min-h-[140px] overflow-y-auto p-2 sm:p-2.5 space-y-3",
          SLIM_SCROLLBAR_CLASS,
        )}
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
// 7. MAIN EXPORTED COMPONENT (Search Box initially -> Modal on click)
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
  contextId = "AVA-214",
  contextTitle = "Rewrite the welcome email",
  nestedState,
  onNestedStateChange,
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

  // Global keyboard shortcut listener for Ctrl+K / Cmd+K (modal variants only)
  useEffect(() => {
    if (variant === "inline") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [variant, isOpen, setOpen]);

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

  // Always-open inline variant (no trigger button, no backdrop modal)
  if (variant === "inline") {
    return (
      <div
        style={containerStyle}
        className={cn("w-full max-w-xl mx-auto", className)}
        {...props}
      >
        <CommandPaletteContent
          variant="inline"
          placeholder={placeholder}
          groups={groups}
          onSelect={onSelect}
          isDialog={false}
        />
      </div>
    );
  }

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
                contextId={contextId}
                contextTitle={contextTitle}
                nestedState={nestedState}
                onNestedStateChange={onNestedStateChange}
              />
            </div>
          </div>,
          portalTarget,
        )}
    </div>
  );
}

export default CommandPalette;
