"use client";

import {
  CategorizedSidebar,
  CurvedWaveSidebar,
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
  type WaveSidebarItem,
} from "@/components/custom/blocks/SidebarBlock";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  Box,
  Calendar,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Clock,
  CreditCard,
  FileText,
  HelpCircle,
  Hexagon,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

interface WorkspaceOption {
  id: string;
  name: string;
  badge: "Pro" | "Free";
  tierDescription: string;
  isPrivate: boolean;
  user: string;
  userEmail: string;
  totalProfit: string;
  salesGoal: string;
  productCount: number;
  orderCount: number;
  reportCount: number;
  teamCount: number;
}

const WORKSPACES: WorkspaceOption[] = [
  {
    id: "avara-pro",
    name: "Avara UI",
    badge: "Pro",
    tierDescription: "Pro Plan",
    isPrivate: true,
    user: "Noah Bellingham",
    userEmail: "noah@avara.design",
    totalProfit: "$110,450",
    salesGoal: "80%",
    productCount: 4,
    orderCount: 8,
    reportCount: 2,
    teamCount: 3,
  },
  {
    id: "avara-free",
    name: "Avara UI",
    badge: "Free",
    tierDescription: "Free Plan",
    isPrivate: false,
    user: "Noah Bellingham",
    userEmail: "noah@avara.design",
    totalProfit: "$42,300",
    salesGoal: "65%",
    productCount: 2,
    orderCount: 3,
    reportCount: 1,
    teamCount: 1,
  },
];

