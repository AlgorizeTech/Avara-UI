"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  Atom,
  AudioLines,
  Box,
  Check,
  ChevronRight,
  ChevronsUpDown,
  CircleHelp,
  Copy,
  Cpu,
  Crown,
  Download,
  Ellipsis,
  FileText,
  Globe,
  ImageIcon,
  Keyboard,
  Languages,
  Library,
  Lightbulb,
  Link2,
  Lock,
  LogOut,
  Menu,
  Paperclip,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  RefreshCw,
  Rocket,
  Settings,
  Share2,
  Sparkles,
  Square,
  ThumbsDown,
  ThumbsUp,
  Sprout,
  Trash2,
  UserRound,
  Waypoints,
  WandSparkles,
  X,
  ArrowUp,
  Zap,
  Compass,
  ChevronDown,
} from "lucide-react";
import {
  createRef,
  useCallback,
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { bezierEase } from "./gsap-motion";
import { useSurface } from "./glass-panel-context";
import { MOTION_EASE, springEase, springLinear } from "./motion-curves";

// ==========================================
// TYPES
// ==========================================

/** Accent colour: `primary` follows your theme tokens, or pass a name / any hex string. */
export type WorkspaceColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

export type WorkspaceThread = {
  id: number | string;
  title: string;
  /** Group heading in the sidebar ("Today", "Yesterday", "August"…), in the order first seen. */
  date: string;
};

export type WorkspaceAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  /** Object URL or remote URL; images render as thumbnails when present. */
  previewUrl?: string;
};

export type WorkspaceSource = { id: string; title: string; host: string };

export type WorkspaceRole = "ai" | "user" | (string & {});

export type WorkspaceMessage = {
  id: number | string;
  role: WorkspaceRole;
  content: string;
  time: string;
  attachments?: WorkspaceAttachment[];
  /** Display name of the model that produced this reply. */
  model?: string;
  /** Display label of the effort level in force for this reply. */
  effort?: string;
  /** Source chips under a researched reply. */
  sources?: WorkspaceSource[];
  /** Renders a generated-image card under the reply. */
  image?: boolean;
  /** Reasoning shown in a collapsible "Thought for…" block. */
  thought?: string;
};

export type WorkspaceModel = {
  id: string;
  name: string;
  description?: string;
  /** Small tag beside the name, e.g. "New". */
  badge?: string;
  /** Top paid tier: gold badge, gold pill and a one-off flourish when chosen. */
  premium?: boolean;
  /** Middle paid tier: electric-blue badge, blue pill and its own flourish. `premium` wins if both are set. */
  pro?: boolean;
};

type ModelTier = "premium" | "pro";

const modelTier = (model: WorkspaceModel): ModelTier | undefined =>
  model.premium ? "premium" : model.pro ? "pro" : undefined;

export type WorkspaceEffortLevel = "low" | "medium" | "high" | "max" | (string & {});

export type WorkspaceEffort = {
  id: WorkspaceEffortLevel;
  label: string;
  description?: string;
  /** 1–4. Higher levels think a little longer before answering. */
  level: number;
};

/** The four switches in the composer. */
export type WorkspaceModes = {
  /** Research: plans, searches and writes a cited report. */
  research: boolean;
  /** Globe: looks things up on the web and cites sources. */
  web: boolean;
  /** Image button: answers with a generated image. */
  image: boolean;
  /** Lightbulb: shows the reasoning behind the answer. */
  reasoning: boolean;
};

export type WorkspaceConnector = {
  id: string;
  label: string;
  description?: string;
  /** Image URL of the app's logo, shown on a round white badge. */
  logo?: string;
  /** Fallback when there is no `logo`. */
  icon?: React.ReactNode;
  /** Hex used for the round badge behind a fallback `icon`. */
  color?: string;
};

export type WorkspaceKnowledgeItem = {
  id: string;
  name: string;
  size: number;
  /** Active sources are sent with every prompt. */
  active: boolean;
};

/** A card on the Discover or Templates screen. */
export type WorkspaceCard = {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  /** Written into the prompt when the card is picked. */
  prompt: string;
  /** Groups templates under a filter chip. */
  category?: string;
  /** Switches a composer mode on when the card is picked. */
  mode?: keyof WorkspaceModes;
};

export type WorkspaceLanguage = { id: string; label: string; native: string };

export type WorkspaceUser = {
  name: string;
  /** Shown under the name in the account menu. */
  email?: string;
  avatarUrl?: string;
};

export type WorkspacePlan = "free" | "pro";

/** What `onSend` receives: everything the composer knows when a prompt goes out. */
export type WorkspaceSendPayload = {
  threadId: number | string;
  content: string;
  attachments: WorkspaceAttachment[];
  model: WorkspaceModel;
  effort: WorkspaceEffort;
  modes: WorkspaceModes;
  /** Connectors named in the prompt as `@Label`, in the order they appear. */
  connectors: WorkspaceConnector[];
  /** Library files that were switched on. */
  knowledge: WorkspaceKnowledgeItem[];
  language: WorkspaceLanguage;
};

/**
 * Bring-your-own upload. Report progress as 0–100; resolve when the file is
 * stored, reject to mark the chip as failed. `signal` aborts when the user
 * removes the chip mid-flight.
 */
export type WorkspaceUploadHandler = (
  file: File,
  onProgress: (percent: number) => void,
  signal: AbortSignal,
) => Promise<void>;

type UploadStatus = "uploading" | "done" | "error";

type PendingAttachment = WorkspaceAttachment & {
  file: File;
  progress: number;
  status: UploadStatus;
};

type Msg = WorkspaceMessage & {
  /** Runtime state of a reply that is being produced. */
  phase?: "thinking" | "streaming" | "done" | "stopped";
  step?: number;
  steps?: string[];
  feedback?: "up" | "down" | null;
  payload?: WorkspaceSendPayload;
};

type View = "chat" | "explore" | "knowledge" | "templates";
type MenuId =
  | "model"
  | "effort"
  | "settings"
  | "user"
  | "more"
  | "share"
  | "language"
  | "help"
  | null;

// ==========================================
// THEME
// ==========================================
type Theme = Record<string, string>;

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

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25";

/** Resolves `color` into the class map every piece below reads. */
function useAccent(color: WorkspaceColor): { theme: Theme; vars: React.CSSProperties } {
  if (color.startsWith("#")) {
    return {
      vars: {
        "--ws-custom": color,
        "--ws-custom-10": `${color}1a`,
        "--ws-custom-20": `${color}33`,
        "--ws-custom-50": `${color}80`,
      } as React.CSSProperties,
      theme: {
        primaryText: "text-[var(--ws-custom)]",
        primaryBg: "bg-[var(--ws-custom)] hover:brightness-110 text-white",
        primaryHover: "hover:text-[var(--ws-custom)] hover:bg-[var(--ws-custom-10)]",
        lightBg: "bg-[var(--ws-custom-10)] text-[var(--ws-custom)]",
        gradient: "from-[var(--ws-custom)] to-[var(--ws-custom-50)]",
        shadow: "shadow-[0_4px_14px_0_var(--ws-custom-20)]",
        ring: "focus-within:border-[var(--ws-custom-50)] focus-within:ring-2 focus-within:ring-[var(--ws-custom-10)]",
        focusRing: "focus:ring-2 focus:ring-[var(--ws-custom-20)]",
        inputBorder: "border-[var(--ws-custom-50)]",
        outline: "border-[var(--ws-custom-50)] bg-[var(--ws-custom-10)] text-[var(--ws-custom)]",
      },
    };
  }
  const isPrimary = color === "primary" || !colorThemes[color];
  const base = colorThemes[color] ?? colorThemes.primary;
  return {
    vars: {},
    theme: {
      ...base,
      // The default accent follows the theme's primary token, text included.
      lightBg: isPrimary ? "bg-primary/10 text-primary" : base.lightBg,
      outline: isPrimary
        ? "border-primary/40 bg-primary/10 text-primary"
        : `border-current/40 ${base.lightBg}`,
    },
  };
}

// ==========================================
// DEFAULT CONTENT
// ==========================================
const defaultModels: WorkspaceModel[] = [
  { id: "lite", name: "Vela Lite", description: "Instant answers to quick questions" },
  { id: "core", name: "Vela Core", description: "Balanced for everyday work" },
  { id: "pro", name: "Vela Pro", description: "Deeper reasoning, longer context", pro: true },
  { id: "ultra", name: "Vela Ultra", description: "Most capable, built for hard problems", premium: true },
];

const defaultEfforts: WorkspaceEffort[] = [
  { id: "low", label: "Low", description: "Quickest reply", level: 1 },
  { id: "medium", label: "Medium", description: "Balanced speed and depth", level: 2 },
  { id: "high", label: "High", description: "Thinks longer before answering", level: 3 },
  { id: "max", label: "Max", description: "Most thorough reasoning", level: 4 },
];

const defaultExplore: WorkspaceCard[] = [
  {
    id: "research",
    title: "Research",
    description: "Plans the question, reads across sources and writes a cited report.",
    icon: <Atom className="size-5" />,
    prompt: "Research the current state of ",
    mode: "research",
  },
  {
    id: "images",
    title: "Create images",
    description: "Describe a scene and get a generated visual back.",
    icon: <ImageIcon className="size-5" />,
    prompt: "Create an image of ",
    mode: "image",
  },
  {
    id: "web",
    title: "Search the web",
    description: "Live results with the sources listed under the answer.",
    icon: <Globe className="size-5" />,
    prompt: "What changed this week in ",
    mode: "web",
  },
  {
    id: "reason",
    title: "Think it through",
    description: "Shows the reasoning behind a tricky decision, step by step.",
    icon: <Lightbulb className="size-5" />,
    prompt: "Help me decide between ",
    mode: "reasoning",
  },
  {
    id: "docs",
    title: "Work with documents",
    description: "Attach a PDF or notes and ask for a summary, a rewrite or answers.",
    icon: <FileText className="size-5" />,
    prompt: "Read the attached file and list its open questions.",
  },
  {
    id: "brainstorm",
    title: "Brainstorm ideas",
    description: "Names, angles, campaigns: a long list, then the three best.",
    icon: <Sparkles className="size-5" />,
    prompt: "Give me 15 ideas for ",
  },
];

const defaultTemplates: WorkspaceCard[] = [
  { id: "t-email", category: "Work", title: "Follow-up email", description: "Polite, short and with a clear next step.", prompt: "Draft a polite, professional follow-up email to a client who has not replied in a week. Context: " },
  { id: "t-agenda", category: "Work", title: "Meeting agenda", description: "Goals, timings and who owns each item.", prompt: "Write a 45 minute meeting agenda for " },
  { id: "t-prd", category: "Work", title: "Product brief", description: "Problem, users, scope and success metrics.", prompt: "Write a one-page product brief for " },
  { id: "t-blog", category: "Writing", title: "Blog outline", description: "A headline, sections and a closing line.", prompt: "Create an SEO-friendly blog outline about " },
  { id: "t-caption", category: "Writing", title: "Social captions", description: "Five variations in different tones.", prompt: "Write five engaging Instagram captions for " },
  { id: "t-tagline", category: "Writing", title: "Tagline ideas", description: "Short lines that sound like a brand.", prompt: "Generate ten catchy taglines for " },
  { id: "t-study", category: "Study", title: "Study plan", description: "A week broken into focused sessions.", prompt: "Plan a balanced one-week study schedule for " },
  { id: "t-explain", category: "Study", title: "Explain like I'm new", description: "Plain words first, detail second.", prompt: "Explain this to someone who is new to it, then give a short quiz: " },
];

