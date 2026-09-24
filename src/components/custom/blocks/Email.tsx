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
import { useMemo, useState } from "react";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type EmailVariant = "default" | "minimal" | "glass";

// Added (string & {}) so it accepts arbitrary hex codes without losing IDE autocomplete for the presets
export type EmailColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const emailVariants: Record<EmailVariant, Record<string, string>> = {
  default: {
    wrapper:
      "bg-background border border-border shadow-xl rounded-2xl",
    sidebar:
      "bg-card/90 backdrop-blur-xl border-r border-border",
    main: "bg-background",
    header:
      "bg-background/80 border-b border-border backdrop-blur-xl",
    searchBg: "bg-muted border border-transparent",
    emailItem:
      "bg-background hover:bg-muted border-b border-border",
    composeModal:
      "bg-card text-card-foreground border border-border shadow-2xl",
  },
  minimal: {
    wrapper: "bg-transparent border-none shadow-none rounded-none",
    sidebar:
      "bg-muted/50 rounded-2xl border border-border lg:mr-4",
    main: "bg-transparent",
    header:
      "bg-transparent border-b border-border mb-2 pb-2",
    searchBg:
      "bg-muted/50 border border-border",
    emailItem:
      "bg-transparent hover:bg-muted/50 border-b border-border rounded-xl my-1",
    composeModal:
      "bg-card text-card-foreground border border-border shadow-2xl",
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
    border: "border-primary/30",
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
    className="relative shrink-0 flex-none rounded-full overflow-hidden shadow-sm bg-muted flex items-center justify-center"
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
        className={`w-full h-full flex items-center justify-center font-semibold text-sm m-0 p-0 tracking-wider ${color}`}
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

  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      const matchesSearch =
        email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesNavigation: boolean;
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

  // Opening an email marks it read. This belongs to the act of opening, not to
  // an effect watching the id: an effect also re-fired on unrelated re-renders
  // and cost an extra render every time a message was opened.
  const openEmail = (id: string | number) => {
    setActiveEmailId(id);
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead: true } : e)),
    );
  };

  const handlePrevEmail = () => {
    if (activeEmailIndex > 0)
      openEmail(filteredEmails[activeEmailIndex - 1].id);
  };
  const handleNextEmail = () => {
    if (activeEmailIndex >= 0 && activeEmailIndex < filteredEmails.length - 1)
      openEmail(filteredEmails[activeEmailIndex + 1].id);
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
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
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
        <div className="p-5 border-b border-border shrink-0">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="font-semibold text-foreground">
              Mailbox
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-muted-foreground"
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${isActive ? cn("font-semibold", theme.lightBg) : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"}`}
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
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm",
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
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
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
                  className={`flex items-center gap-3 text-sm cursor-pointer px-3 py-2 rounded-lg transition-all font-medium ${activeLabel === label.id ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
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
                  className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="relative w-full max-w-md min-w-0 group">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 shrink-0 group-focus-within:text-muted-foreground transition-colors" />
                  <input
                    type="text"
                    placeholder={`Search ${activeLabel || activeFolder}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full min-w-0 rounded-full py-2 pl-9 pr-4 text-sm outline-none text-foreground transition-all placeholder:text-muted-foreground",
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
                "flex items-center justify-between px-4 sm:px-6 py-2.5 shrink-0 transition-colors duration-300 border-l-[3px] border-transparent",
                variant === "glass"
                  ? "bg-white/5 dark:bg-black/5 border-b border-white/10"
                  : "border-b border-border bg-muted/50",
              )}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    checked={
                      selectedEmails.length > 0 &&
                      selectedEmails.length === filteredEmails.length
                    }
                    onChange={toggleSelectAll}
                  />
                  <span
                    onClick={toggleSelectAll}
                    className="text-xs font-semibold text-muted-foreground cursor-pointer select-none"
                  >
                    {selectedEmails.length > 0
                      ? `${selectedEmails.length} Selected`
                      : "Select All"}
                  </span>
                </div>

                {selectedEmails.length > 0 && (
                  <div className="flex items-center gap-1 border-l border-border pl-3 animate-in fade-in zoom-in-95 duration-200">
                    <button
                      onClick={() => moveSelectedToFolder("trash")}
                      className="p-1.5 sm:p-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                      title="Delete Selected"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveSelectedToFolder("archive")}
                      className="p-1.5 sm:p-2 text-muted-foreground hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-md transition-colors cursor-pointer"
                      title="Archive Selected"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 hover:bg-muted hover:text-foreground rounded-md transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-muted hover:text-foreground rounded-md transition-colors cursor-pointer">
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
                      onClick={() => openEmail(email.id)}
                      className={cn(
                        `group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 relative transition-all cursor-pointer border-l-[3px]`,
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
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer shrink-0"
                        />
                        {/* Desktop Star Button */}
                        <button
                          onClick={() => toggleStar(email.id)}
                          className="hidden sm:block cursor-pointer text-foreground/25 hover:text-amber-400 transition-colors"
                        >
                          <Star
                            className={`w-[18px] h-[18px] ${email.isStarred ? "fill-amber-400 text-amber-400" : ""}`}
                          />
                        </button>
                        <div className="flex shrink-0">
                          <BulletproofAvatar
                            src={email.avatar}
                            initials={email.initials}
                            color={email.color}
                            size={36}
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pr-8 sm:pr-0">
                        <div className="flex items-center justify-between sm:w-48 shrink-0">
                          <span
                            className={`text-[15px] truncate ${!email.isRead ? "font-semibold text-foreground" : "font-medium text-foreground/80"}`}
                          >
                            {email.sender}
                          </span>
                          <span className="sm:hidden text-xs font-medium text-muted-foreground shrink-0 ml-2">
                            {email.time}
                          </span>
                        </div>
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
                            className={`text-sm truncate ${!email.isRead ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                          >
                            {email.subject}{" "}
                            <span className="text-muted-foreground/70 font-normal ml-1 hidden lg:inline-block">
                              - {email.body.substring(0, 40)}...
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Desktop Right Time & Hover Actions */}
                      <div className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 items-center justify-end w-24">
                        <span className="text-xs font-medium text-muted-foreground group-hover:hidden whitespace-nowrap">
                          {email.time}
                        </span>
                        <div className="hidden group-hover:flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEmail(email.id);
                            }}
                            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 rounded-md transition-colors shadow-sm bg-card border border-border cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRead(email.id);
                            }}
                            className={cn(
                              "p-2 text-muted-foreground rounded-md transition-colors shadow-sm bg-card border border-border cursor-pointer",
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

                      {/* Mobile Star Button anchored at bottom-right (Gmail Reference) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(email.id);
                        }}
                        className="sm:hidden absolute bottom-3 right-4 cursor-pointer text-foreground/25 hover:text-amber-400 transition-colors p-1"
                        title="Star email"
                      >
                        <Star
                          className={`w-5 h-5 ${email.isStarred ? "fill-amber-400 text-amber-400" : ""}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Nothing to see here
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden min-w-0">
                <button
                  className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveEmailId(null)}
                  className="flex items-center gap-1 p-1.5 sm:p-2 -ml-1 sm:-ml-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors shrink-0 cursor-pointer text-xs sm:text-sm font-semibold"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  {activeEmail?.labels?.map((lbl, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 sm:px-2.5 rounded-md text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase ${lbl.pill}`}
                    >
                      {lbl.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground shrink-0 ml-2 sm:ml-4">
                <button
                  onClick={handlePrevEmail}
                  disabled={activeEmailIndex === 0}
                  className="p-1.5 sm:p-2 hover:bg-muted hover:text-foreground rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextEmail}
                  disabled={activeEmailIndex === filteredEmails.length - 1}
                  className="p-1.5 sm:p-2 hover:bg-muted hover:text-foreground rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </header>

            <div
              className={cn(
                "flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 shrink-0 text-muted-foreground transition-colors duration-300",
                variant === "glass"
                  ? "bg-white/5 dark:bg-black/5 border-b border-white/10"
                  : "border-b border-border bg-muted/50",
              )}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => activeEmail && deleteEmail(activeEmail.id)}
                  className="p-1.5 sm:p-2 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={() => {
                    if (activeEmail) {
                      setActiveEmailId(null);
                      toggleRead(activeEmail.id);
                    }
                  }}
                  className={cn(
                    "p-1.5 sm:p-2 rounded-md transition-colors cursor-pointer",
                    theme.focusRing,
                  )}
                  title="Mark Unread"
                >
                  <Mail className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={() => {
                    setActiveEmailId(null);
                    moveSelectedToFolder("archive");
                  }}
                  className="p-1.5 sm:p-2 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-md transition-colors cursor-pointer"
                  title="Archive"
                >
                  <Archive className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => activeEmail && toggleStar(activeEmail.id)}
                  className="p-1.5 sm:p-2 hover:bg-muted rounded-md transition-colors cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${activeEmail?.isStarred ? "fill-amber-400 text-amber-400" : ""}`}
                  />
                </button>
                <button className="p-1.5 sm:p-2 hover:bg-muted rounded-md transition-colors hover:text-foreground cursor-pointer">
                  <MoreVertical className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-lg sm:text-2xl font-semibold text-foreground mb-4 sm:mb-8 break-words leading-snug">
                  {activeEmail?.subject}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-0 border-b sm:border-b-0 border-border">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <BulletproofAvatar
                      src={activeEmail?.avatar}
                      initials={activeEmail?.initials}
                      color={activeEmail?.color}
                      size={40}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
                        {activeEmail?.sender}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">
                        to me{" "}
                        <span className="text-foreground/20 mx-1">
                          •
                        </span>{" "}
                        <span className="font-normal text-muted-foreground">
                          {activeEmail?.email}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground shrink-0">
                    <span>{activeEmail?.fullDate}</span>
                  </div>
                </div>

                <div className="text-sm sm:text-[15px] text-foreground leading-relaxed whitespace-pre-wrap mb-8 sm:mb-10 font-medium break-words">
                  {activeEmail?.body}
                </div>

                {activeEmail?.attachments &&
                  activeEmail.attachments.length > 0 && (
                    <div
                      className={cn(
                        "pt-6",
                        variant === "glass"
                          ? "border-t border-white/10"
                          : "border-t border-border",
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        Attachments ({activeEmail.attachments.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {activeEmail.attachments.map((file, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "flex items-center gap-3 sm:gap-4 p-3 rounded-xl cursor-pointer transition-all group min-w-0",
                              variant === "glass"
                                ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                : "border border-border bg-muted hover:shadow-sm",
                              theme.focusRing,
                            )}
                          >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p
                                className={cn(
                                  "text-xs sm:text-sm font-semibold text-foreground truncate transition-colors",
                                  `group-hover:${theme.text}`,
                                )}
                              >
                                {file.name}
                              </p>
                              <p className="text-[11px] sm:text-xs font-medium text-muted-foreground">
                                {file.size}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="mt-8 sm:mt-10 flex flex-row gap-3">
                  <button
                    onClick={() => setIsComposeOpen(true)}
                    className={cn(
                      "flex-1 sm:flex-none cursor-pointer px-5 sm:px-6 py-2.5 font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-sm text-center justify-center flex items-center",
                      variant === "glass"
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "bg-muted hover:bg-muted text-foreground",
                    )}
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setIsComposeOpen(true)}
                    className={cn(
                      "flex-1 sm:flex-none cursor-pointer px-5 sm:px-6 py-2.5 font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-sm text-center justify-center flex items-center",
                      variant === "glass"
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "bg-muted hover:bg-muted text-foreground",
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
                  : "bg-muted border-border",
              )}
            >
              <h3 className="font-semibold text-sm text-foreground">
                New Message
              </h3>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
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
                    : "border-border",
                )}
              >
                <span className="text-sm font-medium text-muted-foreground">To</span>
                <input
                  required
                  type="email"
                  name="to"
                  className="flex-1 bg-transparent text-sm font-medium outline-none text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <div
                className={cn(
                  "px-5 py-3 border-b flex items-center gap-4",
                  variant === "glass"
                    ? "border-white/10"
                    : "border-border",
                )}
              >
                <span className="text-sm font-medium text-muted-foreground">
                  Subject
                </span>
                <input
                  required
                  type="text"
                  name="subject"
                  className="flex-1 bg-transparent text-sm font-semibold outline-none text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="p-5 flex-1 min-h-[250px]">
                <textarea
                  required
                  name="message"
                  placeholder="Type your message here..."
                  className="w-full h-full bg-transparent text-[15px] outline-none resize-none text-foreground font-medium placeholder:text-muted-foreground"
                ></textarea>
              </div>

              <div
                className={cn(
                  "px-5 py-3 border-t flex items-center justify-between",
                  variant === "glass"
                    ? "bg-white/10 dark:bg-black/10 border-white/10"
                    : "bg-muted border-border",
                )}
              >
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <div
                    className={cn(
                      "w-px h-5 mx-1",
                      variant === "glass"
                        ? "bg-white/20"
                        : "bg-muted",
                    )}
                  ></div>
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="submit"
                  className={cn(
                    "cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-md",
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
