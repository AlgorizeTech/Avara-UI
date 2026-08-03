"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import {
  MobileSidebarTrigger,
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/custom/blocks/SidebarBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { cn } from "@/lib/utils";
import {
  Bell,
  CreditCard,
  HelpCircle,
  Hexagon,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const SIDEBAR_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface SidebarContextType { expanded: boolean; setExpanded: React.Dispatch<React.SetStateAction<boolean>>; isMobileOpen: boolean; setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>; color: string; }
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Must be rendered within a SidebarProvider");
  return context;
}

export function SidebarProvider({ children, defaultExpanded = true, color = "indigo", className }: { children: React.ReactNode, defaultExpanded?: boolean, color?: string, className?: string }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  useEffect(() => { const handleResize = () => { if (window.innerWidth >= 768) setIsMobileOpen(false); }; window.addEventListener("resize", handleResize); return () => window.removeEventListener("resize", handleResize); }, []);
  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, isMobileOpen, setIsMobileOpen, color }}>
      <div className={cn("relative flex h-full min-h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950", className)}>{children}</div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({ variant = "attached", className, children, ...props }: React.HTMLAttributes<HTMLasideElement> & { variant?: "attached" | "floating" }) {
  const { expanded, isMobileOpen, setIsMobileOpen } = useSidebar();
  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden" onClick={() => setIsMobileOpen(false)} />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex flex-col transition-[width,transform] duration-300 ease-in-out md:relative md:translate-x-0", expanded ? "w-64" : "w-16", isMobileOpen ? "translate-x-0" : "-translate-x-full", variant === "attached" ? "border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505]" : "m-4 h-[calc(100vh-2rem)] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] shadow-sm", className)} {...props}>
        {children}
      </aside>
    </>
  );
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded, setIsMobileOpen } = useSidebar();
  return (
    <div className={cn("flex h-16 shrink-0 items-center justify-between transition-all", expanded ? "px-4" : "justify-center px-0", className)} {...props}>
      {children}
      <button onClick={() => setIsMobileOpen(false)} className="md:hidden p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"><X className="w-5 h-5" /></button>
    </div>
  );
}

export function SidebarBrand({ icon, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { icon?: React.ReactNode }) {
  const { expanded } = useSidebar();
  return (
    <div className={cn("flex items-center font-black text-xl text-zinc-900 dark:text-white", className)} {...props}>
      {icon && <div className="shrink-0">{icon}</div>}
      <div className={cn("whitespace-nowrap overflow-hidden transition-all duration-300", expanded ? "max-w-[200px] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0")}>{children}</div>
    </div>
  );
}

export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("mt-auto flex shrink-0 flex-col border-t border-zinc-100 dark:border-zinc-800/50 p-3", className)} {...props}>{children}</div>; }
export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 scrollbar-hide", className)} {...props}>{children}</div>; }

export function SidebarGroup({ label, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { label?: string }) {
  const { expanded } = useSidebar();
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {label && <div className={cn("px-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-all duration-300 overflow-hidden", expanded ? "max-h-[20px] opacity-100 mb-1" : "max-h-0 opacity-0 mb-0")}>{label}</div>}
      {children}
    </div>
  );
}