const defaultKnowledge: WorkspaceKnowledgeItem[] = [
  { id: "k-brand", name: "Brand guidelines.pdf", size: 2_411_000, active: true },
  { id: "k-roadmap", name: "Q3 roadmap.md", size: 18_400, active: true },
  { id: "k-support", name: "Support playbook.docx", size: 612_000, active: false },
];

const LOGO = (name: string) => `https://svgl.app/library/${name}.svg`;

const defaultConnectors: WorkspaceConnector[] = [
  { id: "drive", label: "Google Drive", description: "Files and folders", logo: LOGO("drive") },
  { id: "slack", label: "Slack", description: "Channels and threads", logo: LOGO("slack") },
  { id: "calendar", label: "Google Calendar", description: "Events and availability", logo: LOGO("google-calendar") },
  { id: "gmail", label: "Gmail", description: "Read and draft mail", logo: LOGO("gmail") },
  { id: "notion", label: "Notion", description: "Pages and wikis", logo: LOGO("notion") },
  { id: "linear", label: "Linear", description: "Issues and projects", logo: LOGO("linear") },
];

const defaultLanguages: WorkspaceLanguage[] = [
  { id: "en", label: "English", native: "English" },
  { id: "es", label: "Spanish", native: "Español" },
  { id: "fr", label: "French", native: "Français" },
  { id: "de", label: "German", native: "Deutsch" },
  { id: "ja", label: "Japanese", native: "日本語" },
  { id: "bn", label: "Bengali", native: "বাংলা" },
];

const RESEARCH_STEPS = [
  "Planning the approach",
  "Searching 14 sources",
  "Reading and cross-checking",
  "Writing the report",
];
const WEB_STEPS = ["Searching the web", "Reading the top results"];
const IMAGE_STEPS = ["Composing the scene", "Rendering"];

const SAMPLE_SOURCES: WorkspaceSource[] = [
  { id: "s1", title: "Annual industry outlook", host: "reuters.com" },
  { id: "s2", title: "What the data says", host: "nature.com" },
  { id: "s3", title: "A practitioner's guide", host: "hbr.org" },
  { id: "s4", title: "Field notes and benchmarks", host: "arxiv.org" },
];

const timeNow = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const mentionFor = (c: WorkspaceConnector) => `@${c.label.replace(/\s+/g, "")}`;

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
const simulateUpload: WorkspaceUploadHandler = (file, onProgress, signal) =>
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

const abortError = () => new DOMException("Stopped", "AbortError");

/** A timer that rejects with an AbortError when `signal` fires. */
const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(abortError());
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(abortError());
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal.addEventListener("abort", onAbort, { once: true });
  });

const clip = (text: string, max: number) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1).trimEnd()}…` : flat;
};

/**
 * Stand-in for a model: a structured answer that reflects what was asked, the
 * files attached, the tools named and the modes switched on. Swap it out with
 * the `generateReply` prop.
 */
function buildReply(p: WorkspaceSendPayload, brand: string): string {
  const topic = clip(p.content.replace(/@\w+/g, "").trim() || "your files", 56);
  const lines: string[] = [];
  if (p.language.id !== "en") lines.push(`*Replying in ${p.language.native}.*`, "");
  if (p.attachments.length > 0) {
    const names = p.attachments.map((a) => a.name).join(", ");
    lines.push(`I read **${names}** before answering.`, "");
  }
  if (p.connectors.length > 0) {
    lines.push(`Checked ${p.connectors.map((c) => c.label).join(", ")} for anything relevant.`, "");
  }
  if (p.knowledge.length > 0) {
    lines.push(`Drew on ${p.knowledge.length} source${p.knowledge.length === 1 ? "" : "s"} from your Library.`, "");
  }
  if (p.modes.image) {
    lines.push(
      `Here is a first pass for **“${topic}”**.`,
      "",
      "I leaned on soft light and a calm palette. Ask for a different mood, a wider crop or a new subject and I will regenerate it.",
    );
    return lines.join("\n");
  }
  if (p.modes.research) {
    lines.push(
      `Researched **“${topic}”** across 14 sources.`,
      "",
      `## Summary`,
      `The picture is consistent: the fundamentals matter more than the headlines, and the strongest evidence points to three habits.`,
      "",
      `## Key findings`,
      `- **Start narrow.** Teams that scope the first version tightly ship sooner and learn faster.`,
      `- **Measure early.** The best results came from picking one number to track from week one.`,
      `- **Revisit quarterly.** Assumptions drift; a short review keeps the plan honest.`,
      "",
      `## What I would do next`,
      `1. Write the goal in one sentence.`,
      `2. Pick the single metric that proves it.`,
      `3. Run a two-week trial and compare.`,
      "",
      `Ask me to go deeper on any section, or to turn this into a one-page brief.`,
    );
    return lines.join("\n");
  }
  lines.push(
    `Happy to help with **${topic}**.`,
    "",
    `Here is how I would approach it:`,
    `- **Clarify the goal.** Say who it is for and what a good result looks like.`,
    `- **Start with a draft.** A rough version is easier to improve than a blank page.`,
    `- **Refine in rounds.** Tell me what to change and I will keep the rest.`,
    "",
    `\`\`\`text`,
    `Goal: ${topic}`,
    `Audience: (your readers)`,
    `Tone: clear, friendly`,
    `\`\`\``,
    "",
    `Want me to take a first pass now? You can also switch on **Research** and ${brand} will read across sources and cite them.`,
  );
  return lines.join("\n");
}

function buildThought(p: WorkspaceSendPayload) {
  return [
    `The request is about “${clip(p.content, 60) || "the attached files"}”.`,
    p.attachments.length ? "There are files attached, so I should ground the answer in them." : "No files attached, so I will answer from general knowledge.",
    "The most useful shape is a short answer first, then the steps, then an offer to go deeper.",
  ].join("\n");
}

// ==========================================
// SMALL PIECES
// ==========================================

/** The mark: four bars turning around a centre, drawn in `currentColor`. */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <rect x="2" y="2.5" width="12" height="4.5" rx="1" />
      <rect x="17" y="2" width="4.5" height="12" rx="1" />
      <rect x="10" y="17" width="12" height="4.5" rx="1" />
      <rect x="2.5" y="10" width="4.5" height="12" rx="1" />
      <rect x="9.25" y="9.25" width="5.5" height="5.5" rx="0.75" />
    </svg>
  );
}

function ConnectorBadge({
  connector,
  size = "size-6",
  className,
}: {
  connector: WorkspaceConnector;
  size?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-background",
        connector.logo ? "bg-white" : "bg-muted text-foreground",
        size,
        className,
      )}
      style={connector.logo || !connector.color ? undefined : { backgroundColor: connector.color, color: "#fff" }}
      title={connector.label}
    >
      {connector.logo ? (
        <img src={connector.logo} alt={connector.label} loading="lazy" className="size-[62%] object-contain" />
      ) : (
        (connector.icon ?? <Plus className="size-3" />)
      )}
    </span>
  );
}

function Switch({
  checked,
  onChange,
  label,
  theme,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  theme: Theme;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full transition-colors cursor-pointer",
        FOCUS,
        checked ? theme.primaryBg.split(" ").filter((c) => c.startsWith("bg-")).join(" ") : "bg-foreground/15",
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform duration-200",
          checked && "translate-x-4",
        )}
      />
    </button>
  );
}

/**
 * A menu that opens from its trigger and closes on an outside press or
 * Escape. `side` picks whether it drops below or rises above the trigger.
 */
function Popover({
  open,
  onOpenChange,
  trigger,
  side = "bottom",
  align = "start",
  width = "w-64",
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: (state: { open: boolean; toggle: () => void }) => React.ReactNode;
  side?: "top" | "bottom";
  align?: "start" | "end";
  width?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

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

  const below = side === "bottom";
  return (
    <div ref={ref} className={cn("relative", className)}>
      {trigger({ open, toggle: () => onOpenChange(!open) })}
      <Presence
        show={open}
        hidden={{ opacity: 0, y: below ? -6 : 6, scale: 0.97 }}
        shown={{ opacity: 1, y: 0, scale: 1 }}
        duration={0.16}
        ease={EASE_OUT}
      >
        {(boxRef, style) => (
          <div
            ref={boxRef}
            role="menu"
            style={{
              transformOrigin: `${below ? "top" : "bottom"} ${align === "start" ? "left" : "right"}`,
              ...style,
            }}
            className={cn(
              "absolute z-50 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-[0_12px_32px_-12px_rgb(0_0_0/0.22)]",
              below ? "top-full mt-2" : "bottom-full mb-2",
              align === "start" ? "left-0" : "right-0",
              width,
            )}
          >
            {children}
          </div>
        )}
      </Presence>
    </div>
  );
}

function MenuRow({
  icon,
  children,
  hint,
  active,
  danger,
  disabled,
  onClick,
  theme,
  role = "menuitem",
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  hint?: React.ReactNode;
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  theme: Theme;
  role?: "menuitem" | "menuitemradio";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={role === "menuitemradio" ? !!active : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40",
        FOCUS,
        danger
          ? "text-rose-600 hover:bg-rose-500/10 dark:text-rose-400"
          : active
            ? theme.lightBg
            : "text-foreground hover:bg-muted",
      )}
    >
      {icon && <span className="shrink-0 opacity-70">{icon}</span>}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {hint && <span className="shrink-0 text-xs font-normal text-muted-foreground">{hint}</span>}
      {role === "menuitemradio" && (
        <Check className={cn("size-4 shrink-0", active ? "opacity-100" : "opacity-0")} />
      )}
    </button>
  );
}

// ---- Markdown, just enough for a chat reply ----
const inline = (text: string, keyBase: string): React.ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/g).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**"))
      return <strong key={key} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`"))
      return (
        <span key={key} className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
          {part.slice(1, -1)}
        </span>
      );
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*") && !part.startsWith("**"))
      return <em key={key}>{part.slice(1, -1)}</em>;
    return part;
  });

function Markdown({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  const lines = text.split("\n");
  let i = 0;
  let n = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      out.push(
        <pre key={n++} className="my-3 overflow-x-auto rounded-xl border border-border bg-muted/60 p-3.5 font-mono text-[12.5px] leading-relaxed text-foreground">
          {code.join("\n")}
        </pre>,
      );
    } else if (/^#{1,3}\s/.test(line)) {
      out.push(
        <h3 key={n++} className="mb-1.5 mt-5 text-[15px] font-semibold tracking-tight text-foreground first:mt-0">
          {inline(line.replace(/^#{1,3}\s/, ""), `h${n}`)}
        </h3>,
      );
      i++;
    } else if (/^\s*[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s/, ""));
      out.push(
        <ul key={n++} className="my-2 space-y-1.5 pl-1">
          {items.map((it, k) => (
            <li key={k} className="flex gap-2.5">
              <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-foreground/40" />
              <span>{inline(it, `u${n}-${k}`)}</span>
            </li>
          ))}
        </ul>,
      );
    } else if (/^\s*\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+\.\s/, ""));
      out.push(
        <ol key={n++} className="my-2 space-y-1.5 pl-1">
          {items.map((it, k) => (
            <li key={k} className="flex gap-2.5">
              <span className="w-4 shrink-0 text-right tabular-nums text-muted-foreground">{k + 1}.</span>
              <span>{inline(it, `o${n}-${k}`)}</span>
            </li>
          ))}
        </ol>,
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      const para: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !lines[i].startsWith("```") &&
        !/^#{1,3}\s/.test(lines[i]) &&
        !/^\s*[-*]\s/.test(lines[i]) &&
        !/^\s*\d+\.\s/.test(lines[i])
      )
        para.push(lines[i++]);
      out.push(
        <p key={n++} className="my-2 first:mt-0 last:mb-0">
          {inline(para.join(" "), `p${n}`)}
        </p>,
      );
    }
  }
  return <>{out}</>;
}

