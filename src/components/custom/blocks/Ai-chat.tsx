"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  Bot,
  Calendar,
  ChartLine,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  Cpu,
  Crown,
  Edit2,
  FileText,
  Gauge,
  Globe,
  ImageIcon,
  Mail,
  Menu,
  MessageSquare,
  Mic,
  MoreVertical,
  Paperclip,
  Plus,
  Rocket,
  Send,
  Settings,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useInsertionEffect,
  useRef,
  useState,
} from "react";
import { bezierEase } from "./gsap-motion";
import { SurfaceContext, useSurface } from "./glass-panel-context";
import { MOTION_EASE, springEase, springLinear } from "./motion-curves";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type AIChatVariant = "default" | "minimal" | "glass" | "compact" | "liquid-glass";

import {
  LiquidGlassBackground,
  LiquidGlassSvgFilter,
  formatRadius,
} from "@/components/custom/ui/liquid-glass";
export { LiquidGlassSvgFilter };

// We use (string & {}) to preserve IDE autocomplete for the predefined types
// while still allowing any arbitrary hex string like "#000fff".
export type AIChatColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

const chatVariants: Record<AIChatVariant, Record<string, string>> = {
  default: {
    wrapper:
      "bg-background border border-border shadow-none",
    sidebar:
      "bg-card/95 backdrop-blur-xl border-r border-border shadow-2xl lg:shadow-none rounded-r-2xl rounded-l-none lg:rounded-none",
    main: "bg-background",
    header:
      "bg-background/80 border-b border-border backdrop-blur-xl",
    input: "bg-muted border border-border",
    msgUser: "text-white rounded-2xl rounded-tr-sm shadow-sm",
    msgAi:
      "bg-card text-foreground border border-border rounded-2xl rounded-tl-sm shadow-sm",
  },
  minimal: {
    wrapper: "bg-transparent border-none shadow-none rounded-none",
    sidebar:
      "bg-background/95 dark:bg-zinc-900/95 lg:bg-muted/50 backdrop-blur-2xl rounded-r-2xl rounded-l-none lg:rounded-2xl border border-border lg:mr-4 shadow-2xl lg:shadow-none",
    main: "bg-transparent",
    header: "bg-transparent border-b border-border mb-2",
    input: "bg-muted border border-border",
    msgUser: "text-white rounded-2xl rounded-br-sm shadow-sm",
    msgAi: "bg-muted text-foreground rounded-2xl rounded-bl-sm",
  },
  compact: {
    wrapper:
      "bg-background border border-border shadow-none",
    sidebar: "",
    main: "bg-background",
    header:
      "bg-background/80 border-b border-border backdrop-blur-xl",
    input: "bg-muted border border-border",
    msgUser: "text-white rounded-2xl rounded-tr-sm shadow-sm",
    msgAi:
      "bg-card text-foreground border border-border rounded-2xl rounded-tl-sm shadow-sm",
  },
  glass: {
    wrapper:
      "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl",
    sidebar:
      "bg-white/40 dark:bg-zinc-950/60 lg:bg-white/[0.08] lg:dark:bg-white/[0.03] backdrop-blur-3xl backdrop-saturate-150 border-r border-white/25 dark:border-white/10 shadow-2xl lg:shadow-none rounded-r-2xl rounded-l-none lg:rounded-none",
    main: "bg-transparent",
    header:
      "bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10 backdrop-blur-md",
    input:
      "bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/10 backdrop-blur-md",
    msgUser: "text-white rounded-2xl rounded-tr-sm shadow-lg",
    msgAi:
      "bg-white/50 dark:bg-black/50 backdrop-blur-md text-foreground border border-white/30 dark:border-white/10 rounded-2xl rounded-tl-sm",
  },
  "liquid-glass": {
    wrapper:
      "bg-transparent border-0 shadow-[0_25px_60px_rgba(0,0,0,0.45)] text-white [--foreground:#ffffff] [--muted-foreground:rgba(255,255,255,0.75)] [--color-foreground:#ffffff] [--color-muted-foreground:rgba(255,255,255,0.75)]",
    sidebar:
      "bg-white/[0.07] dark:bg-black/25 border-r border-white/20 dark:border-white/10",
    main: "bg-transparent",
    header:
      "bg-white/[0.07] dark:bg-black/25 border-b border-white/20 dark:border-white/10",
    input:
      "bg-white/15 dark:bg-black/30 border border-white/20 dark:border-white/10 backdrop-blur-md text-white placeholder:text-white/60",
    msgUser: "text-white rounded-2xl rounded-tr-sm shadow-md border border-white/20",
    msgAi:
      "bg-white/15 dark:bg-white/10 backdrop-blur-md text-white border border-white/20 dark:border-white/15 rounded-2xl rounded-tl-sm shadow-sm",
  },
};

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    primaryText: "text-primary",
    primaryBg: "bg-primary hover:bg-primary/90 text-primary-foreground",
    primaryHover: "hover:text-primary hover:bg-primary/10",
    lightBg: "bg-primary/10 text-foreground",
    gradient: "from-primary to-primary/80",
    shadow: "shadow-primary/20",
    ring: "focus-within:border-primary/50 focus-within:ring-primary/10",
    focusRing: "focus:ring-primary/20",
    inputBorder: "border-primary/30",
  },
  indigo: {
    primaryText: "text-indigo-500 dark:text-indigo-400",
    primaryBg: "bg-indigo-500 hover:bg-indigo-600 text-white",
    primaryHover:
      "hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10",
    lightBg:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/20",
    ring: "focus-within:border-indigo-500/50 focus-within:ring-indigo-500/10",
    focusRing: "focus:ring-indigo-500/20",
    inputBorder: "border-indigo-300 dark:border-indigo-500/50",
  },
  rose: {
    primaryText: "text-rose-500 dark:text-rose-400",
    primaryBg: "bg-rose-500 hover:bg-rose-600 text-white",
    primaryHover:
      "hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10",
    lightBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",
    gradient: "from-rose-500 to-orange-500",
    shadow: "shadow-rose-500/20",
    ring: "focus-within:border-rose-500/50 focus-within:ring-rose-500/10",
    focusRing: "focus:ring-rose-500/20",
    inputBorder: "border-rose-300 dark:border-rose-500/50",
  },
  emerald: {
    primaryText: "text-emerald-500 dark:text-emerald-400",
    primaryBg: "bg-emerald-500 hover:bg-emerald-600 text-white",
    primaryHover:
      "hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
    lightBg:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
    ring: "focus-within:border-emerald-500/50 focus-within:ring-emerald-500/10",
    focusRing: "focus:ring-emerald-500/20",
    inputBorder: "border-emerald-300 dark:border-emerald-500/50",
  },
  zinc: {
    primaryText: "text-zinc-900 dark:text-zinc-100",
    primaryBg:
      "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900",
    primaryHover:
      "hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    gradient: "from-zinc-700 to-zinc-900 dark:from-zinc-300 dark:to-zinc-500",
    shadow: "shadow-zinc-900/10 dark:shadow-white/10",
    ring: "focus-within:border-zinc-500/50 focus-within:ring-zinc-500/10",
    focusRing: "focus:ring-zinc-500/20",
    inputBorder: "border-zinc-300 dark:border-zinc-500/50",
  },
};

export type ChatThread = {
  id: number | string;
  title: string;
  date: string;
};

/**
 * Roles the component understands.
 *
 * The `(string & {})` member keeps IDE autocomplete for "ai" and "user" while
 * still accepting a plain `string`. That lets consumers pass an inferred array
 * literal — `const messages = [{ id: 1, role: "ai", ... }]` — without needing
 * `as const` or an explicit `Message[]` annotation. Any role that is not
 * "user" is rendered as an AI message.
 */
export type MessageRole = "ai" | "user" | (string & {});

/** A file that travelled with a message — what the bubble renders. */
export type MessageAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  /** Object URL or remote URL; images render as thumbnails when present. */
  previewUrl?: string;
};

export type Message = {
  id: number | string;
  role: MessageRole;
  content: string;
  time: string;
  attachments?: MessageAttachment[];
  /** Display name of the model that produced (or was asked for) this message. */
  model?: string;
  /** Display label of the effort level in force for this message. */
  effort?: string;
};

export type ChatModel = {
  id: string;
  name: string;
  description?: string;
  /** Small tag beside the name, e.g. "New" or "Beta". */
  badge?: string;
  /**
   * Marks the top paid tier: a gold "Premium" badge follows the name, the
   * picker pill turns gold while it is chosen, and choosing it plays a one-off
   * flourish on the pill and the prompt bar.
   */
  premium?: boolean;
  /**
   * Marks the middle paid tier: an electric-blue "Pro" badge, a blue pill
   * while chosen, and its own one-off flourish when picked. `premium` wins if
   * both are set.
   */
  pro?: boolean;
};

type ModelTier = "premium" | "pro";

const modelTier = (model: ChatModel): ModelTier | undefined =>
  model.premium ? "premium" : model.pro ? "pro" : undefined;

export type EffortLevel = "low" | "medium" | "high" | "max" | (string & {});

export type EffortOption = {
  id: EffortLevel;
  label: string;
  description?: string;
  /** 1–4, how many bars the indicator lights. */
  level: number;
};

/**
 * One row of the composer's "+" menu. `action: "upload"` opens the file
 * picker; everything else (the default) drops `@Label` into the prompt so the
 * request can name the source it wants.
 */
export type ComposerTool = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  action?: "upload" | "mention";
};

/** What `onSend` receives — everything the composer knows when a prompt goes out. */
export type SendPayload = {
  content: string;
  attachments: MessageAttachment[];
  model: ChatModel;
  effort: EffortOption;
  /** Tools named in the prompt as `@Label`, in the order they appear. */
  tools: ComposerTool[];
};

/**
 * Bring-your-own upload. Report progress as 0–100; resolve when the file is
 * stored, reject to mark the chip as failed. `signal` aborts when the user
 * removes the chip mid-flight.
 */
export type UploadHandler = (
  file: File,
  onProgress: (percent: number) => void,
  signal: AbortSignal,
) => Promise<void>;

type UploadStatus = "uploading" | "done" | "error";

type PendingAttachment = MessageAttachment & {
  file: File;
  progress: number;
  status: UploadStatus;
};

const defaultModels: ChatModel[] = [
  {
    id: "lumen-ultra",
    name: "Lumen Ultra",
    description: "Deepest reasoning for hard problems",
    premium: true,
  },
  {
    id: "lumen-plus",
    name: "Lumen Plus",
    description: "Best for everyday complex work",
    pro: true,
  },
  {
    id: "lumen-flash",
    name: "Lumen Flash",
    description: "Fast answers at a lower cost",
  },
  {
    id: "lumen-mini",
    name: "Lumen Mini",
    description: "Lightweight, near-instant replies",
  },
];

const defaultEfforts: EffortOption[] = [
  { id: "low", label: "Low", description: "Quickest reply", level: 1 },
  {
    id: "medium",
    label: "Medium",
    description: "Balanced speed and depth",
    level: 2,
  },
  {
    id: "high",
    label: "High",
    description: "Thinks longer before answering",
    level: 3,
  },
  { id: "max", label: "Max", description: "Most thorough reasoning", level: 4 },
];

const defaultTools: ComposerTool[] = [
  {
    id: "files",
    label: "Photos & files",
    description: "Upload from this device",
    icon: <Paperclip className="w-4 h-4" />,
    action: "upload",
  },
  {
    id: "web",
    label: "Web search",
    description: "Live results",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    id: "sales",
    label: "Sales data",
    description: "Revenue and churn",
    icon: <ChartLine className="w-4 h-4" />,
  },
  {
    id: "documents",
    label: "Documents",
    description: "Specs, notes, briefs",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "mail",
    label: "Mail",
    description: "Read and draft mail",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    id: "calendar",
    label: "Calendar",
    description: "Events and availability",
    icon: <Calendar className="w-4 h-4" />,
  },
];

/** `@Label` as it is written into the prompt. */
const mentionFor = (tool: ComposerTool) => `@${tool.label}`;

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Stand-in for a network upload: eases to 100% over one to three seconds
 * depending on size, with a short hitch near the end the way real transfers
 * have. Swap it out with the `uploadFile` prop.
 */
