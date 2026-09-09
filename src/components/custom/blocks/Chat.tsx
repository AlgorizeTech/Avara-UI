"use client";

import { cn } from "@/lib/utils";
import {
  CheckCheck,
  Menu,
  MessageCircle,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type ChatVariant = "default" | "minimal" | "glass";

// Added (string & {}) so it accepts arbitrary hex codes without losing IDE autocomplete for the presets
export type ChatColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const chatVariants: Record<ChatVariant, Record<string, string>> = {
  default: {
    wrapper:
      "bg-muted dark:bg-[#09090b] border border-border rounded-2xl",
    sidebar:
      "bg-white/90 dark:bg-[#121217]/90 backdrop-blur-xl border-r border-border",
    main: "bg-white dark:bg-[#09090b]",
    header:
      "bg-white/80 dark:bg-[#09090b]/80 border-b border-border backdrop-blur-xl",
    footer:
      "bg-white/80 dark:bg-[#09090b]/80 border-t border-border backdrop-blur-xl",
    inputBg: "bg-muted border border-transparent",
    msgThem:
      "bg-card text-foreground rounded-2xl rounded-bl-sm border border-border shadow-sm",
    msgMe: "rounded-2xl rounded-br-sm shadow-sm border border-transparent",
  },
  minimal: {
    wrapper: "bg-transparent border-none shadow-none rounded-none",
    sidebar:
      "bg-muted/50 rounded-2xl border border-border lg:mr-4",
    main: "bg-transparent",
    header:
      "bg-transparent border-b border-border mb-2 pb-4",
    footer:
      "bg-transparent border-t border-border mt-2 pt-4",
    inputBg:
      "bg-muted border border-border",
    msgThem:
      "bg-muted text-foreground rounded-2xl rounded-bl-sm",
    msgMe: "rounded-2xl rounded-br-sm shadow-sm",
  },
  glass: {
    wrapper:
      "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl",
    sidebar:
      "bg-white/10 dark:bg-black/10 border-r border-white/20 dark:border-white/10",
    main: "bg-transparent",
    header:
      "bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10 backdrop-blur-md",
    footer:
      "bg-white/10 dark:bg-black/10 border-t border-white/20 dark:border-white/10 backdrop-blur-md",
    inputBg:
      "bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/10 backdrop-blur-md",
    msgThem:
      "bg-white/50 dark:bg-black/50 backdrop-blur-md text-foreground border border-white/30 dark:border-white/10 rounded-2xl rounded-bl-sm",
    msgMe: "rounded-2xl rounded-br-sm shadow-lg",
  },
};

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground",
    lightBg: "bg-primary/10 text-primary",
    gradient: "from-primary to-primary/80",
    shadow: "shadow-primary/20",
    focusRing:
      "focus-within:border-primary/30 focus-within:ring-primary/10 dark:focus-within:ring-primary/20",
  },
  indigo: {
    text: "text-indigo-500 dark:text-indigo-400",
    bg: "bg-indigo-500 hover:bg-indigo-600 text-white",
    lightBg:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/20",
    focusRing:
      "focus-within:border-indigo-500/30 focus-within:ring-indigo-500/10 dark:focus-within:ring-indigo-500/20",
  },
  rose: {
    text: "text-rose-500 dark:text-rose-400",
    bg: "bg-rose-500 hover:bg-rose-600 text-white",
    lightBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",
    gradient: "from-rose-500 to-orange-500",
    shadow: "shadow-rose-500/20",
    focusRing:
      "focus-within:border-rose-500/30 focus-within:ring-rose-500/10 dark:focus-within:ring-rose-500/20",
  },
  emerald: {
    text: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500 hover:bg-emerald-600 text-white",
    lightBg:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
    focusRing:
      "focus-within:border-emerald-500/30 focus-within:ring-emerald-500/10 dark:focus-within:ring-emerald-500/20",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    gradient: "from-zinc-700 to-zinc-900 dark:from-zinc-300 dark:to-zinc-500",
    shadow: "shadow-zinc-900/10 dark:shadow-white/10",
    focusRing:
      "focus-within:border-zinc-500/30 focus-within:ring-zinc-500/10 dark:focus-within:ring-zinc-500/20",
  },
};

/** One bubble in a conversation. */
export type ChatMessage = {
  id: string | number;
  text: string;
  sender: "me" | "them";
  time: string;
  /** Only meaningful on your own messages. */
  status?: "delivered" | "read";
};

