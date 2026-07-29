"use client";

import { cn } from "@/lib/utils";
import {
  Archive,
  Bold,
  ChevronLeft,
  ChevronRight,
  Edit3,
  FileText,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  Mail,
  MailOpen,
  Menu,
  MoreVertical,
  Paperclip,
  RefreshCw,
  Search,
  Send,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type EmailVariant = "default" | "minimal" | "glass";

// Added (string & {}) so it accepts arbitrary hex codes without losing IDE autocomplete for the presets
export type EmailColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const emailVariants: Record<EmailVariant, Record<string, string>> = {
  default: {
    wrapper:
      "bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800/80 shadow-xl rounded-2xl",
    sidebar:
      "bg-white/90 dark:bg-[#121217]/90 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800/50",
    main: "bg-white dark:bg-[#09090b]",
    header:
      "bg-white/80 dark:bg-[#09090b]/80 border-b border-zinc-100 dark:border-zinc-800/80 backdrop-blur-xl",
    searchBg: "bg-zinc-100 dark:bg-zinc-900/50 border border-transparent",
    emailItem:
      "bg-white dark:bg-[#09090b] hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800/60",
    composeModal:
      "bg-white dark:bg-[#121217] border border-zinc-200 dark:border-zinc-800 shadow-2xl",
  },
  minimal: {
    wrapper: "bg-transparent border-none shadow-none rounded-none",
    sidebar:
      "bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 lg:mr-4",
    main: "bg-transparent",
    header:
      "bg-transparent border-b border-zinc-200 dark:border-zinc-800/50 mb-2 pb-2",
    searchBg:
      "bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800",
    emailItem:
      "bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800/50 rounded-xl my-1",
    composeModal:
      "bg-white dark:bg-[#121217] border border-zinc-200 dark:border-zinc-800 shadow-2xl",
  },
  glass: {
    wrapper:
      "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl",
    sidebar:
      "bg-white/10 dark:bg-black/10 border-r border-white/20 dark:border-white/10",
    main: "bg-transparent",
    header:
      "bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10 backdrop-blur-md",
    searchBg:
      "bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/10 backdrop-blur-md",
    emailItem:
      "bg-transparent hover:bg-white/20 dark:hover:bg-white/5 border-b border-white/10 dark:border-white/5 transition-colors",
    composeModal:
      "bg-white/60 dark:bg-black/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl",
  },
};

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20",
    lightBg: "bg-primary/10 text-primary",
    border: "border-primary",
    focusRing:
      "focus:border-primary/30 focus:ring-primary/10 dark:focus:ring-primary/20",
    dot: "bg-primary",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/20",
    lightBg:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-500",
    focusRing:
      "focus:border-indigo-500/30 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20",
    dot: "bg-indigo-500",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20",
    lightBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",
    border: "border-rose-500",
    focusRing:
      "focus:border-rose-500/30 focus:ring-rose-500/10 dark:focus:ring-rose-500/20",
    dot: "bg-rose-500",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20",
    lightBg:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-500",
    focusRing:
      "focus:border-emerald-500/30 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/20",
    dot: "bg-emerald-500",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 shadow-zinc-900/10",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-500 dark:border-zinc-400",
    focusRing:
      "focus:border-zinc-500/30 focus:ring-zinc-500/10 dark:focus:ring-zinc-500/20",
    dot: "bg-zinc-900 dark:bg-zinc-100",
  },
};

export type EmailLabel = {
  color: string;
  name: string;
  pill: string;
};

export type Attachment = {
  name: string;
  type: string;
  size?: string;
};

export type Email = {
  id: string | number;
  sender: string;
  email: string;
  subject: string;
  time: string;
  fullDate: string;
  isStarred: boolean;
  isRead: boolean;
  folder?: string;
  avatar?: string;
  initials?: string;
  color?: string;
  labels?: EmailLabel[];
  body: string;
  attachments?: Attachment[];
};

