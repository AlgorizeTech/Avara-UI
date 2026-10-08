"use client";

import { cn } from "@/lib/utils";
import { SelectBlock } from "./SelectBlock";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronDown,
  Clock,
  Image as ImageIcon,
  Inbox,
  LayoutGrid,
  LifeBuoy,
  List,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Plus,
  Send,
  Smile,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const SORT_OPTIONS = ["Newest", "Oldest"];
const FALLBACK_STATUSES = ["Open", "Pending", "Resolved", "Closed"];

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type SupportVariant = "default" | "minimal" | "glass" | "liquid-glass";
export type SupportColor = "primary" | "indigo" | "rose" | "emerald" | "zinc";
export type SupportLayout = "chat" | "table";

import {
  LiquidGlassSvgFilter,
  LiquidGlassWrapper,
  formatRadius,
} from "@/components/custom/ui/liquid-glass";
export { LiquidGlassSvgFilter };

const supportVariants: Record<SupportVariant, Record<string, string>> = {
  default: {
    wrapper:
      "bg-background text-foreground border border-border shadow-xl",
    header:
      "bg-muted border-b border-border",
    sidebar:
      "bg-card text-card-foreground border-r border-border",
    filterBar:
      "bg-muted/50 border-b border-border",
    main: "bg-background text-foreground",
    chatHeader:
      "bg-muted/50 backdrop-blur-md border-b border-border",
    chatFooter:
      "bg-muted/50 border-t border-border",
    detailsPane:
      "bg-muted/50 border-l border-border",
    card: "bg-card text-card-foreground border border-border shadow-sm rounded-xl",
    cardHeader:
      "bg-muted border-b border-border rounded-t-[inherit]",
    input:
      "bg-muted border border-border",
    chatBubbleReceived:
      "bg-muted text-foreground border border-border/50",
    tableRow:
      "hover:bg-muted border-b border-border transition-colors cursor-pointer",
    tableHead:
      "bg-muted border-b border-border text-muted-foreground",
  },
  minimal: {
    wrapper: "bg-transparent border-none shadow-none rounded-none",
    header:
      "bg-transparent border-b border-border mb-4 pb-2",
    sidebar:
      "bg-muted/50 rounded-2xl border border-border lg:mr-4 overflow-hidden",
    filterBar:
      "bg-transparent border-b border-border",
    main: "bg-transparent",
    chatHeader:
      "bg-transparent border-b border-border mb-2",
    chatFooter:
      "bg-transparent border-t border-border mt-2",
    detailsPane:
      "bg-transparent border-l border-border pl-4",
    card: "bg-muted/50 border border-border rounded-xl",
    cardHeader:
      "bg-transparent border-b border-border rounded-t-[inherit]",
    input:
      "bg-muted border border-border",
    chatBubbleReceived:
      "bg-muted text-foreground",
    tableRow:
      "hover:bg-muted/50 border-b border-border transition-colors cursor-pointer",
    tableHead:
      "bg-transparent border-b border-border text-muted-foreground",
  },
  glass: {
    wrapper:
      "bg-transparent text-foreground border-0 shadow-none",
    header:
      "bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10 backdrop-blur-md",
    sidebar:
      "bg-white/10 dark:bg-black/10 border-r border-white/20 dark:border-white/10",
    filterBar:
      "bg-white/5 dark:bg-black/5 border-b border-white/10 dark:border-white/5",
    main: "bg-transparent",
    chatHeader:
      "bg-white/5 dark:bg-black/5 border-b border-white/10 dark:border-white/5 backdrop-blur-md",
    chatFooter:
      "bg-white/5 dark:bg-black/5 border-t border-white/10 dark:border-white/5 backdrop-blur-md",
    detailsPane:
      "bg-white/5 dark:bg-black/5 border-l border-white/20 dark:border-white/10",
    card: "bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-lg rounded-xl",
    cardHeader:
      "bg-white/10 dark:bg-black/10 border-b border-white/10 dark:border-white/5 rounded-t-[inherit]",
    input:
      "bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/10",
    chatBubbleReceived:
      "bg-white/50 dark:bg-black/50 backdrop-blur-md text-foreground border border-white/30 dark:border-white/10",
    tableRow:
      "hover:bg-white/10 dark:hover:bg-white/5 border-b border-white/10 dark:border-white/5 transition-colors cursor-pointer",
    tableHead:
      "bg-white/5 dark:bg-white/5 border-b border-white/20 dark:border-white/10 text-foreground",
  },
  "liquid-glass": {
    wrapper:
      "bg-transparent text-white border-0 shadow-none",
    header:
      "bg-white/10 border-b border-white/20 text-white",
    sidebar:
      "bg-white/10 border-r border-white/20 text-white",
    filterBar:
      "bg-white/10 border-b border-white/15 text-white",
    main: "bg-transparent text-white",
    chatHeader:
      "bg-white/10 border-b border-white/20 text-white",
    chatFooter:
      "bg-white/10 border-t border-white/20 text-white",
    detailsPane:
      "bg-white/10 border-l border-white/20 text-white",
    card: "bg-white/10 border border-white/20 shadow-lg rounded-xl text-white",
    cardHeader:
      "bg-white/10 border-b border-white/15 text-white/90 rounded-t-[inherit]",
    input:
      "bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40",
    chatBubbleReceived:
      "bg-white/15 text-white border border-white/20 shadow-md",
    tableRow:
      "hover:bg-white/10 border-b border-white/15 text-white transition-colors cursor-pointer",
    tableHead:
      "bg-white/10 border-b border-white/20 text-white font-semibold",
  },
};

const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"].map((p) => ({
  label: p,
  value: p,
}));

const colorThemes: Record<SupportColor, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20",
    lightBg: "bg-primary/10 text-primary",
    border: "border-primary/30",
    activeBorder: "border-b-2 border-primary/30",
    focusRing: "focus:ring-primary/20 focus:border-primary/30",
    iconBg: "bg-primary/10 text-primary",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/20",
    lightBg: "bg-indigo-50/50 dark:bg-indigo-500/10",
    border: "border-indigo-500",
    activeBorder: "border-b-2 border-indigo-500",
    focusRing: "focus:ring-indigo-500/20 focus:border-indigo-500",
    iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20",
    lightBg: "bg-rose-50/50 dark:bg-rose-500/10",
    border: "border-rose-500",
    activeBorder: "border-b-2 border-rose-500",
    focusRing: "focus:ring-rose-500/20 focus:border-rose-500",
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20",
    lightBg: "bg-emerald-50/50 dark:bg-emerald-500/10",
    border: "border-emerald-500",
    activeBorder: "border-b-2 border-emerald-500",
    focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 shadow-zinc-900/10",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50",
    border: "border-zinc-900 dark:border-white",
    activeBorder: "border-b-2 border-zinc-900 dark:border-zinc-100",
    focusRing: "focus:ring-zinc-500/20 focus:border-zinc-500",
    iconBg: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  },
};

const liquidGlassStyles = {
  btn: "bg-white/20 hover:bg-white/30 text-white border border-white/35 transition-all active:scale-95 cursor-pointer",
  bubbleSent:
    "rounded-2xl rounded-tl-sm bg-white/20 text-white border border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.35)]",
  bubbleReceived:
    "rounded-2xl rounded-tr-sm bg-black/35 text-white/95 border border-white/15 shadow-md",
  activeItem:
    "bg-white/10 border-l-2 border-white text-white font-semibold",
  activeTab:
    "bg-white/10 text-white border-b-2 border-white font-semibold",
  iconBg:
    "bg-white/15 border border-white/25 text-white shadow-inner",
  badge:
    "bg-white/20 text-white border border-white/30 font-semibold",
  input:
    "bg-white/10 border border-white/25 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/50 shadow-inner",
  dropdown:
    "bg-black/70 text-white border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)]",
};