const simulateUpload: UploadHandler = (file, onProgress, signal) =>
  new Promise<void>((resolve, reject) => {
    const total = 1400 + Math.min(file.size / 15000, 2200);
    const start = performance.now();
    const tick = (now: number) => {
      if (signal.aborted) {
        reject(new DOMException("Upload cancelled", "AbortError"));
        return;
      }
      const t = Math.min(Math.max((now - start) / total, 0), 1);
      const eased = 1 - Math.pow(1 - t, 2.4);
      const hitch = t > 0.72 && t < 0.82 ? 0.72 : eased;
      onProgress(Math.round(Math.min(hitch, eased) * 100));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

export default function AIChat({
  chatHistory = [],
  initialMessages = [],
  variant = "default",
  color = "primary",
  showSidebar = variant !== "compact",
  heroTitle = "What can I help you with?",
  heroSubtitle,
  models = defaultModels,
  defaultModelId,
  onModelChange,
  efforts = defaultEfforts,
  defaultEffort = "medium",
  onEffortChange,
  onSend,
  uploadFile,
  accept,
  maxFiles = 6,
  tools = defaultTools,
  rounded,
  className,
}: {
  chatHistory?: readonly ChatThread[];
  initialMessages?: readonly Message[];
  variant?: AIChatVariant;
  color?: AIChatColor;
  /**
   * Renders the thread history beside the conversation. Off for `compact`,
   * on for every other variant; pass `false` to drop it from any shell.
   */
  showSidebar?: boolean;
  /**
   * Shown above the prompt bar while a sidebar-less conversation is still
   * empty — the hero state before anything has been said.
   */
  heroTitle?: string;
  heroSubtitle?: string;
  /** Models offered in the composer's picker. */
  models?: readonly ChatModel[];
  /** Which model is selected on mount; the first one when omitted. */
  defaultModelId?: string;
  onModelChange?: (model: ChatModel) => void;
  /** Effort levels offered in the composer's picker. */
  efforts?: readonly EffortOption[];
  /** Which effort is selected on mount. */
  defaultEffort?: EffortLevel;
  onEffortChange?: (effort: EffortOption) => void;
  /** Fires with the prompt, its finished attachments and the chosen model and effort. */
  onSend?: (payload: SendPayload) => void;
  /** Real upload for attachments. Uploads are simulated when omitted. */
  uploadFile?: UploadHandler;
  /** Passed to the file input, e.g. "image/*,.pdf". Anything when omitted. */
  accept?: string;
  /** Maximum attachments on one message. */
  maxFiles?: number;
  /** Rows of the "+" menu. One `action: "upload"` row opens the picker; the rest insert `@Label`. */
  tools?: readonly ComposerTool[];
  /** Optional dynamic corner rounding radius value (e.g. "24px", "1.5rem", or Tailwind class) */
  rounded?: string | number;
  className?: string;
}) {
  const isCustomHex = color.startsWith("#");

  // 1. If it's a custom hex, we generate opacity variants and inject them into the DOM
  const customVars = isCustomHex
    ? ({
        "--chat-custom": color,
        "--chat-custom-10": `${color}1a`, // 10% opacity
        "--chat-custom-20": `${color}33`, // 20% opacity
        "--chat-custom-50": `${color}80`, // 50% opacity
      } as React.CSSProperties)
    : {};

  // 2. We dynamically assemble the Tailwind theme mapping to point to our CSS variables
  const theme = isCustomHex
    ? {
        primaryText: "text-[var(--chat-custom)]",
        primaryBg: "bg-[var(--chat-custom)] hover:brightness-110 text-white",
        primaryHover:
          "hover:text-[var(--chat-custom)] hover:bg-[var(--chat-custom-10)]",
        lightBg: "bg-[var(--chat-custom-10)] text-[var(--chat-custom)]",
        gradient: "from-[var(--chat-custom)] to-[var(--chat-custom-50)]",
        shadow: "shadow-[0_4px_14px_0_var(--chat-custom-20)]",
        ring: "focus-within:border-[var(--chat-custom-50)] focus-within:ring-2 focus-within:ring-[var(--chat-custom-10)]",
        focusRing: "focus:ring-2 focus:ring-[var(--chat-custom-20)]",
        inputBorder: "border-[var(--chat-custom-50)]",
      }
    : colorThemes[color] || colorThemes["primary"];

  const styles = chatVariants[variant];
  const inheritedSurface = useSurface();
  const isLiquid = variant === "liquid-glass" || inheritedSurface === "liquid-glass";
  const surfaceValue = isLiquid ? "liquid-glass" : inheritedSurface;

  // Ink for the accent-gradient tiles, read off `theme.primaryBg` so it matches
  // the button text: `primary` pairs with primary-foreground, not white.
  const onAccentText =
    theme.primaryBg
      .split(" ")
      .filter((c) => c.startsWith("text-") || c.startsWith("dark:text-"))
      .join(" ") || "text-primary-foreground";

  // Without a sidebar there is nothing to pick a thread from, so an empty
  // history starts one conversation seeded with `initialMessages`.
  const [threads] = useState<readonly ChatThread[]>(() =>
    chatHistory.length === 0 && !showSidebar
      ? [{ id: "conversation", title: "New Conversation", date: "Today" }]
      : chatHistory,
  );

  const [chats, setChats] = useState<ChatThread[]>(() => [...threads]);
  const [activeChatId, setActiveChatId] = useState<number | string | null>(
    threads.length > 0 ? threads[0].id : null,
  );

  const [messagesMap, setMessagesMap] = useState<
    Record<string | number, Message[]>
  >(() => {
    const map: Record<string | number, Message[]> = {};
    threads.forEach((chat, index) => {
      map[chat.id] =
        index === 0
          ? [...initialMessages]
          : [
              {
                id: `welcome-${chat.id}`,
                role: "ai",
                content: `Hello! You are viewing the chat: "${chat.title}". How can I help you further?`,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ];
    });
    return map;
  });

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingChatId, setEditingChatId] = useState<number | string | null>(
    null,
  );
  const [editTitleValue, setEditTitleValue] = useState("");

  const [selectedModelId, setSelectedModelId] = useState<string>(
    () => defaultModelId ?? models[0]?.id ?? "",
  );
  const [selectedEffortId, setSelectedEffortId] =
    useState<EffortLevel>(defaultEffort);
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [openMenu, setOpenMenu] = useState<"tools" | "model" | "effort" | null>(
    null,
  );
  // Counts tier picks while the flourish plays (0 = idle); each new value
  // remounts the flourish so a quick re-pick replays it from the start.
  const [tierFx, setTierFx] = useState(0);

  const composerRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllers = useRef(new Map<string, AbortController>());

  const selectedModel =
    models.find((m) => m.id === selectedModelId) ??
    models[0] ??
    defaultModels[1];
  const selectedEffort =
    efforts.find((e) => e.id === selectedEffortId) ??
    efforts[0] ??
    defaultEfforts[1];

  const isUploading = attachments.some((a) => a.status === "uploading");

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const activeMessages = activeChatId ? messagesMap[activeChatId] || [] : [];

  const voice = useVoiceInput(
    useCallback((transcript: string) => setInputValue(transcript), []),
    () => inputValue,
  );

  // Abort in-flight uploads when the component unmounts.
  useEffect(() => {
    const controllers = abortControllers.current;
    return () => {
      controllers.forEach((c) => c.abort());
      controllers.clear();
    };
  }, []);

  const updateAttachment = (id: string, patch: Partial<PendingAttachment>) =>
    setAttachments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    );

  const addFiles = (incoming: FileList | File[]) => {
    const room = Math.max(0, maxFiles - attachments.length);
    const next: PendingAttachment[] = Array.from(incoming)
      .slice(0, room)
      .map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        file,
        progress: 0,
        status: "uploading",
      }));
    if (next.length === 0) return;

    setAttachments((prev) => [...prev, ...next]);

    const upload = uploadFile ?? simulateUpload;
    next.forEach((att) => {
      const controller = new AbortController();
      abortControllers.current.set(att.id, controller);
      upload(
        att.file,
        (pct) => updateAttachment(att.id, { progress: pct }),
        controller.signal,
      )
        .then(() => updateAttachment(att.id, { progress: 100, status: "done" }))
        .catch((err: unknown) => {
          if ((err as { name?: string })?.name !== "AbortError")
            updateAttachment(att.id, { status: "error" });
        })
        .finally(() => abortControllers.current.delete(att.id));
    });
  };

  const removeAttachment = (id: string) => {
    abortControllers.current.get(id)?.abort();
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((a) => a.id !== id);
    });
  };

  /** Runs a "+" menu row: open the picker, or write `@Label` at the caret. */
  const runTool = (tool: ComposerTool) => {
    setOpenMenu(null);
    if (tool.action === "upload") {
      fileInputRef.current?.click();
      return;
    }
    const token = mentionFor(tool);
    const el = textareaRef.current;
    const value = inputValue;
    const already = value.includes(token);
    let caret = value.length;
    if (!already) {
      const start = el?.selectionStart ?? value.length;
      const end = el?.selectionEnd ?? value.length;
      const before = value.slice(0, start);
      const after = value.slice(end);
      const lead = before && !/\s$/.test(before) ? " " : "";
      const trail = after && !/^\s/.test(after) ? " " : " ";
      const next = `${before}${lead}${token}${trail}${after}`;
      caret = (before + lead + token + trail).length;
      setInputValue(next);
    }
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(caret, caret);
    });
  };

  const selectModel = (model: ChatModel) => {
    // A pick outside the tiers cuts a flourish that is still playing short.
    if (model.id !== selectedModel.id) {
      const animate =
        !!modelTier(model) &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTierFx((n) => (animate ? n + 1 : 0));
    }
    setSelectedModelId(model.id);
    setOpenMenu(null);
    onModelChange?.(model);
  };

  const selectEffort = (effort: EffortOption) => {
    setSelectedEffortId(effort.id);
    onEffortChange?.(effort);
  };

  const maxEffortLevel = Math.max(...efforts.map((e) => e.level));
  const isMaxEffort = selectedEffort.level >= maxEffortLevel;
  const selectedTier = modelTier(selectedModel);
  const tierLook = selectedTier && TIERS[selectedTier];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeMessages, isTyping]);

  const handleNewChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: "New Conversation", date: "Today" };

    setChats([newChat, ...chats]);
    setMessagesMap((prev) => ({
      ...prev,
      // Without a sidebar a new thread starts at the hero, not at a greeting.
      [newId]: showSidebar
        ? [
            {
              id: Date.now() + 1,
              role: "ai",
              content:
                "Hello! I am your AI assistant. How can I help you today?",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]
        : [],
    }));
    setActiveChatId(newId);
    if (typeof window !== "undefined" && window.innerWidth < 1024)
      setIsSidebarOpen(false);
  };

  const handleSelectChat = (id: string | number) => {
    if (editingChatId) return;
    setActiveChatId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024)
      setIsSidebarOpen(false);
  };

  const startEditingChat = (chat: ChatThread, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitleValue(chat.title);
  };

  const saveEditChat = (
    id: string | number,
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => {
    e?.stopPropagation();
    if (!editTitleValue.trim()) return;
    setChats(
      chats.map((c) => (c.id === id ? { ...c, title: editTitleValue } : c)),
    );
    setEditingChatId(null);
    setEditTitleValue("");
  };

  const cancelEditChat = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setEditingChatId(null);
    setEditTitleValue("");
  };

  const handleDeleteChat = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedChats = chats.filter((c) => c.id !== id);
    setChats(updatedChats);

    const updatedMessagesMap = { ...messagesMap };
    delete updatedMessagesMap[id];
    setMessagesMap(updatedMessagesMap);

    if (activeChatId === id) {
      setActiveChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    const content = inputValue.trim();
    if (!activeChatId || isUploading || voice.isListening) return;
    if (!content && attachments.length === 0) return;

    const sent: MessageAttachment[] = attachments
      .filter((a) => a.status === "done")
      .map(({ id, name, size, type, previewUrl }) => ({
        id,
        name,
        size,
        type,
        previewUrl,
      }));

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachments: sent.length ? sent : undefined,
    };

    const mentioned = tools
      .filter((t) => t.action !== "upload" && content.includes(mentionFor(t)))
      .sort(
        (a, b) =>
          content.indexOf(mentionFor(a)) - content.indexOf(mentionFor(b)),
      );

    onSend?.({
      content,
      attachments: sent,
      model: selectedModel,
      effort: selectedEffort,
      tools: mentioned,
    });

    setMessagesMap((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), userMsg],
    }));

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId && c.title === "New Conversation"
          ? {
              ...c,
              title:
                inputValue.slice(0, 25) + (inputValue.length > 25 ? "..." : ""),
            }
          : c,
      ),
    );

    setInputValue("");
    setAttachments([]);
    setIsTyping(true);

    const fileNote =
      sent.length > 0
        ? `I've received ${sent.length === 1 ? sent[0].name : `${sent.length} files`} and read through ${sent.length === 1 ? "it" : "them"}. `
        : "";
    const toolNote =
      mentioned.length > 0
        ? `Checking ${mentioned.map((t) => t.label).join(", ")} for you. `
        : "";

    setTimeout(
      () => {
        const aiMsg: Message = {
          id: Date.now() + 1,
          role: "ai",
          content: `${fileNote}${toolNote}That's a great point! Based on your input, I can process this and generate the optimal solution. Let me know if you need any specific adjustments.`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          model: selectedModel.name,
          effort: selectedEffort.label,
        };

        setMessagesMap((prev) => ({
          ...prev,
          [activeChatId]: [...(prev[activeChatId] || []), aiMsg],
        }));
        setIsTyping(false);
      },
      // Higher effort "thinks" a little longer, so the picker visibly does something.
      900 + selectedEffort.level * 400,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === "Escape") {
      setOpenMenu(null);
      if (voice.isListening) voice.stop();
    }
  };

  const isHero = !showSidebar && activeMessages.length === 0 && !isTyping;

  /** The prompt bar — rendered under the thread, or alone in the hero state. */
  const composer = (
    <div className="p-4 sm:p-6 bg-transparent shrink-0 z-10">
      <div className="max-w-3xl mx-auto">
        <form
          ref={composerRef}
          onSubmit={handleSendMessage}
          onDragOver={(e) => {
            e.preventDefault();
            if (!isDragging) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node))
              setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "relative flex flex-col gap-1 rounded-2xl p-2 transition-all shadow-sm",
            styles.input,
            theme.ring,
            isDragging && cn("ring-2", theme.inputBorder),
            isMaxEffort && cn("shadow-lg", theme.shadow),
          )}
        >
          <MaxEffortGlow active={isMaxEffort} className={theme.primaryText} />
          {selectedTier && (
            <TierBorderBeam key={selectedTier} tier={selectedTier} />
          )}
          {tierFx > 0 && tierLook && (
            <tierLook.Sweep key={tierFx} onDone={() => setTierFx(0)} />
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={accept}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = "";
            }}
          />

          {/* Drop hint */}
          <Presence
            show={isDragging}
            hidden={{ opacity: 0 }}
            shown={{ opacity: 1 }}
            {...FADE}
          >
            {(ref, style) => (
              <div
                ref={ref}
                style={style}
                className={cn(
                  "absolute inset-0 z-20 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-semibold bg-background/80 backdrop-blur-sm pointer-events-none",
                  theme.inputBorder,
                  theme.primaryText,
                )}
              >
                <Paperclip className="w-4 h-4" /> Drop files to attach
              </div>
            )}
          </Presence>

          {/* Attachments */}
          <Presence
            show={attachments.length > 0}
            appear={false}
            hidden={{ opacity: 0, height: 0 }}
            shown={{ opacity: 1, height: "auto" }}
            duration={0.25}
            ease={EASE_OUT}
          >
            {(ref, style) => (
              <div ref={ref} style={style} className="overflow-hidden">
                <AttachmentChips
                  attachments={attachments}
                  theme={theme}
                  onRemove={removeAttachment}
                />
              </div>
            )}
          </Presence>

          {/* Prompt / listening surface */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                voice.isListening ? "" : "Message the AI Assistant..."
              }
              className={cn(
                "w-full max-h-32 bg-transparent border-none focus:outline-none text-[15px] text-foreground placeholder:text-muted-foreground resize-none py-3 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-text transition-opacity",
                voice.isListening && "opacity-0 pointer-events-none",
              )}
              rows={1}
              style={{ minHeight: "48px" }}
            />
            <Presence
              show={voice.isListening}
              hidden={{ opacity: 0, y: 4 }}
              shown={{ opacity: 1, y: 0 }}
              duration={0.2}
              ease={EASE_OUT}
            >
              {(ref, style) => (
                <div
                  ref={ref}
                  style={style}
                  className="absolute inset-0 flex items-center gap-3 px-2"
                >
                  <ListeningWave
                    barsRef={voice.barsRef}
                    live={voice.hasLiveAudio}
                    className={theme.primaryText}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-sm font-semibold leading-tight",
                        theme.primaryText,
                      )}
                    >
                      Listening…
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {inputValue
                        ? inputValue
                        : voice.supportsDictation
                          ? "Speak now — tap the mic to stop"
                          : "Dictation isn't available in this browser"}
                    </p>
                  </div>
                </div>
              )}
            </Presence>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
              <ComposerMenu
                open={openMenu === "tools"}
                onOpenChange={(open) => setOpenMenu(open ? "tools" : null)}
                theme={theme}
                icon={
                  <Plus
                    className={cn(
                      "w-[18px] h-[18px] transition-transform duration-200",
                      openMenu === "tools" && "rotate-45",
                    )}
                  />
                }
                label="Add files or tools"
                iconOnly
                width="w-[280px] sm:w-[340px]"
                boundaryRef={composerRef}
              >
                <div className="p-1">
                  {tools.map((tool) => {
                    const isUpload = tool.action === "upload";
                    const full = isUpload && attachments.length >= maxFiles;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        role="menuitem"
                        disabled={full}
                        onClick={() => runTool(tool)}
                        className={cn(
                          "w-full flex items-center gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-left transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed",
                          isLiquid
                            ? "hover:bg-white/15 text-white"
                            : "hover:bg-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0",
                            isLiquid ? "text-white/80" : "text-muted-foreground",
                          )}
                        >
                          {tool.icon ?? <Plus className="w-4 h-4" />}
                        </span>
                        <span className="min-w-0 flex items-baseline gap-2 truncate">
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              isLiquid ? "text-white" : "text-foreground",
                            )}
                          >
                            {tool.label}
                          </span>
                          {tool.description && (
                            <span
                              className={cn(
                                "text-xs truncate",
                                isLiquid ? "text-white/70" : "text-muted-foreground",
                              )}
                            >
                              {tool.description}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </ComposerMenu>

              <ComposerMenu
                open={openMenu === "model"}
                onOpenChange={(open) => setOpenMenu(open ? "model" : null)}
                theme={theme}
                icon={
                  tierLook ? (
                    <tierLook.Icon
                      key={tierFx}
                      className={cn(
                        "w-3.5 h-3.5 mb-0.25",
                        tierFx > 0 && tierLook.iconPop,
                      )}
                    />
                  ) : (
                    <Cpu className="w-3.5 h-3.5 mb-0.25" />
                  )
                }
                label={selectedModel.name}
                heading="Model"
                highlighted={!!tierLook}
                highlightClassName={tierLook ? tierLook.pill : undefined}
                flourish={
                  tierFx > 0 && tierLook && <tierLook.PillFlash key={tierFx} />
                }
                boundaryRef={composerRef}
              >
                {models.map((model) => {
                  const active = model.id === selectedModel.id;
                  const tier = modelTier(model);
                  return (
                    <MenuItem
                      key={model.id}
                      active={active}
                      theme={theme}
                      onClick={() => selectModel(model)}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold truncate">
                            {model.name}
                          </span>
                          {model.badge && (
                            <span
                              className={cn(
                                "text-[9px] font-semibold uppercase tracking-wide px-1.5 py-px rounded-full",
                                isLiquid ? "bg-white/20 text-white" : theme.lightBg,
                              )}
                            >
                              {model.badge}
                            </span>
                          )}
                          {tier && <TierBadge tier={tier} />}
                        </div>
                        {model.description && (
                          <p
                            className={cn(
                              "text-xs truncate",
                              isLiquid ? "text-white/70" : "text-muted-foreground",
                            )}
                          >
                            {model.description}
                          </p>
                        )}
                      </div>
                    </MenuItem>
                  );
                })}
              </ComposerMenu>

              <ComposerMenu
                open={openMenu === "effort"}
                onOpenChange={(open) => setOpenMenu(open ? "effort" : null)}
                theme={theme}
                icon={
                  isMaxEffort ? (
                    <Sparkles className="w-3.5 h-3.5 mb-0.25" />
                  ) : (
                    <Gauge className="w-3.5 h-3.5 mb-0.25" />
                  )
                }
                label={selectedEffort.label}
                highlighted={isMaxEffort}
                width="w-60 sm:w-72"
                boundaryRef={composerRef}
              >
                <div className="p-2.5 sm:p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-medium leading-none",
                        isLiquid ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      Effort
                      <span
                        className={cn(
                          "ml-2 font-semibold",
                          isLiquid ? "text-white" : "text-foreground",
                        )}
                      >
                        {selectedEffort.label}
                      </span>
                    </p>
                    <span
                      title={
                        selectedEffort.description ??
                        "How long the model thinks before answering"
                      }
                      className={cn(
                        "p-0.5 -mr-0.5 rounded-full cursor-help transition-colors",
                        isLiquid
                          ? "text-white/70 hover:text-white"
                          : "text-muted-foreground/70 hover:text-foreground",
                      )}
                    >
                      <CircleHelp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                  <div
                    className={cn(
                      "mt-3 sm:mt-4 mb-1.5 sm:mb-2 flex items-center justify-between text-[11px] sm:text-xs font-medium leading-none",
                      isLiquid ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    <span>Faster</span>
                    <span>Smarter</span>
                  </div>
                  <EffortSlider
                    efforts={efforts}
                    value={efforts.findIndex((e) => e.id === selectedEffort.id)}
                    onChange={(i) => selectEffort(efforts[i])}
                    theme={theme}
                  />
                </div>
              </ComposerMenu>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  voice.toggle();
                  if (voice.isListening) textareaRef.current?.focus();
                }}
                title={voice.isListening ? "Stop listening" : "Dictate"}
                aria-pressed={voice.isListening}
                className={cn(
                  "relative p-1.5 sm:p-2 rounded-xl transition-colors cursor-pointer",
                  voice.isListening
                    ? cn("text-white shadow-md", theme.primaryBg)
                    : cn("text-muted-foreground", theme.primaryHover),
                )}
              >
                {voice.isListening && (
                  <>
                    <span
                      className={cn(
                        "absolute inset-0 rounded-xl animate-ping opacity-40",
                        theme.primaryBg,
                      )}
                    />
                    <span
                      className={cn(
                        "absolute -inset-1 rounded-2xl opacity-30 blur-sm",
                        theme.primaryBg,
                      )}
                    />
                  </>
                )}
                <Mic className="relative w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="submit"
                disabled={
                  (!inputValue.trim() && attachments.length === 0) ||
                  isUploading ||
                  voice.isListening
                }
                className={cn(
                  "p-2 sm:p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed",
                  theme.primaryBg,
                )}
                title={
                  isUploading ? "Waiting for uploads to finish" : "Send message"
                }
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-[11px] font-medium text-muted-foreground mt-3 cursor-default">
          AI can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );

  const formattedRadius = formatRadius(rounded);
  const dynamicRadiusStyle: React.CSSProperties =
    formattedRadius !== undefined
      ? { borderRadius: formattedRadius }
      : typeof rounded === "string"
        ? {}
        : { borderRadius: "var(--radius-3xl, 1.5rem)" };

  return (
    <SurfaceContext.Provider value={surfaceValue}>
      <div
        style={{
          ...customVars,
          ...dynamicRadiusStyle,
        }}
      className={cn(
        "w-full max-w-full h-[650px] sm:h-[750px] flex overflow-hidden relative font-sans box-border transition-colors duration-300 isolate [contain:paint] [transform:translateZ(0)]",
        typeof rounded === "string" && !formatRadius(rounded) ? rounded : "",
        styles.wrapper,
        className,
      )}
    >
      <style>{MOTION_CSS}</style>
      <LiquidGlassSvgFilter />
      {variant === "liquid-glass" && (
        <LiquidGlassBackground radius={formattedRadius ?? "var(--radius-3xl, 1.5rem)"} />
      )}

      {/* === LEFT SIDEBAR === */}
      {showSidebar && (
        <aside
          className={cn(
            `absolute lg:relative z-30 w-[280px] max-w-[85vw] shrink-0 h-full flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
            "rounded-l-[inherit] max-lg:rounded-r-2xl lg:rounded-r-none overflow-hidden",
            styles.sidebar,
            variant === "liquid-glass" && "rounded-l-[inherit] max-lg:rounded-r-2xl max-lg:border-r max-lg:border-white/20",
          )}
        >
          {variant === "liquid-glass" && (
            <LiquidGlassBackground
              radius={formattedRadius ?? "var(--radius-3xl, 1.5rem)"}
              bgPosition="left center"
              showOuterShadow={false}
              contrastOverlayClassName="bg-black/35 dark:bg-black/50 backdrop-blur-[2px]"
            />
          )}

          <div
            className={cn(
              "p-5 border-b shrink-0 relative z-10",
              variant === "liquid-glass" || variant === "glass"
                ? "border-white/20 dark:border-white/10"
                : "border-border",
            )}
          >
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h2
                className={cn(
                  "font-semibold",
                  variant === "liquid-glass"
                    ? "text-white"
                    : variant === "glass"
                      ? "text-zinc-900 dark:text-white"
                      : "text-foreground",
                )}
              >
                History
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "p-1 rounded-lg transition-colors cursor-pointer",
                  variant === "liquid-glass"
                    ? "text-white/70 hover:text-white hover:bg-white/15"
                    : variant === "glass"
                      ? "text-zinc-700 hover:text-zinc-900 hover:bg-white/30 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleNewChat}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95 cursor-pointer",
                variant === "liquid-glass"
                  ? "bg-white/20 hover:bg-white/30 text-white border border-white/25 shadow-lg backdrop-blur-md"
                  : cn(theme.primaryBg, theme.shadow),
              )}
            >
              <Plus className="w-4 h-4" /> New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-3 relative z-10">
            {["Today", "Yesterday", "Previous 7 Days"].map((dateGroup) => {
              const groupChats = chats.filter((c) => c.date === dateGroup);
              if (groupChats.length === 0) return null;

              return (
                <div key={dateGroup} className="mb-6">
                  <p
                    className={cn(
                      "text-[11px] font-semibold uppercase tracking-wider mb-2 px-3",
                      variant === "liquid-glass"
                        ? "text-white/70"
                        : variant === "glass"
                          ? "text-zinc-800 dark:text-zinc-200"
                          : "text-muted-foreground",
                    )}
                  >
                    {dateGroup}
                  </p>
                  <div className="space-y-0.5">
                    {groupChats.map((chat) => {
                      const isActive = activeChatId === chat.id;
                      const isEditing = editingChatId === chat.id;

                      return (
                        <div
                          key={chat.id}
                          onClick={() => handleSelectChat(chat.id)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all text-sm group",
                            isActive
                              ? variant === "liquid-glass"
                                ? "bg-white/20 text-white font-semibold shadow-sm border border-white/20 backdrop-blur-md"
                                : variant === "glass"
                                  ? "bg-white/30 dark:bg-white/15 text-zinc-900 dark:text-white font-semibold shadow-sm border border-white/30 dark:border-white/15 backdrop-blur-md"
                                  : cn("font-semibold", theme.lightBg)
                              : variant === "liquid-glass"
                                ? "text-white/80 hover:text-white hover:bg-white/10 font-medium"
                                : variant === "glass"
                                  ? "text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:bg-white/15 dark:hover:bg-white/10 font-medium"
                                  : "text-muted-foreground hover:bg-muted font-medium hover:text-foreground",
                          )}
                        >
                          {isEditing ? (
                            <div
                              className="flex items-center gap-2 w-full cursor-default"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MessageSquare
                                className={cn(
                                  "w-4 h-4 shrink-0",
                                  variant === "liquid-glass" ? "text-white" : theme.primaryText,
                                )}
                              />
                              <input
                                autoFocus
                                value={editTitleValue}
                                onChange={(e) =>
                                  setEditTitleValue(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    saveEditChat(chat.id, e);
                                  if (e.key === "Escape") cancelEditChat(e);
                                }}
                                className={cn(
                                  "flex-1 bg-background border rounded px-2 py-0.5 text-xs outline-none text-foreground cursor-text",
                                  variant === "liquid-glass" && "bg-black/40 border-white/30 text-white",
                                  theme.inputBorder,
                                  theme.focusRing,
                                )}
                              />
                              <button
                                onClick={(e) => saveEditChat(chat.id, e)}
                                className="text-emerald-500 hover:text-emerald-400 cursor-pointer shrink-0"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEditChat}
                                className="text-rose-500 hover:text-rose-400 cursor-pointer shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-3 truncate pr-2 min-w-0">
                                <MessageSquare
                                  className={cn(
                                    "w-4 h-4 shrink-0",
                                    isActive
                                      ? variant === "liquid-glass"
                                        ? "text-white"
                                        : theme.primaryText
                                      : variant === "liquid-glass"
                                        ? "text-white/70 group-hover:text-white"
                                        : variant === "glass"
                                          ? "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white"
                                          : "text-muted-foreground group-hover:text-foreground",
                                  )}
                                />
                                <span className="truncate">{chat.title}</span>
                              </div>
                              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <button
                                  onClick={(e) => startEditingChat(chat, e)}
                                  className={cn(
                                    "p-1.5 rounded-md transition-colors cursor-pointer",
                                    variant === "liquid-glass"
                                      ? "text-white/70 hover:text-white hover:bg-white/20"
                                      : variant === "glass"
                                        ? "text-zinc-700 hover:text-zinc-950 hover:bg-white/20 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10"
                                        : cn(
                                            "text-muted-foreground",
                                            theme.primaryHover,
                                          ),
                                  )}
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteChat(chat.id, e)}
                                  className={cn(
                                    "p-1.5 rounded-md transition-colors cursor-pointer",
                                    variant === "liquid-glass"
                                      ? "text-white/70 hover:text-rose-400 hover:bg-rose-500/20"
                                      : variant === "glass"
                                        ? "text-zinc-700 hover:text-rose-600 hover:bg-rose-500/10 dark:text-zinc-300 dark:hover:text-rose-400"
                                        : "text-muted-foreground hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20",
                                  )}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={cn(
              "p-4 border-t shrink-0 flex items-center justify-between cursor-pointer transition-colors relative z-10",
              variant === "liquid-glass"
                ? "border-white/20 dark:border-white/10 hover:bg-white/10 text-white"
                : variant === "glass"
                  ? "border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-white/10"
                  : "border-border hover:bg-muted",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full bg-gradient-to-tr flex items-center justify-center font-semibold text-xs shadow-sm",
                  theme.gradient,
                  theme.primaryBg.includes("text-")
                    ? theme.primaryBg
                        .split(" ")
                        .filter(
                          (c) =>
                            c.startsWith("text-") || c.startsWith("dark:text-"),
                        )
                        .join(" ")
                    : "text-primary-foreground",
                )}
              >
                JM
              </div>
              <span
                className={cn(
                  "text-sm font-semibold",
                  variant === "liquid-glass"
                    ? "text-white"
                    : variant === "glass"
                      ? "text-zinc-900 dark:text-white"
                      : "text-foreground",
                )}
              >
                Joel M.
              </span>
            </div>
            <Settings
              className={cn(
                "w-4 h-4 transition-colors",
                variant === "liquid-glass"
                  ? "text-white/70 hover:text-white"
                  : variant === "glass"
                    ? "text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
              )}
            />
          </div>
        </aside>
      )}

      {showSidebar && isSidebarOpen && (
        <div
          className="absolute inset-0 z-20 lg:hidden cursor-pointer transition-opacity duration-300 rounded-[inherit] overflow-hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          {variant === "liquid-glass" ? (
            <LiquidGlassBackground
              radius={formattedRadius ?? "var(--radius-3xl, 1.5rem)"}
              showOuterShadow={false}
              contrastOverlayClassName="bg-black/50 dark:bg-black/70 backdrop-blur-md"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 rounded-[inherit]",
                variant === "glass"
                  ? "bg-black/25 dark:bg-black/45 backdrop-blur-[2px]"
                  : "bg-black/50 dark:bg-black/70 backdrop-blur-sm",
              )}
            />
          )}
        </div>
      )}

      {/* === MAIN CHAT AREA === */}
      <main
        className={cn(
          "flex-1 flex flex-col min-w-0 relative z-10 transition-colors duration-300",
          styles.main,
        )}
      >
        {!activeChatId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div
              className={cn(
                "w-24 h-24 bg-gradient-to-tr rounded-3xl flex items-center justify-center mb-6 border border-border rotate-3 shrink-0 shadow-xl",
                variant === "liquid-glass" && "border-white/20 shadow-2xl",
                theme.gradient,
                theme.shadow,
                onAccentText,
              )}
            >
              <Bot className="w-10 h-10 -rotate-3" />
            </div>
            <h2
              className={cn(
                "text-2xl font-semibold mb-2",
                variant === "liquid-glass" ? "text-white" : "text-foreground",
              )}
            >
              How can I help you today?
            </h2>
            <p
              className={cn(
                "text-sm max-w-md mb-8",
                variant === "liquid-glass" ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {showSidebar
                ? "Select a conversation from the sidebar or start a new one to begin chatting."
                : "Start a new conversation to begin chatting."}
            </p>
            <div className="flex items-center gap-4">
              {showSidebar && (
                <button
                  className={cn(
                    "lg:hidden px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95",
                    variant === "liquid-glass"
                      ? "bg-white/20 hover:bg-white/30 text-white border border-white/25 backdrop-blur-md"
                      : "bg-card border border-border text-foreground",
                  )}
                  onClick={() => setIsSidebarOpen(true)}
                >
                  View History
                </button>
              )}
              <button
                onClick={handleNewChat}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center gap-2 shadow-md",
                  variant === "liquid-glass"
                    ? "bg-white/20 hover:bg-white/30 text-white border border-white/25 shadow-lg backdrop-blur-md"
                    : cn(theme.primaryBg, theme.shadow),
                )}
              >
                <Plus className="w-4 h-4" /> New Chat
              </button>
            </div>
          </div>
        ) : isHero ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-0">
            <div className="aichat-rise-10 w-full max-w-3xl px-4 sm:px-6 text-center">
              <h2
                className={cn(
                  "text-2xl sm:text-4xl font-semibold tracking-tight",
                  variant === "liquid-glass" ? "text-white" : "text-foreground",
                )}
              >
                {heroTitle}
              </h2>
              {heroSubtitle && (
                <p
                  className={cn(
                    "mt-2 text-sm sm:text-base",
                    variant === "liquid-glass" ? "text-white/70" : "text-muted-foreground",
                  )}
                >
                  {heroSubtitle}
                </p>
              )}
            </div>
            <div className="aichat-rise-14 w-full">{composer}</div>
          </div>
        ) : (
          <>
            <header
              className={cn(
                "h-[72px] px-4 sm:px-6 flex justify-between items-center shrink-0 flex-none z-10 transition-colors duration-300",
                styles.header,
              )}
            >
              <div className="flex items-center gap-3">
                {showSidebar && (
                  <button
                    className={cn(
                      "lg:hidden transition-colors shrink-0",
                      variant === "liquid-glass"
                        ? "text-white/70 hover:text-white"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                )}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-9 h-9 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-sm",
                      theme.gradient,
                      theme.shadow,
                      theme.primaryBg.includes("text-")
                        ? theme.primaryBg
                            .split(" ")
                            .filter(
                              (c) =>
                                c.startsWith("text-") ||
                                c.startsWith("dark:text-"),
                            )
                            .join(" ")
                        : "text-primary-foreground",
                    )}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2
                      className={cn(
                        "text-sm font-semibold leading-tight",
                        variant === "liquid-glass" ? "text-white" : "text-foreground",
                      )}
                    >
                      AI Assistant
                    </h2>
                    <p
                      className={cn(
                        "text-xs font-medium mt-0.5",
                        variant === "liquid-glass" ? "text-emerald-400" : "text-emerald-600 dark:text-emerald-400",
                      )}
                    >
                      Online & Ready
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!showSidebar && (
                  <button
                    type="button"
                    onClick={handleNewChat}
                    title="New chat"
                    className={cn(
                      "flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                      variant === "liquid-glass"
                        ? "bg-white/20 hover:bg-white/30 text-white border border-white/25 shadow-sm"
                        : cn(theme.lightBg, theme.primaryText),
                    )}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New chat</span>
                  </button>
                )}
                <button
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    variant === "liquid-glass"
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </header>

            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth"
            >
              <div className="flex flex-col gap-6 max-w-3xl mx-auto pb-4">
                {activeMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="shrink-0">
                      {msg.role !== "user" ? (
                        <div
                          className={cn(
                            "w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center shadow-sm",
                            theme.gradient,
                            theme.primaryBg.includes("text-")
                              ? theme.primaryBg
                                  .split(" ")
                                  .filter(
                                    (c) =>
                                      c.startsWith("text-") ||
                                      c.startsWith("dark:text-"),
                                  )
                                  .join(" ")
                              : "text-primary-foreground",
                          )}
                        >
                          <Bot className="w-5 h-5" />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg bg-gradient-to-tr flex items-center justify-center font-semibold text-xs shadow-sm",
                            theme.gradient,
                            theme.primaryBg.includes("text-")
                              ? theme.primaryBg
                                  .split(" ")
                                  .filter(
                                    (c) =>
                                      c.startsWith("text-") ||
                                      c.startsWith("dark:text-"),
                                  )
                                  .join(" ")
                              : "text-primary-foreground",
                          )}
                        >
                          JM
                        </div>
                      )}
                    </div>

                    <div
                      className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={cn(
                          `px-5 py-3.5 text-[15px] whitespace-pre-wrap leading-relaxed`,
                          msg.role === "user"
                            ? cn(styles.msgUser, theme.primaryBg)
                            : styles.msgAi,
                        )}
                      >
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div
                            className={cn(
                              "flex flex-wrap gap-2",
                              msg.content && "mb-3",
                            )}
                          >
                            {msg.attachments.map((file) =>
                              file.previewUrl &&
                              file.type.startsWith("image/") ? (
                                <img
                                  key={file.id}
                                  src={file.previewUrl}
                                  alt={file.name}
                                  className="h-24 max-w-[180px] rounded-xl object-cover border border-white/20"
                                />
                              ) : (
                                <div
                                  key={file.id}
                                  className="flex items-center gap-2 rounded-xl bg-current/10 px-3 py-2 text-xs max-w-[220px]"
                                >
                                  <FileText className="w-4 h-4 shrink-0 opacity-80" />
                                  <span className="truncate font-semibold">
                                    {file.name}
                                  </span>
                                  <span className="shrink-0 opacity-70">
                                    {formatBytes(file.size)}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                        {msg.content}
                      </div>

                      <div
                        className={`flex items-center gap-3 mt-1 px-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <span
                          className={cn(
                            "text-[10px] font-medium",
                            variant === "liquid-glass" ? "text-white/60" : "text-muted-foreground",
                          )}
                        >
                          {msg.time}
                          {msg.model && (
                            <span className="opacity-80">
                              {" "}
                              · {msg.model}
                              {msg.effort && ` · ${msg.effort} effort`}
                            </span>
                          )}
                        </span>
                        {msg.role !== "user" && (
                          <div
                            className={cn(
                              "flex items-center gap-1.5",
                              variant === "liquid-glass" ? "text-white/70" : "text-muted-foreground",
                            )}
                          >
                            <button
                              className={cn(
                                "p-1 rounded transition-colors",
                                variant === "liquid-glass"
                                  ? "hover:text-white hover:bg-white/10"
                                  : "hover:text-foreground hover:bg-muted",
                              )}
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded transition-colors">
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded transition-colors">
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-4 flex-row items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div
                      className={cn(
                        "shrink-0 w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center shadow-sm mb-5",
                        theme.gradient,
                        onAccentText,
                      )}
                    >
                      <Bot className="w-5 h-5" />
                    </div>
                    <div
                      className={cn(
                        "px-4 py-3.5 flex items-center gap-1.5 mb-5",
                        styles.msgAi,
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s]",
                          variant === "liquid-glass" ? "bg-white/70" : "bg-muted-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s]",
                          variant === "liquid-glass" ? "bg-white/70" : "bg-muted-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full animate-bounce",
                          variant === "liquid-glass" ? "bg-white/70" : "bg-muted-foreground",
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {composer}
          </>
        )}
      </main>
    </div>
  </SurfaceContext.Provider>
);
}

// ==========================================
// COMPOSER PIECES
// ==========================================
type Theme = Record<string, string>;

// ==========================================
// MOTION
// ==========================================
/** Motion's named eases, for the tweens below. */
const EASE_OUT = bezierEase(MOTION_EASE.easeOut);
const EASE_IN = bezierEase(MOTION_EASE.easeIn);
/** Motion's default fade: 0.3s on cubic-bezier(0.25, 0.1, 0.35, 1). */
const FADE = { duration: 0.3, ease: bezierEase([0.25, 0.1, 0.35, 1]) };
/** The rocket's launch. */
const ROCKET_SPRING = springEase({ stiffness: 260, damping: 16 });
/** Attachment chips: in, out, and the glide of the others into a gap. */
const CHIP_SPRING = springEase({ stiffness: 320, damping: 24 });
/**
 * When a removed chip is taken out of the tray: the moment its fade-out
 * spring counts as settled (Motion rests an opacity spring once it is within
 * 0.005 and slower than 0.01/s), a little after the motion itself ends.
 */
const CHIP_EXIT_SETTLE = 0.65;
/** The effort slider's thumb and fill. */
const SLIDER_SPRING = springEase({ stiffness: 400, damping: 30 });

const CHECK_SPRING = springLinear({ stiffness: 380, damping: 14 });
const FAIL_SPRING = springLinear({ stiffness: 550, damping: 30 });
const EASE_IN_OUT_CSS = "cubic-bezier(0.42, 0, 0.58, 1)";
const EASE_OUT_CSS = "cubic-bezier(0, 0, 0.58, 1)";
/** The premium flourish on the prompt bar: one lap of the edge beam. */
const PREMIUM_SWEEP_S = 1.6;
const PREMIUM_ORBIT_CSS = "cubic-bezier(0.45, 0, 0.2, 1)";
/** The Pro flourish on the prompt bar: trace, flicker and fade. */
const PRO_SURGE_S = 1.3;

/**
 * The fixed, self-running animations — entrances that play once on mount and
 * the loops — as plain CSS. Rendered once by AIChat.
 */
const MOTION_CSS = `
@keyframes aichat-rise-10 { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes aichat-rise-14 { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.aichat-rise-10 { animation: aichat-rise-10 0.4s ${EASE_OUT_CSS} backwards; }
.aichat-rise-14 { animation: aichat-rise-14 0.4s ${EASE_OUT_CSS} 0.08s backwards; }

@keyframes aichat-rocket-bob {
  0%, 50%, 100% { transform: translateY(0); }
  25% { transform: translateY(-1.5px); }
  75% { transform: translateY(1.5px); }
}
.aichat-rocket-bob { animation: aichat-rocket-bob 1.4s ${EASE_IN_OUT_CSS} infinite; }
@keyframes aichat-exhaust {
  0%, 100% { transform: scaleX(0.6) rotate(-45deg); opacity: 0.7; }
  25% { transform: scaleX(1.3) rotate(-45deg); opacity: 1; }
  50% { transform: scaleX(0.8) rotate(-45deg); opacity: 0.8; }
  75% { transform: scaleX(1.1) rotate(-45deg); opacity: 1; }
}
.aichat-exhaust { animation: aichat-exhaust 0.35s ${EASE_IN_OUT_CSS} infinite; }

@keyframes aichat-ring { from { transform: scale(0.4); opacity: 0.9; } to { transform: scale(2.6); opacity: 0; } }
.aichat-ring { animation: aichat-ring 0.6s ${EASE_OUT_CSS} both; }
@keyframes aichat-check { from { transform: scale(0) rotate(-90deg); } to { transform: scale(1) rotate(0deg); } }
.aichat-check { animation: aichat-check ${CHECK_SPRING.duration}ms ${CHECK_SPRING.easing} 0.15s both; }
@keyframes aichat-pop { from { transform: scale(0); } to { transform: scale(1); } }
.aichat-pop { animation: aichat-pop ${FAIL_SPRING.duration}ms ${FAIL_SPRING.easing} both; }

@keyframes aichat-glow-pulse { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.26; } }
.aichat-glow-pulse { animation: aichat-glow-pulse 3.2s ${EASE_IN_OUT_CSS} infinite; }
@keyframes aichat-speck {
  0% { opacity: 0; transform: translateY(0) scale(0.4); }
  50% { opacity: 0.9; transform: translateY(-6px) scale(1.3); }
  100% { opacity: 0; transform: translateY(-12px) scale(0.4); }
}
.aichat-speck { animation: aichat-speck 1s ${EASE_IN_OUT_CSS} infinite backwards; }

@keyframes aichat-premium-life { 0% { opacity: 0; } 10%, 70% { opacity: 1; } 100% { opacity: 0; } }
.aichat-premium-life { animation: aichat-premium-life ${PREMIUM_SWEEP_S}s linear both; }
@keyframes aichat-premium-orbit {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
.aichat-premium-orbit { animation: aichat-premium-orbit ${PREMIUM_SWEEP_S}s ${PREMIUM_ORBIT_CSS} both; }
.aichat-premium-orbit-loop { animation: aichat-premium-orbit 3s linear infinite; }
@keyframes aichat-premium-sheen {
  from { transform: translateX(-120%) skewX(-20deg); }
  to { transform: translateX(420%) skewX(-20deg); }
}
.aichat-premium-sheen { animation: aichat-premium-sheen 1s ${EASE_IN_OUT_CSS} 0.15s both; }
@keyframes aichat-premium-bloom {
  0% { opacity: 0; transform: scale(0.98); }
  35% { opacity: 0.6; }
  100% { opacity: 0; transform: scale(1.03); }
}
.aichat-premium-bloom { animation: aichat-premium-bloom 1.1s ${EASE_OUT_CSS} 0.1s both; }
@keyframes aichat-premium-ping { from { opacity: 0.8; transform: none; } to { opacity: 0; transform: scale(1.12, 1.45); } }
.aichat-premium-ping { animation: aichat-premium-ping 0.6s ${EASE_OUT_CSS} both; }
@keyframes aichat-premium-shine { from { transform: translateX(-100%) skewX(-20deg); } to { transform: translateX(320%) skewX(-20deg); } }
.aichat-premium-shine { animation: aichat-premium-shine 0.7s ${EASE_IN_OUT_CSS} 0.1s both; }
@keyframes aichat-crown-pop {
  0% { transform: scale(0) rotate(-45deg); }
  60% { transform: scale(1.3) rotate(12deg); }
  100% { transform: none; }
}
.aichat-crown-pop { animation: aichat-crown-pop 0.55s ${EASE_OUT_CSS} both; }

@keyframes aichat-pro-life { 0% { opacity: 0; } 6%, 72% { opacity: 1; } 100% { opacity: 0; } }
.aichat-pro-life { animation: aichat-pro-life ${PRO_SURGE_S}s linear both; }
@keyframes aichat-pro-trace { from { clip-path: inset(0 50%); } to { clip-path: inset(0); } }
@keyframes aichat-pro-flicker {
  0%, 40%, 80%, 100% { opacity: 1; }
  20% { opacity: 0.25; }
  60% { opacity: 0.45; }
}
.aichat-pro-trace {
  animation: aichat-pro-trace 0.5s ${EASE_OUT_CSS} both,
    aichat-pro-flicker 0.45s linear 0.5s both;
}
@keyframes aichat-pro-scan { from { transform: translateY(100%); } to { transform: translateY(-100%); } }
.aichat-pro-scan { animation: aichat-pro-scan 0.9s ${EASE_IN_OUT_CSS} 0.2s both; }
@keyframes aichat-pro-charge { 0% { opacity: 0; } 40% { opacity: 0.55; } 100% { opacity: 0; } }
.aichat-pro-charge { animation: aichat-pro-charge 0.7s ${EASE_OUT_CSS} 0.45s both; }
@keyframes aichat-pro-flash { 0% { opacity: 0; } 15% { opacity: 0.3; } 30% { opacity: 0.05; } 45% { opacity: 0.25; } 100% { opacity: 0; } }
.aichat-pro-flash { animation: aichat-pro-flash 0.6s linear both; }
@keyframes aichat-pro-spark {
  0% { opacity: 0; transform: translate(-50%, -50%); }
  10% { opacity: 1; }
  100% { opacity: 0; transform: translate(calc(-50% + var(--aichat-spark-x)), calc(-50% + var(--aichat-spark-y))) scale(0.3); }
}
.aichat-pro-spark { animation: aichat-pro-spark 0.5s ${EASE_OUT_CSS} 0.15s both; }
@keyframes aichat-zap-strike {
  0% { opacity: 0; transform: translateY(-8px) scale(0.6); }
  35% { opacity: 1; transform: translateY(0) scale(1.3); }
  50% { opacity: 0.35; }
  65% { opacity: 1; transform: scale(1); }
  100% { opacity: 1; transform: none; }
}
.aichat-zap-strike { animation: aichat-zap-strike 0.5s ${EASE_OUT_CSS} both; }

@keyframes aichat-wave {
  0%, 100% { transform: scaleY(0.15); }
  25% { transform: scaleY(var(--aichat-wave-peak)); }
  50% { transform: scaleY(0.3); }
  75% { transform: scaleY(var(--aichat-wave-echo)); }
}
.aichat-wave { animation: aichat-wave 1s ${EASE_IN_OUT_CSS} infinite backwards; }
`;

type PresencePose = { opacity?: number; y?: number; scale?: number; height?: number | "auto" };

/** A pose as inline style, for the first frame before any tween runs. */
const poseStyle = ({ opacity, y, scale, height }: PresencePose): React.CSSProperties => ({
  opacity,
  height,
  transform: y !== undefined || scale !== undefined ? `translateY(${y ?? 0}px) scale(${scale ?? 1})` : undefined,
});

/**
 * Mounts its child while `show` is on, and keeps it mounted — frozen as it
 * last rendered — while it animates out: in from `hidden` to `shown`, back to
 * `hidden` on the way out. Turning `show` back on mid-exit reverses from
 * wherever the child is. With `appear={false}`, a child present on the first
 * render starts shown.
 */
function Presence({
  show,
  appear = true,
  hidden,
  shown,
  duration,
  ease,
  children,
}: {
  show: boolean;
  appear?: boolean;
  hidden: PresencePose;
  shown: PresencePose;
  duration: number;
  ease: (progress: number) => number;
  children: (
    ref: React.RefObject<HTMLDivElement | null>,
    style: React.CSSProperties | undefined,
  ) => React.ReactNode;
}) {
  // A stable box for the child element, handed to the render function below
  // (and read only in effects); a state-held RefObject so render can pass it on.
  const [box] = useState(() => createRef<HTMLDivElement>());
  const [mounted, setMounted] = useState(show);
  if (show && !mounted) setMounted(true);
  // Server render and first frame: the entry pose, when the child enters.
  const [mountStyle] = useState(() => (show && appear ? poseStyle(hidden) : undefined));
  const firstRun = useRef(true);
  const seen = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const first = firstRun.current;
    firstRun.current = false;
    const el = box.current;
    if (!el) return;
    const fresh = el !== seen.current;
    seen.current = el;
    gsap.killTweensOf(el);
    if (show) {
      if (!fresh) gsap.to(el, { ...shown, duration, ease });
      else if (!first || appear) gsap.fromTo(el, { ...hidden }, { ...shown, duration, ease });
      return;
    }
    gsap.to(el, { ...hidden, duration, ease, onComplete: () => setMounted(false) });
    // The poses are fixed per call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, mounted]);
  useEffect(
    () => () => {
      if (seen.current) gsap.killTweensOf(seen.current);
    },
    [],
  );

  // While leaving, it keeps rendering what it showed last: the render function
  // from the last render where it was shown (its closure holds that render's
  // values).
  const [lastChildren, setLastChildren] = useState(() => children);
  if (show && lastChildren !== children) setLastChildren(() => children);
  const render = show ? children : lastChildren;
  return mounted ? render(box, mountStyle) : null;
}

/** A chip's motion: its entry/exit pose and any glide towards its new slot. */
interface ChipMotion {
  el: HTMLDivElement;
  opacity: number;
  scale: number;
  y: number;
  glideX: number;
  glideY: number;
}

function paintChip(m: ChipMotion) {
  const x = m.glideX;
  const y = m.glideY + m.y;
  m.el.style.transform = x || y || m.scale !== 1 ? `translate(${x}px, ${y}px) scale(${m.scale})` : "none";
  m.el.style.opacity = String(m.opacity);
}

/**
 * The attachment chips. A new chip springs in; a removed one springs out in
 * place, and once it has gone the chips after it glide into the gap on the
 * same spring. Chips already there when the tray opens don't animate.
 */
function AttachmentChips({
  attachments,
  theme,
  onRemove,
}: {
  attachments: PendingAttachment[];
  theme: Theme;
  onRemove: (id: string) => void;
}) {
  const chips = useRef(new Map<string, ChipMotion>());
  const [firstIds] = useState(() => new Set(attachments.map((a) => a.id)));
  // Chips that have finished leaving, and what was on screen last render.
  const [gone, setGone] = useState<ReadonlySet<string>>(() => new Set());
  const [onScreen, setOnScreen] = useState<PendingAttachment[]>(attachments);

  // Removed chips stay where they were, in their old slot, until they're out.
  const present = new Set(attachments.map((a) => a.id));
  const rendered = [...attachments];
  onScreen.forEach((att, i) => {
    if (!present.has(att.id) && !gone.has(att.id)) rendered.splice(i, 0, att);
  });
  if (rendered.length !== onScreen.length || rendered.some((att, i) => att !== onScreen[i])) {
    setOnScreen(rendered);
  }
  // A finished chip only needs remembering while it is still in `onScreen`.
  if ([...gone].some((id) => !rendered.some((att) => att.id === id))) {
    setGone(new Set([...gone].filter((id) => rendered.some((att) => att.id === id))));
  }

  // Where each chip's layout box sat before this commit touched the DOM —
  // measured by <ChipLayoutSnapshot> just ahead of the tray's DOM updates.
  const beforeRef = useRef(new Map<string, { x: number; y: number }>());

  const leaving = useRef(new Map<string, gsap.core.Tween>());
  useLayoutEffect(() => {
    const before = beforeRef.current;
    chips.current.forEach((m, id) => {
      // Out: fade and shrink in place, then drop it.
      if (!present.has(id) && !leaving.current.has(id)) {
        gsap.killTweensOf(m, "opacity,scale,y");
        gsap.to(m, { opacity: 0, scale: 0.85, y: 6, ...CHIP_SPRING, onUpdate: () => paintChip(m) });
        leaving.current.set(
          id,
          gsap.delayedCall(CHIP_EXIT_SETTLE, () => {
            leaving.current.delete(id);
            setGone((current) => new Set(current).add(id));
          }),
        );
        return;
      }
      // Glide: the chips after a removed one move up from where they were.
      const was = before.get(id);
      if (!was) return;
      const dx = was.x - m.el.offsetLeft;
      const dy = was.y - m.el.offsetTop;
      if (!dx && !dy) return;
      gsap.killTweensOf(m, "glideX,glideY");
      m.glideX += dx;
      m.glideY += dy;
      paintChip(m);
      gsap.to(m, { glideX: 0, glideY: 0, ...CHIP_SPRING, onUpdate: () => paintChip(m) });
    });
  });

  const register = useCallback((id: string, el: HTMLDivElement | null) => {
    const old = chips.current.get(id);
    if (old && old.el === el) return;
    if (old) {
      gsap.killTweensOf(old);
      leaving.current.get(id)?.kill();
      leaving.current.delete(id);
      chips.current.delete(id);
    }
    if (!el) return;
    const m: ChipMotion = { el, opacity: 1, scale: 1, y: 0, glideX: 0, glideY: 0 };
    chips.current.set(id, m);
    if (firstIds.has(id)) return;
    // In: springs up from slightly below, small and transparent.
    m.opacity = 0;
    m.scale = 0.85;
    m.y = 6;
    paintChip(m);
    gsap.to(m, { opacity: 1, scale: 1, y: 0, ...CHIP_SPRING, onUpdate: () => paintChip(m) });
  }, [firstIds]);

  return (
    <>
      <ChipLayoutSnapshot chipsRef={chips} beforeRef={beforeRef} />
      <div className="flex flex-wrap gap-2 px-1 pt-1.5 pb-1">
        {rendered.map((att) => (
          <AttachmentChip
            key={att.id}
            register={register}
            attachment={att}
            theme={theme}
            onRemove={() => onRemove(att.id)}
          />
        ))}
      </div>
    </>
  );
}

/**
 * Records where each chip's layout box sits just before a commit changes the
 * tray. Rendered ahead of the tray, so its insertion effect runs before the
 * tray's own DOM updates in the same commit; renders nothing.
 */
function ChipLayoutSnapshot({
  chipsRef,
  beforeRef,
}: {
  chipsRef: React.RefObject<Map<string, ChipMotion>>;
  beforeRef: React.RefObject<Map<string, { x: number; y: number }>>;
}) {
  useInsertionEffect(() => {
    beforeRef.current = new Map(
      Array.from(chipsRef.current, ([id, m]) => [id, { x: m.el.offsetLeft, y: m.el.offsetTop }] as const),
    );
  });
  return null;
}

/**
 * The upload indicator: a rocket that launches from the left, rides the
 * progress along the track with a flickering exhaust, then blasts off the end
 * and hands over to a check when the file has landed.
 */
function RocketProgress({
  progress,
  status,
  theme,
}: {
  progress: number;
  status: UploadStatus;
  theme: Theme;
}) {
  const done = status === "done";
  const failed = status === "error";
  // Position and fill are CSS transitions: they keep gliding between progress
  // events even when the page's JS frame budget is tight.
  const glide = "left 450ms cubic-bezier(0.22, 1, 0.36, 1)";

  // The rocket stays mounted after the upload ends, long enough to blast off.
  const flying = !done && !failed;
  const [rocketMounted, setRocketMounted] = useState(flying);
  if (flying && !rocketMounted) setRocketMounted(true);
  // While it leaves, it keeps the position it launched from.
  const [launchedFrom, setLaunchedFrom] = useState(progress);
  if (flying && launchedFrom !== progress) setLaunchedFrom(progress);
  const rocketRef = useRef<HTMLDivElement>(null);
  const craftRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const rocket = rocketRef.current;
    const craft = craftRef.current;
    if (!rocket || !craft) return;
    gsap.killTweensOf([rocket, craft]);
    if (flying) {
      // Launch: pops up from below, tilting from 60deg to its 45deg cruise.
      // The -50%/-50% is the element's own Tailwind centring, which GSAP's
      // transform would otherwise replace.
      gsap.fromTo(
        craft,
        { xPercent: -50, yPercent: -50, x: 0, y: 8, scale: 0, rotation: 60, opacity: 0 },
        { y: 0, scale: 1, rotation: 45, opacity: 1, ...ROCKET_SPRING },
      );
      return;
    }
    // Blast-off: the rocket shoots to the end of the track while the craft
    // climbs away and fades; it unmounts once both are done.
    gsap.to(rocket, { left: "100%", duration: 0.2, ease: EASE_OUT });
    gsap.to(craft, {
      x: 14,
      y: -18,
      scale: 0.4,
      opacity: 0,
      rotation: 20,
      duration: 0.35,
      ease: EASE_IN,
      onComplete: () => setRocketMounted(false),
    });
  }, [flying, rocketMounted]);
  useEffect(() => {
    const rocket = rocketRef;
    const craft = craftRef;
    return () => {
      const targets = [rocket.current, craft.current].filter(Boolean);
      if (targets.length) gsap.killTweensOf(targets);
    };
  }, []);

  return (
    <div className="relative h-5 w-full">
      {/* Track */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-foreground/10 overflow-hidden">
        <div
          style={{
            width: `${done ? 100 : progress}%`,
            transition: "width 450ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className={cn(
            "h-full rounded-full",
            failed
              ? "bg-rose-500"
              : done
                ? "bg-emerald-500"
                : cn("bg-current opacity-70", theme.primaryText),
          )}
        />
      </div>

      {/* Rocket */}
      {rocketMounted && (
        <div
          ref={rocketRef}
          className={cn("absolute top-1/2 z-10", theme.primaryText)}
          style={{ left: `${flying ? progress : launchedFrom}%`, transition: glide }}
        >
          <div ref={craftRef} className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Bob while in flight */}
            <div className="aichat-rocket-bob relative">
              {/* Exhaust: sits behind the tail (bottom-left of the rotated icon) */}
              <span className="aichat-exhaust absolute left-[-9px] top-[9px] h-[3px] w-3 rounded-full bg-gradient-to-l from-orange-400 via-amber-300 to-transparent origin-right" />
              <Rocket className="w-3.5 h-3.5 drop-shadow-sm" />
            </div>
          </div>
        </div>
      )}

      {/* Landing */}
      {done && (
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 flex items-center justify-center">
          <span className="aichat-ring absolute size-4 rounded-full bg-emerald-500/40" />
          <span className="aichat-check relative size-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
            <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
          </span>
        </span>
      )}
      {failed && (
        <span className="aichat-pop absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 size-4 rounded-full bg-rose-500 text-white flex items-center justify-center">
          <X className="w-2.5 h-2.5" strokeWidth={3.5} />
        </span>
      )}
    </div>
  );
}

function AttachmentChip({
  attachment,
  theme,
  onRemove,
  register,
}: {
  attachment: PendingAttachment;
  theme: Theme;
  onRemove: () => void;
  /** Hands the chip's root element to the tray, for it to animate. */
  register?: (id: string, el: HTMLDivElement | null) => void;
}) {
  // One stable callback per chip, so React attaches it once, not every render.
  const id = attachment.id;
  const chipRef = useCallback(
    (el: HTMLDivElement | null) => {
      register?.(id, el);
    },
    [register, id],
  );
  const isImage = attachment.type.startsWith("image/");
  const statusText =
    attachment.status === "done"
      ? "Uploaded"
      : attachment.status === "error"
        ? "Failed"
        : `${attachment.progress}%`;

  return (
    <div
      ref={chipRef}
      className="group relative flex items-center gap-2.5 rounded-xl border border-border bg-card/90 pl-2 pr-3 py-2 w-[232px] max-w-full shadow-sm"
    >
      <div
        className={cn(
          "size-9 shrink-0 rounded-lg overflow-hidden flex items-center justify-center",
          theme.lightBg,
        )}
      >
        {isImage && attachment.previewUrl ? (
          <img
            src={attachment.previewUrl}
            alt=""
            className="size-full object-cover"
          />
        ) : isImage ? (
          <ImageIcon className="w-4 h-4" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 leading-tight">
          <span className="text-xs font-semibold text-foreground truncate">
            {attachment.name}
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold tabular-nums shrink-0",
              attachment.status === "done"
                ? "text-emerald-600 dark:text-emerald-400"
                : attachment.status === "error"
                  ? "text-rose-500"
                  : "text-muted-foreground",
            )}
          >
            {statusText}
          </span>
        </div>
        <RocketProgress
          progress={attachment.progress}
          status={attachment.status}
          theme={theme}
        />
        <p className="text-[10px] text-muted-foreground leading-none -mt-0.5">
          {formatBytes(attachment.size)}
        </p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${attachment.name}`}
        className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-foreground text-background flex items-center justify-center shadow opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer"
      >
        <X className="w-3 h-3" strokeWidth={3} />
      </button>
    </div>
  );
}

const THUMB_WIDTH = 14;
const TRACK_INSET = 3;

/**
 * Faster ↔ Smarter slider with one stop per effort option. A transparent
 * native range input sits on top for pointer, touch and keyboard handling;
 * the visuals underneath follow its value.
 */
function EffortSlider({
  efforts,
  value,
  onChange,
  theme,
}: {
  efforts: readonly EffortOption[];
  value: number;
  onChange: (index: number) => void;
  theme: Theme;
}) {
  const surface = useSurface();
  const isLiquid = surface === "liquid-glass";

  const last = Math.max(efforts.length - 1, 1);
  const index = Math.min(Math.max(0, value), last);
  // Stop centres run from half a thumb in from each end, inside the track inset.
  const stopLeft = (i: number) => {
    const p = i / last;
    const edge = TRACK_INSET + THUMB_WIDTH / 2;
    return `calc(${edge}px + ${p} * (100% - ${edge * 2}px))`;
  };
  const thumbLeft = stopLeft(index);
  const fillWidth = (left: string) => `calc(${left} + ${THUMB_WIDTH / 2 - TRACK_INSET}px)`;

  // Thumb and fill share one spring on the stop position, from wherever they
  // are when the value changes; they mount in place.
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [mounted] = useState(() => ({ left: thumbLeft, width: fillWidth(thumbLeft) }));
  const shown = useRef({ stop: index / last });
  useLayoutEffect(() => {
    const thumb = thumbRef.current;
    const fill = fillRef.current;
    if (!thumb || !fill) return;
    const at = shown.current;
    const paint = () => {
      const left = stopLeft(at.stop * last);
      thumb.style.left = left;
      fill.style.width = fillWidth(left);
    };
    const to = index / last;
    if (at.stop === to) {
      paint();
      return;
    }
    gsap.to(at, { stop: to, ...SLIDER_SPRING, overwrite: true, onUpdate: paint });
    // stopLeft is rebuilt each render from `last`; the tween only needs the fraction.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, last]);
  useEffect(() => {
    const at = shown.current;
    return () => {
      gsap.killTweensOf(at);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-7 sm:h-8 w-full select-none",
        isLiquid ? "text-white" : theme.primaryText,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          isLiquid ? "bg-white/15" : "bg-muted",
        )}
      />
      {/* Fill runs from the track's start to the thumb's trailing edge */}
      <div
        ref={fillRef}
        className={cn(
          "absolute rounded-full",
          isLiquid ? "bg-white/40" : "bg-current opacity-40",
        )}
        style={{ top: TRACK_INSET, bottom: TRACK_INSET, left: TRACK_INSET, width: mounted.width }}
      />
      {efforts.map((effort, i) => (
        <span
          key={effort.id}
          className={cn(
            "absolute top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300",
            i <= index
              ? isLiquid
                ? "bg-white"
                : "bg-background/80"
              : isLiquid
                ? "bg-white/30"
                : "bg-foreground/20",
          )}
          style={{ left: stopLeft(i) }}
        />
      ))}
      <div
        ref={thumbRef}
        className={cn(
          "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm",
          isLiquid ? "bg-white" : "bg-current",
        )}
        style={{
          width: THUMB_WIDTH,
          height: `calc(100% - ${TRACK_INSET * 2}px)`,
          left: mounted.left,
        }}
      />
      <input
        type="range"
        min={0}
        max={last}
        step={1}
        value={index}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Effort"
        aria-valuetext={efforts[index]?.label}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0"
      />
    </div>
  );
}

const PARTICLE_COUNT = 26;

/** Deterministic 0–1 noise so server and client render the same sky. */
const noise = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * The "Max" sky: a soft glow rising from the bottom of the prompt bar and a
 * scatter of twinkling specks, denser near the floor. Pure decoration — it
 * never intercepts the pointer.
 */
function MaxEffortGlow({
  active,
  className,
}: {
  active: boolean;
  className?: string;
}) {
  return (
    <Presence
      show={active}
      hidden={{ opacity: 0 }}
      shown={{ opacity: 1 }}
      duration={0.5}
      ease={EASE_OUT}
    >
      {(ref, style) => (
        <div
          ref={ref}
          style={style}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 overflow-hidden rounded-2xl",
            className,
          )}
        >
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_bottom,currentColor,transparent_65%)] opacity-15" />
          <div className="aichat-glow-pulse absolute inset-x-6 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,currentColor,transparent_60%)] opacity-20 blur-xl" />
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const x = noise(i, 1) * 100;
            // Square the vertical noise so most specks sit low, like the reference.
            const y = 100 - Math.pow(noise(i, 2), 2) * 95;
            const size = 1.5 + noise(i, 3) * 2;
            const duration = 1.8 + noise(i, 4) * 2.4;
            const delay = noise(i, 5) * 3;
            return (
              <span
                key={i}
                className="aichat-speck absolute rounded-full bg-current"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: size,
                  height: size,
                  boxShadow: "0 0 6px 1px currentColor",
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}
    </Presence>
  );
}

/**
 * Paid tiers wear their own colour whatever the accent — gold for Premium,
 * electric blue for Pro — so choosing one reads apart from the accent-tinted
 * Max-effort glow, and the two tiers read apart from each other.
 */
const PREMIUM = {
  badge:
    "bg-gradient-to-r from-amber-300 to-yellow-200 text-amber-900 dark:from-amber-400/25 dark:to-yellow-300/15 dark:text-amber-200",
  pill: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  /** `currentColor` for the flourishes. */
  ink: "text-amber-400",
};

const PRO = {
  badge:
    "bg-gradient-to-r from-sky-200 to-cyan-100 text-sky-900 dark:from-sky-400/25 dark:to-cyan-300/15 dark:text-sky-200",
  pill: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  ink: "text-sky-400",
};

const TIERS: Record<
  ModelTier,
  {
    label: string;
    Icon: typeof Crown;
    badge: string;
    pill: string;
    /** Entrance for the pill's icon when the tier is picked. */
    iconPop: string;
    Sweep: (props: { onDone: () => void }) => React.ReactNode;
    PillFlash: () => React.ReactNode;
  }
> = {
  premium: {
    label: "Premium",
    Icon: Crown,
    badge: PREMIUM.badge,
    pill: PREMIUM.pill,
    iconPop: "aichat-crown-pop",
    Sweep: PremiumSweep,
    PillFlash: PremiumPillFlash,
  },
  pro: {
    label: "Pro",
    Icon: Zap,
    badge: PRO.badge,
    pill: PRO.pill,
    iconPop: "aichat-zap-strike",
    Sweep: ProSurge,
    PillFlash: ProPillFlash,
  },
};

/** Shows only a 2px ring at the padding edge — the track the beam runs in. */
const RING_MASK: React.CSSProperties = {
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
};

/** Two gold comets on opposite sides of the lap. */
const BEAM_GRADIENT =
  "conic-gradient(from 0deg, transparent 0deg, currentColor 50deg, transparent 90deg, transparent 180deg, currentColor 230deg, transparent 270deg)";

function TierBadge({ tier }: { tier: ModelTier }) {
  const { label, Icon, badge } = TIERS[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 shrink-0 text-[9px] font-semibold uppercase tracking-wide px-1.5 py-px rounded-full",
        badge,
      )}
    >
      <Icon className="w-2.5 h-2.5" strokeWidth={2.5} />
      {label}
    </span>
  );
}

/**
 * The prompt bar's premium hand-off, played once per pick: two gold beams run
 * one lap of the edge, a sheen crosses the bar and a halo blooms out behind
 * it. Calls `onDone` when the lap ends so the caller can unmount it.
 */
function PremiumSweep({ onDone }: { onDone: () => void }) {
  return (
    <div
      aria-hidden
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) onDone();
      }}
      className={cn(
        "aichat-premium-life pointer-events-none absolute inset-0 rounded-2xl",
        PREMIUM.ink,
      )}
    >
      <span className="aichat-premium-bloom absolute inset-0 rounded-2xl shadow-[0_0_24px_6px_currentColor]" />
      <span className="absolute inset-0 overflow-hidden rounded-2xl">
        <span className="aichat-premium-sheen absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-current to-transparent opacity-25" />
      </span>
    </div>
  );
}

/** The prompt bar's continuous border beam, orbiting as long as a tier (Premium or Pro) is selected. */
function TierBorderBeam({ tier }: { tier: ModelTier }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-2xl",
        tier === "premium" ? PREMIUM.ink : PRO.ink,
      )}
    >
      <span
        className="absolute inset-0 overflow-hidden rounded-2xl p-[2px]"
        style={RING_MASK}
      >
        <span
          className="aichat-premium-orbit-loop absolute left-1/2 top-1/2 aspect-square w-[150%]"
          style={{ background: BEAM_GRADIENT }}
        />
      </span>
    </div>
  );
}

/** The model pill's side of the flourish: a gold ring pings out and a glint crosses it. */
function PremiumPillFlash() {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", PREMIUM.ink)}
    >
      <span className="aichat-premium-ping absolute inset-0 rounded-lg border-2 border-current" />
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="aichat-premium-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/40" />
      </span>
    </span>
  );
}

/**
 * The prompt bar's Pro hand-off, played once per pick — a charge rather than
 * Premium's orbit: the edge draws itself out from the centre, flickers like a
 * live wire, a scan line rises through the bar and it glows from within. Calls
 * `onDone` when it ends so the caller can unmount it.
 */
function ProSurge({ onDone }: { onDone: () => void }) {
  return (
    <div
      aria-hidden
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) onDone();
      }}
      className={cn(
        "aichat-pro-life pointer-events-none absolute inset-0 rounded-2xl",
        PRO.ink,
      )}
    >
      <span className="aichat-pro-charge absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_2px_currentColor]" />
      <span className="absolute inset-0 overflow-hidden rounded-2xl">
        <span className="aichat-pro-scan absolute inset-0 bg-gradient-to-t from-transparent via-current to-transparent opacity-20" />
      </span>
      <span
        className="absolute inset-0 overflow-hidden rounded-2xl p-[2px]"
        style={RING_MASK}
      >
        <span className="aichat-pro-trace absolute inset-0 bg-current" />
      </span>
    </div>
  );
}

/** Where the Pro sparks fly, in px from the pill's icon. */
const PRO_SPARKS = [
  [14, 0],
  [7, -12],
  [-7, -12],
  [-14, 0],
  [-7, 12],
  [7, 12],
];

/** The model pill's side of the Pro flourish: the pill flickers and sparks burst off the bolt. */
function ProPillFlash() {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", PRO.ink)}
    >
      <span className="aichat-pro-flash absolute inset-0 rounded-lg bg-current" />
      {PRO_SPARKS.map(([x, y]) => (
        <span
          key={`${x},${y}`}
          className="aichat-pro-spark absolute left-[13px] sm:left-[15px] top-1/2 size-[3px] rounded-full bg-current"
          style={
            {
              "--aichat-spark-x": `${x}px`,
              "--aichat-spark-y": `${y}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

const BAR_COUNT = 22;

/**
 * The waveform shown while dictating. With a live microphone the bars follow
 * the analyser through refs (no re-render per frame); without one they run a
 * soft idle animation so the state still reads as "listening".
 */
function ListeningWave({
  barsRef,
  live,
  className,
}: {
  barsRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  live: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-[3px] h-8 shrink-0", className)}
      aria-hidden
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        // Taller in the middle so the idle shape reads as a voice, not noise.
        const envelope =
          0.35 + 0.65 * Math.sin((i / (BAR_COUNT - 1)) * Math.PI);
        return live ? (
          <span
            key={i}
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            className="w-[3px] h-full rounded-full bg-current origin-center will-change-transform"
            style={{ transform: "scaleY(0.15)" }}
          />
        ) : (
          <span
            key={i}
            className="aichat-wave w-[3px] h-full rounded-full bg-current origin-center"
            style={
              {
                "--aichat-wave-peak": envelope,
                "--aichat-wave-echo": envelope * 0.8,
                animationDuration: `${0.9 + (i % 5) * 0.12}s`,
                animationDelay: `${(i % 7) * 0.07}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

function ComposerMenu({
  open,
  onOpenChange,
  icon,
  label,
  heading,
  highlighted = false,
  highlightClassName,
  flourish,
  iconOnly = false,
  width = "w-60 sm:w-64",
  boundaryRef,
  theme,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: React.ReactNode;
  label: React.ReactNode;
  /** Small caps title above the items; omit when the panel draws its own. */
  heading?: string;
  /** Tints the trigger even while closed — used when effort is at Max. */
  highlighted?: boolean;
  /** The tint `highlighted` applies; the accent colour when omitted. */
  highlightClassName?: string;
  /** Decoration layered over the trigger, e.g. a one-off flash. */
  flourish?: React.ReactNode;
  /** Square icon trigger with `label` as its accessible name — the "+" button. */
  iconOnly?: boolean;
  width?: string;
  /** The panel is nudged left and narrowed to stay inside this element. */
  boundaryRef?: React.RefObject<HTMLElement | null>;
  theme: Theme;
  children: React.ReactNode;
}) {
  const surface = useSurface();
  const isLiquid = surface === "liquid-glass";
  const ref = useRef<HTMLDivElement>(null);

  // A trigger near the right of a narrow composer would push its panel past
  // the edge, so the panel is slid back (and capped) to fit the boundary.
  useLayoutEffect(() => {
    if (!open || !boundaryRef) return;
    const place = () => {
      const wrap = ref.current;
      const panel = wrap?.querySelector<HTMLElement>('[role="menu"]');
      const bounds = boundaryRef.current?.getBoundingClientRect();
      if (!wrap || !panel || !bounds) return;
      panel.style.maxWidth = `${bounds.width}px`;
      const from = wrap.getBoundingClientRect().left;
      const overflow = from + panel.offsetWidth - bounds.right;
      panel.style.left = `${Math.max(-Math.max(overflow, 0), bounds.left - from)}px`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open, boundaryRef]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) onOpenChange(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={ref} className={cn("relative", iconOnly ? "shrink-0" : "min-w-0")}>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={iconOnly && typeof label === "string" ? label : undefined}
        aria-label={iconOnly && typeof label === "string" ? label : undefined}
        className={cn(
          "relative flex items-center rounded-lg text-xs font-semibold transition-colors cursor-pointer",
          iconOnly
            ? "size-7 sm:size-8 justify-center"
            : "gap-1 sm:gap-1.5 h-7 sm:h-8 px-1.5 sm:pl-2 max-w-full sm:max-w-[160px] text-[11px] sm:text-xs",
          highlighted
            ? (highlightClassName ?? (isLiquid ? "bg-white/20 text-white" : cn(theme.lightBg, theme.primaryText)))
            : open
              ? (isLiquid ? "bg-white/20 text-white" : theme.lightBg)
              : (isLiquid ? "text-white/80 hover:bg-white/15 hover:text-white" : cn("text-muted-foreground", theme.primaryHover)),
        )}
      >
        {flourish}
        <span className="shrink-0">{icon}</span>
        {!iconOnly && (
          <>
            <span className="truncate">{label}</span>
            <ChevronDown
              className={cn(
                "hidden sm:block w-3.5 h-3.5 shrink-0 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </>
        )}
      </button>

      <Presence
        show={open}
        hidden={{ opacity: 0, y: 6, scale: 0.96 }}
        shown={{ opacity: 1, y: 0, scale: 1 }}
        duration={0.16}
        ease={EASE_OUT}
      >
        {(ref, style) => (
          <div
            ref={ref}
            role="menu"
            style={{ transformOrigin: "bottom left", ...style }}
            className={cn(
              "absolute bottom-full left-0 mb-2 rounded-xl p-1 z-50 transition-all",
              isLiquid
                ? "bg-black/75 backdrop-blur-2xl border border-white/30 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                : "border border-border bg-popover text-popover-foreground shadow-xl",
              width,
            )}
          >
            {heading && (
              <p
                className={cn(
                  "px-2.5 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider",
                  isLiquid ? "text-white/60" : "text-muted-foreground",
                )}
              >
                {heading}
              </p>
            )}
            {children}
          </div>
        )}
      </Presence>
    </div>
  );
}

function MenuItem({
  active,
  theme,
  onClick,
  children,
}: {
  active: boolean;
  theme: Theme;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const surface = useSurface();
  const isLiquid = surface === "liquid-glass";

  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-2.5 py-1.5 sm:py-2 rounded-lg text-left transition-colors cursor-pointer",
        isLiquid
          ? active
            ? "bg-white/20 text-white font-medium"
            : "text-white/80 hover:bg-white/10 hover:text-white"
          : active
            ? theme.lightBg
            : "hover:bg-muted",
      )}
    >
      {children}
      <Check
        className={cn(
          "w-4 h-4 shrink-0 transition-opacity",
          isLiquid
            ? active
              ? "opacity-100 text-white"
              : "opacity-0 text-white"
            : cn(theme.primaryText, active ? "opacity-100" : "opacity-0"),
        )}
      />
    </button>
  );
}

// ==========================================
// VOICE INPUT
// ==========================================
type SpeechResultEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const getSpeechRecognition = () => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

/**
 * Microphone for the composer. Opens the mic for a live level meter (driving
 * `barsRef` each frame), and runs the Web Speech API alongside it for the
 * transcript. Either half degrades on its own: no analyser → idle wave, no
 * recognition → the wave still shows so the user knows the button did something.
 */
function useVoiceInput(
  onTranscript: (text: string) => void,
  getCurrentText: () => string,
) {
  const [isListening, setIsListening] = useState(false);
  const [hasLiveAudio, setHasLiveAudio] = useState(false);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const wantListening = useRef(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const baseTextRef = useRef("");

  const supportsDictation =
    typeof window !== "undefined" && getSpeechRecognition() !== null;

  const stop = useCallback(() => {
    wantListening.current = false;
    setIsListening(false);
    setHasLiveAudio(false);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
  }, []);

  const start = useCallback(async () => {
    wantListening.current = true;
    setIsListening(true);
    baseTextRef.current = getCurrentText();

    // 1. Transcript
    const SR = getSpeechRecognition();
    if (SR) {
      const rec = new SR();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang =
        typeof navigator !== "undefined" ? navigator.language : "en-US";
      rec.onresult = (e) => {
        let finalText = "";
        let interim = "";
        for (let i = 0; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) finalText += res[0].transcript;
          else interim += res[0].transcript;
        }
        const base = baseTextRef.current;
        const joiner = base && !/\s$/.test(base) ? " " : "";
        onTranscript(`${base}${joiner}${finalText}${interim}`.trimStart());
      };
      // Chrome ends the session after a pause; keep going until the user stops.
      rec.onend = () => {
        if (wantListening.current && recognitionRef.current === rec) {
          try {
            rec.start();
          } catch {
            /* already restarting */
          }
        }
      };
      rec.onerror = () => {};
      recognitionRef.current = rec;
      try {
        rec.start();
      } catch {
        recognitionRef.current = null;
      }
    }

    // 2. Level meter
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!wantListening.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.75;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      streamRef.current = stream;
      audioCtxRef.current = ctx;
      setHasLiveAudio(true);

      const draw = () => {
        analyser.getByteFrequencyData(data);
        const bars = barsRef.current;
        const n = bars.length;
        for (let i = 0; i < n; i++) {
          const bar = bars[i];
          if (!bar) continue;
          // Mirror around the centre so the wave is symmetrical like a voice meter.
          const dist = Math.abs(i - (n - 1) / 2) / ((n - 1) / 2);
          const bin = Math.floor(dist * (data.length - 1));
          const v = data[bin] / 255;
          bar.style.transform = `scaleY(${(0.15 + v * 0.85).toFixed(3)})`;
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    } catch {
      // Mic denied or unavailable — the idle wave stands in.
      setHasLiveAudio(false);
    }
  }, [getCurrentText, onTranscript]);

  const toggle = useCallback(() => {
    if (wantListening.current) stop();
    else void start();
  }, [start, stop]);

  useEffect(() => stop, [stop]);

  return {
    isListening,
    hasLiveAudio,
    supportsDictation,
    barsRef,
    toggle,
    stop,
  };
}