export type Contact = {
  id: string | number;
  name: string;
  message: string;
  date: string;
  unread: number;
  status: "online" | "offline" | (string & {});
  avatar?: string;
  initials?: string;
  color?: string;
};

export type CurrentUser = {
  avatar: string;
  status: "online" | "offline" | (string & {});
  name?: string;
};

const BulletproofAvatar = ({
  src,
  initials,
  color,
  status,
  size = 40,
  statusBorder = "border-white dark:border-[#09090b]",
}: {
  src?: string;
  initials?: string;
  color?: string;
  status?: string;
  size?: number;
  statusBorder?: string;
}) => (
  <div
    className="relative shrink-0 flex-none rounded-full"
    style={{ width: size, height: size, minWidth: size, minHeight: size }}
  >
    <div className="w-full h-full rounded-full overflow-hidden bg-muted flex items-center justify-center shadow-sm">
      {src ? (
        <img
          src={src}
          alt="Avatar"
          className="w-full h-full object-cover block m-0 p-0"
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center font-bold text-sm m-0 p-0 tracking-wider ${color}`}
        >
          {initials}
        </div>
      )}
    </div>
    {status && (
      <span
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 z-10 m-0 p-0 ${statusBorder} ${status === "online" ? "bg-emerald-500" : status === "offline" ? "bg-zinc-400 dark:bg-zinc-600" : "bg-rose-500"}`}
      />
    )}
  </div>
);

