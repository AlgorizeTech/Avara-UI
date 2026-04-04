"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock,
  Image as ImageIcon,
  Inbox,
  LifeBuoy,
  List,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
  User,
} from "lucide-react";
import { useState } from "react";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type SupportVariant = "default" | "minimal" | "glass";
export type SupportColor = "indigo" | "rose" | "emerald" | "zinc";

const supportVariants: Record<SupportVariant, Record<string, string>> = {
  default: {
    wrapper:
      "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800/80 shadow-xl",
    header:
      "bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800/80",
    sidebar:
      "bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800/80",
    filterBar:
      "bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-200 dark:border-zinc-800/80",
    main: "bg-white dark:bg-[#09090b]",
    chatHeader:
      "bg-zinc-50/50 dark:bg-[#121217]/50 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800/80",
    chatFooter:
      "bg-zinc-50/50 dark:bg-[#121217] border-t border-zinc-100 dark:border-zinc-800/80",
    detailsPane:
      "bg-zinc-50/50 dark:bg-[#09090b] border-l border-zinc-200 dark:border-zinc-800/80",
    card: "bg-white dark:bg-[#121217] border border-zinc-200 dark:border-zinc-800/80 shadow-sm",
    cardHeader:
      "bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800/80",
    input:
      "bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-700",
    chatBubbleReceived:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50",
  },
  minimal: {
    wrapper: "bg-transparent border-none shadow-none rounded-none",
    header:
      "bg-transparent border-b border-zinc-200 dark:border-zinc-800 mb-4 pb-2",
    sidebar:
      "bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 lg:mr-4 overflow-hidden",
    filterBar:
      "bg-transparent border-b border-zinc-200 dark:border-zinc-800/50",
    main: "bg-transparent",
    chatHeader:
      "bg-transparent border-b border-zinc-200 dark:border-zinc-800/50 mb-2",
    chatFooter:
      "bg-transparent border-t border-zinc-200 dark:border-zinc-800/50 mt-2",
    detailsPane:
      "bg-transparent border-l border-zinc-200 dark:border-zinc-800/50 pl-4",
    card: "bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/50 rounded-xl",
    cardHeader:
      "bg-transparent border-b border-zinc-200 dark:border-zinc-800/50",
    input:
      "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800",
    chatBubbleReceived:
      "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100",
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
      "bg-white/50 dark:bg-black/50 backdrop-blur-md text-zinc-900 dark:text-zinc-100 border border-white/30 dark:border-white/10",
  },
};

const colorThemes: Record<SupportColor, Record<string, string>> = {
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
    className={`relative shrink-0 flex-none rounded-full shadow-sm flex items-center justify-center font-bold text-white tracking-wider ${color}`}
    style={{ width: size, height: size, minWidth: size, minHeight: size }}
  >
    {initials}
  </div>
);

