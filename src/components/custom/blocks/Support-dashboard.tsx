"use client";

import { cn } from "@/lib/utils";
import { SelectBlock } from "./SelectBlock";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
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
export type SupportVariant = "default" | "minimal" | "glass";
export type SupportColor = "primary" | "indigo" | "rose" | "emerald" | "zinc";
export type SupportLayout = "chat" | "table";

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
    card: "bg-card text-card-foreground border border-border shadow-sm",
    cardHeader:
      "bg-muted border-b border-border",
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
      "bg-transparent border-b border-border",
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
      "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl",
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
      "bg-white/10 dark:bg-black/10 border-b border-white/10 dark:border-white/5",
    input:
      "bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/10",
    chatBubbleReceived:
      "bg-white/50 dark:bg-black/50 backdrop-blur-md text-foreground border border-white/30 dark:border-white/10",
    tableRow:
      "hover:bg-white/10 dark:hover:bg-white/5 border-b border-white/10 dark:border-white/5 transition-colors cursor-pointer",
    tableHead:
      "bg-white/5 dark:bg-white/5 border-b border-white/20 dark:border-white/10 text-foreground",
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

export default function SupportDashboard({
  data,
  variant = "default",
  color = "primary",
  layout = "chat",
}: {
  data?: SupportData;
  variant?: SupportVariant;
  color?: SupportColor;
  layout?: SupportLayout;
}) {
  // === STATE MANAGEMENT ===
  const [tickets, setTickets] = useState<Ticket[]>(data?.tickets || []);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  // Property dropdown edits, keyed by `${ticketId}-${propertyKey}` so values
  // don't leak between tickets. Falls back to the ticket's own property value.
  const [ticketProperties, setTicketProperties] = useState<
    Record<string, string>
  >({});
  const [activeReplyTab, setActiveReplyTab] = useState("Reply");
  const [activeDetailsTab, setActiveDetailsTab] = useState("Details");

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

  return (
    <div
      className={cn(
        "relative not-prose w-full max-w-full h-[700px] rounded-xl flex flex-col overflow-hidden font-sans box-border text-base m-0 p-0 leading-normal transition-colors duration-300",
        styles.wrapper,
      )}
    >
      {/* === TABLE VIEW: EMAIL / CONVERSATION MODAL === */}
      {modalTicket && (
        <div
          onClick={closeTicketModal}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "w-full max-w-2xl max-h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200",
              variant === "glass"
                ? "bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 backdrop-blur-2xl"
                : "bg-background border border-border",
            )}
          >
            <div
              className={cn(
                "flex items-start justify-between gap-3 px-5 py-4 border-b shrink-0",
                variant === "glass"
                  ? "border-border"
                  : "border-border",
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <BulletproofAvatar
                  initials={modalTicket.initials}
                  color={modalTicket.color}
                  size={40}
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">
                    {modalTicket.title}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground truncate">
                    {modalTicket.author} ({modalTicket.company}) •{" "}
                    <span className={theme.text}>{modalTicket.id}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeTicketModal}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Same bubble treatment as the chat view, so an email opened from
                the table reads identically to one opened from the inbox. */}
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
                          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-400">
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
                                  "rounded-2xl rounded-tl-sm border border-transparent",
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

            {/* Same composer as the chat view: Reply / Note tabs, textarea and
                send button, writing into the same conversation. */}
            <div
              className={cn("p-4 shrink-0 flex-none", styles.chatFooter)}
            >
              <div className={cn(
                "border rounded-xl flex flex-col overflow-hidden shadow-sm transition-all m-0 p-0",
                variant === "glass"
                  ? "bg-white/40 dark:bg-black/40 backdrop-blur-md border-white/20 dark:border-white/10"
                  : "bg-white dark:bg-[#121217] border-border"
              )}>
                <div className={cn(
                  "flex border-b m-0 p-0",
                  variant === "glass"
                    ? "border-white/10 dark:border-white/10 bg-white/20 dark:bg-black/20"
                    : "border-border bg-muted/50 dark:bg-[#121217]"
                )}>
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
                                : "bg-white dark:bg-[#121217]",
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
                    modalReplyTab !== "Reply" &&
                      "bg-amber-50/30 dark:bg-amber-900/5",
                  )}
                />
                <div className="flex items-center justify-between px-3 py-2 border-t border-border">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
                      <Smile className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={closeTicketModal}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleSendModalReply}
                      disabled={!modalReplyText.trim()}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2 text-white text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
                        modalReplyTab === "Reply"
                          ? theme.bg
                          : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
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
        </div>
      )}

      {/* === CREATE TICKET MODAL OVERLAY === */}
      {isCreatingTicket && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={cn(
              "w-full max-w-md p-6 rounded-2xl shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200",
              variant === "glass"
                ? "bg-card border border-border backdrop-blur-xl"
                : "bg-background border border-border",
            )}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">
                Create New Ticket
              </h3>
              <button
                onClick={() => setIsCreatingTicket(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateTicket} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
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
                  className={cn(
                    "p-2.5 text-sm rounded-lg outline-none",
                    styles.input,
                    theme.focusRing,
                  )}
                  placeholder="E.g. Cannot access account"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-xs font-semibold uppercase text-muted-foreground">
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
                    className={cn(
                      "p-2.5 text-sm rounded-lg outline-none",
                      styles.input,
                      theme.focusRing,
                    )}
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-xs font-semibold uppercase text-muted-foreground">
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
                    placeholder="Select priority"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
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
                  className={cn(
                    "p-2.5 text-sm rounded-lg outline-none resize-none",
                    styles.input,
                    theme.focusRing,
                  )}
                  placeholder="Describe the issue..."
                />
              </div>
              <button
                type="submit"
                className={cn(
                  "mt-2 py-3 rounded-xl font-semibold text-white transition-transform active:scale-[0.98]",
                  theme.bg,
                )}
              >
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* === GLOBAL HEADER === */}
      <header
        className={cn(
          "h-[60px] flex items-center justify-between px-5 shrink-0 flex-none z-10 transition-colors duration-300",
          styles.header,
        )}
      >
        <div className="flex items-center gap-3 m-0 p-0">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 m-0",
              theme.iconBg,
            )}
          >
            {layout === "table" ? (
              <LayoutGrid className="w-4 h-4" />
            ) : (
              <MessageSquare className="w-4 h-4" />
            )}
          </div>
          <div className="text-sm font-semibold text-foreground m-0 p-0 flex items-center flex-wrap">
            {data.header.title}
            <span className="text-muted-foreground font-medium ml-2 border-l border-border pl-2">
              {layout === "table" ? "System Overview" : data.header.subtitle}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreatingTicket(true)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-transform active:scale-95 shadow-sm",
              theme.bg,
            )}
          >
            <Plus className="w-3.5 h-3.5" /> New Ticket
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
            "flex flex-1 flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 gap-6 m-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
            variant === "glass"
              ? "bg-transparent"
              : "bg-muted dark:bg-[#09090b]",
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
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                <Inbox className="w-4 h-4" /> Total Tickets
              </div>
              <div className="text-3xl font-bold text-foreground">
                {totalTickets}
              </div>
            </div>
            <div
              className={cn(
                "p-5 flex flex-col gap-2 transition-all",
                styles.card,
              )}
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-wider">
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
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" /> High Priority
              </div>
              <div className="text-3xl font-bold text-red-500 dark:text-red-400">
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
                    variant === "glass"
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
                          theme.text,
                        )}
                      >
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 min-w-[300px]">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold text-foreground truncate">
                            {ticket.title}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-semibold text-white ${ticket.color}`}
                            >
                              {ticket.initials}
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                              {ticket.author} ({ticket.company})
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ticket.properties.priority === "High" ||
                        ticket.properties.priority === "Urgent" ? (
                          <span className="inline-flex px-2.5 py-1 rounded-md bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold">
                            {ticket.properties.priority}
                          </span>
                        ) : (
                          <span className="inline-flex px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-semibold">
                            {ticket.properties.priority}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ticket.status.toLowerCase() === "open" ? (
                          <span
                            className={cn(
                              "inline-flex px-2.5 py-1 rounded-md text-xs font-semibold",
                              theme.lightBg,
                              theme.text,
                            )}
                          >
                            Open
                          </span>
                        ) : (
                          <span className="inline-flex px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                            Resolved
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold text-muted-foreground">
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
            "flex flex-1 overflow-hidden min-h-0 m-0 p-0",
            variant === "glass"
              ? "bg-transparent"
              : "bg-muted dark:bg-[#09090b]",
          )}
        >
          <aside
            className={cn(
              `w-full md:w-[320px] shrink-0 flex-none flex flex-col transition-all m-0 p-0 ${selectedTicket ? "hidden md:flex" : "flex"}`,
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
                        (variant === "glass"
                          ? "border-l border-white/10"
                          : "border-l border-border"),
                    )}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        options && setOpenFilterId(isOpen ? null : filter.id)
                      }
                      className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors m-0 cursor-pointer"
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
                          "absolute left-1 right-1 top-full z-30 mt-1 p-1 rounded-lg border shadow-xl flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150",
                          variant === "glass"
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
                                "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-xs font-semibold text-left transition-colors cursor-pointer",
                                active
                                  ? cn(theme.lightBg, theme.text)
                                  : variant === "glass"
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
                  variant === "glass"
                    ? "divide-white/10"
                    : "divide-border",
                )}
              >
                {visibleTickets.length === 0 && (
                  <div className="px-4 py-10 text-center text-xs font-medium text-muted-foreground">
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
                          ? variant === "glass"
                            ? "bg-white/20 dark:bg-white/10 border-white/60 dark:border-white/40"
                            : cn(theme.lightBg, theme.border)
                          : cn(
                              "border-transparent hover:bg-muted",
                              variant === "glass" &&
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
                              `text-sm truncate pr-2 m-0 p-0`,
                              isActive
                                ? cn("font-semibold", theme.text)
                                : "font-semibold text-foreground",
                            )}
                          >
                            {ticket.title}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-1 m-0 p-0">
                          <div className="text-xs font-medium text-muted-foreground truncate m-0 p-0">
                            {ticket.author} •{" "}
                            <span className={theme.text}>{ticket.id}</span>
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground shrink-0 ml-2 m-0 p-0">
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
                <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-md mb-6 border border-border m-0">
                  <LifeBuoy
                    className={cn("w-10 h-10", theme.text)}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-2xl font-semibold text-foreground mb-2 m-0 p-0">
                  {data.emptyState.greetingPrefix} {data.emptyState.userName}!
                </div>
                <div className="text-sm text-muted-foreground max-w-sm m-0 p-0">
                  {data.emptyState.message}
                </div>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "flex-1 flex flex-col min-w-0 animate-in fade-in slide-in-from-right-4 duration-300 m-0 p-0",
                    variant === "glass"
                      ? "bg-transparent"
                      : "bg-white dark:bg-[#09090b]",
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
                        className="md:hidden p-1.5 -ml-1.5 text-muted-foreground hover:text-foreground transition-colors shrink-0 flex-none cursor-pointer"
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
                        <div className="text-sm font-semibold text-foreground truncate m-0 p-0">
                          {selectedTicket.author}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground truncate m-0 p-0">
                          {selectedTicket.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 flex-none ml-2 m-0 p-0">
                      <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer">
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
                                <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-400 m-0 p-0">
                                  {msg.sender}
                                </span>
                                <span className="text-[10px] font-medium text-muted-foreground m-0 p-0">
                                  {msg.time}
                                </span>
                              </div>
                              <div
                                className={cn(
                                  "px-4 sm:px-5 py-3 shadow-sm text-sm whitespace-pre-wrap break-words leading-relaxed m-0",
                                  isAgent
                                    ? cn(
                                        "rounded-2xl rounded-tl-sm border border-transparent",
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

                  <div
                    className={cn(
                      "p-4 shrink-0 flex-none z-10 m-0",
                      styles.chatFooter,
                    )}
                  >
                    <div className={cn(
                      "max-w-3xl mx-auto rounded-xl flex flex-col overflow-hidden shadow-sm transition-all m-0 p-0 border",
                      variant === "glass"
                        ? "bg-white/40 dark:bg-black/40 backdrop-blur-md border-white/20 dark:border-white/10"
                        : "bg-white dark:bg-[#121217] border-border"
                    )}>
                      <div className={cn(
                        "flex border-b m-0 p-0",
                        variant === "glass"
                          ? "border-white/10 dark:border-white/10 bg-white/20 dark:bg-black/20"
                          : "border-border bg-muted/50 dark:bg-[#121217]"
                      )}>
                        {data.replySection.tabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveReplyTab(tab)}
                            className={cn(
                              "px-5 py-2.5 text-[13px] font-semibold transition-colors m-0 cursor-pointer",
                              activeReplyTab === tab
                                ? cn(
                                    variant === "glass"
                                      ? "bg-white/40 dark:bg-black/40"
                                      : "bg-white dark:bg-[#121217]",
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
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                        placeholder={
                          activeReplyTab === "Reply"
                            ? data.replySection.placeholder
                            : "Type an internal note..."
                        }
                        className={cn(
                          "w-full p-4 text-sm resize-none outline-none bg-transparent text-foreground placeholder:text-muted-foreground m-0 focus:ring-0",
                          activeReplyTab !== "Reply" &&
                            "bg-amber-50/30 dark:bg-amber-900/5",
                        )}
                      />
                      <div className={cn(
                        "flex items-center justify-between p-3 border-t m-0",
                        variant === "glass"
                          ? "border-white/10 dark:border-white/10 bg-white/20 dark:bg-black/20"
                          : "border-border bg-muted/50 dark:bg-[#121217]"
                      )}>
                        <div className="flex gap-1 text-muted-foreground m-0 p-0">
                          <button
                            className={cn(
                              "p-2 rounded-md transition-colors cursor-pointer",
                              theme.focusRing,
                              `hover:${theme.text}`,
                              variant === "glass"
                                ? "hover:bg-white/10"
                                : "hover:bg-muted",
                            )}
                          >
                            <Smile className="w-4 h-4" />
                          </button>
                          <button
                            className={cn(
                              "p-2 rounded-md transition-colors cursor-pointer",
                              theme.focusRing,
                              `hover:${theme.text}`,
                              variant === "glass"
                                ? "hover:bg-white/10"
                                : "hover:bg-muted",
                            )}
                          >
                            <ImageIcon className="w-4 h-4" />
                          </button>
                          <button
                            className={cn(
                              "p-2 rounded-md transition-colors cursor-pointer",
                              theme.focusRing,
                              `hover:${theme.text}`,
                              variant === "glass"
                                ? "hover:bg-white/10"
                                : "hover:bg-muted",
                            )}
                          >
                            <Paperclip className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          className={cn(
                            "flex items-center gap-2 px-5 py-2 text-white text-xs font-semibold rounded-lg transition-all active:scale-95 m-0 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
                            activeReplyTab === "Reply"
                              ? theme.bg
                              : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
                          )}
                        >
                          {activeReplyTab === "Reply"
                            ? data.replySection.buttonText
                            : "Add Note"}{" "}
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "hidden xl:flex w-[280px] shrink-0 flex-none flex-col h-full m-0 p-0",
                    styles.detailsPane,
                  )}
                >
                  <div className="flex px-2 pt-2 border-b border-border shrink-0 flex-none m-0 p-0">
                    {data.detailsSection.tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveDetailsTab(tab)}
                        className={cn(
                          "px-4 py-3 text-[12px] font-semibold transition-colors m-0 cursor-pointer",
                          activeDetailsTab === tab
                            ? "text-foreground border-b-2 border-primary/30"
                            : "text-muted-foreground hover:text-foreground border-b-2 border-transparent",
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4 m-0">
                    <div className={cn("m-0 p-0", styles.card)}>
                      <div
                        className={cn(
                          "px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex justify-between items-center m-0",
                          styles.cardHeader,
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
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 m-0 p-0">
                              {field.label}
                            </div>
                            <div className="text-xs font-semibold text-foreground truncate m-0 p-0">
                              {field.val}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={cn("m-0 p-0", styles.card)}>
                      <div
                        className={cn(
                          "px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex justify-between items-center m-0",
                          styles.cardHeader,
                        )}
                      >
                        SLA Goals{" "}
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div className="p-4 flex flex-col gap-3 m-0">
                        <div className="m-0 p-0">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 m-0 p-0">
                            First Response
                          </div>
                          <div className="flex items-center gap-2 m-0 p-0">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${selectedTicket.sla.firstResponse === "Completed" ? "text-emerald-500" : "text-amber-500"}`}
                            />
                            <div
                              className={`text-xs font-semibold truncate ${selectedTicket.sla.firstResponse === "Completed" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"} m-0 p-0`}
                            >
                              {selectedTicket.sla.firstResponse}
                            </div>
                          </div>
                        </div>
                        <div className="m-0 p-0">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 m-0 p-0">
                            Resolution
                          </div>
                          <div className="flex items-center gap-2 m-0 p-0">
                            <Clock
                              className={cn("w-3.5 h-3.5 shrink-0", theme.text)}
                            />
                            <div
                              className={cn(
                                "text-xs font-semibold truncate m-0 p-0",
                                theme.text,
                              )}
                            >
                              {selectedTicket.sla.resolution}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cn("m-0 p-0", styles.card)}>
                      <div
                        className={cn(
                          "px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex justify-between items-center m-0",
                          styles.cardHeader,
                        )}
                      >
                        Properties{" "}
                        <List className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div className="p-4 flex flex-col gap-3 m-0">
                        {Object.entries(
                          data.detailsSection.dropdownOptions,
                        ).map(([key, options]) => (
                          <div key={key} className="flex flex-col m-0 p-0">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 m-0 p-0">
                              {key.replace(/([A-Z])/g, " $1")}
                            </label>
                            <SelectBlock
                              options={options.map((opt) => ({
                                label: opt,
                                value: opt,
                              }))}
                              value={
                                ticketProperties[
                                  `${selectedTicket.id}-${key}`
                                ] ?? selectedTicket.properties[key]
                              }
                              onChange={(v) =>
                                setTicketProperties((prev) => ({
                                  ...prev,
                                  [`${selectedTicket.id}-${key}`]: Array.isArray(v)
                                    ? (v[0] ?? "")
                                    : v,
                                }))
                              }
                              color={color}
                              inputSize="sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
