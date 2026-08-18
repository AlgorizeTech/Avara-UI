"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Phone,
  MessageSquare,
  Send,
  Mail,
  Code2,
  Plug,
  User,
  Globe,
  BarChart3,
  BookOpen,
  Database,
  CreditCard,
  MessageCircle,
  Network,
  Share2,
} from "lucide-react";
import { GitHubIcon } from "./Icons";
import { cn } from "@/lib/utils";

// --- Types ---
export interface OrbitTool {
  id: string;
  name: string;
  icon: React.ElementType;
}

export interface SubApp {
  id: string;
  name: string;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  customText?: string;
}

export interface SubAgent {
  id: string;
  title: string;
  role: string;
  avatarUrl: string;
  status: "online" | "idle" | "offline";
  percentX: number;
  svgX: number;
  apps: SubApp[];
}

// --- Color Mapping Helper ---
function getColorDetails(colorKey: string) {
  switch (colorKey) {
    case "rose":
      return {
        hex: "#f43f5e",
        bgClass: "bg-rose-600 dark:bg-rose-500 text-white",
        textClass: "text-rose-600 dark:text-rose-400",
        ringClass: "ring-rose-500",
        borderClass: "border-rose-500",
      };
    case "emerald":
      return {
        hex: "#10b981",
        bgClass: "bg-emerald-600 dark:bg-emerald-500 text-white",
        textClass: "text-emerald-600 dark:text-emerald-400",
        ringClass: "ring-emerald-500",
        borderClass: "border-emerald-500",
      };
    case "zinc":
      return {
        hex: "#71717a",
        bgClass: "bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900",
        textClass: "text-zinc-800 dark:text-zinc-200",
        ringClass: "ring-zinc-500",
        borderClass: "border-zinc-500",
      };
    case "indigo":
      return {
        hex: "#6366f1",
        bgClass: "bg-indigo-600 dark:bg-indigo-500 text-white",
        textClass: "text-indigo-600 dark:text-indigo-400",
        ringClass: "ring-indigo-500",
        borderClass: "border-indigo-500",
      };
    case "primary":
    case "default":
    default:
      if (colorKey.startsWith("#")) {
        return {
          hex: colorKey,
          bgClass: "bg-primary text-primary-foreground",
          textClass: "text-primary",
          ringClass: "ring-primary",
          borderClass: "border-primary",
        };
      }
      return {
        hex: "currentColor",
        bgClass: "bg-primary text-primary-foreground",
        textClass: "text-primary",
        ringClass: "ring-primary",
        borderClass: "border-primary",
      };
  }
}

// --- Data Configuration (11 Tools evenly spaced at 360° / 11 = 32.72° intervals) ---
const DEFAULT_ORBIT_TOOLS: OrbitTool[] = [
  { id: "slack", name: "Slack", icon: Share2 },
  { id: "whatsapp", name: "WhatsApp", icon: MessageCircle },
  { id: "telegram", name: "Telegram", icon: Send },
  { id: "email", name: "Email", icon: Mail },
  { id: "code", name: "Code", icon: Code2 },
  { id: "workflow", name: "Workflow", icon: Network },
  { id: "mcp", name: "MCP", icon: Plug },
  { id: "tree", name: "Tree", icon: Share2 },
  { id: "chat", name: "Chat", icon: MessageSquare },
  { id: "voice", name: "Voice", icon: Mic },
  { id: "phone", name: "Phone", icon: Phone },
];