export default function ChatApp({
  currentUser,
  contactsData,
  variant = "default",
  color = "primary",
}: {
  currentUser: CurrentUser;
  contactsData: Contact[];
  variant?: ChatVariant;
  color?: ChatColor;
}) {
  // Custom hex injection logic
  const isCustomHex = color?.startsWith("#");
  const customVars = isCustomHex
    ? ({
        "--chat-custom": color,
        "--chat-custom-10": `${color}1a`,
        "--chat-custom-20": `${color}33`,
        "--chat-custom-50": `${color}80`,
      } as React.CSSProperties)
    : {};

  const theme = isCustomHex
    ? {
        text: "text-[var(--chat-custom)]",
        bg: "bg-[var(--chat-custom)] hover:brightness-110 text-white",
        lightBg: "bg-[var(--chat-custom-10)] text-[var(--chat-custom)]",
        gradient: "from-[var(--chat-custom)] to-[var(--chat-custom-50)]",
        shadow: "shadow-[0_4px_14px_0_var(--chat-custom-20)]",
        focusRing:
          "focus-within:border-[var(--chat-custom-50)] focus-within:ring-2 focus-within:ring-[var(--chat-custom-20)]",
      }
    : colorThemes[color] || colorThemes["primary"];

  const styles = chatVariants[variant];

  // Text sitting on the accent colour. Read it off `theme.bg` instead of
  // assuming white: `primary` is near-black in light mode and near-white in
  // dark, so a hardcoded white disappears on one side or the other.
  const onAccentText =
    theme.bg
      .split(" ")
      .filter((c) => c.startsWith("text-") || c.startsWith("dark:text-"))
      .join(" ") || "text-primary-foreground";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "online">("all");

  const [contacts, setContacts] = useState(contactsData);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState<string | number | null>(null);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>(
    () => {
      const initialChats: Record<string, ChatMessage[]> = {};
      contactsData.forEach((contact) => {
        initialChats[contact.id] = [
          {
            id: `initial-${contact.id}`,
            text: contact.message,
            sender: "them",
            time: contact.date,
            status: "read",
          },
        ];
      });
      return initialChats;
    },
  );

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistories, activeContact, isTyping]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || contact.status === "online";
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || !activeContact) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newUserMsg: ChatMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "me",
      time: currentTime,
      status: "delivered",
    };

    setChatHistories((prev) => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newUserMsg],
    }));
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContact.id
          ? { ...c, message: inputValue, date: currentTime }
          : c,
      ),
    );
    setInputValue("");
    setIsTyping(activeContact.id);

    setTimeout(() => {
      setIsTyping(null);
      const replyTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const replyMsg: ChatMessage = {
        id: Date.now() + 1,
        text: "That sounds perfect! Let's get it done. 🚀",
        sender: "them",
        time: replyTime,
        status: "read",
      };

      setChatHistories((prev) => {
        const updatedHistory = [...(prev[activeContact.id] || [])];
        const lastMsg = updatedHistory[updatedHistory.length - 1];
        if (lastMsg.sender === "me") lastMsg.status = "read";
        return { ...prev, [activeContact.id]: [...updatedHistory, replyMsg] };
      });

      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContact.id
            ? { ...c, message: replyMsg.text, date: replyTime, unread: 0 }
            : c,
        ),
      );
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)),
    );
    if (typeof window !== "undefined" && window.innerWidth < 640)
      setIsSidebarOpen(false);
  };

  return (
    <div
      style={customVars}
      className={cn(
        "w-full max-w-full h-[750px] flex overflow-hidden relative font-sans box-border transition-colors duration-300",
        styles.wrapper,
      )}
    >
      {/* === LEFT SIDEBAR === */}
      <aside
        className={cn(
          `absolute sm:relative z-30 w-[300px] sm:w-80 h-full shrink-0 flex-none flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`,
          styles.sidebar,
        )}
      >
        <div className="pt-6 pb-4 px-5 shrink-0 flex-none min-w-0 box-border">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Messages
            </h1>
            <BulletproofAvatar
              src={currentUser.avatar}
              status={currentUser.status}
              size={36}
              statusBorder={
                variant === "glass"
                  ? "border-transparent"
                  : "border-white dark:border-[#121217]"
              }
            />
          </div>

          <div className="relative w-full min-w-0 mb-4 group">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0 group-focus-within:text-muted-foreground transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full min-w-0 rounded-xl py-2 pl-10 pr-4 text-sm outline-none text-foreground transition-all placeholder:text-muted-foreground",
                styles.inputBg,
                theme.focusRing,
              )}
            />
          </div>

          <div
            className={cn(
              "flex gap-1 p-1 rounded-lg",
              variant === "glass"
                ? "bg-black/20"
                : "bg-muted/80",
            )}
          >
            <button
              onClick={() => setFilterType("all")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${filterType === "all" ? "bg-card text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-foreground"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("online")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${filterType === "online" ? "bg-card text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-foreground"}`}
            >
              Online
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className={`px-3 py-2 flex items-center gap-3 cursor-pointer transition-all rounded-xl ${
                  activeContact?.id === contact.id
                    ? theme.lightBg
                    : "hover:bg-muted/80"
                }`}
              >
                <BulletproofAvatar
                  src={contact.avatar}
                  initials={contact.initials}
                  color={contact.color}
                  status={contact.status}
                  size={44}
                  statusBorder={
                    activeContact?.id === contact.id
                      ? "border-transparent"
                      : variant === "glass"
                        ? "border-transparent"
                        : "border-white dark:border-[#121217]"
                  }
                />
                <div className="flex-1 min-w-0 overflow-hidden flex flex-col justify-center">
                  <div className="flex justify-between items-baseline mb-1 gap-2">
                    <h4
                      className={`text-sm mb-0 font-semibold truncate ${activeContact?.id === contact.id ? theme.text : "text-foreground"}`}
                    >
                      {contact.name}
                    </h4>
                    <span
                      className={`text-[10px] font-medium shrink-0 ${activeContact?.id === contact.id ? theme.text : "text-muted-foreground"}`}
                    >
                      {contact.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p
                      className={`text-xs mt-0 truncate ${activeContact?.id === contact.id ? theme.text : "text-muted-foreground opacity-80"}`}
                    >
                      {contact.message}
                    </p>
                    {contact.unread > 0 && (
                      <span
                        className={cn(
                          "w-4 h-4 rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 shadow-sm",
                          theme.bg,
                        )}
                      >
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
              <MessageCircle className="w-8 h-8 opacity-20" /> No contacts found
            </div>
          )}
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-20 sm:hidden cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* === MAIN CHAT AREA === */}
      <main
        className={cn(
          "flex-1 flex flex-col min-w-0 w-full h-full relative z-10 transition-colors duration-300",
          styles.main,
        )}
      >
        {!activeContact ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div
              className={cn(
                "w-24 h-24 bg-gradient-to-tr rounded-3xl flex items-center justify-center mb-6 border border-white dark:border-zinc-800 rotate-3 shrink-0 flex-none shadow-xl",
                theme.gradient,
                theme.shadow,
                onAccentText,
              )}
            >
              <MessageCircle className="w-10 h-10 -rotate-3" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Your Messages
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Select a conversation from the sidebar or start a new one to begin
              chatting.
            </p>
            <button
              className={cn(
                "mt-8 px-6 py-2.5 rounded-full text-sm font-semibold sm:hidden transition-transform active:scale-95 shadow-lg",
                theme.bg,
                theme.shadow,
              )}
              onClick={() => setIsSidebarOpen(true)}
            >
              Open Contacts
            </button>
          </div>
        ) : (
          <>
            <header
              className={cn(
                "h-[76px] px-4 sm:px-6 flex justify-between items-center shrink-0 flex-none min-w-0 w-full box-border z-10 transition-colors duration-300",
                styles.header,
              )}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <button
                  className="sm:hidden p-2 -ml-2 text-muted-foreground shrink-0 flex-none"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <BulletproofAvatar
                  src={activeContact.avatar}
                  initials={activeContact.initials}
                  color={activeContact.color}
                  status={activeContact.status}
                  size={42}
                  statusBorder={
                    variant === "glass"
                      ? "border-transparent"
                      : "border-white dark:border-[#09090b]"
                  }
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-foreground leading-tight truncate">
                    {activeContact.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${activeContact.status === "online" ? "bg-emerald-500" : "bg-zinc-400"}`}
                    />
                    <p className="text-xs font-medium text-muted-foreground capitalize truncate">
                      {isTyping === activeContact.id ? (
                        <span className={cn("animate-pulse", theme.text)}>
                          Typing...
                        </span>
                      ) : (
                        activeContact.status
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground shrink-0 flex-none ml-2">
                <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </header>

            <div
              ref={chatScrollRef}
              className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden w-full scroll-smooth"
            >
              <div className="flex flex-col gap-6 w-full pb-2">
                {chatHistories[activeContact.id]?.map((msg) => {
                  const isMe = msg.sender === "me";
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2.5 w-full ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      {!isMe && (
                        <BulletproofAvatar
                          src={activeContact.avatar}
                          initials={activeContact.initials}
                          color={activeContact.color}
                          size={28}
                        />
                      )}
                      <div
                        className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[70%] ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={cn(
                            "px-4 py-2.5",
                            isMe
                              ? cn(
                                  styles.msgMe,
                                  "bg-gradient-to-br",
                                  theme.gradient,
                                  onAccentText,
                                )
                              : styles.msgThem,
                          )}
                        >
                          <p className="text-[14px] whitespace-pre-wrap break-words leading-relaxed">
                            {msg.text}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 px-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <span className="text-[10px] font-medium text-muted-foreground">
                            {msg.time}
                          </span>
                          {isMe && (
                            <CheckCheck
                              className={cn(
                                "w-3.5 h-3.5",
                                msg.status === "read"
                                  ? theme.text
                                  : "text-zinc-300 dark:text-zinc-600",
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isTyping === activeContact.id && (
                  <div className="flex items-end gap-2.5 w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <BulletproofAvatar
                      src={activeContact.avatar}
                      initials={activeContact.initials}
                      color={activeContact.color}
                      size={28}
                    />
                    <div
                      className={cn(
                        "px-4 py-3.5 flex items-center gap-1.5",
                        styles.msgThem,
                      )}
                    >
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={cn(
                "p-3 sm:p-4 shrink-0 flex-none w-full box-border z-10 transition-colors duration-300",
                styles.footer,
              )}
            >
              <form
                onSubmit={handleSendMessage}
                className={cn(
                  "flex items-center gap-2 sm:gap-3 w-full rounded-full transition-all px-4 py-1.5",
                  styles.inputBg,
                  theme.focusRing,
                )}
              >
                <button
                  type="button"
                  className="p-1.5 -ml-1.5 text-muted-foreground hover:text-muted-foreground transition-colors shrink-0"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="Message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-w-0 w-full bg-transparent border-none focus:outline-none text-[15px] text-foreground placeholder:text-muted-foreground py-1.5"
                />
                <button
                  type="button"
                  className="p-1.5 text-muted-foreground hover:text-muted-foreground transition-colors shrink-0 mr-1"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 flex-none hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none transition-all cursor-pointer shadow-md",
                    theme.bg,
                    theme.shadow,
                  )}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