// ==========================================
// TYPESCRIPT DEFINITIONS
// ==========================================
export type TicketContact = {
  name: string;
  email: string;
  phone: string;
  identifier: string;
};
export type TicketSLA = { firstResponse: string; resolution: string };
export type TicketMessage = {
  id: string | number;
  type: "received" | "sent";
  sender: string;
  initials: string;
  color?: string;
  message: string;
  time: string;
  showAvatar: boolean;
};
export type Ticket = {
  id: string;
  title: string;
  author: string;
  company: string;
  initials: string;
  color: string;
  status: string;
  time: string;
  contact: TicketContact;
  sla: TicketSLA;
  properties: Record<string, string>;
  chatHistory: TicketMessage[];
};

export type SupportData = {
  header: { title: string; subtitle: string };
  filters: { id: string; label: string; count: number | null; icon: string }[];
  emptyState: { greetingPrefix: string; userName: string; message: string };
  replySection: { tabs: string[]; placeholder: string; buttonText: string };
  detailsSection: { tabs: string[]; dropdownOptions: Record<string, string[]> };
  tickets: Ticket[];
};

const ICON_MAP: Record<string, React.ElementType> = {
  Inbox: Inbox,
  Clock: Clock,
};

const BulletproofAvatar = ({
  initials,
  color,
  size = 40,
}: {
  initials: string;
  color: string;
  size?: number;
}) => (
  <div
    className={`relative shrink-0 flex-none rounded-full shadow-sm flex items-center justify-center font-semibold text-white tracking-wider ${color}`}
    style={{ width: size, height: size, minWidth: size, minHeight: size }}
  >
    {initials}
  </div>
);

export interface SupportDashboardProps {
  data?: SupportData;
  variant?: SupportVariant;
  color?: SupportColor;
  layout?: SupportLayout;
  bgImage?: string;
  /** Optional dynamic corner rounding radius value or Tailwind class */
  rounded?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export default function SupportDashboard({
  data,
  variant = "default",
  color = "primary",
  layout = "chat",
  bgImage,
  rounded,
  className,
  style: customStyle,
}: SupportDashboardProps) {
  const formattedRadius = formatRadius(rounded);
  const dynamicRadiusStyle: React.CSSProperties =
    formattedRadius !== undefined
      ? { borderRadius: formattedRadius }
      : typeof rounded === "string" && !formatRadius(rounded)
        ? {}
        : { borderRadius: "var(--radius-2xl, 1rem)" };
  // === STATE MANAGEMENT ===
  const [tickets, setTickets] = useState<Ticket[]>(data?.tickets || []);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [activeReplyTab, setActiveReplyTab] = useState("Reply");
  const [activeDetailsTab, setActiveDetailsTab] = useState(
    () => data?.detailsSection?.tabs?.[0] ?? "User",
  );

  useEffect(() => {
    if (data?.detailsSection?.tabs?.length) {
      setActiveDetailsTab(data.detailsSection.tabs[0]);
    }
  }, [data?.detailsSection?.tabs]);

  // Create Ticket State
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState({
    title: "",
    author: "",
    priority: "Medium",
    message: "",
  });

  // Reply State
  const [replyText, setReplyText] = useState("");

  // Sidebar filter bar. Both buttons already drew a chevron but did nothing —
  // these back them with real dropdowns. Defaults come from the data's own
  // labels so the bar reads exactly as before on first paint.
  const [statusFilter, setStatusFilter] = useState(
    () => data?.filters?.find((f) => f.id === "status")?.label ?? "All",
  );
  const [sortOrder, setSortOrder] = useState(
    () => data?.filters?.find((f) => f.id === "sort")?.label ?? "Newest",
  );
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Table view: which ticket is open in the email modal, plus its own composer
  // state so typing there never bleeds into the chat view's reply box.
  const [modalTicketId, setModalTicketId] = useState<string | null>(null);
  const [modalReplyText, setModalReplyText] = useState("");
  const [modalReplyTab, setModalReplyTab] = useState("Reply");

  useEffect(() => {
    if (!openFilterId) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!filterBarRef.current?.contains(e.target as Node)) {
        setOpenFilterId(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [openFilterId]);

  const statusOptions = useMemo(
    () => [
      "All",
      ...(data?.detailsSection?.dropdownOptions?.status ?? FALLBACK_STATUSES),
    ],
    [data],
  );

  const visibleTickets = useMemo(() => {
    const byStatus =
      statusFilter === "All"
        ? tickets
        : tickets.filter(
            (t) => t.status.toLowerCase() === statusFilter.toLowerCase(),
          );
    // `time` is a display string ("10m ago"), not a timestamp, so the incoming
    // order is the only reliable chronology — authored newest-first.
    return sortOrder === "Oldest" ? [...byStatus].reverse() : byStatus;
  }, [tickets, statusFilter, sortOrder]);

  if (!data || !data.tickets)
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-muted border border-border rounded-xl text-muted-foreground">
        Please pass the data prop to SupportDashboard
      </div>
    );

  const theme = colorThemes[color] || colorThemes.indigo;
  const styles = supportVariants[variant] || supportVariants.default;
  const isLiquidGlass = variant === "liquid-glass";
  const isGlassLike = variant === "glass" || isLiquidGlass;
  const liquidBg =
    bgImage ||
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg";

  // Derive active ticket and metrics from STATE, not static data
  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);
  const modalTicket = tickets.find((t) => t.id === modalTicketId);
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (t) => t.status.toLowerCase() === "open",
  ).length;
  const highPriority = tickets.filter(
    (t) =>
      t.properties.priority === "High" || t.properties.priority === "Urgent",
  ).length;