const DEFAULT_SUB_AGENTS: SubAgent[] = [
  {
    id: "sales",
    title: "Sales Lead",
    role: "Enterprise Conversions",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    status: "online",
    percentX: 10,
    svgX: 100,
    apps: [
      { id: "hubspot", name: "HubSpot", icon: Globe, bgColor: "bg-teal-50 dark:bg-teal-950/80", textColor: "text-teal-600 dark:text-teal-400", borderColor: "border-teal-300 dark:border-teal-700" },
      { id: "salesforce", name: "Salesforce", icon: Globe, bgColor: "bg-sky-50 dark:bg-sky-950/80", textColor: "text-sky-600 dark:text-sky-400", borderColor: "border-sky-300 dark:border-sky-700" },
      { id: "stripe", name: "Stripe", icon: CreditCard, bgColor: "bg-amber-50 dark:bg-amber-950/80", textColor: "text-amber-600 dark:text-amber-400", borderColor: "border-amber-300 dark:border-amber-700", customText: "S" },
    ],
  },
  {
    id: "marketing",
    title: "Marketing Director",
    role: "Global Campaigns",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    status: "online",
    percentX: 30,
    svgX: 300,
    apps: [
      { id: "web", name: "Website", icon: Globe, bgColor: "bg-slate-100 dark:bg-zinc-900", textColor: "text-slate-700 dark:text-zinc-300", borderColor: "border-slate-300 dark:border-zinc-700" },
      { id: "analytics", name: "Analytics", icon: BarChart3, bgColor: "bg-blue-50 dark:bg-blue-950/80", textColor: "text-blue-600 dark:text-blue-400", borderColor: "border-blue-300 dark:border-blue-700" },
      { id: "mailchimp", name: "Mailchimp", icon: Send, bgColor: "bg-purple-50 dark:bg-purple-950/80", textColor: "text-purple-600 dark:text-purple-400", borderColor: "border-purple-300 dark:border-purple-700" },
    ],
  },
  {
    id: "support",
    title: "Support Lead",
    role: "Priority Escalations",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    status: "idle",
    percentX: 50,
    svgX: 500,
    apps: [
      { id: "notion", name: "Notion", icon: BookOpen, bgColor: "bg-slate-100 dark:bg-zinc-900", textColor: "text-slate-700 dark:text-zinc-300", borderColor: "border-slate-300 dark:border-zinc-700" },
      { id: "zendesk", name: "Zendesk", icon: Database, bgColor: "bg-rose-50 dark:bg-rose-950/80", textColor: "text-rose-600 dark:text-rose-400", borderColor: "border-rose-300 dark:border-rose-700", customText: "Z" },
      { id: "intercom", name: "Intercom", icon: MessageSquare, bgColor: "bg-pink-50 dark:bg-pink-950/80", textColor: "text-pink-600 dark:text-pink-400", borderColor: "border-pink-300 dark:border-pink-700" },
    ],
  },
  {
    id: "accountant",
    title: "Financial Officer",
    role: "Billing & Audit",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    status: "online",
    percentX: 70,
    svgX: 700,
    apps: [
      { id: "quickbooks", name: "QuickBooks", icon: CreditCard, bgColor: "bg-violet-50 dark:bg-violet-950/80", textColor: "text-violet-600 dark:text-violet-400", borderColor: "border-violet-300 dark:border-violet-700", customText: "qb" },
      { id: "xero", name: "Xero", icon: Globe, bgColor: "bg-orange-50 dark:bg-orange-950/80", textColor: "text-orange-600 dark:text-orange-400", borderColor: "border-orange-300 dark:border-orange-700", customText: "xero" },
      { id: "paypal", name: "PayPal", icon: CreditCard, bgColor: "bg-blue-50 dark:bg-blue-950/80", textColor: "text-blue-600 dark:text-blue-400", borderColor: "border-blue-300 dark:border-blue-700" },
    ],
  },
  {
    id: "analyst",
    title: "Data Engineer",
    role: "BI & Pipeline Systems",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
    status: "online",
    percentX: 90,
    svgX: 900,
    apps: [
      { id: "drive", name: "Google Drive", icon: Database, bgColor: "bg-amber-50 dark:bg-amber-950/80", textColor: "text-amber-600 dark:text-amber-400", borderColor: "border-amber-300 dark:border-amber-700" },
      { id: "sheets", name: "Sheets", icon: BarChart3, bgColor: "bg-emerald-50 dark:bg-emerald-950/80", textColor: "text-emerald-600 dark:text-emerald-400", borderColor: "border-emerald-300 dark:border-emerald-700" },
      { id: "github", name: "GitHub", icon: GitHubIcon, bgColor: "bg-slate-100 dark:bg-blue-950/80", textColor: "text-slate-800 dark:text-blue-400", borderColor: "border-slate-300 dark:border-blue-700" },
    ],
  },
];

export interface UserGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accent color: a preset name ("indigo" | "rose" | "emerald" | "zinc"), a hex string, or "primary" to follow your theme. */
  color?: string;
  /** The orbiting channel nodes around the user avatar. */
  orbitTools?: OrbitTool[];
  /** The specialist agents in the bottom tier. */
  subAgents?: SubAgent[];
  /** The orchestrator shown between the orbit and the sub-agents. */
  orchestrator?: { name: string; role: string; avatarUrl: string };
  /** Orbit node highlighted on first render. */
  defaultSelectedTool?: string;
}

const DEFAULT_ORCHESTRATOR = {
  name: "John Doe",
  role: "Senior Product Designer",
  avatarUrl:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
};