/** A deterministic gradient "render" for the image mode. */
function GeneratedImage({ seed }: { seed: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const a = h % 360;
  const b = (a + 40 + (h % 70)) % 360;
  const c = (a + 200) % 360;
  return (
    <div
      role="img"
      aria-label="Generated image preview"
      className="relative mt-3 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
      style={{
        backgroundImage: `radial-gradient(120% 90% at 20% 15%, hsl(${a} 85% 72%), transparent 60%), radial-gradient(90% 80% at 85% 30%, hsl(${b} 80% 62%), transparent 62%), radial-gradient(110% 90% at 55% 105%, hsl(${c} 70% 40%), transparent 65%), linear-gradient(160deg, hsl(${a} 40% 18%), hsl(${c} 45% 12%))`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_35%)]" />
      <span className="absolute bottom-2.5 left-3 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
        Preview render
      </span>
    </div>
  );
}


// ==========================================
// COMPONENT
// ==========================================
export default function AIChatWorkspace({
  brandName = "Vela",
  logo,
  chatHistory = [],
  messagesByThread = {},
  color = "primary",
  heroTitle = "What are we working on today?",
  placeholder = "Describe what you need…",
  exploreCards = defaultExplore,
  templates = defaultTemplates,
  knowledgeBase = defaultKnowledge,
  onKnowledgeChange,
  connectors = defaultConnectors,
  models = defaultModels,
  defaultModelId,
  onModelChange,
  efforts = defaultEfforts,
  defaultEffort = "medium",
  onEffortChange,
  defaultModes,
  onSend,
  generateReply,
  uploadFile,
  accept,
  maxFiles = 6,
  languages = defaultLanguages,
  defaultLanguage = "en",
  onLanguageChange,
  user = { name: "Maya Chen" },
  defaultPlan = "free",
  onUpgrade,
  onProfile,
  onSignOut,
  shareUrl = (thread) => `https://app.example.com/share/${thread.id}`,
  footerLinkLabel = "Privacy notice",
  footerLinkHref,
  onFooterLink,
  defaultSidebarCollapsed = false,
  rounded,
  className,
}: {
  /** Name beside the mark in the sidebar, in the footer note and in the upgrade copy. */
  brandName?: string;
  /** Replaces the built-in mark. Sized by the component. */
  logo?: React.ReactNode;
  /** Threads in the sidebar, grouped by their `date` string. */
  chatHistory?: readonly WorkspaceThread[];
  /** Seeds a thread's messages by id. A thread without an entry opens on a short greeting. */
  messagesByThread?: Record<string | number, readonly WorkspaceMessage[]>;
  color?: WorkspaceColor;
  /** Title above the prompt bar on the empty screen. */
  heroTitle?: string;
  placeholder?: string;
  /** Cards on the Discover screen. A card with a `mode` switches that mode on. */
  exploreCards?: readonly WorkspaceCard[];
  /** Cards on the Templates screen, filtered by `category`. */
  templates?: readonly WorkspaceCard[];
  /** Starting Library files. Active ones are sent with every prompt. */
  knowledgeBase?: readonly WorkspaceKnowledgeItem[];
  onKnowledgeChange?: (items: WorkspaceKnowledgeItem[]) => void;
  /** Tools on the strip under the prompt bar. Connected ones can be named as `@Label`. */
  connectors?: readonly WorkspaceConnector[];
  models?: readonly WorkspaceModel[];
  defaultModelId?: string;
  onModelChange?: (model: WorkspaceModel) => void;
  efforts?: readonly WorkspaceEffort[];
  defaultEffort?: WorkspaceEffortLevel;
  onEffortChange?: (effort: WorkspaceEffort) => void;
  /** Which composer modes start switched on. Research starts on. */
  defaultModes?: Partial<WorkspaceModes>;
  /** Fires with everything the composer knows each time a prompt goes out. */
  onSend?: (payload: WorkspaceSendPayload) => void;
  /** Your model. Return the reply text; it is streamed in. A built-in stand-in answers when omitted. */
  generateReply?: (payload: WorkspaceSendPayload) => string | Promise<string>;
  /** Real upload for attachments and Library files. Simulated when omitted. */
  uploadFile?: WorkspaceUploadHandler;
  /** Passed to the file input, e.g. "image/*,.pdf". */
  accept?: string;
  maxFiles?: number;
  languages?: readonly WorkspaceLanguage[];
  defaultLanguage?: string;
  onLanguageChange?: (language: WorkspaceLanguage) => void;
  user?: WorkspaceUser;
  /** Starts on `"free"`, which shows the Upgrade pill and locks the connectors. */
  defaultPlan?: WorkspacePlan;
  /** Called when the person confirms the upgrade; the component then switches to Pro. */
  onUpgrade?: () => void;
  /** Called by "View profile" in the account menu. Open your own profile page or dialog here. */
  onProfile?: () => void;
  onSignOut?: () => void;
  /** Link the Share menu and the link button copy for a thread. */
  shareUrl?: (thread: WorkspaceThread) => string;
  footerLinkLabel?: string;
  footerLinkHref?: string;
  onFooterLink?: () => void;
  defaultSidebarCollapsed?: boolean;
  /** Corner radius of the outer frame: a number in px or any CSS length. */
  rounded?: string | number;
  className?: string;
}) {
  const { theme, vars } = useAccent(color);

  // ---- threads and messages ----
  const [chats, setChats] = useState<WorkspaceThread[]>(() => [...chatHistory]);
  // `null` is the empty screen: a new chat that has not been started yet.
  const [activeChatId, setActiveChatId] = useState<number | string | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string | number, Msg[]>>(
    () => {
      const map: Record<string | number, Msg[]> = {};
      Object.entries(messagesByThread).forEach(([id, list]) => {
        map[id] = list.map((m) => ({ ...m, phase: "done" as const }));
      });
      return map;
    },
  );
  const [view, setView] = useState<View>("chat");
  const [editingChatId, setEditingChatId] = useState<number | string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // ---- composer ----
  const [inputValue, setInputValue] = useState("");
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [modes, setModes] = useState<WorkspaceModes>({
    research: true,
    web: false,
    image: false,
    reasoning: false,
    ...defaultModes,
  });
  const [selectedModelId, setSelectedModelId] = useState(
    () => defaultModelId ?? models[0]?.id ?? "",
  );
  const [selectedEffortId, setSelectedEffortId] =
    useState<WorkspaceEffortLevel>(defaultEffort);
  const [languageId, setLanguageId] = useState(defaultLanguage);
  const [tierFx, setTierFx] = useState(0);

  // ---- chrome ----
  const [collapsed, setCollapsed] = useState(defaultSidebarCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const [plan, setPlan] = useState<WorkspacePlan>(defaultPlan);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [stripOpen, setStripOpen] = useState(false);
  const [linkState, setLinkState] = useState<"idle" | "copied">("idle");
  const [shareOn, setShareOn] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(true);
  const [settings, setSettings] = useState({ enterToSend: true, showMeta: true, stream: true });
  const [connectorState, setConnectorState] = useState<Record<string, "connecting" | "connected">>({});
  const [knowledge, setKnowledge] = useState<WorkspaceKnowledgeItem[]>(() => [...knowledgeBase]);
  const [templateFilter, setTemplateFilter] = useState("All");
  const [isReplying, setIsReplying] = useState(false);
  const [atBottom, setAtBottom] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const knowledgeInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const upgradeBtnRef = useRef<HTMLButtonElement>(null);
  const abortControllers = useRef(new Map<string, AbortController>());
  const replyAbort = useRef<AbortController | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stick = useRef(true);
  const historyRef = useRef<HTMLDivElement>(null);
  // Which edges of the history list have more rows hidden beyond them.
  const [edge, setEdge] = useState({ top: false, bottom: false });

  const selectedModel = models.find((m) => m.id === selectedModelId) ?? models[0] ?? defaultModels[1];
  const selectedEffort = efforts.find((e) => e.id === selectedEffortId) ?? efforts[0] ?? defaultEfforts[1];
  const language = languages.find((l) => l.id === languageId) ?? languages[0] ?? defaultLanguages[0];
  const maxEffortLevel = Math.max(...efforts.map((e) => e.level));
  const isMaxEffort = selectedEffort.level >= maxEffortLevel;
  const selectedTier = modelTier(selectedModel);
  const tierLook = selectedTier && TIERS[selectedTier];
  const isUploading = attachments.some((a) => a.status === "uploading");
  const isPro = plan === "pro";
  const activeKnowledge = knowledge.filter((k) => k.active);

  const activeThread = chats.find((c) => c.id === activeChatId) ?? null;
  const seedMessage = (thread: WorkspaceThread): Msg => ({
    id: `seed-${thread.id}`,
    role: "ai",
    content: `You are back in **${thread.title}**. Add to it or ask a follow-up.`,
    time: timeNow(),
    phase: "done",
  });
  const activeMessages = useMemo<Msg[]>(
    () =>
      activeChatId === null
        ? []
        : (messagesMap[activeChatId] ??
          (activeThread
            ? [
                {
                  id: `seed-${activeThread.id}`,
                  role: "ai",
                  content: `You are back in **${activeThread.title}**. Add to it or ask a follow-up.`,
                  time: timeNow(),
                  phase: "done" as const,
                },
              ]
            : [])),
    [activeChatId, messagesMap, activeThread],
  );
  const isEmptyScreen = view === "chat" && activeChatId === null;

  const voice = useVoiceInput(
    useCallback((transcript: string) => setInputValue(transcript), []),
    () => inputValue,
  );

  const showNotice = useCallback((text: string) => {
    setNotice(text);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 2200);
  }, []);

  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent));
  }, []);

  // Stop work in flight when the component unmounts.
  useEffect(() => {
    const controllers = abortControllers.current;
    return () => {
      controllers.forEach((c) => c.abort());
      controllers.clear();
      replyAbort.current?.abort();
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    };
  }, []);

  // The prompt bar grows with its text, up to a cap.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }, [inputValue, view, activeChatId]);

  // The history list only fades where more rows are hidden: at the bottom
  // while there is more below, at the top once it has been scrolled.
  const measureEdges = useCallback(() => {
    const el = historyRef.current;
    if (!el) return;
    const top = el.scrollTop > 2;
    const bottom = el.scrollHeight - el.scrollTop - el.clientHeight > 2;
    setEdge((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
  }, []);
  useLayoutEffect(() => {
    measureEdges();
    const el = historyRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measureEdges);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, [measureEdges, chats, collapsed, mobileOpen]);

  // Follow the conversation while it grows, unless the reader scrolled away.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [activeMessages, isReplying]);
  useEffect(() => {
    stick.current = true;
    setAtBottom(true);
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [activeChatId, view]);

  useEffect(() => {
    if (upgradeOpen) upgradeBtnRef.current?.focus();
  }, [upgradeOpen]);

  // ---- helpers ----
  const patchMessage = (threadId: number | string, id: number | string, patch: Partial<Msg>) =>
    setMessagesMap((prev) => ({
      ...prev,
      [threadId]: (prev[threadId] ?? []).map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));

  const focusPrompt = (caretAtEnd = true) =>
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      if (caretAtEnd) el.setSelectionRange(el.value.length, el.value.length);
    });

  const copyText = async (text: string, done: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotice(done);
      return true;
    } catch {
      showNotice("Copy isn't available in this browser");
      return false;
    }
  };

  // ---- attachments ----
  const updateAttachment = (id: string, patch: Partial<PendingAttachment>) =>
    setAttachments((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const addFiles = (incoming: FileList | File[]) => {
    const room = Math.max(0, maxFiles - attachments.length);
    const next: PendingAttachment[] = Array.from(incoming)
      .slice(0, room)
      .map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
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
      upload(att.file, (pct) => updateAttachment(att.id, { progress: pct }), controller.signal)
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

  const addKnowledgeFiles = (files: FileList | File[]) => {
    const added: WorkspaceKnowledgeItem[] = Array.from(files).map((f) => ({
      id: `k-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: f.name,
      size: f.size,
      active: true,
    }));
    if (!added.length) return;
    const next = [...added, ...knowledge];
    setKnowledge(next);
    onKnowledgeChange?.(next);
    showNotice(`${added.length === 1 ? added[0].name : `${added.length} files`} added to Library`);
  };

  const updateKnowledge = (next: WorkspaceKnowledgeItem[]) => {
    setKnowledge(next);
    onKnowledgeChange?.(next);
  };

  // ---- model, effort, modes ----
  const selectModel = (model: WorkspaceModel) => {
    if (model.id !== selectedModel.id) {
      const animate =
        !!modelTier(model) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTierFx((n) => (animate ? n + 1 : 0));
    }
    setSelectedModelId(model.id);
    setOpenMenu(null);
    onModelChange?.(model);
  };

  const selectEffort = (effort: WorkspaceEffort) => {
    setSelectedEffortId(effort.id);
    onEffortChange?.(effort);
  };

  const toggleMode = (key: keyof WorkspaceModes) =>
    setModes((m) => ({ ...m, [key]: !m[key] }));

  const selectLanguage = (l: WorkspaceLanguage) => {
    setLanguageId(l.id);
    setOpenMenu(null);
    onLanguageChange?.(l);
    showNotice(`Replies in ${l.native}`);
  };

  // ---- connectors ----
  const connect = (c: WorkspaceConnector) => {
    setConnectorState((s) => ({ ...s, [c.id]: "connecting" }));
    setTimeout(() => {
      setConnectorState((s) => ({ ...s, [c.id]: "connected" }));
      showNotice(`${c.label} connected`);
    }, 900);
  };

  const disconnect = (c: WorkspaceConnector) =>
    setConnectorState((s) => {
      const next = { ...s };
      delete next[c.id];
      return next;
    });

  const mention = (c: WorkspaceConnector) => {
    const token = mentionFor(c);
    const el = textareaRef.current;
    const value = inputValue;
    let caret = value.length;
    if (!value.includes(token)) {
      const start = el?.selectionStart ?? value.length;
      const end = el?.selectionEnd ?? value.length;
      const before = value.slice(0, start);
      const after = value.slice(end);
      const lead = before && !/\s$/.test(before) ? " " : "";
      caret = (before + lead + token + " ").length;
      setInputValue(`${before}${lead}${token} ${after}`);
    }
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(caret, caret);
    });
  };

  // ---- threads ----
  const stopReply = () => replyAbort.current?.abort();

  const newChat = () => {
    stopReply();
    setView("chat");
    setActiveChatId(null);
    setInputValue("");
    attachments.forEach((a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl));
    setAttachments([]);
    setMobileOpen(false);
    setOpenMenu(null);
    focusPrompt();
  };

  const openThread = (id: number | string) => {
    if (editingChatId !== null) return;
    if (id !== activeChatId) stopReply();
    setView("chat");
    setActiveChatId(id);
    setMobileOpen(false);
  };

  const openView = (next: View) => {
    setView(next);
    setMobileOpen(false);
    setOpenMenu(null);
  };

  const saveEdit = (id: number | string) => {
    const title = editTitle.trim();
    if (!title) return;
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)));
    setEditingChatId(null);
  };

  const startEdit = (thread: WorkspaceThread) => {
    setEditingChatId(thread.id);
    setEditTitle(thread.title);
    setCollapsed(false);
    setMobileOpen(true);
    setOpenMenu(null);
  };

  const deleteThread = (id: number | string) => {
    if (id === activeChatId) {
      stopReply();
      setActiveChatId(null);
    }
    setChats((prev) => prev.filter((c) => c.id !== id));
    setMessagesMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearThread = () => {
    if (activeChatId === null) return;
    stopReply();
    setMessagesMap((prev) => ({ ...prev, [activeChatId]: [] }));
    setOpenMenu(null);
    showNotice("Conversation cleared");
  };

  const exportThread = () => {
    if (!activeThread) return;
    const md =
      `# ${activeThread.title}\n\n` +
      activeMessages
        .map((m) => `**${m.role === "user" ? "You" : brandName}** · ${m.time}\n\n${m.content}`)
        .join("\n\n---\n\n");
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeThread.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "chat"}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setOpenMenu(null);
    showNotice("Exported as Markdown");
  };

  const copyLink = async () => {
    if (!activeThread) {
      showNotice("Send a message first to get a link");
      return;
    }
    if (await copyText(shareUrl(activeThread), "Link copied")) {
      setLinkState("copied");
      setTimeout(() => setLinkState("idle"), 1600);
    }
  };

  const confirmUpgrade = () => {
    setPlan("pro");
    setUpgradeOpen(false);
    setOpenMenu(null);
    onUpgrade?.();
    showNotice("You're on Pro");
  };

  // ---- the reply ----
  const runReply = async (threadId: number | string, payload: WorkspaceSendPayload) => {
    const controller = new AbortController();
    replyAbort.current = controller;
    const { signal } = controller;
    setIsReplying(true);
    stick.current = true;

    const id = `ai-${Date.now()}`;
    const { modes: m, effort } = payload;
    const steps = m.research ? RESEARCH_STEPS : m.web ? WEB_STEPS : m.image ? IMAGE_STEPS : undefined;
    const message: Msg = {
      id,
      role: "ai",
      content: "",
      time: timeNow(),
      phase: "thinking",
      steps,
      step: 0,
      payload,
    };
    setMessagesMap((prev) => ({ ...prev, [threadId]: [...(prev[threadId] ?? []), message] }));

    try {
      if (steps) {
        for (let i = 0; i < steps.length; i++) {
          patchMessage(threadId, id, { step: i });
          await wait((m.research ? 650 : 480) + effort.level * 180, signal);
        }
        patchMessage(threadId, id, { step: steps.length });
      } else {
        await wait(650 + effort.level * 320, signal);
      }

      const text = await (generateReply ? generateReply(payload) : buildReply(payload, brandName));
      if (signal.aborted) throw abortError();

      patchMessage(threadId, id, {
        phase: "streaming",
        thought: m.reasoning ? buildThought(payload) : undefined,
      });

      if (settings.stream) {
        const words = text.split(/(\s+)/);
        let shown = "";
        for (let i = 0; i < words.length; i += 3) {
          shown += words.slice(i, i + 3).join("");
          patchMessage(threadId, id, { content: shown });
          await wait(24, signal);
        }
      } else {
        patchMessage(threadId, id, { content: text });
      }

      patchMessage(threadId, id, {
        content: text,
        phase: "done",
        time: timeNow(),
        model: payload.model.name,
        effort: payload.effort.label,
        image: m.image || undefined,
        sources: m.research || m.web ? SAMPLE_SOURCES.slice(0, m.research ? 4 : 3) : undefined,
      });
    } catch (err) {
      if ((err as { name?: string })?.name !== "AbortError") throw err;
      patchMessage(threadId, id, { phase: "stopped" });
    } finally {
      if (replyAbort.current === controller) replyAbort.current = null;
      setIsReplying(false);
    }
  };

  const send = (override?: string) => {
    const content = (override ?? inputValue).trim();
    if (isReplying || isUploading || voice.isListening) return;
    if (!content && attachments.length === 0) return;

    const sent: WorkspaceAttachment[] = attachments
      .filter((a) => a.status === "done")
      .map(({ id, name, size, type, previewUrl }) => ({ id, name, size, type, previewUrl }));

    let threadId = activeChatId;
    if (threadId === null) {
      threadId = Date.now();
      const created: WorkspaceThread = {
        id: threadId,
        title: clip(content || sent[0]?.name || "New chat", 42),
        date: "Today",
      };
      setChats((prev) => [created, ...prev]);
      setActiveChatId(threadId);
    }
    const target = threadId;

    const named = connectors
      .filter((c) => connectorState[c.id] === "connected" && content.includes(mentionFor(c)))
      .sort((a, b) => content.indexOf(mentionFor(a)) - content.indexOf(mentionFor(b)));

    const payload: WorkspaceSendPayload = {
      threadId: target,
      content,
      attachments: sent,
      model: selectedModel,
      effort: selectedEffort,
      modes,
      connectors: named,
      knowledge: activeKnowledge,
      language,
    };
    onSend?.(payload);

    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
      time: timeNow(),
      attachments: sent.length ? sent : undefined,
      phase: "done",
    };
    const existing = seedFor(target);
    setMessagesMap((prev) => ({ ...prev, [target]: [...(prev[target] ?? existing), userMsg] }));

    setInputValue("");
    setAttachments([]);
    setView("chat");
    void runReply(target, payload);
  };

  /** The greeting a history thread opens with, so a first message appends after it. */
  const seedFor = (id: number | string): Msg[] => {
    const thread = chats.find((c) => c.id === id);
    return thread && !messagesMap[id] ? [seedMessage(thread)] : [];
  };

  const regenerate = (index: number) => {
    if (isReplying || activeChatId === null) return;
    const message = activeMessages[index];
    if (!message?.payload) return;
    const payload = message.payload;
    setMessagesMap((prev) => ({
      ...prev,
      [activeChatId]: (prev[activeChatId] ?? activeMessages).filter((_, i) => i !== index),
    }));
    void runReply(activeChatId, payload);
  };

  const pickCard = (card: WorkspaceCard) => {
    if (view !== "chat" || activeChatId !== null) {
      stopReply();
      setView("chat");
      setActiveChatId(null);
    }
    setInputValue(card.prompt);
    if (card.mode) setModes((m) => ({ ...m, [card.mode as keyof WorkspaceModes]: true }));
    setMobileOpen(false);
    focusPrompt();
  };

  const onRootKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "n") {
      e.preventDefault();
      newChat();
    } else if (e.key === "Escape") {
      if (upgradeOpen) setUpgradeOpen(false);
      else if (mobileOpen) setMobileOpen(false);
    }
  };

  const onPromptKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      const modified = e.metaKey || e.ctrlKey;
      if (settings.enterToSend || modified) {
        e.preventDefault();
        send();
      }
    }
    if (e.key === "Escape") {
      setOpenMenu(null);
      if (voice.isListening) voice.stop();
    }
  };

  // ---- derived layout ----
  const groups = chats.reduce<{ label: string; items: WorkspaceThread[] }[]>((acc, chat) => {
    const group = acc.find((g) => g.label === chat.date);
    if (group) group.items.push(chat);
    else acc.push({ label: chat.date, items: [chat] });
    return acc;
  }, []);

  const categories = ["All", ...Array.from(new Set(templates.map((t) => t.category).filter(Boolean) as string[]))];
  const visibleTemplates = templates.filter((t) => templateFilter === "All" || t.category === templateFilter);
  const connectedCount = connectors.filter((c) => connectorState[c.id] === "connected").length;
  const stripText = !isPro
    ? `Go Pro to link your apps to ${brandName}`
    : connectedCount > 0
      ? `${connectedCount} ${connectedCount === 1 ? "app" : "apps"} linked to ${brandName}`
      : `Link your apps to ${brandName}`;

  const headerTitle =
    view === "explore"
      ? "Discover"
      : view === "knowledge"
        ? "Library"
        : view === "templates"
          ? "Templates"
          : (activeThread?.title ?? "New chat");

  const userInitials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const userAvatar = (size: string) => (
    <span className={cn("relative inline-flex shrink-0", size)}>
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt="" className="size-full rounded-full object-cover" />
      ) : (
        <span
          className={cn(
            "flex size-full items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold",
            theme.gradient,
            theme.primaryBg.split(" ").filter((c) => c.startsWith("text-")).join(" ") || "text-primary-foreground",
          )}
        >
          {userInitials}
        </span>
      )}
      <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-popover" aria-label="Online" />
    </span>
  );

  const radius = rounded === undefined ? undefined : typeof rounded === "number" ? `${rounded}px` : rounded;
  const mark = (cls: string) =>
    logo ? <span className={cn("inline-flex [&>*]:size-full", cls)}>{logo}</span> : <BrandMark className={cls} />;

  const iconBtn = (extra?: string) =>
    cn(
      "inline-flex shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors cursor-pointer",
      FOCUS,
      extra,
    );

  // ==========================================
  // PIECES
  // ==========================================

  /** The prompt bar with its connector strip: the empty screen and the conversation share it. */
  const composer = (
    <div className="w-full">
      <form
        ref={composerRef}
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isDragging) setIsDragging(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative rounded-2xl border border-border/60 bg-card dark:bg-black shadow-[0_1px_2px_rgb(0_0_0/0.03),0_10px_28px_-14px_rgb(0_0_0/0.14)] transition-shadow",
          theme.ring,
          isDragging && cn("ring-2", theme.inputBorder),
        )}
      >
        <MaxEffortGlow active={isMaxEffort} className={theme.primaryText} />
        {tierFx > 0 && tierLook && <tierLook.Sweep key={tierFx} onDone={() => setTierFx(0)} />}

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

        <Presence show={isDragging} hidden={{ opacity: 0 }} shown={{ opacity: 1 }} {...FADE}>
          {(ref, style) => (
            <div
              ref={ref}
              style={style}
              className={cn(
                "pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-card/85 text-sm font-semibold backdrop-blur-sm",
                theme.inputBorder,
                theme.primaryText,
              )}
            >
              <Rocket className="size-4" /> Drop files to attach
            </div>
          )}
        </Presence>

        <div className="relative px-4 pt-3">
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
                <AttachmentChips attachments={attachments} theme={theme} onRemove={removeAttachment} />
              </div>
            )}
          </Presence>

          {activeKnowledge.length > 0 && (
            <button
              type="button"
              onClick={() => openView("knowledge")}
              className={cn(
                "mb-1 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer",
                FOCUS,
              )}
            >
              <Library className="size-3" />
              {activeKnowledge.length} {activeKnowledge.length === 1 ? "file" : "files"} from Library
            </button>
          )}

          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onPromptKeyDown}
              placeholder={voice.isListening ? "" : placeholder}
              aria-label="Message"
              rows={1}
              className={cn(
                "block max-h-[168px] min-h-[44px] w-full resize-none border-none bg-transparent py-2 text-[14.5px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/70 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
                voice.isListening && "pointer-events-none opacity-0",
              )}
            />
            <Presence
              show={voice.isListening}
              hidden={{ opacity: 0, y: 4 }}
              shown={{ opacity: 1, y: 0 }}
              duration={0.2}
              ease={EASE_OUT}
            >
              {(ref, style) => (
                <div ref={ref} style={style} className="absolute inset-0 flex items-center gap-3">
                  <ListeningWave barsRef={voice.barsRef} live={voice.hasLiveAudio} className={theme.primaryText} />
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm font-semibold leading-tight", theme.primaryText)}>Listening…</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {inputValue
                        ? inputValue
                        : voice.supportsDictation
                          ? "Speak now. Tap the waveform to stop"
                          : "Dictation isn't available in this browser"}
                    </p>
                  </div>
                </div>
              )}
            </Presence>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2 px-3 pb-3 pt-1">
          <div className="flex min-w-0 items-center gap-0.5 rounded-xl bg-muted/70 p-1">
            <Popover
              open={openMenu === "model"}
              onOpenChange={(o) => setOpenMenu(o ? "model" : null)}
              side="top"
              width="w-[280px]"
              className="min-w-0"
              trigger={({ toggle, open }) => (
                <button
                  type="button"
                  onClick={toggle}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  aria-label={`Model: ${selectedModel.name}`}
                  title="Choose a model"
                  className={cn(
                    "relative flex h-8 min-w-0 max-w-[132px] items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-colors cursor-pointer sm:max-w-[176px]",
                    FOCUS,
                    tierLook ? tierLook.pill : open ? "bg-card dark:bg-black text-foreground" : "text-foreground hover:bg-card",
                  )}
                >
                  {tierFx > 0 && tierLook && <tierLook.PillFlash key={tierFx} />}
                  {tierLook && <tierLook.Icon key={tierFx} className={cn("size-3.5 shrink-0", tierFx > 0 && tierLook.iconPop)} />}
                  <span className="truncate">{selectedModel.name}</span>
                  <ChevronDown className={cn("size-3.5 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
                </button>
              )}
            >
              <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-medium text-muted-foreground">Choose a model</p>
              {models.map((model) => {
                const tier = modelTier(model);
                return (
                  <MenuRow key={model.id} role="menuitemradio" active={model.id === selectedModel.id} theme={theme} onClick={() => selectModel(model)}>
                    <span className="flex flex-col py-0.5">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-[13px] font-semibold">{model.name}</span>
                        {model.badge && <span className={cn("rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide", theme.lightBg)}>{model.badge}</span>}
                        {tier && <TierBadge tier={tier} />}
                      </span>
                      {model.description && <span className="truncate text-xs font-normal text-muted-foreground">{model.description}</span>}
                    </span>
                  </MenuRow>
                );
              })}
            </Popover>
            <span aria-hidden className="mx-0.5 h-4 w-px shrink-0 bg-border" />
            <button
              type="button"
              aria-pressed={modes.research}
              aria-label="Research"
              title="Research: plan, read across sources and write a cited report"
              onClick={() => toggleMode("research")}
              className={iconBtn(
                cn("size-8", modes.research ? theme.lightBg : "hover:bg-card hover:text-foreground"),
              )}
            >
              <Atom className="size-4" />
            </button>
            <button
              type="button"
              aria-pressed={modes.image}
              aria-label="Create an image"
              title="Create an image"
              onClick={() => toggleMode("image")}
              className={iconBtn(
                cn("size-8", modes.image ? theme.lightBg : "hover:bg-card hover:text-foreground"),
              )}
            >
              <ImageIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-pressed={modes.reasoning}
              aria-label="Show reasoning"
              title="Show the reasoning behind the answer"
              onClick={() => toggleMode("reasoning")}
              className={iconBtn(
                cn("size-8", modes.reasoning ? theme.lightBg : "hover:bg-card hover:text-foreground"),
              )}
            >
              <Lightbulb className="size-4" />
            </button>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            <Popover
              open={openMenu === "effort"}
              onOpenChange={(o) => setOpenMenu(o ? "effort" : null)}
              side="top"
              align="end"
              width="w-64 sm:w-72"
              trigger={({ toggle, open }) => (
                <button
                  type="button"
                  onClick={toggle}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  aria-label={`Effort: ${selectedEffort.label}`}
                  title={`Effort: ${selectedEffort.label}`}
                  className={iconBtn(
                    cn("size-8", isMaxEffort || open ? theme.lightBg : cn(theme.primaryHover)),
                  )}
                >
                  {isMaxEffort ? <Sparkles className="size-4" /> : <Cpu className="size-4" />}
                </button>
              )}
            >
              <div className="p-2.5 sm:p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium leading-none text-muted-foreground sm:text-sm">
                    Effort
                    <span className="ml-2 font-semibold text-foreground">{selectedEffort.label}</span>
                  </p>
                  <span
                    title={selectedEffort.description ?? "How long the model thinks before answering"}
                    className="-mr-0.5 cursor-help rounded-full p-0.5 text-muted-foreground/70 transition-colors hover:text-foreground"
                  >
                    <CircleHelp className="size-3.5 sm:size-4" />
                  </span>
                </div>
                <div className="mb-1.5 mt-3 flex items-center justify-between text-[11px] font-medium leading-none text-muted-foreground sm:mb-2 sm:mt-4 sm:text-xs">
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
            </Popover>

            <button
              type="button"
              aria-pressed={modes.web}
              aria-label="Search the web"
              title="Search the web"
              onClick={() => toggleMode("web")}
              className={iconBtn(cn("size-8", modes.web ? theme.lightBg : theme.primaryHover))}
            >
              <Globe className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Attach files"
              title={attachments.length >= maxFiles ? `Up to ${maxFiles} files` : "Attach files"}
              disabled={attachments.length >= maxFiles}
              onClick={() => fileInputRef.current?.click()}
              className={iconBtn(cn("size-8 disabled:cursor-not-allowed disabled:opacity-40", theme.primaryHover))}
            >
              <Paperclip className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                voice.toggle();
                if (voice.isListening) textareaRef.current?.focus();
              }}
              aria-pressed={voice.isListening}
              aria-label={voice.isListening ? "Stop listening" : "Dictate"}
              title={voice.isListening ? "Stop listening" : "Dictate"}
              className={iconBtn(
                cn(
                  "relative size-8",
                  voice.isListening ? cn("shadow-[0_1px_2px_rgb(0_0_0/0.04)]", theme.primaryBg) : theme.primaryHover,
                ),
              )}
            >
              {voice.isListening && (
                <span className={cn("absolute inset-0 animate-ping rounded-lg opacity-40", theme.primaryBg)} />
              )}
              <AudioLines className="relative size-4" />
            </button>

            {isReplying ? (
              <button
                type="button"
                onClick={stopReply}
                aria-label="Stop generating"
                title="Stop generating"
                className={cn(
                  "ml-1 inline-flex size-9 items-center justify-center rounded-full shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-transform active:scale-95 cursor-pointer",
                  FOCUS,
                  theme.primaryBg,
                )}
              >
                <Square className="size-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={(!inputValue.trim() && attachments.length === 0) || isUploading || voice.isListening}
                aria-label="Send message"
                title={isUploading ? "Waiting for uploads to finish" : "Send message"}
                className={cn(
                  "ml-1 inline-flex size-9 items-center justify-center rounded-full shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:saturate-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed",
                  FOCUS,
                  theme.primaryBg,
                )}
              >
                <ArrowUp className="size-4" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        <div className="rounded-b-2xl border-t border-border bg-muted/40">
          <button
            type="button"
            onClick={() => setStripOpen((o) => !o)}
            aria-expanded={stripOpen}
            className={cn(
              "flex h-10 w-full items-center gap-3 rounded-b-2xl px-4 text-[12.5px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer",
              FOCUS,
            )}
          >
            <span className="min-w-0 flex-1 truncate text-left">{stripText}</span>
            <span className="flex shrink-0 -space-x-1.5">
              {connectors.slice(0, 4).map((c) => (
                <ConnectorBadge key={c.id} connector={c} size="size-[22px]" className="opacity-95" />
              ))}
            </span>
            <ChevronRight className={cn("size-4 shrink-0 transition-transform duration-200", stripOpen && "rotate-90")} />
          </button>
          <Presence
            show={stripOpen}
            appear={false}
            hidden={{ opacity: 0, height: 0 }}
            shown={{ opacity: 1, height: "auto" }}
            duration={0.25}
            ease={EASE_OUT}
          >
            {(ref, style) => (
              <div ref={ref} style={style} className="overflow-hidden">
                <div className="max-h-[216px] space-y-0.5 overflow-y-auto px-2 pb-2">
                  {!isPro && (
                    <div className="mb-1 flex items-center justify-between gap-3 rounded-lg bg-card dark:bg-black px-3 py-2.5">
                      <p className="text-xs text-muted-foreground">Linking apps is part of Pro.</p>
                      <button
                        type="button"
                        onClick={() => setUpgradeOpen(true)}
                        className={cn("shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer", FOCUS, theme.primaryBg)}
                      >
                        Upgrade
                      </button>
                    </div>
                  )}
                  {connectors.map((c) => {
                    const state = connectorState[c.id];
                    return (
                      <div key={c.id} className="flex items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-card/70">
                        <ConnectorBadge connector={c} size="size-7" />
                        <div className="min-w-0 flex-1 leading-tight">
                          <p className="truncate text-[13px] font-medium text-foreground">{c.label}</p>
                          {c.description && <p className="truncate text-[11.5px] text-muted-foreground">{c.description}</p>}
                        </div>
                        {!isPro ? (
                          <Lock className="size-3.5 text-muted-foreground/70" aria-label="Locked on the free plan" />
                        ) : state === "connected" ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => mention(c)}
                              className={cn("rounded-md px-2 py-1 text-[11.5px] font-semibold cursor-pointer", FOCUS, theme.lightBg)}
                            >
                              Use
                            </button>
                            <button
                              type="button"
                              onClick={() => disconnect(c)}
                              aria-label={`Disconnect ${c.label}`}
                              className={iconBtn("size-6 hover:bg-card hover:text-foreground")}
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            disabled={state === "connecting"}
                            onClick={() => connect(c)}
                            className={cn(
                              "inline-flex min-w-[72px] items-center justify-center gap-1.5 rounded-md border border-border bg-card dark:bg-black px-2.5 py-1 text-[11.5px] font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-70 cursor-pointer",
                              FOCUS,
                            )}
                          >
                            {state === "connecting" ? (
                              <>
                                <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Linking
                              </>
                            ) : (
                              "Connect"
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Presence>
        </div>
      </form>
    </div>
  );

  const stepList = (msg: Msg) =>
    msg.steps && (
      <ol className="mb-3 space-y-1.5" aria-label="Progress">
        {msg.steps.map((label, i) => {
          const done = (msg.step ?? 0) > i || (msg.phase !== "thinking" && msg.phase !== "stopped");
          const active = !done && msg.phase === "thinking" && (msg.step ?? 0) === i;
          return (
            <li
              key={label}
              className={cn(
                "flex items-center gap-2.5 text-[13px] transition-colors",
                done ? "text-muted-foreground" : active ? "font-medium text-foreground" : "text-muted-foreground/50",
              )}
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full",
                  done ? theme.lightBg : "border border-border",
                )}
              >
                {done ? (
                  <Check className="size-2.5" strokeWidth={3.5} />
                ) : active ? (
                  <span className={cn("size-2.5 animate-spin rounded-full border-2 border-current border-t-transparent", theme.primaryText)} />
                ) : null}
              </span>
              {label}
            </li>
          );
        })}
      </ol>
    );

  const messageView = (msg: Msg, index: number) => {
    const isUser = msg.role === "user";
    const isLast = index === activeMessages.length - 1;
    if (isUser) {
      return (
        <div key={msg.id} className="flex justify-end">
          <div className="flex max-w-[88%] flex-col items-end gap-1.5 sm:max-w-[75%]">
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="flex flex-wrap justify-end gap-2">
                {msg.attachments.map((file) =>
                  file.previewUrl && file.type.startsWith("image/") ? (
                    <img key={file.id} src={file.previewUrl} alt={file.name} className="h-24 max-w-[180px] rounded-xl border border-border object-cover" />
                  ) : (
                    <div key={file.id} className="flex max-w-[220px] items-center gap-2 rounded-xl border border-border bg-card dark:bg-black px-3 py-2 text-xs">
                      <FileText className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate font-semibold">{file.name}</span>
                      <span className="shrink-0 text-muted-foreground">{formatBytes(file.size)}</span>
                    </div>
                  ),
                )}
              </div>
            )}
            {msg.content && (
              <div className="whitespace-pre-wrap rounded-2xl rounded-br-md bg-muted px-4 py-2.5 text-[14.5px] leading-relaxed text-foreground">
                {msg.content}
              </div>
            )}
            <span className="px-1 text-[10.5px] text-muted-foreground">{msg.time}</span>
          </div>
        </div>
      );
    }

    const working = msg.phase === "thinking" || msg.phase === "streaming";
    return (
      <div key={msg.id} className="group/msg flex gap-3">
        <span
          className={cn(
            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
            theme.gradient,
            theme.primaryBg.split(" ").filter((c) => c.startsWith("text-") || c.startsWith("dark:text-")).join(" ") || "text-primary-foreground",
          )}
        >
          {mark("size-4")}
        </span>
        <div className="min-w-0 flex-1 text-[14.5px] leading-relaxed text-foreground/90">
          {stepList(msg)}
          {msg.phase === "thinking" && !msg.steps && (
            <div className="flex items-center gap-2 py-1.5 text-[13px] text-muted-foreground" role="status">
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className={cn("size-1.5 animate-bounce rounded-full bg-current", theme.primaryText)}
                    style={{ animationDelay: `${d * 0.14}s` }}
                  />
                ))}
              </span>
              Thinking
            </div>
          )}
          {msg.thought && (
            <details className="mb-3 rounded-xl border border-border bg-muted/40 px-3.5 py-2.5 text-[13px] text-muted-foreground">
              <summary className="cursor-pointer select-none font-medium text-foreground/80">Reasoning</summary>
              <p className="mt-2 whitespace-pre-line leading-relaxed">{msg.thought}</p>
            </details>
          )}
          {msg.content && (
            <div>
              <Markdown text={msg.content} />
              {msg.phase === "streaming" && (
                <span className={cn("ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-current", theme.primaryText)} />
              )}
            </div>
          )}
          {msg.phase === "stopped" && (
            <p className="mt-1 text-xs italic text-muted-foreground">Stopped. {msg.content ? "Partial reply kept." : "Nothing was written."}</p>
          )}
          {msg.image && <GeneratedImage seed={activeMessages[index - 1]?.content ?? msg.id.toString()} />}
          {msg.sources && msg.sources.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {msg.sources.map((s, i) => (
                <span
                  key={s.id}
                  title={s.title}
                  className="inline-flex max-w-[200px] items-center gap-1.5 rounded-full border border-border bg-card dark:bg-black px-2.5 py-1 text-[11.5px] text-muted-foreground"
                >
                  <span className={cn("flex size-4 items-center justify-center rounded-full text-[9px] font-semibold", theme.lightBg)}>{i + 1}</span>
                  <span className="truncate">{s.host}</span>
                </span>
              ))}
            </div>
          )}
          {!working && msg.phase !== undefined && (
            <div className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-muted-foreground">
              {settings.showMeta && msg.model && (
                <span className="mr-1 w-full text-[10.5px] sm:w-auto">
                  {msg.time} · {msg.model}
                  {msg.effort && ` · ${msg.effort} effort`}
                </span>
              )}
              {msg.content && (
                <button type="button" aria-label="Copy reply" title="Copy" onClick={() => copyText(msg.content, "Reply copied")} className={iconBtn("size-7 hover:bg-muted hover:text-foreground")}>
                  <Copy className="size-3.5" />
                </button>
              )}
              {msg.payload && (
                <>
                  <button
                    type="button"
                    aria-label="Good reply"
                    aria-pressed={msg.feedback === "up"}
                    title="Good reply"
                    onClick={() => activeChatId !== null && patchMessage(activeChatId, msg.id, { feedback: msg.feedback === "up" ? null : "up" })}
                    className={iconBtn(cn("size-7 hover:bg-muted", msg.feedback === "up" ? "text-emerald-600 dark:text-emerald-400" : "hover:text-foreground"))}
                  >
                    <ThumbsUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Bad reply"
                    aria-pressed={msg.feedback === "down"}
                    title="Bad reply"
                    onClick={() => activeChatId !== null && patchMessage(activeChatId, msg.id, { feedback: msg.feedback === "down" ? null : "down" })}
                    className={iconBtn(cn("size-7 hover:bg-muted", msg.feedback === "down" ? "text-rose-600 dark:text-rose-400" : "hover:text-foreground"))}
                  >
                    <ThumbsDown className="size-3.5" />
                  </button>
                  {isLast && (
                    <button type="button" aria-label="Regenerate" title="Regenerate" disabled={isReplying} onClick={() => regenerate(index)} className={iconBtn("size-7 hover:bg-muted hover:text-foreground disabled:opacity-40")}>
                      <RefreshCw className="size-3.5" />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const cardGrid = (cards: readonly WorkspaceCard[], large = false) => (
    <div className={cn("grid gap-3", large ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-3")}>
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          onClick={() => pickCard(card)}
          className={cn(
            "group flex flex-col items-start gap-2 rounded-xl border border-border bg-muted/30 text-left transition-colors hover:border-foreground/20 hover:bg-muted/60 cursor-pointer",
            FOCUS,
            large ? "p-4" : "p-3.5",
          )}
        >
          {large && card.icon && (
            <span className={cn("mb-1 flex size-9 items-center justify-center rounded-lg", theme.lightBg)}>{card.icon}</span>
          )}
          <span className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
            {!large && card.icon && <span className="text-muted-foreground transition-colors group-hover:text-foreground">{card.icon}</span>}
            {card.title}
          </span>
          <span className="text-[12px] leading-snug text-muted-foreground">{card.description}</span>
        </button>
      ))}
    </div>
  );

  const pageShell = (title: string, subtitle: string, body: React.ReactNode, action?: React.ReactNode) => (
    <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{title}</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {action}
        </div>
        {body}
      </div>
    </div>
  );

  const footer = (
    <div className="relative flex shrink-0 flex-col items-center gap-2 px-4 pb-3 pt-2 sm:flex-row sm:justify-center sm:px-16">
      <p className="text-center text-[11px] leading-snug text-muted-foreground">
        {brandName} can be wrong, so check anything important. Read the{" "}
        {footerLinkHref ? (
          <a href={footerLinkHref} className="font-medium text-foreground underline underline-offset-2">{footerLinkLabel}</a>
        ) : (
          <button type="button" onClick={onFooterLink} className="font-medium text-foreground underline underline-offset-2 cursor-pointer">
            {footerLinkLabel}
          </button>
        )}
        .
      </p>
      <div className="flex items-center gap-2 sm:absolute sm:bottom-3 sm:right-4">
        <Popover
          open={openMenu === "language"}
          onOpenChange={(o) => setOpenMenu(o ? "language" : null)}
          side="top"
          align="end"
          width="w-52"
          trigger={({ toggle, open }) => (
            <button
              type="button"
              onClick={toggle}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label={`Reply language: ${language.label}`}
              title={`Reply language: ${language.label}`}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full border border-border bg-card dark:bg-black text-foreground/80 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-colors hover:bg-muted cursor-pointer",
                FOCUS,
                open && "bg-muted",
              )}
            >
              <Languages className="size-4" />
            </button>
          )}
        >
          <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-medium text-muted-foreground">Reply language</p>
          {languages.map((l) => (
            <MenuRow key={l.id} role="menuitemradio" active={l.id === language.id} hint={l.label !== l.native ? l.label : undefined} theme={theme} onClick={() => selectLanguage(l)}>
              {l.native}
            </MenuRow>
          ))}
        </Popover>
        <Popover
          open={openMenu === "help"}
          onOpenChange={(o) => setOpenMenu(o ? "help" : null)}
          side="top"
          align="end"
          width="w-64"
          trigger={({ toggle, open }) => (
            <button
              type="button"
              onClick={toggle}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Help and shortcuts"
              title="Help and shortcuts"
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full border border-border bg-card dark:bg-black text-foreground/80 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-colors hover:bg-muted cursor-pointer",
                FOCUS,
                open && "bg-muted",
              )}
            >
              <CircleHelp className="size-4" />
            </button>
          )}
        >
          <p className="flex items-center gap-2 px-2.5 pb-1 pt-1.5 text-[11px] font-medium text-muted-foreground">
            <Keyboard className="size-3.5" /> Shortcuts
          </p>
          {(
            [
              [settings.enterToSend ? "Enter" : `${isMac ? "⌘" : "Ctrl"} Enter`, "Send the message"],
              [settings.enterToSend ? "Shift Enter" : "Enter", "New line"],
              [`${isMac ? "⌘" : "Ctrl"} N`, "Start a new chat"],
              ["Esc", "Close a menu or stop dictating"],
            ] as const
          ).map(([keys, what]) => (
            <div key={what} className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-[12.5px]">
              <span className="text-muted-foreground">{what}</span>
              <kbd className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 font-sans text-[11px] font-medium text-foreground">{keys}</kbd>
            </div>
          ))}
        </Popover>
      </div>
    </div>
  );

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div
      ref={rootRef}
      onKeyDown={onRootKeyDown}
      style={{ ...vars, ...(radius ? ({ "--ws-r": radius } as React.CSSProperties) : null) }}
      className={cn(
        "relative isolate flex h-[680px] w-full max-w-full overflow-hidden rounded-[var(--ws-r,28px)] bg-muted/70 p-2 font-sans text-foreground [contain:paint] sm:h-[760px]",
        className,
      )}
    >
      <style>{MOTION_CSS}</style>

      <button
        type="button"
        aria-label="Close sidebar"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "absolute inset-0 z-20 cursor-pointer bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ease-out motion-reduce:transition-none lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* === SIDEBAR === */}
      <aside
        aria-label="Sidebar"
        className={cn(
          "shrink-0 transition-[width,opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none",
          "max-lg:absolute max-lg:inset-y-2 max-lg:left-2 max-lg:z-30 max-lg:w-[272px] max-lg:rounded-2xl max-lg:border max-lg:border-border max-lg:bg-background max-lg:shadow-[0_12px_32px_-12px_rgb(0_0_0/0.22)]",
          mobileOpen
            ? "max-lg:translate-x-0 max-lg:duration-500 max-lg:ease-[cubic-bezier(0.32,0.72,0,1)]"
            : "max-lg:invisible max-lg:-translate-x-[115%] max-lg:duration-300",
          collapsed ? "lg:invisible lg:w-0 lg:overflow-hidden lg:opacity-0" : "lg:w-[248px]",
        )}
      >
        <div className="flex h-full w-full flex-col lg:w-[248px]">
          <div className="flex items-center justify-between px-3 pb-3 pt-2">
            <div className="flex min-w-0 items-center gap-2">
              {mark(cn("size-7 shrink-0", theme.primaryText))}
              <span className="truncate text-[19px] font-semibold tracking-tight text-foreground">{brandName}</span>
            </div>
            <button
              type="button"
              onClick={() => (window.matchMedia("(min-width: 1024px)").matches ? setCollapsed(true) : setMobileOpen(false))}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className={iconBtn("size-8 border border-border bg-background hover:text-foreground")}
            >
              <PanelLeftClose className="size-4" />
            </button>
          </div>
          <div className="mx-3 h-px bg-border" />

          <div className="px-3 pt-3.5">
            <button
              type="button"
              onClick={newChat}
              className={cn(
                "flex h-10 w-full items-center gap-2 rounded-xl px-3 text-[13px] font-semibold shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-transform active:scale-[0.98] cursor-pointer",
                FOCUS,
                theme.primaryBg,
                theme.shadow,
              )}
            >
              <Plus className="size-4" />
              New chat
              <span className="ml-auto flex items-center gap-0.5 rounded-md bg-white/20 px-1.5 py-0.5 text-[10.5px] font-medium">
                <span aria-hidden>{isMac ? "⌘" : "Ctrl"}</span>
                <span aria-hidden>N</span>
                <span className="sr-only">{isMac ? "Command" : "Control"} N</span>
              </span>
            </button>
          </div>

          <nav className="space-y-0.5 px-3 pt-3.5" aria-label="Workspace">
            {(
              [
                ["explore", "Discover", <Compass key="i" className="size-4" />],
                ["knowledge", "Library", <Waypoints key="i" className="size-4" />],
                ["templates", "Templates", <Box key="i" className="size-4" />],
              ] as const
            ).map(([id, label, icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => openView(id)}
                aria-current={view === id ? "page" : undefined}
                className={cn(
                  "flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium transition-colors cursor-pointer",
                  FOCUS,
                  view === id
                    ? "bg-card font-medium text-foreground ring-1 ring-border/60 shadow-[0_1px_2px_rgb(0_0_0/0.03)]"
                    : "text-foreground/75 hover:bg-background/60 hover:text-foreground",
                )}
              >
                <span className="text-muted-foreground">{icon}</span>
                <span className="truncate">{label}</span>
              </button>
            ))}
          </nav>

          <div
            ref={historyRef}
            onScroll={measureEdges}
            style={(() => {
              const mask = `linear-gradient(to bottom, ${edge.top ? "transparent 0, black 28px" : "black 0"}, ${edge.bottom ? "black calc(100% - 28px), transparent 100%" : "black 100%"})`;
              return { maskImage: mask, WebkitMaskImage: mask };
            })()}
            className="mt-1 min-h-0 flex-1 overflow-y-auto px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div>
            {groups.length === 0 && (
              <p className="px-2.5 pt-5 text-xs leading-relaxed text-muted-foreground">
                Chats show up here after your first message.
              </p>
            )}
            {groups.map((group) => (
              <div key={group.label}>
                <p className="px-2.5 pb-1.5 pt-4 text-[10.5px] font-medium uppercase tracking-wide text-muted-foreground/80">
                  {group.label}
                </p>
                <div className="space-y-px">
                  {group.items.map((chat) => {
                    const isActive = view === "chat" && activeChatId === chat.id;
                    const isEditing = editingChatId === chat.id;
                    return isEditing ? (
                      <div key={chat.id} className="flex items-center gap-1.5 rounded-lg bg-background px-2 py-1.5 ring-1 ring-border">
                        <input
                          autoFocus
                          value={editTitle}
                          aria-label="Chat title"
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(chat.id);
                            if (e.key === "Escape") setEditingChatId(null);
                          }}
                          className={cn("min-w-0 flex-1 rounded border bg-background px-1.5 py-0.5 text-xs text-foreground outline-none", theme.inputBorder, theme.focusRing)}
                        />
                        <button type="button" aria-label="Save title" onClick={() => saveEdit(chat.id)} className="cursor-pointer text-emerald-600 dark:text-emerald-400"><Check className="size-4" /></button>
                        <button type="button" aria-label="Cancel rename" onClick={() => setEditingChatId(null)} className="cursor-pointer text-muted-foreground"><X className="size-4" /></button>
                      </div>
                    ) : (
                      <div
                        key={chat.id}
                        className={cn(
                          "group/chat relative flex h-8 items-center rounded-lg text-[12.5px] transition-colors",
                          isActive ? "bg-card font-medium text-foreground ring-1 ring-border/60 shadow-[0_1px_2px_rgb(0_0_0/0.03)]" : "text-foreground/75 hover:bg-background/60 hover:text-foreground",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => openThread(chat.id)}
                          aria-current={isActive ? "page" : undefined}
                          className={cn("h-full min-w-0 flex-1 truncate rounded-lg px-2.5 text-left cursor-pointer", FOCUS)}
                        >
                          {chat.title}
                        </button>
                        <span className="absolute right-1 hidden items-center gap-0.5 rounded-md bg-card pl-1 group-focus-within/chat:flex group-hover/chat:flex">
                          <button type="button" aria-label={`Rename ${chat.title}`} onClick={() => startEdit(chat)} className={iconBtn("size-6 hover:text-foreground")}><Pencil className="size-3" /></button>
                          <button type="button" aria-label={`Delete ${chat.title}`} onClick={() => deleteThread(chat.id)} className={iconBtn("size-6 hover:text-rose-500")}><Trash2 className="size-3" /></button>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="space-y-2 px-3 pb-1 pt-2">
            <Popover
              open={openMenu === "settings"}
              onOpenChange={(o) => setOpenMenu(o ? "settings" : null)}
              side="top"
              width="w-[232px]"
              trigger={({ toggle, open }) => (
                <button
                  type="button"
                  onClick={toggle}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  className={cn(
                    "flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-background/60 hover:text-foreground cursor-pointer",
                    FOCUS,
                    open && "bg-background/60 text-foreground",
                  )}
                >
                  <Settings className="size-4 text-muted-foreground" />
                  Settings
                </button>
              )}
            >
              {(
                [
                  ["enterToSend", "Enter sends", "Off: ⌘ Enter sends"],
                  ["stream", "Stream replies", "Off: reply appears at once"],
                  ["showMeta", "Show model on replies", "Model and effort tag"],
                ] as const
              ).map(([key, label, hint]) => (
                <div key={key} className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2">
                  <div className="min-w-0 leading-tight">
                    <p className="text-[13px] font-medium text-foreground">{label}</p>
                    <p className="text-[11px] text-muted-foreground">{hint}</p>
                  </div>
                  <Switch label={label} theme={theme} checked={settings[key]} onChange={(v) => setSettings((s) => ({ ...s, [key]: v }))} />
                </div>
              ))}
            </Popover>

            <Popover
              open={openMenu === "user"}
              onOpenChange={(o) => setOpenMenu(o ? "user" : null)}
              side="top"
              width="w-[240px]"
              className="[&>[role=menu]]:rounded-2xl [&>[role=menu]]:p-1.5 [&>[role=menu]]:shadow-[0_12px_32px_-12px_rgb(0_0_0/0.22)]"
              trigger={({ toggle, open }) => (
                <button
                  type="button"
                  onClick={toggle}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl border border-border/60 bg-card p-2 text-left shadow-[0_1px_2px_rgb(0_0_0/0.03)] transition-colors hover:bg-card/80 cursor-pointer",
                    FOCUS,
                    open && "bg-card/80",
                  )}
                >
                  {userAvatar("size-9")}
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[13px] font-medium text-foreground">{user.name}</span>
                    <span className="block text-[11.5px] text-muted-foreground">{isPro ? "Pro" : "Free"}</span>
                  </span>
                  <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
                </button>
              )}
            >
              <div className="flex items-center gap-3 px-2.5 pb-2.5 pt-2.5">
                {userAvatar("size-10")}
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <span className="truncate">{user.name}</span>
                    {isPro ? (
                      <Crown className={cn("size-3.5 shrink-0", theme.primaryText)} aria-label="Pro plan" />
                    ) : (
                      <Sprout className="size-3.5 shrink-0 text-muted-foreground" aria-label="Free plan" />
                    )}
                  </p>
                  {user.email && <p className="mt-0.5 truncate text-xs text-muted-foreground">{user.email}</p>}
                </div>
              </div>
              <div className="mx-1 h-px bg-border" />
              <div className="py-1">
                {(
                  [
                    ["View profile", <UserRound key="p" className="size-4" />, () => onProfile?.()],
                    ["Settings", <Settings key="s" className="size-4" />, () => setOpenMenu("settings")],
                  ] as const
                ).map(([label, icon, run]) => (
                  <button
                    key={label}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setOpenMenu(null);
                      run();
                    }}
                    className={cn(
                      "flex h-9 w-full items-center gap-3 rounded-lg px-2.5 text-left text-[13px] font-medium text-foreground transition-colors cursor-pointer",
                      FOCUS,
                      theme.primaryHover,
                    )}
                  >
                    <span className="shrink-0 opacity-70">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
              <div className="mx-1 h-px bg-border" />
              <div className="pt-1">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpenMenu(null);
                    onSignOut?.();
                    showNotice("Signed out");
                  }}
                  className={cn(
                    "flex h-9 w-full items-center gap-3 rounded-lg px-2.5 text-left text-[13px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer",
                    FOCUS,
                  )}
                >
                  <LogOut className="size-4 shrink-0 text-rose-500" />
                  Sign out
                </button>
              </div>
            </Popover>
          </div>
        </div>
      </aside>

      {/* === MAIN === */}
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-[calc(var(--ws-r,28px)-8px)] bg-card dark:bg-black ring-1 ring-foreground/[0.05] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_44px_-22px_rgb(0_0_0/0.2)] max-lg:rounded-[calc(var(--ws-r,28px)-8px)]">
        <header className="relative z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/40 px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-1">
            <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open sidebar" className={iconBtn("size-9 hover:bg-muted hover:text-foreground lg:hidden")}>
              <Menu className="size-5" />
            </button>
            {collapsed && (
              <button type="button" onClick={() => setCollapsed(false)} aria-label="Open sidebar" title="Open sidebar" className={iconBtn("hidden size-9 hover:bg-muted hover:text-foreground lg:inline-flex")}>
                <PanelLeftOpen className="size-[18px]" />
              </button>
            )}
            <h2 className="min-w-0 truncate px-1.5 text-[15px] font-semibold tracking-tight text-foreground">{headerTitle}</h2>
          </div>


          <div className="flex shrink-0 items-center gap-1.5">
            <Popover
              open={openMenu === "more"}
              onOpenChange={(o) => setOpenMenu(o ? "more" : null)}
              align="end"
              width="w-56"
              trigger={({ toggle, open }) => (
                <button type="button" onClick={toggle} aria-haspopup="menu" aria-expanded={open} aria-label="More" title="More" className={iconBtn(cn("size-9 hover:bg-muted hover:text-foreground", open && "bg-muted text-foreground"))}>
                  <Ellipsis className="size-[18px]" />
                </button>
              )}
            >
              <MenuRow icon={<Pencil className="size-4" />} theme={theme} disabled={!activeThread} onClick={() => activeThread && startEdit(activeThread)}>Rename chat</MenuRow>
              <MenuRow icon={<Download className="size-4" />} theme={theme} disabled={!activeThread} onClick={exportThread}>Export as Markdown</MenuRow>
              <MenuRow icon={<RefreshCw className="size-4" />} theme={theme} disabled={!activeThread || activeMessages.length === 0} onClick={clearThread}>Clear conversation</MenuRow>
              <div className="my-1 h-px bg-border" />
              <MenuRow icon={<Trash2 className="size-4" />} danger theme={theme} disabled={!activeThread} onClick={() => { if (activeThread) deleteThread(activeThread.id); setOpenMenu(null); }}>Delete chat</MenuRow>
            </Popover>

            <button
              type="button"
              onClick={copyLink}
              aria-label="Copy link"
              title="Copy link"
              className={iconBtn("size-9 border border-border bg-card dark:bg-black shadow-[0_1px_2px_rgb(0_0_0/0.04)] hover:bg-muted hover:text-foreground")}
            >
              {linkState === "copied" ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Link2 className="size-4" />}
            </button>

            <Popover
              open={openMenu === "share"}
              onOpenChange={(o) => setOpenMenu(o ? "share" : null)}
              align="end"
              width="w-[300px]"
              trigger={({ toggle, open }) => (
                <button
                  type="button"
                  onClick={toggle}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card dark:bg-black px-3 text-[13px] font-medium text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-colors hover:bg-muted cursor-pointer",
                    FOCUS,
                    open && "bg-muted",
                  )}
                >
                  <Share2 className="size-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              )}
            >
              <div className="space-y-3 p-3">
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Share this chat</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {activeThread ? "Anyone with the link can read it." : "Send a message first, then share it."}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] text-foreground">Link sharing</span>
                  <Switch label="Link sharing" theme={theme} checked={shareOn} onChange={setShareOn} />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    aria-label="Share link"
                    value={activeThread ? shareUrl(activeThread) : ""}
                    placeholder="No link yet"
                    disabled={!shareOn || !activeThread}
                    className="min-w-0 flex-1 truncate rounded-lg border border-border bg-muted/50 px-2.5 py-2 text-xs text-muted-foreground outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    disabled={!shareOn || !activeThread}
                    onClick={copyLink}
                    className={cn("shrink-0 rounded-lg px-3 py-2 text-xs font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed", FOCUS, theme.primaryBg)}
                  >
                    {linkState === "copied" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </Popover>
          </div>
        </header>

        {/* ---- body ---- */}
        {view === "chat" && isEmptyScreen && (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 sm:px-6">
            <div className="m-auto flex w-full max-w-[580px] flex-col items-center py-6">
              <div className="aichat-rise-10 flex flex-col items-center">
                {!isPro && (
                  <button
                    type="button"
                    onClick={() => setUpgradeOpen(true)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-[12.5px] text-foreground/80 transition-colors hover:bg-muted cursor-pointer",
                      FOCUS,
                    )}
                  >
                    <WandSparkles className={cn("size-3.5", theme.primaryText)} />
                    <span>
                      <span className={cn("font-semibold", theme.primaryText)}>Go Pro</span> to unlock every tool
                    </span>
                  </button>
                )}
                {mark(cn("mt-7 size-[52px]", theme.primaryText))}
                <h1 className="mt-5 text-balance text-center text-[26px] font-medium leading-tight tracking-[-0.02em] text-foreground sm:text-[32px]">
                  {heroTitle}
                </h1>
              </div>
              <div className="aichat-rise-14 mt-7 w-full">
                {composer}
              </div>
            </div>
          </div>
        )}

        {view === "chat" && !isEmptyScreen && (
          <>
            <div className="relative min-h-0 flex-1">
              <div
                ref={scrollRef}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const near = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
                  stick.current = near;
                  setAtBottom(near);
                }}
                className="h-full overflow-y-auto px-4 py-6 sm:px-6"
              >
                <div className="mx-auto flex max-w-3xl flex-col gap-7">{activeMessages.map(messageView)}</div>
              </div>
              {!atBottom && (
                <button
                  type="button"
                  aria-label="Scroll to latest"
                  onClick={() => {
                    stick.current = true;
                    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
                  }}
                  className={cn("absolute bottom-3 left-1/2 inline-flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card dark:bg-black shadow-[0_1px_2px_rgb(0_0_0/0.04)] cursor-pointer", FOCUS)}
                >
                  <ChevronDown className="size-4" />
                </button>
              )}
            </div>
            <div className="shrink-0 px-4 pb-1 sm:px-6">
              <div className="mx-auto max-w-3xl">{composer}</div>
            </div>
          </>
        )}

        {view === "explore" &&
          pageShell("Discover", "Pick a starting point. Each one switches on the right mode and drops a prompt in the bar.", cardGrid(exploreCards, true))}

        {view === "templates" &&
          pageShell(
            "Templates",
            "Prompts that already say what good looks like. Pick one and fill in the blanks.",
            <>
              <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Template categories">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={templateFilter === c}
                    onClick={() => setTemplateFilter(c)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                      FOCUS,
                      templateFilter === c ? theme.outline : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {cardGrid(visibleTemplates, true)}
            </>,
          )}

        {view === "knowledge" &&
          pageShell(
            "Library",
            "Files switched on here are sent with every prompt, so answers come from your material.",
            <>
              <input
                ref={knowledgeInputRef}
                type="file"
                multiple
                accept={accept}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) addKnowledgeFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              {knowledge.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
                  <Library className="mx-auto size-6 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium text-foreground">Nothing in your Library yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">Add a PDF, notes or a spreadsheet and ask questions about it.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                  {knowledge.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 bg-card dark:bg-black px-4 py-3">
                      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", theme.lightBg)}>
                        <FileText className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1 leading-tight">
                        <p className="truncate text-[13.5px] font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{formatBytes(item.size)}</p>
                      </div>
                      <span className="hidden text-xs text-muted-foreground sm:block">{item.active ? "In use" : "Off"}</span>
                      <Switch label={`Use ${item.name}`} theme={theme} checked={item.active} onChange={(v) => updateKnowledge(knowledge.map((k) => (k.id === item.id ? { ...k, active: v } : k)))} />
                      <button type="button" aria-label={`Remove ${item.name}`} onClick={() => updateKnowledge(knowledge.filter((k) => k.id !== item.id))} className={iconBtn("size-8 hover:bg-muted hover:text-rose-500")}>
                        <Trash2 className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>,
            <button
              type="button"
              onClick={() => knowledgeInputRef.current?.click()}
              className={cn("inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-[13px] font-semibold shadow-[0_1px_2px_rgb(0_0_0/0.04)] cursor-pointer", FOCUS, theme.primaryBg)}
            >
              <Plus className="size-4" /> Add files
            </button>,
          )}

        {footer}

        {/* ---- overlays ---- */}
        {notice && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute bottom-16 left-1/2 z-40 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-[0_12px_32px_-12px_rgb(0_0_0/0.22)] aichat-rise-10"
          >
            {notice}
          </div>
        )}

        {upgradeOpen && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
            onMouseDown={(e) => e.target === e.currentTarget && setUpgradeOpen(false)}
          >
            <div role="dialog" aria-modal="true" aria-labelledby="ws-upgrade-title" className="aichat-rise-10 w-full max-w-sm rounded-2xl border border-border bg-card dark:bg-black p-5 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.22)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="ws-upgrade-title" className="text-lg font-semibold tracking-tight text-foreground">Upgrade to Pro</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Everything on the free plan, plus the tools that need more room.</p>
                </div>
                <button type="button" aria-label="Close" onClick={() => setUpgradeOpen(false)} className={iconBtn("size-8 hover:bg-muted hover:text-foreground")}>
                  <X className="size-4" />
                </button>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-foreground">
                {["Link Drive, Slack, Gmail and more", "Longer research runs", "Pro and Ultra models, unlocked"].map((line) => (
                  <li key={line} className="flex items-center gap-2.5">
                    <span className={cn("flex size-5 items-center justify-center rounded-full", theme.lightBg)}>
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-2">
                <button type="button" onClick={() => setUpgradeOpen(false)} className={cn("h-10 flex-1 rounded-xl border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted cursor-pointer", FOCUS)}>
                  Not now
                </button>
                <button ref={upgradeBtnRef} type="button" onClick={confirmUpgrade} className={cn("h-10 flex-1 rounded-xl text-sm font-semibold shadow-[0_1px_2px_rgb(0_0_0/0.04)] cursor-pointer", FOCUS, theme.primaryBg)}>
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


// ==========================================
// MOTION, UPLOAD CHIPS, SLIDER, TIER EFFECTS AND VOICE
// Carried over unchanged from Ai-chat so every composer feature behaves the same.
// ==========================================
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
          <span className="aichat-check relative size-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
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
      className="group relative flex items-center gap-2.5 rounded-xl border border-border bg-card/90 pl-2 pr-3 py-2 w-[232px] max-w-full shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
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
  efforts: readonly WorkspaceEffort[];
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
          "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
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
      <span
        className="absolute inset-0 overflow-hidden rounded-2xl p-[2px]"
        style={RING_MASK}
      >
        <span
          className="aichat-premium-orbit absolute left-1/2 top-1/2 aspect-square w-[150%]"
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