export default function SidebarDemo({
  variant = "attached",
  styleVariant,
  themeColor = "primary",
  defaultExpanded = true,
}: {
  variant?: "attached" | "floating" | "categorized" | "curved" | "curved-wave";
  styleVariant?: "default" | "categorized" | "curved" | "curved-wave";
  themeColor?: string;
  /** false starts the sidebar as a collapsed icon rail. */
  defaultExpanded?: boolean;
}) {
  const [activeRoute, setActiveRoute] = useState("Dashboard");
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceOption>(WORKSPACES[0]);

  const isCurved =
    variant === "curved" ||
    variant === "curved-wave" ||
    styleVariant === "curved" ||
    styleVariant === "curved-wave";
  const isCategorized = variant === "categorized" || styleVariant === "categorized";

  const WAVE_ITEMS: WaveSidebarItem[] = [
    { id: "Dashboard", label: "Dashboard", icon: <LayoutGrid className="w-5 h-5" /> },
    { id: "Profile", label: "User Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "TimeTracker",
      label: "Time Tracker",
      icon: <Clock className="w-5 h-5" />,
    },
    { id: "Notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "Calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { id: "Messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "Notes", label: "Notes & Tasks", icon: <FileText className="w-5 h-5" /> },
    { id: "Help", label: "Help & Support", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full h-[680px] border border-border rounded-2xl overflow-hidden relative">
      <SidebarProvider
        key={`${variant}-${themeColor}-${defaultExpanded}`}
        color={themeColor}
        defaultExpanded={defaultExpanded}
        className="min-h-full h-full"
      >
        {/* SIDEBAR COMPONENT */}
        {isCurved ? (
          <div className="flex w-full h-full bg-[#f6f7fb] dark:bg-background overflow-hidden relative">
            {/* Curved Wave Rail Sidebar */}
            <CurvedWaveSidebar
              items={WAVE_ITEMS}
              activeRoute={activeRoute}
              onRouteChange={setActiveRoute}
              className="ml-0"
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
              {/* Header */}
              <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border/60 bg-background/80 backdrop-blur-xs">
                <div className="flex items-center gap-3">
                  <MobileSidebarTrigger className="md:hidden" />
                  <h1 className="text-base sm:text-lg font-bold text-foreground">
                    {activeRoute}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 border border-border/40 text-xs">
                    <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-xs w-28 md:w-40"
                      readOnly
                    />
                  </div>
                  <button
                    type="button"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
                    JD
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
                {/* Greeting banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/60">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      Welcome Back, James 👋
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Here is an overview of your activity and recent updates for {activeRoute}.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity self-start sm:self-auto shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>
                </div>

                {/* 4 Responsive Simple Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl border border-border/60 bg-card">
                    <span className="text-xs font-medium text-muted-foreground">Total Revenue</span>
                    <p className="text-xl sm:text-2xl font-bold text-foreground mt-1.5">$48,250</p>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 inline-block">+12.5% this month</span>
                  </div>
                  <div className="p-4 rounded-xl border border-border/60 bg-card">
                    <span className="text-xs font-medium text-muted-foreground">Active Projects</span>
                    <p className="text-xl sm:text-2xl font-bold text-foreground mt-1.5">24</p>
                    <span className="text-[10px] font-semibold text-primary mt-1 inline-block">4 in progress</span>
                  </div>
                  <div className="p-4 rounded-xl border border-border/60 bg-card">
                    <span className="text-xs font-medium text-muted-foreground">Tasks Completed</span>
                    <p className="text-xl sm:text-2xl font-bold text-foreground mt-1.5">142</p>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 inline-block">88% rate</span>
                  </div>
                  <div className="p-4 rounded-xl border border-border/60 bg-card">
                    <span className="text-xs font-medium text-muted-foreground">Efficiency</span>
                    <p className="text-xl sm:text-2xl font-bold text-foreground mt-1.5">94.2%</p>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 inline-block">+3.1% vs target</span>
                  </div>
                </div>

                {/* 2 Simple Responsive Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Panel 1: Recent Activity */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-card space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border/40">
                      <h3 className="text-xs sm:text-sm font-bold text-foreground">Recent Activity</h3>
                      <span className="text-[10px] text-muted-foreground">Updated 5m ago</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: "Design System Tokens", desc: "Updated color palettes and spacing scale", time: "2h ago" },
                        { title: "Mobile App Layout", desc: "Added responsive drawers and bottom navigation", time: "5h ago" },
                        { title: "Client Review Milestone", desc: "Approved dashboard wireframes and prototypes", time: "Yesterday" },
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                          <div>
                            <p className="font-semibold text-foreground">{activity.title}</p>
                            <p className="text-[11px] text-muted-foreground">{activity.desc}</p>
                          </div>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Panel 2: Project Milestones */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-card space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border/40">
                      <h3 className="text-xs sm:text-sm font-bold text-foreground">Active Milestones</h3>
                      <span className="text-[10px] text-primary font-medium">3 Active</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: "Component Library Documentation", progress: 85, color: "bg-primary" },
                        { title: "API Integration Testing", progress: 60, color: "bg-indigo-500" },
                        { title: "Production Deployment Readiness", progress: 30, color: "bg-emerald-500" },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-foreground">{item.title}</span>
                            <span className="text-muted-foreground">{item.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all duration-500", item.color)} style={{ width: `${item.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        ) : isCategorized ? (
          <CategorizedSidebar
            workspace={selectedWorkspace}
            workspaces={WORKSPACES}
            onWorkspaceChange={(ws) => setSelectedWorkspace(ws as WorkspaceOption)}
            activeRoute={activeRoute}
            onRouteChange={setActiveRoute}
            groups={[
              {
                label: "MENU",
                items: [
                  {
                    id: "Dashboard",
                    label: "Dashboard",
                    icon: <LayoutDashboard className="w-4 h-4" />,
                  },
                  {
                    id: "Products",
                    label: "Products",
                    icon: <Box className="w-4 h-4" />,
                    badge: selectedWorkspace.productCount,
                  },
                  {
                    id: "Orders",
                    label: "Orders & Invoices",
                    icon: <ShoppingBag className="w-4 h-4" />,
                    badge: selectedWorkspace.orderCount,
                  },
                  {
                    id: "Analytics",
                    label: "Sales Analytics",
                    icon: <BarChart3 className="w-4 h-4" />,
                  },
                  {
                    id: "Insights",
                    label: "Customer Insights",
                    icon: <Users className="w-4 h-4" />,
                  },
                  {
                    id: "Reports",
                    label: "Reports",
                    icon: <BarChart3 className="w-4 h-4" />,
                    badge: selectedWorkspace.reportCount,
                  },
                ],
              },
              {
                label: "OTHERS",
                items: [
                  {
                    id: "Settings",
                    label: "Settings",
                    icon: <Settings className="w-4 h-4" />,
                  },
                  {
                    id: "Team",
                    label: "Team Members",
                    icon: <Users className="w-4 h-4" />,
                    badge: selectedWorkspace.teamCount,
                  },
                  {
                    id: "Help",
                    label: "Help Center",
                    icon: <HelpCircle className="w-4 h-4" />,
                  },
                ],
              },
            ]}
          />
        ) : (
          <Sidebar variant={variant === "floating" ? "floating" : "attached"}>
            <SidebarHeader>
              <SidebarBrand
                icon={
                  <Hexagon
                    className={cn(
                      "w-6 h-6",
                      themeColor === "primary" || themeColor === "default" || !themeColor
                        ? "text-primary"
                        : `text-${themeColor}-500`,
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
        )}

        {/* MAIN DASHBOARD CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
            <div className="flex items-center gap-3">
              <MobileSidebarTrigger className="md:hidden" />
              {!isCategorized && <SidebarTrigger />}
              <h1 className="text-lg font-semibold text-foreground">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div className="w-8 h-8 rounded-full bg-muted" />
            </div>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            {isCategorized ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {selectedWorkspace.name} &gt; {activeRoute}
                  </p>
                  <h2 className="text-xl font-bold tracking-tight text-foreground mt-0.5">
                    Welcome Back, {selectedWorkspace.user} 👋
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Total Profit
                    </span>
                    <p className="text-2xl font-bold text-foreground mt-2">
                      {selectedWorkspace.totalProfit}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Sales Goal
                    </span>
                    <p className="text-2xl font-bold text-foreground mt-2">
                      {selectedWorkspace.salesGoal}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
                  Main Content Area
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="w-full h-48 bg-muted rounded-xl" />
                  <div className="w-full h-48 bg-muted rounded-xl" />
                </div>
              </>
            )}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