export function UserGraph({
  color = "primary",
  orbitTools = DEFAULT_ORBIT_TOOLS,
  subAgents = DEFAULT_SUB_AGENTS,
  orchestrator = DEFAULT_ORCHESTRATOR,
  defaultSelectedTool = "phone",
  className,
  ...props
}: UserGraphProps) {
  const [selectedTool, setSelectedTool] = useState<string>(defaultSelectedTool);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth;
      setIsSmallScreen(width < 640 || window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let observer: ResizeObserver | null = null;
    if (containerRef.current) {
      observer = new ResizeObserver(() => handleResize());
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  const accentColor = getColorDetails(color);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full p-2 sm:p-3 bg-transparent flex flex-col items-center overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className,
      )}
      {...props}
    >
          {/* Theme Dynamic Canvas */}
          <div className="relative w-full rounded-none bg-slate-50 dark:bg-[#0c0e1a] p-3 sm:p-6 overflow-hidden shadow-xs border border-slate-200 dark:border-zinc-800/80 flex flex-col items-center justify-center transition-colors [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Ambient Dynamic Theme Glow */}
            <div
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/4 -z-0 h-64 sm:h-96 w-64 sm:w-96 -translate-x-1/2 rounded-full opacity-15 blur-[100px] sm:blur-[120px] transition-colors",
                color === "default" || color === "primary" ? "bg-primary" : ""
              )}
              style={color !== "default" && color !== "primary" ? { backgroundColor: accentColor.hex } : undefined}
            />

            <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center z-10">
              {/* TOP TIER: Concentric Circles & Dashed Orbit Ring */}
              <div className="relative size-[210px] sm:size-[250px] flex items-center justify-center my-0 z-10 scale-95 sm:scale-100">
                {/* Outer Dashed Orbit Circle */}
                <div className="absolute size-[170px] sm:size-[210px] rounded-full border border-dashed border-slate-300 dark:border-zinc-700/60" />

                {/* Concentric Outer Solid Circle */}
                <div className="absolute size-[100px] sm:size-[125px] rounded-full border border-slate-300 dark:border-zinc-700/50 flex items-center justify-center" />

                {/* Concentric Inner Ring */}
                <div
                  className={cn(
                    "absolute size-[65px] sm:size-[85px] rounded-full border opacity-20",
                    color === "default" || color === "primary" ? "border-primary bg-primary/10" : ""
                  )}
                  style={color !== "default" && color !== "primary" ? { borderColor: accentColor.hex, backgroundColor: `${accentColor.hex}10` } : undefined}
                />

                {/* Center Theme-Dynamic User Avatar Circle */}
                <div
                  className={cn(
                    "relative z-20 size-12 sm:size-16 rounded-full flex items-center justify-center shadow-md ring-2 sm:ring-4 transition-colors",
                    accentColor.bgClass,
                    accentColor.ringClass
                  )}
                >
                  <User className="size-5 sm:size-7 stroke-[2.5]" />
                </div>

                {/* 11 Orbiting Tool Nodes mathematically spaced evenly around Dashed Circle */}
                {orbitTools.map((tool, index) => {
                  // Calculate exact equal angular spacing: 360 / 11 = 32.727° per tool
                  const angleDegree = (index / orbitTools.length) * 360 - 90; // Start at top (270° / -90°)
                  const rad = (angleDegree * Math.PI) / 180;
                  const radius = isSmallScreen ? 85 : 105;
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);
                  const isSelected = selectedTool === tool.id;

                  return (
                    <div
                      key={tool.id}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className="absolute z-30 flex flex-col items-center"
                    >
                      <button
                        onClick={() => setSelectedTool(tool.id)}
                        className={cn(
                          "size-6 sm:size-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm group",
                          isSelected
                            ? cn("shadow-md ring-2 sm:ring-3 ring-offset-1 dark:ring-offset-zinc-900", accentColor.bgClass, accentColor.borderClass, accentColor.ringClass)
                            : "bg-white dark:bg-[#181c2b] border-slate-200 dark:border-zinc-700/80 text-slate-600 dark:text-zinc-400 hover:border-slate-400 dark:hover:border-zinc-500"
                        )}
                      >
                        <tool.icon className="size-3 sm:size-3.5" />
                      </button>

                      {/* Active Selected Tool Label Tooltip with Arrow Pointer */}
                      {isSelected && (
                        <div className="absolute top-7 sm:top-9 z-40 flex flex-col items-center pointer-events-none drop-shadow-md">
                          {/* Visible Solid Arrow Pointer Triangle */}
                          <div className="w-0 h-0 border-x-[5px] border-x-transparent border-b-[5px] border-b-slate-800 dark:border-b-zinc-200 -mb-[1px]" />
                          
                          {/* Tooltip Content Badge */}
                          <div className="px-2 py-0.5 rounded-md bg-slate-800 text-white dark:bg-zinc-200 dark:text-slate-900 text-[9px] font-bold whitespace-nowrap shadow-md">
                            {tool.name}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* DYNAMIC VIEW SWITCH BASED ON EXACT CONTAINER OR SCREEN SIZE */}
              {!isSmallScreen ? (
                /* DESKTOP & TABLET INTEGRATED SVG GRAPH DIAGRAM */
                <div className="relative w-full h-[330px]">
                  {/* SVG Precision Connector Lines Layer */}
                  <svg
                    className="pointer-events-none absolute inset-0 size-full overflow-visible"
                    viewBox="0 0 1000 330"
                    preserveAspectRatio="none"
                    style={{ zIndex: 1 }}
                  >
                    {/* 1. Straight Line from Top User Avatar to John Doe Avatar Top */}
                    <line
                      x1="500"
                      y1="-110"
                      x2="500"
                      y2="15"
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                      className="dark:stroke-zinc-700"
                    />

                    {/* 2. 5 Branch Curves emanating directly from Shuvo Avatar BOTTOM (500, 90) */}
                    {subAgents.map((agent) => {
                      const curvePath = `M 500 90 C 500 135, ${agent.svgX} 125, ${agent.svgX} 175`;
                      return (
                        <g key={agent.id}>
                          <path
                            d={curvePath}
                            fill="none"
                            stroke="#cbd5e1"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="dark:stroke-zinc-700"
                          />

                          {/* 3 Radiating Sub-App Lines */}
                          <line
                            x1={agent.svgX}
                            y1={225}
                            x2={agent.svgX - 35}
                            y2={275}
                            stroke="#cbd5e1"
                            strokeWidth="1.2"
                            className="dark:stroke-zinc-700"
                          />
                          <line
                            x1={agent.svgX}
                            y1={225}
                            x2={agent.svgX}
                            y2={275}
                            stroke="#cbd5e1"
                            strokeWidth="1.2"
                            className="dark:stroke-zinc-700"
                          />
                          <line
                            x1={agent.svgX}
                            y1={225}
                            x2={agent.svgX + 35}
                            y2={275}
                            stroke="#cbd5e1"
                            strokeWidth="1.2"
                            className="dark:stroke-zinc-700"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* MIDDLE TIER: Shuvo Sarkar Main Orchestrator Avatar Node */}
                  <div className="absolute top-[15px] left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                    <div
                      className={cn(
                        "relative size-16 rounded-full ring-2 p-0.5 bg-white dark:bg-[#181c2b] shadow-md transition-colors",
                        accentColor.ringClass
                      )}
                    >
                      <img
                        src={orchestrator.avatarUrl}
                        alt={orchestrator.name}
                        className="size-full rounded-full object-cover"
                      />
                      {/* Status Dot */}
                      <span className="absolute bottom-0 right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-slate-50 dark:ring-[#0c0e1a]" />
                    </div>
                    {/* Shuvo Sarkar Info Text */}
                    <div className="mt-1 text-center">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-wide whitespace-nowrap">{orchestrator.name}</h4>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-zinc-400 whitespace-nowrap">{orchestrator.role}</p>
                    </div>
                  </div>

                  {/* BOTTOM TIER: 5 Sub-Agents Grid */}
                  <div className="absolute inset-0 z-10">
                    {subAgents.map((agent) => {
                      return (
                        <div
                          key={agent.id}
                          style={{ left: `${agent.percentX}%` }}
                          className="absolute -translate-x-1/2 flex flex-col items-center group w-[19%]"
                        >
                          {/* Sub-Agent Avatar Circle */}
                          <div className="relative size-13 rounded-full p-0.5 bg-white dark:bg-[#181c2b] shadow-sm mt-[175px] mb-1 ring-1 ring-slate-300 dark:ring-zinc-700/80">
                            <img
                              src={agent.avatarUrl}
                              alt={agent.title}
                              className="size-full rounded-full object-cover"
                            />
                            <span
                              className={cn(
                                "absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-slate-50 dark:ring-[#0c0e1a]",
                                agent.status === "online"
                                  ? "bg-emerald-500"
                                  : agent.status === "idle"
                                  ? "bg-amber-500"
                                  : "bg-slate-400"
                              )}
                            />
                          </div>

                          {/* Sub-Agent Title Header BELOW Avatar Image */}
                          <span className="text-[11px] font-bold text-slate-900 dark:text-white text-center leading-tight mb-5 whitespace-nowrap">
                            {agent.title}
                          </span>

                          {/* 3 Sub-App Badges */}
                          <div className="flex items-center gap-1.5">
                            {appList(agent.apps)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* SMALL SCREEN CONTINUOUS VERTICAL TIMELINE LAYOUT */
                <div className="w-full flex flex-col items-center mt-2 px-2 z-20">
                  {/* Timeline Main Container with Vertical Central Guide Line */}
                  <div className="relative w-full max-w-sm flex flex-col items-center">
                    
                    {/* Central Vertical Connector Line */}
                    <div className="absolute top-8 bottom-8 left-6 w-0.5 bg-gradient-to-b from-slate-300 via-slate-300 to-slate-200 dark:from-zinc-700 dark:via-zinc-700 dark:to-zinc-800" />

                    {/* 1. TOP TIMELINE NODE: Shuvo Sarkar Orchestrator */}
                    <div className="relative w-full flex items-center gap-4 mb-6 z-10">
                      <div
                        className={cn(
                          "relative size-12 shrink-0 rounded-full ring-2 p-0.5 bg-white dark:bg-[#181c2b] shadow-md ml-0 transition-colors",
                          accentColor.ringClass
                        )}
                      >
                        <img
                          src={orchestrator.avatarUrl}
                          alt={orchestrator.name}
                          className="size-full rounded-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-slate-50 dark:ring-[#0c0e1a]" />
                      </div>
                      <div className="flex flex-col bg-white dark:bg-[#181c2b] p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-xs grow">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{orchestrator.name}</h4>
                          <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            Active Lead
                          </span>
                        </div>
                        <p className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">{orchestrator.role}</p>
                      </div>
                    </div>

                    {/* 2. SUB-AGENTS CONTINUOUS TIMELINE STEP NODES */}
                    <div className="w-full flex flex-col gap-4">
                      {subAgents.map((agent, index) => (
                        <div key={agent.id} className="relative w-full flex flex-col z-10">
                          {/* Agent Step Header Row */}
                          <div className="flex items-center gap-3">
                            {/* Timeline Node Point (Avatar) */}
                            <div className="relative size-12 shrink-0 rounded-full p-0.5 bg-white dark:bg-[#0c0e1a] ring-2 ring-slate-300 dark:ring-zinc-700 shadow-xs">
                              <img
                                src={agent.avatarUrl}
                                alt={agent.title}
                                className="size-full rounded-full object-cover"
                              />
                              <span
                                className={cn(
                                  "absolute bottom-0 right-0 size-2.5 rounded-full ring-1 ring-white dark:ring-[#0c0e1a]",
                                  agent.status === "online"
                                    ? "bg-emerald-500"
                                    : agent.status === "idle"
                                    ? "bg-amber-500"
                                    : "bg-slate-400"
                                )}
                              />
                              {/* Step Index Badge */}
                              <span className="absolute -top-1 -left-1 size-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[8px] font-black flex items-center justify-center shadow-xs">
                                {index + 1}
                              </span>
                            </div>

                            {/* Agent Content Box */}
                            <div className="flex flex-col bg-white dark:bg-[#181c2b] p-3 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-xs grow">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                  {agent.title}
                                </span>
                                <span className="text-[9px] font-medium text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                                  Agent 0{index + 1}
                                </span>
                              </div>

                              {/* Connected Apps Badges */}
                              <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-zinc-800/80">
                                <span className="text-[9px] font-medium text-slate-400 dark:text-zinc-500 mr-1">Apps:</span>
                                {appList(agent.apps)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
    </div>
  );
}


function appList(apps: SubApp[]) {
  return apps.map((app) => (
    <div
      key={app.id}
      className={cn(
        "size-7 sm:size-8 rounded-full border flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-xs shrink-0",
        app.bgColor,
        app.textColor,
        app.borderColor || "border-slate-200 dark:border-zinc-700/60"
      )}
      title={app.name}
    >
      {app.customText ? (
        <span className="text-[9px] sm:text-[10px] font-extrabold">{app.customText}</span>
      ) : (
        <app.icon className="size-3.5 sm:size-4" />
      )}
    </div>
  ));
}