const BulletproofAvatar = ({
  src,
  initials,
  color,
  size = 40,
}: {
  src?: string;
  initials?: string;
  color?: string;
  size?: number;
}) => (
  <div
    className="relative shrink-0 flex-none rounded-full overflow-hidden shadow-sm bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
    style={{ width: size, height: size, minWidth: size, minHeight: size }}
  >
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
);

export default function EmailApp({
  initialEmails,
  variant = "default",
  color = "primary",
}: {
  initialEmails: Email[];
  variant?: EmailVariant;
  color?: EmailColor;
}) {
  const [emails, setEmails] = useState<Email[]>(() =>
    (initialEmails || []).map((e) => ({
      ...e,
      folder: e.folder || "inbox",
      isRead: e.isRead ?? true,
    })),
  );

  // Custom hex injection logic
  const isCustomHex = color?.startsWith("#");
  const customVars = isCustomHex
    ? ({
        "--email-custom": color,
        "--email-custom-10": `${color}1a`,
        "--email-custom-20": `${color}33`,
        "--email-custom-50": `${color}80`,
      } as React.CSSProperties)
    : {};

  const theme = isCustomHex
    ? {
        text: "text-[var(--email-custom)]",
        bg: "bg-[var(--email-custom)] hover:brightness-110 text-white shadow-[0_4px_14px_0_var(--email-custom-20)]",
        lightBg: "bg-[var(--email-custom-10)] text-[var(--email-custom)]",
        border: "border-[var(--email-custom)]",
        focusRing:
          "focus:border-[var(--email-custom-50)] focus:ring-2 focus:ring-[var(--email-custom-20)]",
        dot: "bg-[var(--email-custom)]",
      }
    : colorThemes[color] || colorThemes["primary"];

  const styles = emailVariants[variant];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<Array<string | number>>(
    [],
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeEmailId, setActiveEmailId] = useState<string | number | null>(
    null,
  );

  const [activeFolder, setActiveFolder] = useState("inbox");
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  useEffect(() => {
    if (activeEmailId) {
      setEmails((prev) =>
        prev.map((e) => (e.id === activeEmailId ? { ...e, isRead: true } : e)),
      );
    }
  }, [activeEmailId]);

  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      const matchesSearch =
        email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesNavigation = false;
      if (activeLabel) {
        matchesNavigation =
          email.labels?.some((l) => l.name === activeLabel) ?? false;
      } else if (activeFolder === "starred") {
        matchesNavigation = email.isStarred;
      } else {
        matchesNavigation = email.folder === activeFolder;
      }
      return matchesSearch && matchesNavigation;
    });
  }, [emails, searchQuery, activeFolder, activeLabel]);

  const activeEmail = emails.find((e) => e.id === activeEmailId);
  const activeEmailIndex = filteredEmails.findIndex(
    (e) => e.id === activeEmailId,
  );

  const handlePrevEmail = () => {
    if (activeEmailIndex > 0)
      setActiveEmailId(filteredEmails[activeEmailIndex - 1].id);
  };
  const handleNextEmail = () => {
    if (activeEmailIndex >= 0 && activeEmailIndex < filteredEmails.length - 1)
      setActiveEmailId(filteredEmails[activeEmailIndex + 1].id);
  };

  const handleNavClick = (folder: string, label: string | null = null) => {
    setActiveFolder(folder);
    setActiveLabel(label);
    setActiveEmailId(null);
    setSelectedEmails([]);
    if (typeof window !== "undefined" && window.innerWidth < 1024)
      setIsSidebarOpen(false);
  };

  const toggleStar = (id: string | number) =>
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, isStarred: !email.isStarred } : email,
      ),
    );
  const toggleRead = (id: string | number) =>
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, isRead: !email.isRead } : email,
      ),
    );
  const toggleSelect = (id: string | number) =>
    setSelectedEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id],
    );

  const toggleSelectAll = () => {
    if (
      selectedEmails.length === filteredEmails.length &&
      filteredEmails.length > 0
    ) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map((e) => e.id));
    }
  };

  const moveSelectedToFolder = (targetFolder: string) => {
    if (selectedEmails.length === 0) return;
    setEmails(
      emails.map((e) =>
        selectedEmails.includes(e.id) ? { ...e, folder: targetFolder } : e,
      ),
    );
    setSelectedEmails([]);
  };

  const deleteEmail = (id: string | number) => {
    if (activeFolder === "trash") {
      setEmails(emails.filter((e) => e.id !== id));
    } else {
      setEmails(
        emails.map((e) => (e.id === id ? { ...e, folder: "trash" } : e)),
      );
    }
    if (activeEmailId === id) setActiveEmailId(null);
    setSelectedEmails((prev) => prev.filter((emailId) => emailId !== id));
  };

  const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEmail: Email = {
      id: Date.now(),
      sender: "Me",
      email: "me@example.com",
      subject: formData.get("subject") as string,
      body: formData.get("message") as string,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullDate: new Date().toLocaleString(),
      isStarred: false,
      isRead: true,
      folder: "sent",
      avatar: "https://i.pravatar.cc/150?u=me",
      labels: [],
      attachments: [],
    };
    setEmails([newEmail, ...emails]);
    setIsComposeOpen(false);
    setActiveFolder("sent");
    setActiveLabel(null);
  };

  const getFolderCount = (folder: string) =>
    emails.filter((e) => e.folder === folder && !e.isRead).length;

  return (
    <div
      style={customVars}
      className={cn(
        "w-full max-w-full h-[700px] sm:h-[800px] flex overflow-hidden relative font-sans box-border transition-colors duration-300",
        styles.wrapper,
      )}
    >
      {/* === LEFT SIDEBAR === */}
      <aside
        className={cn(
          `absolute lg:relative z-30 w-[260px] h-full shrink-0 flex-none flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
          styles.sidebar,
        )}
      >
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/50 shrink-0">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="font-bold text-zinc-900 dark:text-zinc-100">
              Mailbox
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setIsComposeOpen(true)}
            className={cn(
              "w-full py-2.5 rounded-xl font-medium transition-all shadow-md active:scale-95 cursor-pointer flex justify-center items-center gap-2",
              theme.bg,
            )}
          >
            <Edit3 className="w-4 h-4" /> Compose
          </button>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-4">
          <nav className="space-y-0.5 px-3 mb-8">
            {[
              { id: "inbox", icon: Mail, label: "Inbox" },
              { id: "sent", icon: Send, label: "Sent" },
              { id: "draft", icon: FileText, label: "Drafts" },
              { id: "starred", icon: Star, label: "Starred" },
              { id: "trash", icon: Trash2, label: "Trash" },
            ].map((item) => {
              const isActive = activeFolder === item.id && !activeLabel;
              const unreadCount =
                item.id === "starred" ? 0 : getFolderCount(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${isActive ? cn("font-semibold", theme.lightBg) : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium"}`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <item.icon
                      className={cn(
                        "w-[18px] h-[18px]",
                        isActive ? "opacity-70" : "",
                      )}
                    />
                    {item.label}
                  </div>
                  {unreadCount > 0 && (
                    <span
                      className={cn(
                        "text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm",
                        theme.bg,
                      )}
                    >
                      {unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="px-6">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Labels
            </p>
            <div className="space-y-0.5 -mx-3">
              {[
                { id: "Private", color: "bg-rose-500" },
                { id: "Company", color: "bg-indigo-500" },
                { id: "Important", color: "bg-amber-500" },
              ].map((label) => (
                <div
                  key={label.id}
                  onClick={() => handleNavClick("inbox", label.id)}
                  className={`flex items-center gap-3 text-sm cursor-pointer px-3 py-2 rounded-lg transition-all font-medium ${activeLabel === label.id ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full shadow-sm ${label.color}`}
                  ></div>
                  {label.id}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-20 lg:hidden cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* === MAIN CONTENT AREA === */}
      <main
        className={cn(
          "flex-1 flex flex-col min-w-0 relative z-10 transition-colors duration-300",
          styles.main,
        )}
      >
        {!activeEmailId || !activeEmail ? (
          <>
            {/* Top Header */}
            <header
              className={cn(
                "h-[72px] flex items-center justify-between px-4 sm:px-6 shrink-0 flex-none z-10 transition-colors duration-300",
                styles.header,
              )}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  className="lg:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0 cursor-pointer"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="relative w-full max-w-md min-w-0 group">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 shrink-0 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                  <input
                    type="text"
                    placeholder={`Search ${activeLabel || activeFolder}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full min-w-0 rounded-full py-2 pl-9 pr-4 text-sm outline-none text-zinc-800 dark:text-zinc-200 transition-all placeholder:text-zinc-500",
                      styles.searchBg,
                      theme.focusRing,
                    )}
                  />
                </div>
              </div>
            </header>

            {/* Action Bar */}
            <div
              className={cn(
                "flex items-center justify-between px-4 sm:px-6 py-2 shrink-0 transition-colors duration-300",
                variant === "glass"
                  ? "bg-white/5 dark:bg-black/5 border-b border-white/10"
                  : "border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20",
              )}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-zinc-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                    checked={
                      selectedEmails.length > 0 &&
                      selectedEmails.length === filteredEmails.length
                    }
                    onChange={toggleSelectAll}
                  />
                </div>

                {selectedEmails.length > 0 && (
                  <div className="flex items-center gap-1 border-l border-zinc-200 dark:border-zinc-700 pl-3 animate-in fade-in zoom-in-95 duration-200">
                    <button
                      onClick={() => moveSelectedToFolder("trash")}
                      className="p-2 text-zinc-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveSelectedToFolder("archive")}
                      className="p-2 text-zinc-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-md transition-colors cursor-pointer"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-zinc-400">
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-md transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-md transition-colors cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email List */}
            <div className="flex-1 overflow-y-auto">
              {filteredEmails.length > 0 ? (
                <div className="flex flex-col">
                  {filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      onClick={() => setActiveEmailId(email.id)}
                      className={cn(
                        `group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 relative transition-all cursor-pointer border-l-[3px]`,
                        styles.emailItem,
                        selectedEmails.includes(email.id)
                          ? cn(theme.lightBg, theme.border)
                          : !email.isRead
                            ? theme.border
                            : "border-transparent",
                      )}
                    >
                      <div
                        className="flex items-center gap-3 sm:gap-4 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedEmails.includes(email.id)}
                          onChange={() => toggleSelect(email.id)}
                          className="w-4 h-4 rounded border-zinc-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                        />
                        <button
                          onClick={() => toggleStar(email.id)}
                          className="cursor-pointer text-zinc-300 dark:text-zinc-600 hover:text-amber-400 transition-colors"
                        >
                          <Star
                            className={`w-[18px] h-[18px] ${email.isStarred ? "fill-amber-400 text-amber-400" : ""}`}
                          />
                        </button>
                        <div className="hidden sm:block">
                          <BulletproofAvatar
                            src={email.avatar}
                            initials={email.initials}
                            color={email.color}
                            size={36}
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 ml-8 sm:ml-0">
                        <span
                          className={`text-[15px] truncate w-full sm:w-48 shrink-0 ${!email.isRead ? "font-bold text-zinc-900 dark:text-white" : "font-medium text-zinc-700 dark:text-zinc-300"}`}
                        >
                          {email.sender}
                        </span>
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                          {!email.isRead && (
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full shrink-0",
                                theme.dot,
                              )}
                            />
                          )}
                          <span
                            className={`text-sm truncate ${!email.isRead ? "font-semibold text-zinc-800 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`}
                          >
                            {email.subject}{" "}
                            <span className="text-zinc-400 dark:text-zinc-600 font-normal ml-1 hidden lg:inline-block">
                              - {email.body.substring(0, 40)}...
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-end sm:w-24">
                        <span className="text-xs font-medium text-zinc-400 group-hover:hidden whitespace-nowrap bg-white/0 dark:bg-black/0">
                          {email.time}
                        </span>
                        <div className="hidden group-hover:flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEmail(email.id);
                            }}
                            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-zinc-400 hover:text-rose-500 rounded-md transition-colors shadow-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRead(email.id);
                            }}
                            className={cn(
                              "p-2 text-zinc-400 rounded-md transition-colors shadow-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-pointer",
                              theme.focusRing,
                            )}
                          >
                            {email.isRead ? (
                              <Mail className="w-4 h-4" />
                            ) : (
                              <MailOpen className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                    Nothing to see here
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    No emails found in {activeLabel || activeFolder}.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          // === EMAIL DETAIL VIEW ===
          <div className="flex flex-col h-full bg-transparent">
            <header
              className={cn(
                "h-[72px] flex items-center justify-between px-4 sm:px-6 shrink-0 flex-none z-10 transition-colors duration-300",
                styles.header,
              )}
            >
              <div className="flex items-center gap-3 overflow-hidden min-w-0">
                <button
                  className="lg:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 shrink-0 cursor-pointer"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveEmailId(null)}
                  className="p-2 -ml-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  {activeEmail?.labels?.map((lbl, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase ${lbl.pill}`}
                    >
                      {lbl.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 text-zinc-400 shrink-0 ml-4">
                <button
                  onClick={handlePrevEmail}
                  disabled={activeEmailIndex === 0}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextEmail}
                  disabled={activeEmailIndex === filteredEmails.length - 1}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </header>

            <div
              className={cn(
                "flex items-center justify-between px-4 sm:px-6 py-3 shrink-0 text-zinc-400 transition-colors duration-300",
                variant === "glass"
                  ? "bg-white/5 dark:bg-black/5 border-b border-white/10"
                  : "border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20",
              )}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => activeEmail && deleteEmail(activeEmail.id)}
                  className="p-2 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-[18px] h-[18px]" />
                </button>
                <button
                  onClick={() => {
                    if (activeEmail) {
                      setActiveEmailId(null);
                      toggleRead(activeEmail.id);
                    }
                  }}
                  className={cn(
                    "p-2 rounded-md transition-colors cursor-pointer",
                    theme.focusRing,
                  )}
                  title="Mark Unread"
                >
                  <Mail className="w-[18px] h-[18px]" />
                </button>
                <button
                  onClick={() => {
                    setActiveEmailId(null);
                    moveSelectedToFolder("archive");
                  }}
                  className="p-2 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-md transition-colors cursor-pointer"
                  title="Archive"
                >
                  <Archive className="w-[18px] h-[18px]" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => activeEmail && toggleStar(activeEmail.id)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                >
                  <Star
                    className={`w-[18px] h-[18px] ${activeEmail?.isStarred ? "fill-amber-400 text-amber-400" : ""}`}
                  />
                </button>
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer">
                  <MoreVertical className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
                  {activeEmail?.subject}
                </h1>
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <BulletproofAvatar
                      src={activeEmail?.avatar}
                      initials={activeEmail?.initials}
                      color={activeEmail?.color}
                      size={48}
                    />
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {activeEmail?.sender}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                        to me{" "}
                        <span className="text-zinc-300 dark:text-zinc-700 mx-1">
                          •
                        </span>{" "}
                        <span className="font-normal">
                          {activeEmail?.email}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-zinc-400">
                    <span>{activeEmail?.fullDate}</span>
                  </div>
                </div>

                <div className="text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap mb-10 font-medium">
                  {activeEmail?.body}
                </div>

                {activeEmail?.attachments &&
                  activeEmail.attachments.length > 0 && (
                    <div
                      className={cn(
                        "pt-6",
                        variant === "glass"
                          ? "border-t border-white/10"
                          : "border-t border-zinc-100 dark:border-zinc-800",
                      )}
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
                        Attachments ({activeEmail.attachments.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeEmail.attachments.map((file, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all group",
                              variant === "glass"
                                ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                : "border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:shadow-sm",
                              theme.focusRing,
                            )}
                          >
                            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p
                                className={cn(
                                  "text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate transition-colors",
                                  `group-hover:${theme.text}`,
                                )}
                              >
                                {file.name}
                              </p>
                              <p className="text-xs font-medium text-zinc-400">
                                {file.size}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="mt-10 flex gap-3">
                  <button
                    onClick={() => setIsComposeOpen(true)}
                    className={cn(
                      "cursor-pointer px-6 py-2.5 font-semibold rounded-lg transition-colors shadow-sm",
                      variant === "glass"
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white",
                    )}
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setIsComposeOpen(true)}
                    className={cn(
                      "cursor-pointer px-6 py-2.5 font-semibold rounded-lg transition-colors shadow-sm",
                      variant === "glass"
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white",
                    )}
                  >
                    Forward
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- COMPOSE MODAL --- */}
      {isComposeOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center sm:items-end sm:justify-end bg-black/40 backdrop-blur-sm p-4 sm:p-6 cursor-pointer"
          onClick={() => setIsComposeOpen(false)}
        >
          <div
            className={cn(
              "w-full sm:w-[600px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300 cursor-default rounded-2xl",
              styles.composeModal,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "flex items-center justify-between px-5 py-3.5 border-b",
                variant === "glass"
                  ? "bg-white/10 dark:bg-black/10 border-white/10"
                  : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800",
              )}
            >
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                New Message
              </h3>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="flex flex-col flex-1">
              <div
                className={cn(
                  "px-5 py-3 border-b flex items-center gap-4",
                  variant === "glass"
                    ? "border-white/10"
                    : "border-zinc-100 dark:border-zinc-800",
                )}
              >
                <span className="text-sm font-medium text-zinc-400">To</span>
                <input
                  required
                  type="email"
                  name="to"
                  className="flex-1 bg-transparent text-sm font-medium outline-none text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                />
              </div>
              <div
                className={cn(
                  "px-5 py-3 border-b flex items-center gap-4",
                  variant === "glass"
                    ? "border-white/10"
                    : "border-zinc-100 dark:border-zinc-800",
                )}
              >
                <span className="text-sm font-medium text-zinc-400">
                  Subject
                </span>
                <input
                  required
                  type="text"
                  name="subject"
                  className="flex-1 bg-transparent text-sm font-bold outline-none text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                />
              </div>

              <div className="p-5 flex-1 min-h-[250px]">
                <textarea
                  required
                  name="message"
                  placeholder="Type your message here..."
                  className="w-full h-full bg-transparent text-[15px] outline-none resize-none text-zinc-800 dark:text-zinc-200 font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                ></textarea>
              </div>

              <div
                className={cn(
                  "px-5 py-3 border-t flex items-center justify-between",
                  variant === "glass"
                    ? "bg-white/10 dark:bg-black/10 border-white/10"
                    : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800",
                )}
              >
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-md transition-colors cursor-pointer"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-md transition-colors cursor-pointer"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-md transition-colors cursor-pointer"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <div
                    className={cn(
                      "w-px h-5 mx-1",
                      variant === "glass"
                        ? "bg-white/20"
                        : "bg-zinc-200 dark:bg-zinc-700",
                    )}
                  ></div>
                  <button
                    type="button"
                    className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-md transition-colors cursor-pointer"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-md transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="submit"
                  className={cn(
                    "cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-md",
                    theme.bg,
                  )}
                >
                  Send <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