export function SidebarItem({ icon, active, className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ReactNode, active?: boolean }) {
  const { expanded, color } = useSidebar();
  return (
    <button className={cn("group relative flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 outline-none", !expanded && "justify-center px-0", active ? \`bg-\${color}-50 text-\${color}-600 dark:bg-\${color}-500/10 dark:text-\${color}-400\` : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50", className)} {...props}>
      {icon && <div className={cn("shrink-0 transition-transform duration-200", active && "scale-110")}>{icon}</div>}
      <div className={cn("whitespace-nowrap overflow-hidden transition-all duration-300 text-left", expanded ? "max-w-[200px] opacity-100 ml-3" : "max-w-0 opacity-0 ml-0")}>{children}</div>
      {!expanded && <div className="absolute left-full ml-4 hidden rounded-md bg-zinc-900 dark:bg-white px-2 py-1 text-xs font-bold text-white dark:text-zinc-900 opacity-0 shadow-md group-hover:block group-hover:opacity-100 z-50">{children}<div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-zinc-900 dark:bg-white" /></div>}
    </button>
  );
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { const { expanded, setExpanded } = useSidebar(); return <button onClick={() => setExpanded(!expanded)} className={cn("hidden md:flex p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors", className)} {...props}><Menu className="w-5 h-5" /></button>; }
export function MobileSidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { const { setIsMobileOpen } = useSidebar(); return <button onClick={() => setIsMobileOpen(true)} className={cn("md:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors", className)} {...props}><Menu className="w-5 h-5" /></button>; }
`;

// --- JAVASCRIPT ENGINE CODE ---
const SIDEBAR_ENGINE_CODE_JS = SIDEBAR_ENGINE_CODE_TS.replace(
  /: React\.[A-Za-z0-9_<>]+(& \{[^}]+\})?/g,
  "",
)
  .replace(/<SidebarContextType \| undefined>/g, "")
  .replace(/interface [A-Za-z0-9_]+ \{[^}]+\}/g, "");

export function SidebarShowcase() {
  const [variant, setVariant] = useState<"attached" | "floating">("attached");
  const [themeColor, setThemeColor] = useState("primary");
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  const generateUsageCode = () => {
    return `import { 
  SidebarProvider, Sidebar, SidebarHeader, SidebarBrand, 
  SidebarContent, SidebarGroup, SidebarItem, SidebarFooter, 
  MobileSidebarTrigger, SidebarTrigger 
} from "@/components/custom/blocks/SidebarBlock";
import { LayoutDashboard, Users, Settings, Hexagon } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider color="${themeColor}">
      {/* SIDEBAR */}
      <Sidebar variant="${variant}">
        <SidebarHeader>
          <SidebarBrand icon={<Hexagon className="w-6 h-6 text-indigo-500" fill="currentColor" />}>
            Nexus UI
          </SidebarBrand>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup label="Platform">
            <SidebarItem icon={<LayoutDashboard className="w-5 h-5" />} active>Dashboard</SidebarItem>
            <SidebarItem icon={<Users className="w-5 h-5" />}>Customers</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <SidebarItem icon={<Settings className="w-5 h-5" />}>Settings</SidebarItem>
        </SidebarFooter>
      </Sidebar>

      {/* MAIN CONTENT SHELL */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center px-6 border-b border-zinc-200">
          <MobileSidebarTrigger className="mr-4" />
          <SidebarTrigger /> {/* Desktop Collapse Toggle */}
        </header>
        <main className="p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col xl:flex-row gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Layout Variant
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(["attached", "floating"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <ThemeColorPicker color={themeColor} onChange={setThemeColor} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="SidebarBlock"
        tsCode={SIDEBAR_ENGINE_CODE_TS}
        jsCode={SIDEBAR_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="sidebar"
        sandboxProps={{ variant, themeColor }}
      >
        <div className="w-full h-[500px] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden relative">
          <SidebarProvider color={themeColor} defaultExpanded={true}>
            <Sidebar variant={variant}>
              <SidebarHeader>
                <SidebarBrand
                  icon={
                    <Hexagon
                      className={cn(
                        "w-6 h-6",
                        themeColor === "primary" || themeColor === "default" || !themeColor
                          ? "text-primary"
                          : `text-${themeColor}-500`
                      )}
                      fill="currentColor"
                    />
                  }
                >
                  Nexus UI
                </SidebarBrand>
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup label="Platform">
                  <SidebarItem
                    icon={<LayoutDashboard className="w-5 h-5" />}
                    active={activeRoute === "Dashboard"}
                    onClick={() => setActiveRoute("Dashboard")}
                  >
                    Dashboard
                  </SidebarItem>
                  <SidebarItem
                    icon={<Users className="w-5 h-5" />}
                    active={activeRoute === "Customers"}
                    onClick={() => setActiveRoute("Customers")}
                  >
                    Customers
                  </SidebarItem>
                  <SidebarItem
                    icon={<CreditCard className="w-5 h-5" />}
                    active={activeRoute === "Billing"}
                    onClick={() => setActiveRoute("Billing")}
                  >
                    Billing
                  </SidebarItem>
                </SidebarGroup>

                <SidebarGroup label="Support">
                  <SidebarItem icon={<HelpCircle className="w-5 h-5" />}>
                    Help Center
                  </SidebarItem>
                  <SidebarItem icon={<Settings className="w-5 h-5" />}>
                    Settings
                  </SidebarItem>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter>
                <SidebarItem icon={<LogOut className="w-5 h-5" />}>
                  Log out
                </SidebarItem>
              </SidebarFooter>
            </Sidebar>

            {/* MAIN CONTENT SHELL */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#050505]">
              <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505]">
                <div className="flex items-center gap-4">
                  <MobileSidebarTrigger className="md:hidden" />
                  <SidebarTrigger />
                  <h1 className="text-lg font-bold text-zinc-900 dark:text-white hidden sm:block">
                    {activeRoute}
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <Search className="w-5 h-5 text-zinc-500" />
                  <Bell className="w-5 h-5 text-zinc-500" />
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </header>

              <main className="flex-1 p-6 overflow-y-auto">
                <div className="w-full h-32 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500">
                  Main Content Area
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="w-full h-48 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl" />
                  <div className="w-full h-48 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl" />
                </div>
              </main>
            </div>
          </SidebarProvider>
        </div>
      </ComponentPreview>
    </div>
  );
}