export default function SupportDashboard({
  data,
  variant = "default",
  color = "indigo",
}: {
  data?: SupportData;
  variant?: SupportVariant;
  color?: SupportColor;
}) {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [activeReplyTab, setActiveReplyTab] = useState("Reply");
  const [activeDetailsTab, setActiveDetailsTab] = useState("Details");

  if (!data || !data.tickets)
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-500">
        Please pass the data prop to SupportDashboard
      </div>
    );

  const theme = colorThemes[color];
  const styles = supportVariants[variant];

  const selectedTicket = data.tickets.find((t) => t.id === selectedTicketId);

  return (
    <div
      className={cn(
        "not-prose w-full max-w-full h-[700px] rounded-xl flex flex-col overflow-hidden font-sans box-border text-base m-0 p-0 leading-normal transition-colors duration-300",
        styles.wrapper,
      )}
    >
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
            <List className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 m-0 p-0 flex items-center flex-wrap">
            {data.header.title}
            <span className="text-zinc-500 font-medium ml-2 border-l border-zinc-300 dark:border-zinc-700 pl-2">
              {data.header.subtitle}
            </span>
          </div>
        </div>
      </header>

      {/* === MAIN 3-PANE LAYOUT === */}
      <div
        className={cn(
          "flex flex-1 overflow-hidden min-h-0 m-0 p-0",
          variant === "glass"
            ? "bg-transparent"
            : "bg-zinc-50 dark:bg-[#09090b]",
        )}
      >
        {/* LEFT COLUMN: TICKET LIST */}
        <aside
          className={cn(
            `w-full md:w-[320px] shrink-0 flex-none flex flex-col transition-all m-0 p-0 ${selectedTicket ? "hidden md:flex" : "flex"}`,
            styles.sidebar,
          )}
        >
          <div
            className={cn(
              "flex items-center shrink-0 flex-none m-0 p-0",
              styles.filterBar,
            )}
          >
            {data.filters.map((filter, idx) => {
              const Icon = ICON_MAP[filter.icon] || List;
              return (
                <button
                  key={filter.id}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors m-0 cursor-pointer ${idx !== 0 ? (variant === "glass" ? "border-l border-white/10" : "border-l border-zinc-200 dark:border-zinc-800/80") : ""}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {filter.label} {filter.count && `(${filter.count})`}
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] m-0 p-0">
            <div
              className={cn(
                "divide-y m-0 p-0",
                variant === "glass"
                  ? "divide-white/10"
                  : "divide-zinc-100 dark:divide-zinc-800/60",
              )}
            >
              {data.tickets.map((ticket) => {
                const isActive = selectedTicketId === ticket.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={cn(
                      "flex items-start gap-3 p-4 cursor-pointer transition-all border-l-2 m-0",
                      isActive
                        ? cn(theme.lightBg, theme.border)
                        : cn(
                            "border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
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
                              ? cn("font-bold", theme.text)
                              : "font-semibold text-zinc-900 dark:text-zinc-100",
                          )}
                        >
                          {ticket.title}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1 m-0 p-0">
                        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate m-0 p-0">
                          {ticket.author} •{" "}
                          <span className={theme.text}>{ticket.id}</span>
                        </div>
                        <span className="text-[10px] font-medium text-zinc-400 shrink-0 ml-2 m-0 p-0">
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

        {/* MIDDLE & RIGHT COLUMNS (WRAPPER) */}
        <div
          className={cn(
            `flex-1 flex overflow-hidden m-0 p-0 ${!selectedTicket ? "hidden md:flex" : "flex"}`,
            styles.main,
          )}
        >
          {!selectedTicket ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 m-0">
              <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-md mb-6 border border-zinc-100 dark:border-zinc-800 m-0">
                <LifeBuoy
                  className={cn("w-10 h-10", theme.text)}
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 m-0 p-0">
                {data.emptyState.greetingPrefix} {data.emptyState.userName}!
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm m-0 p-0">
                {data.emptyState.message}
              </div>
            </div>
          ) : (
            <>
              {/* MIDDLE COLUMN: CHAT THREAD */}
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
                      className="md:hidden p-1.5 -ml-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0 flex-none cursor-pointer"
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
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate m-0 p-0">
                        {selectedTicket.author}
                      </div>
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate m-0 p-0">
                        {selectedTicket.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 flex-none ml-2 m-0 p-0">
                    <button className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
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
                              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-400 m-0 p-0">
                                {msg.sender}
                              </span>
                              <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 m-0 p-0">
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
                  <div className="max-w-3xl mx-auto bg-white dark:bg-[#121217] border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col overflow-hidden shadow-sm transition-all m-0 p-0">
                    <div className="flex border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#121217] m-0 p-0">
                      {data.replySection.tabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveReplyTab(tab)}
                          className={cn(
                            "px-5 py-2.5 text-[13px] font-bold transition-colors m-0 cursor-pointer",
                            activeReplyTab === tab
                              ? cn(
                                  "bg-white dark:bg-[#121217]",
                                  theme.text,
                                  theme.activeBorder,
                                )
                              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border-b-2 border-transparent",
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={3}
                      placeholder={
                        activeReplyTab === "Reply"
                          ? data.replySection.placeholder
                          : "Type an internal note..."
                      }
                      className={cn(
                        "w-full p-4 text-sm resize-none outline-none bg-transparent text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 m-0 focus:ring-0",
                        activeReplyTab !== "Reply" &&
                          "bg-amber-50/30 dark:bg-amber-900/5",
                      )}
                    />
                    <div className="flex items-center justify-between p-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#121217] m-0">
                      <div className="flex gap-1 text-zinc-400 m-0 p-0">
                        <button
                          className={cn(
                            "p-2 rounded-md transition-colors cursor-pointer",
                            theme.focusRing,
                            `hover:${theme.text}`,
                            variant === "glass"
                              ? "hover:bg-white/10"
                              : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
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
                              : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
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
                              : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          )}
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        className={cn(
                          "flex items-center gap-2 px-5 py-2 text-white text-xs font-bold rounded-lg transition-all active:scale-95 m-0 cursor-pointer shadow-sm",
                          activeReplyTab === "Reply"
                            ? theme.bg
                            : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
                        )}
                      >
                        {activeReplyTab === "Reply"
                          ? data.replySection.buttonText
                          : "Add Note"}
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: TICKET DETAILS */}
              <div
                className={cn(
                  "hidden xl:flex w-[280px] shrink-0 flex-none flex-col h-full m-0 p-0",
                  styles.detailsPane,
                )}
              >
                <div className="flex px-2 pt-2 border-b border-zinc-200 dark:border-zinc-800/80 shrink-0 flex-none m-0 p-0">
                  {data.detailsSection.tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveDetailsTab(tab)}
                      className={cn(
                        "px-4 py-3 text-[12px] font-bold transition-colors m-0 cursor-pointer",
                        activeDetailsTab === tab
                          ? "text-zinc-900 dark:text-zinc-100 border-b-2 border-zinc-900 dark:border-zinc-100"
                          : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border-b-2 border-transparent",
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
                        "px-4 py-3 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex justify-between items-center m-0",
                        styles.cardHeader,
                      )}
                    >
                      Contact Info{" "}
                      <User className="w-3.5 h-3.5 text-zinc-400" />
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
                          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5 m-0 p-0">
                            {field.label}
                          </div>
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate m-0 p-0">
                            {field.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={cn("m-0 p-0", styles.card)}>
                    <div
                      className={cn(
                        "px-4 py-3 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex justify-between items-center m-0",
                        styles.cardHeader,
                      )}
                    >
                      SLA Goals <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="p-4 flex flex-col gap-3 m-0">
                      <div className="m-0 p-0">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 m-0 p-0">
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
                        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 m-0 p-0">
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
                        "px-4 py-3 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex justify-between items-center m-0",
                        styles.cardHeader,
                      )}
                    >
                      Properties <List className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="p-4 flex flex-col gap-3 m-0">
                      {Object.entries(data.detailsSection.dropdownOptions).map(
                        ([key, options]) => (
                          <div key={key} className="flex flex-col m-0 p-0">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 m-0 p-0">
                              {key.replace(/([A-Z])/g, " $1")}
                            </label>
                            <select
                              defaultValue={selectedTicket.properties[key]}
                              className={cn(
                                "w-full p-2 rounded-lg text-xs font-semibold outline-none text-zinc-900 dark:text-zinc-100 transition-all cursor-pointer m-0",
                                styles.input,
                                theme.focusRing,
                              )}
                            >
                              {options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
