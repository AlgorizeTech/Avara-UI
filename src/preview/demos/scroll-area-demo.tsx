"use client";

import {
  ScrollAreaBlock,
  ScrollAreaVariant,
} from "@/components/custom/blocks/ScrollAreaBlock";

const getDynamicColorClasses = (color: string) => {
  switch (color) {
    case "indigo":
      return {
        badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
        pill: "bg-indigo-600 text-white",
      };
    case "rose":
      return {
        badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
        pill: "bg-rose-600 text-white",
      };
    case "emerald":
      return {
        badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        pill: "bg-emerald-600 text-white",
      };
    case "lavender":
      return {
        badge: "bg-[#9b8afb]/10 text-[#9b8afb] border-[#9b8afb]/20",
        pill: "bg-[#9b8afb] text-white",
      };
    default:
      return {
        badge: "bg-primary/10 text-primary border-primary/20",
        pill: "bg-primary text-primary-foreground",
      };
  }
};

export default function ScrollAreaDemo({
  variant = "default",
  orientation = "vertical",
  hideTrack = false,
  autoHide = false,
  color = "primary",
}: {
  variant?: ScrollAreaVariant;
  orientation?: "vertical" | "horizontal" | "both";
  hideTrack?: boolean;
  autoHide?: boolean;
  color?: string;
}) {
  const accent = getDynamicColorClasses(color);
  const messages = [
    {
      id: 1,
      name: "Elena Rostova",
      time: "12:45 PM",
      unread: 2,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
      status: "online",
      message: "Hey! Just pushed the updated Next.js typography engine.",
    },
    {
      id: 2,
      name: "Alex Rivers",
      time: "11:30 AM",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
      status: "online",
      message: "The new scroll area components look super clean!",
    },
    {
      id: 3,
      name: "Sophia Chen",
      time: "Yesterday",
      unread: 1,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
      status: "offline",
      message: "Can we review the Figma tokens for dark mode theme colors?",
    },
    {
      id: 4,
      name: "Marcus Vance",
      time: "Yesterday",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
      status: "online",
      message: "Merged PR #108. All responsive unit tests are passing.",
    },
    {
      id: 5,
      name: "Aria Thorne",
      time: "Aug 15",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158814/photo-1438761681033-6461ffad8d80-1790158812210.jpg",
      status: "offline",
      message: "Great work on the 60fps cursor animation performance fix!",
    },
    {
      id: 6,
      name: "Lucas Meyer",
      time: "Aug 14",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158813/photo-1472099645785-5658abf4ff4e-1790158812210.jpg",
      status: "offline",
      message: "Deployed the latest documentation suite to production.",
    },
    {
      id: 7,
      name: "Daniel Kim",
      time: "Aug 13",
      unread: 3,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790159965/photo-1519085360753-af0119f7cbe7-1790159970113.jpg",
      status: "online",
      message: "Updated GraphQL schema resolvers for real-time notifications.",
    },
    {
      id: 8,
      name: "Maya Lin",
      time: "Aug 12",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
      status: "online",
      message: "Added automated E2E test suites for all interactive blocks.",
    },
    {
      id: 9,
      name: "Liam O'Connor",
      time: "Aug 11",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150480/photo-1506794778202-cad84cf45f1d-1790150482275.jpg",
      status: "offline",
      message: "Optimized bundle size by tree-shaking icon dependencies.",
    },
    {
      id: 10,
      name: "Nina Patel",
      time: "Aug 10",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150482/photo-1524504388940-b1c1722653e1-1790150482279.jpg",
      status: "online",
      message: "Configured Vercel Analytics and Sentry error monitoring.",
    },
    {
      id: 11,
      name: "Ethan Wright",
      time: "Aug 09",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg",
      status: "offline",
      message: "Refactored theme customizer with HSL CSS variables.",
    },
    {
      id: 12,
      name: "Olivia Zhang",
      time: "Aug 08",
      unread: 0,
      avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150478/photo-1544005313-94ddf0286df2-1790150482273.jpg",
      status: "offline",
      message: "Published release notes for v2.4.0 UI component library.",
    },
  ];

  return (
    <div
      className={`w-full max-w-full overflow-hidden flex items-center justify-center min-h-[520px] sm:min-h-[580px] p-2 sm:p-6 rounded-2xl relative ${variant === "glass" ? "bg-cover bg-center shadow-xl" : "relative z-10"}`}
      style={
        variant === "glass"
          ? {
              backgroundImage:
                "url('https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg')",
            }
          : undefined
      }
    >
      {/* Dark overlay for optimal frosted glass contrast */}
      {variant === "glass" && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-2xl" />
      )}
      <div className="w-full max-w-full min-w-0 overflow-hidden flex justify-center relative z-10">
        <ScrollAreaBlock
          key={`${variant}-${color}-${orientation}-${hideTrack}-${autoHide}`}
          variant={variant}
          color="primary"
          orientation={orientation}
          hideTrack={hideTrack}
          autoHide={autoHide}
          className={`rounded-2xl border ${variant === "glass" ? "bg-white/10 dark:bg-black/20 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-2xl" : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm"} ${orientation === "horizontal" ? "w-full max-w-[650px] p-3 sm:p-6" : orientation === "both" ? "h-[450px] sm:h-[500px] w-full max-w-full p-3 sm:p-6" : "h-[450px] sm:h-[500px] w-full max-w-md sm:max-w-lg pl-3.5 sm:pl-4 pt-3.5 sm:pt-4 pb-3.5 sm:pb-4 pr-1"}`}
        >
        {/* Conditional Content based on Orientation */}
        {orientation === "vertical" && (
          <div className="pr-2 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-zinc-100 dark:border-zinc-800/80">
              <h4
                className={`text-sm font-semibold leading-none ${variant === "glass" ? "text-white" : "text-zinc-900 dark:text-white"}`}
              >
                Direct Messages
              </h4>
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                  variant === "glass"
                    ? "bg-white/20 text-white border-white/30 backdrop-blur-md"
                    : accent.badge
                }`}
              >
                3 Unread
              </span>
            </div>

            {messages.map((item) => (
              <div
                key={item.id}
                className={`group p-3 rounded-xl border cursor-pointer transition-all duration-200 shadow-none flex items-start gap-3 ${
                  variant === "glass"
                    ? "bg-white/15 border-white/20 hover:border-white/50 text-white"
                    : "bg-zinc-50/70 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {/* Avatar with status dot */}
                <div className="relative shrink-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-zinc-900 ${
                      item.status === "online" ? "bg-emerald-500" : "bg-zinc-400"
                    }`}
                  />
                </div>

                {/* Message details */}
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold truncate">
                      {item.name}
                    </span>
                    <span className={`text-[10px] whitespace-nowrap ${variant === "glass" ? "text-white/70" : "text-zinc-400 dark:text-zinc-500"}`}>
                      {item.time}
                    </span>
                  </div>
                  <p className={`text-xs truncate leading-snug ${variant === "glass" ? "text-white/90" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {item.message}
                  </p>
                </div>

                {/* Unread badge */}
                {item.unread > 0 && (
                  <span className={`shrink-0 w-4 h-4 rounded-full text-[10px] font-semibold flex items-center justify-center ${accent.pill}`}>
                    {item.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {orientation === "horizontal" && (
          <div className="flex w-max space-x-4 sm:space-x-5 pb-2.5 pt-2 px-1">
            {[
              {
                id: 1,
                title: "Alpine Lake Reflection",
                author: "Julian Vance",
                category: "Mountain",
                image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
                avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
              },
              {
                id: 2,
                title: "Misty Evergreen Forest",
                author: "Elena Rostova",
                category: "Forest",
                image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
                avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
              },
              {
                id: 3,
                title: "Northern Aurora Borealis",
                author: "Sophia Chen",
                category: "Aurora",
                image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790150482/photo-1531366936337-7c912a4589a7-1790150482280.jpg",
                avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
              },
              {
                id: 4,
                title: "Tropical Ocean Sunset",
                author: "David K.",
                category: "Beach",
                image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg",
                avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
              },
              {
                id: 5,
                title: "Golden Autumn Wilderness",
                author: "Aria Thorne",
                category: "Autumn",
                image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
                avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158814/photo-1438761681033-6461ffad8d80-1790158812210.jpg",
              },
              {
                id: 6,
                title: "Cascading Canyon Falls",
                author: "Lucas Meyer",
                category: "Waterfall",
                image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1434394354979-a235cd36269d-1790145143490.jpg",
                avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790158813/photo-1472099645785-5658abf4ff4e-1790158812210.jpg",
              },
            ].map((art) => (
              <div
                key={art.id}
                className={`group relative w-[200px] sm:w-[230px] shrink-0 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-200 shadow-none ${
                  variant === "glass"
                    ? "bg-white/15 dark:bg-black/30 border-white/20 hover:border-white/60 text-white"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative h-[160px] sm:h-[190px] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-black/50 backdrop-blur-md text-white border border-white/20">
                    {art.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-3.5 sm:p-4 flex flex-col gap-2">
                  <h4 className="text-sm font-semibold truncate leading-snug">
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                    <img
                      src={art.avatar}
                      alt={art.author}
                      className="w-5 h-5 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                    />
                    <span className={`text-xs truncate ${variant === "glass" ? "text-white/80" : "text-zinc-500 dark:text-zinc-400"}`}>
                      {art.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {orientation === "both" && (
          <div className="flex w-max space-x-5 pb-5 pr-5">
            {[
              {
                column: "Backlog",
                badgeColor: accent.badge,
                tasks: [
                  { name: "Figma UI Token Export", tag: "Design", size: "3.1 MB" },
                  { name: "GraphQL Schema Draft", tag: "API", size: "1.8 MB" },
                  { name: "Unit Tests for ScrollArea", tag: "Testing", size: "2.4 MB" },
                  { name: "Lighthouse Performance Audit", tag: "SEO", size: "4.0 MB" },
                  { name: "Redis Cache Layer Setup", tag: "Backend", size: "2.9 MB" },
                  { name: "i18n Multi-language Specs", tag: "Locale", size: "1.2 MB" },
                  { name: "Storybook UI Documentation", tag: "Docs", size: "3.7 MB" },
                ],
              },
              {
                column: "In Progress",
                badgeColor: accent.badge,
                tasks: [
                  { name: "OAuth 2.0 Auth Flow", tag: "Security", size: "4.2 MB" },
                  { name: "Stripe Billing Portal", tag: "Payments", size: "2.8 MB" },
                  { name: "Dark Mode Theme Tokens", tag: "Styling", size: "1.5 MB" },
                  { name: "Websocket Event Hub", tag: "Backend", size: "5.1 MB" },
                  { name: "Notification Push Service", tag: "Infra", size: "3.3 MB" },
                  { name: "Search Index Optimization", tag: "Algolia", size: "6.4 MB" },
                  { name: "Realtime Analytics Engine", tag: "Telemetry", size: "4.8 MB" },
                ],
              },
              {
                column: "Under Review",
                badgeColor: accent.badge,
                tasks: [
                  { name: "Scroll Area Both Axes", tag: "UI Block", size: "3.4 MB" },
                  { name: "Framer Motion Physics", tag: "Animation", size: "6.0 MB" },
                  { name: "PostgreSQL Migration", tag: "Database", size: "8.2 MB" },
                  { name: "S3 Asset Optimizer", tag: "Storage", size: "1.9 MB" },
                  { name: "JWT Token Rotation Spec", tag: "Auth", size: "2.2 MB" },
                  { name: "Docker Container Health", tag: "DevOps", size: "5.5 MB" },
                  { name: "Tailwind CSS Plugin Sync", tag: "Styling", size: "1.6 MB" },
                ],
              },
              {
                column: "QA Testing",
                badgeColor: accent.badge,
                tasks: [
                  { name: "Mobile Safari Touch Test", tag: "Mobile", size: "2.3 MB" },
                  { name: "Keyboard Nav Accessibility", tag: "a11y", size: "1.7 MB" },
                  { name: "Cross Browser Flex Layout", tag: "CSS", size: "3.9 MB" },
                  { name: "Image Lazy Load Verify", tag: "Perf", size: "2.0 MB" },
                  { name: "E2E Playwright Automation", tag: "Testing", size: "7.1 MB" },
                  { name: "API Error Fallback Check", tag: "Resilience", size: "1.4 MB" },
                  { name: "Form Validation Edge Cases", tag: "Forms", size: "2.5 MB" },
                ],
              },
              {
                column: "Approved",
                badgeColor: accent.badge,
                tasks: [
                  { name: "Typography System Engine", tag: "Core UI", size: "2.1 MB" },
                  { name: "Cursor Animation Fix", tag: "Physics", size: "1.1 MB" },
                  { name: "Custom Code Block Line Steps", tag: "Docs", size: "4.5 MB" },
                  { name: "Data Grid Sorting Filter", tag: "Table", size: "7.3 MB" },
                  { name: "Skeleton Profile Centering", tag: "Layout", size: "1.3 MB" },
                  { name: "Resizable Sandbox Drag", tag: "UX", size: "3.0 MB" },
                  { name: "Header Sticky Navigation", tag: "Site", size: "2.7 MB" },
                ],
              },
              {
                column: "Production",
                badgeColor: accent.badge,
                tasks: [
                  { name: "Vercel Edge Deployment", tag: "DevOps", size: "12.4 MB" },
                  { name: "CDN Cache Headers", tag: "Network", size: "0.8 MB" },
                  { name: "Global Design Tokens v2", tag: "Design", size: "5.6 MB" },
                  { name: "Production Analytics Hook", tag: "Telemetry", size: "3.2 MB" },
                  { name: "Sentry Error Monitoring", tag: "Observability", size: "4.1 MB" },
                  { name: "SSL TLS Certificate Auto", tag: "Security", size: "0.5 MB" },
                  { name: "Zero Downtime Deploy Script", tag: "CI/CD", size: "6.8 MB" },
                ],
              },
            ].map((col, cIdx) => (
              <div key={cIdx} className="flex flex-col gap-3.5 w-[210px] shrink-0">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold">{col.column}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${col.badgeColor}`}>
                    {col.tasks.length}
                  </span>
                </div>
                {col.tasks.map((task, tIdx) => (
                  <div
                    key={tIdx}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 shadow-none flex flex-col gap-2 ${
                      variant === "glass"
                        ? "bg-white/15 border-white/20 hover:border-white/50 text-white"
                        : "bg-zinc-50/70 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${variant === "glass" ? "text-white/70" : "text-zinc-400 dark:text-zinc-500"}`}>
                        {task.tag}
                      </span>
                      <span className={`text-[10px] ${variant === "glass" ? "text-white/70" : "text-zinc-400 dark:text-zinc-500"}`}>
                        {task.size}
                      </span>
                    </div>
                    <span className="text-xs font-semibold leading-snug">
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </ScrollAreaBlock>
      </div>
    </div>
  );
}