  // === HANDLERS ===
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketForm.title || !newTicketForm.author) return;

    const newTicket: Ticket = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTicketForm.title,
      author: newTicketForm.author,
      company: "New Customer",
      initials: newTicketForm.author.substring(0, 2).toUpperCase(),
      color: "bg-purple-500", // Default new ticket color
      status: "open",
      time: "Just now",
      contact: {
        name: newTicketForm.author,
        email: `${newTicketForm.author.toLowerCase().replace(" ", ".")}@example.com`,
        phone: "Pending",
        identifier: "new_user",
      },
      sla: {
        firstResponse: "Pending",
        resolution: "Pending",
      },
      properties: {
        status: "Open",
        group: "Support",
        assignedTo: "Unassigned",
        priority: newTicketForm.priority,
        type: "Question",
      },
      chatHistory: [
        {
          id: Date.now(),
          type: "received",
          sender: newTicketForm.author,
          initials: newTicketForm.author.substring(0, 2).toUpperCase(),
          color: "bg-purple-500",
          message: newTicketForm.message || "No description provided.",
          time: "Just now",
          showAvatar: true,
        } as TicketMessage,
      ],
    };

    setTickets([newTicket, ...tickets]);
    setIsCreatingTicket(false);
    setNewTicketForm({
      title: "",
      author: "",
      priority: "Medium",
      message: "",
    });
  };

  // Shared by the chat view's composer and the table view's modal composer, so
  // a reply sent from either place lands in the same conversation.
  const appendReply = (ticketId: string, text: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              chatHistory: [
                ...ticket.chatHistory,
                {
                  id: Date.now(),
                  type: "sent",
                  sender: data.emptyState.userName || "Agent",
                  initials: "ME",
                  color: "bg-indigo-500",
                  message: text,
                  time: "Just now",
                  showAvatar: false, // Hide avatar for consecutive agent messages for clean UI
                } as TicketMessage,
              ],
            }
          : ticket,
      ),
    );
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicketId) return;
    appendReply(selectedTicketId, replyText);
    setReplyText("");
  };

  const handleSendModalReply = () => {
    if (!modalReplyText.trim() || !modalTicketId) return;
    appendReply(modalTicketId, modalReplyText);
    setModalReplyText("");
  };

  const closeTicketModal = () => {
    setModalTicketId(null);
    setModalReplyText("");
  };

  const dashboardCard = (
    <div
      className={cn(
        "relative not-prose w-full max-w-full h-[700px] flex flex-col overflow-hidden font-sans box-border text-base m-0 p-0 leading-normal transition-colors duration-300 rounded-[inherit]",
        variant === "default" && "rounded-xl",
        variant === "minimal" && "rounded-none",
        (variant === "glass" || isLiquidGlass) && "rounded-2xl",
        styles.wrapper,
        className,
      )}
      style={!isLiquidGlass && variant !== "glass" ? customStyle : undefined}
    >
      {/* === TABLE VIEW: EMAIL / CONVERSATION MODAL === */}
      {modalTicket && (
        <div
          onClick={closeTicketModal}
          className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 animate-in fade-in duration-200"
        >
          {isLiquidGlass ? (
            <LiquidGlassWrapper
              radius="1.5rem"
              bgImage={liquidBg}
              filterId="glass-blur-support"
              contrastOverlayClassName="bg-black/55 backdrop-blur-md"
              className="relative w-full max-w-2xl max-h-full text-white shadow-[0_30px_70px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative z-10 flex flex-col h-full max-h-full overflow-hidden">
                <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-white/15 bg-white/10 shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <BulletproofAvatar
                      initials={modalTicket.initials}
                      color={modalTicket.color}
                      size={40}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate text-white">
                        {modalTicket.title}
                      </div>
                      <div className="text-xs font-medium truncate text-white/70">
                        {modalTicket.author} ({modalTicket.company}) •{" "}
                        <span className="text-white font-semibold">{modalTicket.id}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeTicketModal}
                    className="p-1.5 rounded-lg shrink-0 transition-colors cursor-pointer text-white/70 hover:text-white hover:bg-white/15"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Same bubble treatment as the chat view */}
                <div className="flex-1 min-h-0 overflow-y-auto p-5">
                  <div className="flex flex-col gap-6">
                    {modalTicket.chatHistory.map((msg) => {
                      const isAgent = msg.type === "sent";
                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-3 w-full ${isAgent ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`shrink-0 ${!msg.showAvatar && "invisible"}`}
                          >
                            <BulletproofAvatar
                              initials={msg.initials}
                              color={msg.color || "bg-zinc-600 dark:bg-zinc-700"}
                              size={32}
                            />
                          </div>
                          <div
                            className={`flex flex-col gap-1 min-w-0 max-w-[85%] ${isAgent ? "items-end" : "items-start"}`}
                          >
                            <div className="flex items-baseline gap-2 px-1">
                              <span className="text-[11px] font-semibold text-white/90">
                                {msg.sender}
                              </span>
                              <span className="text-[10px] font-medium text-white/60">
                                {msg.time}
                              </span>
                            </div>
                            <div
                              className={cn(
                                "px-4 sm:px-5 py-3 shadow-sm text-sm whitespace-pre-wrap break-words leading-relaxed",
                                isAgent
                                  ? liquidGlassStyles.bubbleSent
                                  : liquidGlassStyles.bubbleReceived,
                              )}
                            >
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Composer */}
                <div className="p-4 shrink-0 flex-none border-t border-white/15 bg-white/5">
                  <div className="border border-white/20 rounded-2xl flex flex-col overflow-hidden transition-all m-0 p-0 bg-white/10 text-white">
                    <div className="flex border-b border-white/15 bg-white/10 m-0 p-0">
                      {data.replySection.tabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setModalReplyTab(tab)}
                          className={cn(
                            "px-5 py-2.5 text-[13px] font-semibold transition-colors m-0 cursor-pointer",
                            modalReplyTab === tab
                              ? liquidGlassStyles.activeTab
                              : "text-white/60 hover:text-white border-b-2 border-transparent",
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={modalReplyText}
                      onChange={(e) => setModalReplyText(e.target.value)}
                      rows={3}
                      placeholder={
                        modalReplyTab === "Reply"
                          ? data.replySection.placeholder
                          : "Type an internal note..."
                      }
                      className={cn(
                        "w-full p-4 text-sm resize-none outline-none bg-transparent text-white placeholder:text-white/50 focus:ring-0",
                        modalReplyTab !== "Reply" && "bg-amber-500/10 text-amber-200",
                      )}
                    />
                    <div className="flex items-center justify-between px-3 py-2 border-t border-white/15 bg-white/5">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg transition-colors cursor-pointer text-white/70 hover:text-white hover:bg-white/10">
                          <Smile className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg transition-colors cursor-pointer text-white/70 hover:text-white hover:bg-white/10">
                          <Paperclip className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={closeTicketModal}
                          className="px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleSendModalReply}
                          disabled={!modalReplyText.trim()}
                          className={cn(
                            "flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white",
                            modalReplyTab === "Reply"
                              ? liquidGlassStyles.btn
                              : "bg-amber-500/30 hover:bg-amber-500/40 border border-amber-400/40 text-amber-100",
                          )}
                        >
                          {modalReplyTab === "Reply"
                            ? data.replySection.buttonText
                            : "Add Note"}{" "}
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LiquidGlassWrapper>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full max-w-2xl max-h-full rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200",
                isGlassLike
                  ? "bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 backdrop-blur-2xl"
                  : "bg-background border border-border",
              )}
            >
              <div className="relative z-10 flex flex-col h-full max-h-full overflow-hidden">
                <div
                  className={cn(
                    "flex items-start justify-between gap-3 px-5 py-4 border-b shrink-0",
                    "border-border",
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <BulletproofAvatar
                      initials={modalTicket.initials}
                      color={modalTicket.color}
                      size={40}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate text-foreground">
                        {modalTicket.title}
                      </div>
                      <div className="text-xs font-medium truncate text-muted-foreground">
                        {modalTicket.author} ({modalTicket.company}) •{" "}
                        <span className={theme.text}>{modalTicket.id}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeTicketModal}
                    className="p-1.5 rounded-lg shrink-0 transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Same bubble treatment as the chat view */}
                <div className="flex-1 min-h-0 overflow-y-auto p-5">
                  <div className="flex flex-col gap-6">
                    {modalTicket.chatHistory.map((msg) => {
                      const isAgent = msg.type === "sent";
                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-3 w-full ${isAgent ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`shrink-0 ${!msg.showAvatar && "invisible"}`}
                          >
                            <BulletproofAvatar
                              initials={msg.initials}
                              color={msg.color || "bg-zinc-600 dark:bg-zinc-700"}
                              size={32}
                            />
                          </div>
                          <div
                            className={`flex flex-col gap-1 min-w-0 max-w-[85%] ${isAgent ? "items-end" : "items-start"}`}
                          >
                            <div className="flex items-baseline gap-2 px-1">
                              <span className="text-[11px] font-semibold text-foreground/70">
                                {msg.sender}
                              </span>
                              <span className="text-[10px] font-medium text-muted-foreground">
                                {msg.time}
                              </span>
                            </div>
                            <div
                              className={cn(
                                "px-4 sm:px-5 py-3 shadow-sm text-sm whitespace-pre-wrap break-words leading-relaxed",
                                isAgent
                                  ? cn(
                                      "rounded-2xl rounded-tl-sm text-white font-medium shadow-md",
                                      theme.bg,
                                    )
                                  : cn(styles.chatBubbleReceived),
                              )}
                            >
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Composer */}
                <div className={cn("p-4 shrink-0 flex-none", styles.chatFooter)}>
                  <div
                    className={cn(
                      "border rounded-2xl flex flex-col overflow-hidden shadow-sm transition-all m-0 p-0",
                      variant === "glass"
                        ? "bg-white/40 dark:bg-black/40 backdrop-blur-md border-white/20 dark:border-white/10"
                        : "bg-card border-border",
                    )}
                  >
                    <div
                      className={cn(
                        "flex border-b m-0 p-0",
                        variant === "glass"
                          ? "border-white/10 dark:border-white/10 bg-white/20 dark:bg-black/20"
                          : "border-border bg-muted/50",
                      )}
                    >
                      {data.replySection.tabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setModalReplyTab(tab)}
                          className={cn(
                            "px-5 py-2.5 text-[13px] font-semibold transition-colors m-0 cursor-pointer",
                            modalReplyTab === tab
                              ? cn(
                                  variant === "glass"
                                    ? "bg-white/40 dark:bg-black/40"
                                    : "bg-card",
                                  theme.text,
                                  theme.activeBorder,
                                )
                              : "text-muted-foreground hover:text-foreground border-b-2 border-transparent",
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={modalReplyText}
                      onChange={(e) => setModalReplyText(e.target.value)}
                      rows={3}
                      placeholder={
                        modalReplyTab === "Reply"
                          ? data.replySection.placeholder
                          : "Type an internal note..."
                      }
                      className={cn(
                        "w-full p-4 text-sm resize-none outline-none bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0",
                        modalReplyTab !== "Reply" && "bg-amber-50/30 dark:bg-amber-900/5",
                      )}
                    />
                    <div className={cn("flex items-center justify-between px-3 py-2 border-t", "border-border")}>
                      <div className="flex items-center gap-1">
                        <button className={cn("p-2 rounded-lg transition-colors cursor-pointer", "text-muted-foreground hover:bg-muted")}>
                          <Smile className="w-4 h-4" />
                        </button>
                        <button className={cn("p-2 rounded-lg transition-colors cursor-pointer", "text-muted-foreground hover:bg-muted")}>
                          <Paperclip className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={closeTicketModal} className="px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-muted-foreground hover:bg-muted">
                          Close
                        </button>
                        <button
                          onClick={handleSendModalReply}
                          disabled={!modalReplyText.trim()}
                          className={cn(
                            "flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-white",
                            modalReplyTab === "Reply" ? theme.bg : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-white",
                          )}
                        >
                          {modalReplyTab === "Reply" ? data.replySection.buttonText : "Add Note"} <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === CREATE TICKET MODAL OVERLAY === */}
      {isCreatingTicket && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 animate-in fade-in duration-200">
          {isLiquidGlass ? (
            <LiquidGlassWrapper
              radius="1.5rem"
              bgImage={liquidBg}
              filterId="glass-blur-support"
              contrastOverlayClassName="bg-black/55 backdrop-blur-md"
              className="relative w-full max-w-md p-6 sm:p-7 text-white shadow-[0_30px_70px_rgba(0,0,0,0.6)] flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            >
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center text-white",
                      liquidGlassStyles.iconBg,
                    )}>
                      <Plus className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                      Create New Ticket
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCreatingTicket(false)}
                    className="p-1.5 rounded-lg transition-colors cursor-pointer text-white/70 hover:text-white hover:bg-white/15"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleCreateTicket} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                      Subject
                    </label>
                    <input
                      required
                      value={newTicketForm.title}
                      onChange={(e) =>
                        setNewTicketForm({
                          ...newTicketForm,
                          title: e.target.value,
                        })
                      }
                      className="p-3 text-sm rounded-xl outline-none transition-all bg-white/10 border border-white/25 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/50 shadow-inner"
                      placeholder="E.g. Cannot access account"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                        Customer Name
                      </label>
                      <input
                        required
                        value={newTicketForm.author}
                        onChange={(e) =>
                          setNewTicketForm({
                            ...newTicketForm,
                            author: e.target.value,
                          })
                        }
                        className="p-3 text-sm rounded-xl outline-none transition-all bg-white/10 border border-white/25 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/50 shadow-inner"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                        Priority
                      </label>
                      <SelectBlock
                        options={PRIORITY_OPTIONS}
                        value={newTicketForm.priority}
                        onChange={(v) =>
                          setNewTicketForm({
                            ...newTicketForm,
                            priority: Array.isArray(v) ? (v[0] ?? "") : v,
                          })
                        }
                        color={color}
                        variant="liquid-glass"
                        placeholder="Select priority"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                      Initial Message
                    </label>
                    <textarea
                      rows={3}
                      value={newTicketForm.message}
                      onChange={(e) =>
                        setNewTicketForm({
                          ...newTicketForm,
                          message: e.target.value,
                        })
                      }
                      className="p-3 text-sm rounded-xl outline-none resize-none transition-all bg-white/10 border border-white/25 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/50 shadow-inner"
                      placeholder="Describe the issue..."
                    />
                  </div>
                  <button
                    type="submit"
                    className={cn(
                      "mt-2 py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2",
                      liquidGlassStyles.btn,
                    )}
                  >
                    <Plus className="w-4 h-4" /> Create Ticket
                  </button>
                </form>
              </div>
            </LiquidGlassWrapper>
          ) : (
            <div
              className={cn(
                "relative w-full max-w-md p-6 sm:p-7 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200 overflow-hidden",
                isGlassLike
                  ? "bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 backdrop-blur-2xl"
                  : "bg-background border border-border",
              )}
            >
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-white", theme.bg)}>
                      <Plus className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                      Create New Ticket
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCreatingTicket(false)}
                    className="p-1.5 rounded-lg transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleCreateTicket} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Subject
                    </label>
                    <input
                      required
                      value={newTicketForm.title}
                      onChange={(e) =>
                        setNewTicketForm({
                          ...newTicketForm,
                          title: e.target.value,
                        })
                      }
                      className={cn("p-3 text-sm rounded-xl outline-none transition-all", styles.input, theme.focusRing)}
                      placeholder="E.g. Cannot access account"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Customer Name
                      </label>
                      <input
                        required
                        value={newTicketForm.author}
                        onChange={(e) =>
                          setNewTicketForm({
                            ...newTicketForm,
                            author: e.target.value,
                          })
                        }
                        className={cn("p-3 text-sm rounded-xl outline-none transition-all", styles.input, theme.focusRing)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Priority
                      </label>
                      <SelectBlock
                        options={PRIORITY_OPTIONS}
                        value={newTicketForm.priority}
                        onChange={(v) =>
                          setNewTicketForm({
                            ...newTicketForm,
                            priority: Array.isArray(v) ? (v[0] ?? "") : v,
                          })
                        }
                        color={color}
                        variant={variant === "glass" ? "glass" : "default"}
                        placeholder="Select priority"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Initial Message
                    </label>
                    <textarea
                      rows={3}
                      value={newTicketForm.message}
                      onChange={(e) =>
                        setNewTicketForm({
                          ...newTicketForm,
                          message: e.target.value,
                        })
                      }
                      className={cn("p-3 text-sm rounded-xl outline-none resize-none transition-all", styles.input, theme.focusRing)}
                      placeholder="Describe the issue..."
                    />
                  </div>
                  <button
                    type="submit"
                    className={cn(
                      "mt-2 py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 active:scale-[0.98] shadow-lg cursor-pointer flex items-center justify-center gap-2",
                      theme.bg,
                    )}
                  >
                    <Plus className="w-4 h-4" /> Create Ticket
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === GLOBAL HEADER === */}
      <header
        className={cn(
          "h-[56px] sm:h-[60px] flex items-center justify-between px-3.5 sm:px-5 shrink-0 flex-none z-10 transition-colors duration-300 gap-2 rounded-t-[inherit]",
          styles.header,
        )}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 overflow-hidden m-0 p-0">
          <div
            className={cn(
              "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 m-0",
              isLiquidGlass ? liquidGlassStyles.iconBg : theme.iconBg,
            )}
          >
            {layout === "table" ? (
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </div>
          <div className={cn(
            "min-w-0 flex items-center gap-1.5 sm:gap-2 overflow-hidden m-0 p-0",
            isLiquidGlass ? "text-white" : "text-foreground",
          )}>
            <span className="text-xs sm:text-sm font-bold sm:font-semibold truncate">
              {data.header.title}
            </span>
            <span className={cn(
              "hidden sm:inline-flex items-center font-medium border-l pl-2 text-xs truncate shrink-0",
              isLiquidGlass
                ? "text-white/70 border-white/20"
                : "text-muted-foreground border-border",
            )}>
              {layout === "table" ? "System Overview" : data.header.subtitle}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsCreatingTicket(true)}
            className={cn(
              "flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 shadow-sm text-white cursor-pointer",
              isLiquidGlass ? liquidGlassStyles.btn : theme.bg,
            )}
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">New Ticket</span>
          </button>
        </div>
      </header>

      {/* === CONDITIONAL LAYOUT === */}
      {layout === "table" ? (
        /* ---------------------------------------------------------
           TICKET SYSTEM TABLE LAYOUT
           --------------------------------------------------------- */
        <div
          className={cn(
            "flex flex-1 flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 gap-6 m-0 rounded-b-[inherit] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
            isGlassLike ? "bg-transparent" : "bg-muted",
          )}
        >
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className={cn(
                "p-5 flex flex-col gap-2 transition-all",
                styles.card,
              )}
            >
              <div className={cn(
                "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider",
                isLiquidGlass ? "text-white/80" : "text-muted-foreground"
              )}>
                <Inbox className="w-4 h-4" /> Total Tickets
              </div>
              <div className={cn(
                "text-3xl font-bold",
                isLiquidGlass ? "text-white" : "text-foreground"
              )}>
                {totalTickets}
              </div>
            </div>
            <div
              className={cn(
                "p-5 flex flex-col gap-2 transition-all",
                styles.card,
              )}
            >
              <div className={cn(
                "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider",
                isLiquidGlass ? "text-white/80" : "text-muted-foreground"
              )}>
                <Clock className="w-4 h-4" /> Open Tickets
              </div>
              <div className={cn("text-3xl font-bold", theme.text)}>
                {openTickets}
              </div>
            </div>
            <div
              className={cn(
                "p-5 flex flex-col gap-2 transition-all",
                styles.card,
              )}
            >
              <div className={cn(
                "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider",
                isLiquidGlass ? "text-white/80" : "text-muted-foreground"
              )}>
                <AlertCircle className="w-4 h-4" /> High Priority
              </div>
              <div className={cn(
                "text-3xl font-bold",
                isLiquidGlass ? "text-rose-300" : "text-red-500 dark:text-red-400"
              )}>
                {highPriority}
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div
            className={cn(
              "flex-1 overflow-hidden flex flex-col transition-all",
              styles.card,
            )}
          >
            <div className="overflow-x-auto min-w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={styles.tableHead}>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                      Subject & Requester
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={cn(
                    "divide-y",
                    isLiquidGlass
                      ? "divide-white/10"
                      : isGlassLike
                        ? "divide-white/5"
                        : "divide-border",
                  )}
                >
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      onClick={() => setModalTicketId(ticket.id)}
                      className={styles.tableRow}
                    >
                      <td
                        className={cn(
                          "px-6 py-4 text-sm font-semibold whitespace-nowrap",
                          isLiquidGlass ? "text-white/80" : "text-muted-foreground",
                        )}
                      >
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 min-w-[300px]">
                        <div className="flex flex-col gap-1">
                          <span className={cn(
                            "text-sm font-semibold truncate",
                            isLiquidGlass ? "text-white" : "text-foreground"
                          )}>
                            {ticket.title}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-semibold text-white ${ticket.color}`}
                            >
                              {ticket.initials}
                            </div>
                            <span className={cn(
                              "text-xs font-medium",
                              isLiquidGlass ? "text-white/70" : "text-muted-foreground"
                            )}>
                              {ticket.author} ({ticket.company})
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ticket.properties.priority === "High" ||
                        ticket.properties.priority === "Urgent" ? (
                          <span className={cn(
                            "inline-flex px-2.5 py-1 rounded-md text-xs font-semibold",
                            isLiquidGlass
                              ? "bg-rose-500/20 text-rose-200 border border-rose-400/30"
                              : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                          )}>
                            {ticket.properties.priority}
                          </span>
                        ) : (
                          <span className={cn(
                            "inline-flex px-2.5 py-1 rounded-md text-xs font-semibold",
                            isLiquidGlass
                              ? "bg-white/15 text-white/90 border border-white/20"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {ticket.properties.priority}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ticket.status.toLowerCase() === "open" ? (
                          <span
                            className={cn(
                              "inline-flex px-2.5 py-1 rounded-md text-xs font-semibold",
                              isLiquidGlass
                                ? liquidGlassStyles.badge
                                : cn(theme.lightBg, theme.text),
                            )}
                          >
                            Open
                          </span>
                        ) : (
                          <span className={cn(
                            "inline-flex px-2.5 py-1 rounded-md text-xs font-semibold",
                            isLiquidGlass
                              ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-md"
                              : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          )}>
                            Resolved
                          </span>
                        )}
                      </td>
                      <td className={cn(
                        "px-6 py-4 whitespace-nowrap text-right text-xs font-semibold",
                        isLiquidGlass ? "text-white/70" : "text-muted-foreground"
                      )}>
                        {ticket.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ---------------------------------------------------------
           3-PANE CHAT LAYOUT
           --------------------------------------------------------- */
        <div
          className={cn(
            "flex flex-1 overflow-hidden min-h-0 m-0 p-0 rounded-b-[inherit]",
            isGlassLike ? "bg-transparent" : "bg-muted",
          )}
        >
          <aside
            className={cn(
              `w-full md:w-[320px] shrink-0 flex-none flex flex-col transition-all m-0 p-0 rounded-bl-[inherit] overflow-hidden ${selectedTicket ? "hidden md:flex" : "flex"}`,
              styles.sidebar,
            )}
          >
            <div
              ref={filterBarRef}
              className={cn(
                "flex items-center shrink-0 flex-none m-0 p-0",
                styles.filterBar,
              )}
            >
              {data.filters.map((filter, idx) => {
                const Icon = ICON_MAP[filter.icon] || List;
                const isStatus = filter.id === "status";
                const isSort = filter.id === "sort";
                // Anything the component doesn't know how to drive keeps its
                // original inert-label behaviour rather than opening an empty menu.
                const options = isStatus
                  ? statusOptions
                  : isSort
                    ? SORT_OPTIONS
                    : null;
                const selected = isStatus
                  ? statusFilter
                  : isSort
                    ? sortOrder
                    : filter.label;
                const isOpen = openFilterId === filter.id;

                return (
                  <div
                    key={filter.id}
                    className={cn(
                      "relative flex-1 m-0 p-0",
                      idx !== 0 &&
                        (isLiquidGlass
                          ? "border-l border-white/15"
                          : isGlassLike
                            ? "border-l border-white/10"
                            : "border-l border-border"),
                    )}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        options && setOpenFilterId(isOpen ? null : filter.id)
                      }
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-colors m-0 cursor-pointer",
                        isLiquidGlass
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        {selected} {filter.count && `(${filter.count})`}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 opacity-50 shrink-0 transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {options && isOpen && (
                      <div
                        className={cn(
                          "absolute left-1 right-1 top-full z-30 mt-1 p-1 rounded-xl border shadow-2xl flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150",
                          isLiquidGlass
                            ? "bg-black/60 text-white border-white/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                            : isGlassLike
                              ? "bg-white/80 dark:bg-zinc-900/90 text-foreground border-white/40 dark:border-white/20 backdrop-blur-2xl shadow-xl"
                              : "bg-background border-border",
                        )}
                      >
                        {options.map((opt) => {
                          const active = opt === selected;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                if (isStatus) setStatusFilter(opt);
                                else setSortOrder(opt);
                                setOpenFilterId(null);
                              }}
                              className={cn(
                                "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer",
                                active
                                  ? isLiquidGlass
                                    ? "bg-white/25 text-white font-bold border border-white/30 shadow-xs"
                                    : cn(theme.lightBg, theme.text, "font-semibold")
                                  : isLiquidGlass
                                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                                    : isGlassLike
                                      ? "text-foreground hover:bg-black/10 dark:hover:bg-white/10"
                                      : "text-muted-foreground hover:bg-muted",
                              )}
                            >
                              {opt}
                              {active && (
                                <Check className="w-3.5 h-3.5 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] m-0 p-0">
              <div
                className={cn(
                  "divide-y m-0 p-0",
                  isLiquidGlass
                    ? "divide-white/10"
                    : isGlassLike
                      ? "divide-white/10"
                      : "divide-border",
                )}
              >
                {visibleTickets.length === 0 && (
                  <div className={cn(
                    "px-4 py-10 text-center text-xs font-medium",
                    isLiquidGlass ? "text-white/60" : "text-muted-foreground"
                  )}>
                    No tickets match this filter.
                  </div>
                )}
                {visibleTickets.map((ticket) => {
                  const isActive = selectedTicketId === ticket.id;
                  return (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={cn(
                        "flex items-start gap-3 p-4 cursor-pointer transition-all border-l-2 m-0",
                        isActive
                          ? isLiquidGlass
                            ? liquidGlassStyles.activeItem
                            : isGlassLike
                              ? "bg-white/20 dark:bg-white/10 border-white/60 dark:border-white/40"
                              : cn(theme.lightBg, theme.border)
                          : isLiquidGlass
                            ? "border-transparent text-white/90 hover:bg-white/10"
                            : cn(
                                "border-transparent hover:bg-muted",
                                isGlassLike &&
                                  "hover:bg-white/10 dark:hover:bg-white/5",
                              ),
                      )}
                    >
                      <BulletproofAvatar
                        initials={ticket.initials}
                        color={ticket.color}
                        size={36}
                      />
                      <div className="flex-1 min-w-0 m-0 p-0">
                        <div className="flex justify-between items-start mb-1 m-0 p-0">
                          <div
                            className={cn(
                              "text-sm truncate pr-2 m-0 p-0",
                              isActive
                                ? isLiquidGlass
                                  ? "font-bold text-white"
                                  : cn("font-semibold", theme.text)
                                : isLiquidGlass
                                  ? "font-semibold text-white"
                                  : "font-semibold text-foreground",
                            )}
                          >
                            {ticket.title}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-1 m-0 p-0">
                          <div className={cn(
                            "text-xs font-medium truncate m-0 p-0",
                            isLiquidGlass ? "text-white/70" : "text-muted-foreground"
                          )}>
                            {ticket.author} •{" "}
                            <span className={isLiquidGlass ? "text-white/60 font-medium" : "text-muted-foreground font-medium"}>{ticket.id}</span>
                          </div>
                          <span className={cn(
                            "text-[10px] font-medium shrink-0 ml-2 m-0 p-0",
                            isLiquidGlass ? "text-white/60" : "text-muted-foreground"
                          )}>
                            {ticket.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          <div
            className={cn(
              `flex-1 flex overflow-hidden m-0 p-0 ${!selectedTicket ? "hidden md:flex" : "flex"}`,
              styles.main,
            )}
          >
            {!selectedTicket ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 m-0">
                <div className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center shadow-md mb-6 border m-0",
                  isLiquidGlass
                    ? "bg-white/15 border-white/25 text-white backdrop-blur-md"
                    : "bg-card border-border",
                )}>
                  <LifeBuoy
                    className={cn("w-10 h-10", theme.text)}
                    strokeWidth={1.5}
                  />
                </div>
                <div className={cn(
                  "text-2xl font-semibold mb-2 m-0 p-0",
                  isLiquidGlass ? "text-white" : "text-foreground"
                )}>
                  {data.emptyState.greetingPrefix} {data.emptyState.userName}!
                </div>
                <div className={cn(
                  "text-sm max-w-sm m-0 p-0",
                  isLiquidGlass ? "text-white/70" : "text-muted-foreground"
                )}>
                  {data.emptyState.message}
                </div>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "flex-1 flex flex-col min-w-0 animate-in fade-in slide-in-from-right-4 duration-300 m-0 p-0 rounded-b-[inherit] overflow-hidden",
                    isGlassLike ? "bg-transparent" : "bg-background",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-between p-4 shrink-0 flex-none m-0",
                      styles.chatHeader,
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0 m-0 p-0">
                      <button
                        className={cn(
                          "md:hidden p-1.5 -ml-1.5 transition-colors shrink-0 flex-none cursor-pointer",
                          isLiquidGlass ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setSelectedTicketId(null)}
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <BulletproofAvatar
                        initials={selectedTicket.initials}
                        color={selectedTicket.color}
                        size={32}
                      />
                      <div className="min-w-0 flex-1 m-0 p-0">
                        <div className={cn(
                          "text-sm font-semibold truncate m-0 p-0",
                          isLiquidGlass ? "text-white" : "text-foreground"
                        )}>
                          {selectedTicket.author}
                        </div>
                        <div className={cn(
                          "text-xs font-medium truncate m-0 p-0",
                          isLiquidGlass ? "text-white/70" : "text-muted-foreground"
                        )}>
                          {selectedTicket.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 flex-none ml-2 m-0 p-0">
                      <button className={cn(
                        "p-2 rounded-lg transition-colors cursor-pointer",
                        isLiquidGlass ? "text-white/70 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 p-4 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] m-0">
                    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full m-0 p-0">
                      {selectedTicket.chatHistory.map((msg) => {
                        const isAgent = msg.type === "sent";
                        return (
                          <div
                            key={msg.id}
                            className={`flex gap-3 sm:gap-4 w-full m-0 p-0 ${isAgent ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <div
                              className={`shrink-0 flex-none m-0 p-0 ${!msg.showAvatar && "invisible"}`}
                            >
                              <BulletproofAvatar
                                initials={msg.initials}
                                color={
                                  msg.color || "bg-zinc-600 dark:bg-zinc-700"
                                }
                                size={32}
                              />
                            </div>
                            <div
                              className={`flex flex-col gap-1 min-w-0 max-w-[85%] sm:max-w-[80%] m-0 p-0 ${isAgent ? "items-end" : "items-start"}`}
                            >
                              <div className="flex items-baseline gap-2 px-1 m-0 p-0">
                                <span className={cn(
                                  "text-[11px] font-semibold m-0 p-0",
                                  isLiquidGlass ? "text-white/90" : "text-foreground/70"
                                )}>
                                  {msg.sender}
                                </span>
                                <span className={cn(
                                  "text-[10px] font-medium m-0 p-0",
                                  isLiquidGlass ? "text-white/60" : "text-muted-foreground"
                                )}>
                                  {msg.time}
                                </span>
                              </div>
                              <div
                                className={cn(
                                  "px-4 sm:px-5 py-3 shadow-sm text-sm whitespace-pre-wrap break-words leading-relaxed m-0",
                                  isAgent
                                    ? isLiquidGlass
                                      ? liquidGlassStyles.bubbleSent
                                      : cn(
                                          "rounded-2xl rounded-tl-sm border border-transparent",
                                          theme.bg,
                                        )
                                    : isLiquidGlass
                                      ? liquidGlassStyles.bubbleReceived
                                      : cn(styles.chatBubbleReceived),
                                )}
                              >
                                {msg.message}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "p-4 shrink-0 flex-none z-10 m-0 rounded-b-[inherit]",
                      styles.chatFooter,
                    )}
                  >
                    {isLiquidGlass ? (
                      <div className="max-w-3xl mx-auto rounded-xl flex flex-col overflow-hidden transition-all m-0 p-0 border border-white/20 bg-white/10 text-white">
                        <div className="flex border-b border-white/15 bg-white/10 m-0 p-0">
                          {data.replySection.tabs.map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveReplyTab(tab)}
                              className={cn(
                                "px-5 py-2.5 text-[13px] font-semibold transition-colors m-0 cursor-pointer",
                                activeReplyTab === tab
                                  ? liquidGlassStyles.activeTab
                                  : "text-white/60 hover:text-white border-b-2 border-transparent",
                              )}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          placeholder={
                            activeReplyTab === "Reply"
                              ? data.replySection.placeholder
                              : "Type an internal note..."
                          }
                          className={cn(
                            "w-full p-4 text-sm resize-none outline-none bg-transparent text-white placeholder:text-white/50 m-0 focus:ring-0",
                            activeReplyTab !== "Reply" && "bg-amber-500/10 text-amber-200",
                          )}
                        />
                        <div className="flex items-center justify-between p-3 border-t border-white/15 bg-white/5 m-0">
                          <div className="flex gap-1 m-0 p-0">
                            <button className="p-2 rounded-md transition-colors cursor-pointer text-white/70 hover:text-white hover:bg-white/10">
                              <Smile className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-md transition-colors cursor-pointer text-white/70 hover:text-white hover:bg-white/10">
                              <ImageIcon className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-md transition-colors cursor-pointer text-white/70 hover:text-white hover:bg-white/10">
                              <Paperclip className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={handleSendReply}
                            disabled={!replyText.trim()}
                            className={cn(
                              "flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 m-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white",
                              activeReplyTab === "Reply"
                                ? liquidGlassStyles.btn
                                : "bg-amber-500/30 hover:bg-amber-500/40 border border-amber-400/40 text-amber-100",
                            )}
                          >
                            {activeReplyTab === "Reply"
                              ? data.replySection.buttonText
                              : "Add Note"}{" "}
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "max-w-3xl mx-auto rounded-xl flex flex-col overflow-hidden shadow-sm transition-all m-0 p-0 border",
                          variant === "glass"
                            ? "bg-white/40 dark:bg-black/40 backdrop-blur-md border-white/20 dark:border-white/10"
                            : "bg-card border-border",
                        )}
                      >
                        <div className={cn("flex border-b m-0 p-0", variant === "glass" ? "border-white/10 dark:border-white/10 bg-white/20 dark:bg-black/20" : "border-border bg-muted/50")}>
                          {data.replySection.tabs.map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveReplyTab(tab)}
                              className={cn(
                                "px-5 py-2.5 text-[13px] font-semibold transition-colors m-0 cursor-pointer",
                                activeReplyTab === tab
                                  ? cn(variant === "glass" ? "bg-white/40 dark:bg-black/40" : "bg-card", theme.text, theme.activeBorder)
                                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent",
                              )}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          placeholder={activeReplyTab === "Reply" ? data.replySection.placeholder : "Type an internal note..."}
                          className={cn("w-full p-4 text-sm resize-none outline-none bg-transparent text-foreground placeholder:text-muted-foreground m-0 focus:ring-0", activeReplyTab !== "Reply" && "bg-amber-50/30 dark:bg-amber-900/5")}
                        />
                        <div className={cn("flex items-center justify-between p-3 border-t m-0", "border-border")}>
                          <div className="flex gap-1 m-0 p-0">
                            <button className={cn("p-2 rounded-md transition-colors cursor-pointer", theme.focusRing, `hover:${theme.text}`, isGlassLike ? "hover:bg-white/10" : "hover:bg-muted")}>
                              <Smile className="w-4 h-4" />
                            </button>
                            <button className={cn("p-2 rounded-md transition-colors cursor-pointer", theme.focusRing, `hover:${theme.text}`, isGlassLike ? "hover:bg-white/10" : "hover:bg-muted")}>
                              <ImageIcon className="w-4 h-4" />
                            </button>
                            <button className={cn("p-2 rounded-md transition-colors cursor-pointer", theme.focusRing, `hover:${theme.text}`, isGlassLike ? "hover:bg-white/10" : "hover:bg-muted")}>
                              <Paperclip className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={handleSendReply}
                            disabled={!replyText.trim()}
                            className={cn(
                              "flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 m-0 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-white",
                              activeReplyTab === "Reply" ? theme.bg : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-white",
                            )}
                          >
                            {activeReplyTab === "Reply" ? data.replySection.buttonText : "Add Note"} <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "hidden xl:flex w-[280px] shrink-0 flex-none flex-col h-full m-0 p-0 rounded-br-[inherit] overflow-hidden",
                    styles.detailsPane,
                  )}
                >
                  <div className={cn(
                    "flex px-2 pt-2 border-b shrink-0 flex-none m-0 p-0",
                    isLiquidGlass ? "border-white/15" : "border-border"
                  )}>
                    {data.detailsSection.tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveDetailsTab(tab)}
                        className={cn(
                          "px-4 py-3 text-[12px] font-semibold transition-colors m-0 cursor-pointer",
                          activeDetailsTab === tab
                            ? isLiquidGlass
                              ? liquidGlassStyles.activeTab
                              : cn(theme.text, "border-b-2 font-semibold", theme.activeBorder)
                            : isLiquidGlass
                              ? "text-white/60 hover:text-white border-b-2 border-transparent"
                              : "text-muted-foreground hover:text-foreground border-b-2 border-transparent",
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4 m-0">
                    {activeDetailsTab.toLowerCase() === "company" ? (
                      <>
                        {/* Company Info Card */}
                        <div className={cn("m-0 p-0", styles.card)}>
                          <div
                            className={cn(
                              "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider flex justify-between items-center m-0",
                              styles.cardHeader,
                              isLiquidGlass ? "text-white/80" : "text-muted-foreground",
                            )}
                          >
                            Company Info{" "}
                            <User className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <div className="p-4 flex flex-col gap-3 m-0">
                            {[
                              { label: "Company", val: selectedTicket.company },
                              { label: "Domain", val: `${selectedTicket.company.toLowerCase().replace(/\s+/g, "")}.com` },
                              { label: "Account Tier", val: "Enterprise Plan" },
                              { label: "Total Tickets", val: `${tickets.filter((t) => t.company === selectedTicket.company).length} Active` },
                            ].map((field) => (
                              <div key={field.label} className="m-0 p-0">
                                <div className={cn(
                                  "text-[10px] font-semibold uppercase tracking-wider mb-0.5 m-0 p-0",
                                  isLiquidGlass ? "text-white/60" : "text-muted-foreground"
                                )}>
                                  {field.label}
                                </div>
                                <div className={cn(
                                  "text-xs font-semibold truncate m-0 p-0",
                                  isLiquidGlass ? "text-white" : "text-foreground"
                                )}>
                                  {field.val}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Team Assignment Card */}
                        <div className={cn("m-0 p-0", styles.card)}>
                          <div
                            className={cn(
                              "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider flex justify-between items-center m-0",
                              styles.cardHeader,
                              isLiquidGlass ? "text-white/80" : "text-muted-foreground",
                            )}
                          >
                            Team Assignment{" "}
                            <List className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <div className="p-4 flex flex-col gap-3 m-0">
                            {[
                              { label: "Department", val: selectedTicket.properties.group || "Support" },
                              { label: "Assigned Lead", val: selectedTicket.properties.assignedTo || "Unassigned" },
                              { label: "Priority Level", val: selectedTicket.properties.priority || "Medium" },
                              { label: "Ticket Category", val: selectedTicket.properties.type || "Question" },
                            ].map((field) => (
                              <div key={field.label} className="m-0 p-0">
                                <div className={cn(
                                  "text-[10px] font-semibold uppercase tracking-wider mb-0.5 m-0 p-0",
                                  isLiquidGlass ? "text-white/60" : "text-muted-foreground"
                                )}>
                                  {field.label}
                                </div>
                                <div className={cn(
                                  "text-xs font-semibold truncate m-0 p-0",
                                  isLiquidGlass ? "text-white" : "text-foreground"
                                )}>
                                  {field.val}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Contact Info Card */}
                        <div className={cn("m-0 p-0", styles.card)}>
                          <div
                            className={cn(
                              "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider flex justify-between items-center m-0",
                              styles.cardHeader,
                              isLiquidGlass ? "text-white/80" : "text-muted-foreground",
                            )}
                          >
                            Contact Info{" "}
                            <User className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <div className="p-4 flex flex-col gap-3 m-0">
                            {[
                              { label: "Name", val: selectedTicket.contact.name },
                              { label: "Email", val: selectedTicket.contact.email },
                              { label: "Phone", val: selectedTicket.contact.phone },
                              {
                                label: "Identifier",
                                val: selectedTicket.contact.identifier,
                              },
                            ].map((field) => (
                              <div key={field.label} className="m-0 p-0">
                                <div className={cn(
                                  "text-[10px] font-semibold uppercase tracking-wider mb-0.5 m-0 p-0",
                                  isLiquidGlass ? "text-white/60" : "text-muted-foreground"
                                )}>
                                  {field.label}
                                </div>
                                <div className={cn(
                                  "text-xs font-semibold truncate m-0 p-0",
                                  isLiquidGlass ? "text-white" : "text-foreground"
                                )}>
                                  {field.val}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>



                        {/* Ticket Details Info Card */}
                        <div className={cn("m-0 p-0", styles.card)}>
                          <div
                            className={cn(
                              "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider flex justify-between items-center m-0",
                              styles.cardHeader,
                              isLiquidGlass ? "text-white/80" : "text-muted-foreground",
                            )}
                          >
                            Ticket Details{" "}
                            <List className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <div className="p-4 flex flex-col gap-3 m-0">
                            {[
                              { label: "Status", val: selectedTicket.status.toUpperCase() },
                              { label: "Group", val: selectedTicket.properties.group || "Support" },
                              { label: "Assigned Agent", val: selectedTicket.properties.assignedTo || "Unassigned" },
                              { label: "Priority", val: selectedTicket.properties.priority || "Medium" },
                            ].map((field) => (
                              <div key={field.label} className="m-0 p-0">
                                <div className={cn(
                                  "text-[10px] font-semibold uppercase tracking-wider mb-0.5 m-0 p-0",
                                  isLiquidGlass ? "text-white/60" : "text-muted-foreground"
                                )}>
                                  {field.label}
                                </div>
                                <div className={cn(
                                  "text-xs font-semibold truncate m-0 p-0",
                                  isLiquidGlass ? "text-white" : "text-foreground"
                                )}>
                                  {field.val}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Activity Summary Card (2 lines) */}
                        <div className={cn("m-0 p-0", styles.card)}>
                          <div
                            className={cn(
                              "px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider flex justify-between items-center m-0",
                              styles.cardHeader,
                              isLiquidGlass ? "text-white/80" : "text-muted-foreground",
                            )}
                          >
                            Activity{" "}
                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <div className="p-3.5 flex flex-col gap-2.5 m-0">
                            {[
                              { label: "Created", val: selectedTicket.time || "2 days ago" },
                              { label: "Last Response", val: "5 minutes ago" },
                            ].map((field) => (
                              <div key={field.label} className="m-0 p-0">
                                <div className={cn(
                                  "text-[10px] font-semibold uppercase tracking-wider mb-0.5 m-0 p-0",
                                  isLiquidGlass ? "text-white/60" : "text-muted-foreground"
                                )}>
                                  {field.label}
                                </div>
                                <div className={cn(
                                  "text-xs font-semibold truncate m-0 p-0",
                                  isLiquidGlass ? "text-white" : "text-foreground"
                                )}>
                                  {field.val}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (isLiquidGlass) {
    const liquidBg =
      bgImage ||
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg";

    return (
      <div
        className={cn(
          "relative w-full min-h-[720px] flex items-center justify-center overflow-hidden rounded-3xl p-2 sm:p-6 md:p-8 isolate [contain:paint] [transform:translateZ(0)]",
          className,
        )}
        style={customStyle}
      >
        <LiquidGlassSvgFilter id="glass-blur-support" bgImage={liquidBg} />

        {/* Full-bleed background image covering the entire container */}
        <img
          src={liquidBg}
          alt="Liquid glass backdrop"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Floating Liquid Glass Card */}
        <LiquidGlassWrapper
          radius={formattedRadius ?? "var(--radius-2xl, 1rem)"}
          bgImage={liquidBg}
          filterId="glass-blur-support"
          contrastOverlayClassName="bg-black/30 dark:bg-black/45"
          className={cn(
            "relative z-10 w-full h-[700px] text-white transition-all duration-300 overflow-hidden flex flex-col",
            typeof rounded === "string" && !formatRadius(rounded) ? rounded : "rounded-2xl",
            "shadow-[0_25px_60px_rgba(0,0,0,0.5)] [--foreground:#ffffff] [--muted-foreground:rgba(255,255,255,0.75)] [--color-foreground:#ffffff] [--color-muted-foreground:rgba(255,255,255,0.75)] [--border:rgba(255,255,255,0.2)] [--background:rgba(255,255,255,0.12)] [--card:rgba(255,255,255,0.12)]",
          )}
          style={dynamicRadiusStyle}
        >
          {dashboardCard}
        </LiquidGlassWrapper>
      </div>
    );
  }

  if (variant === "glass") {
    const glassBg =
      bgImage ||
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg";

    return (
      <div
        className="relative w-full min-h-[720px] flex items-center justify-center overflow-hidden rounded-3xl p-2 sm:p-6 md:p-8"
        style={customStyle}
      >
        {/* Full-bleed glass backdrop */}
        <img
          src={glassBg}
          alt="Glass landscape backdrop"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] pointer-events-none" />

        {/* Floating Glass Card */}
        <div className="relative z-10 w-full h-[700px] bg-background/65 backdrop-blur-xl rounded-2xl shadow-2xl border border-foreground/10 overflow-hidden flex flex-col transition-colors duration-300">
          {dashboardCard}
        </div>
      </div>
    );
  }

  return dashboardCard;
}
