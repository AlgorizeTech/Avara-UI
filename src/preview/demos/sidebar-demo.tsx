"use client";

import {
  CategorizedSidebar,
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
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  Box,
  Check,
  ChevronDown,
  ChevronsUpDown,
  CreditCard,
  HelpCircle,
  Hexagon,
  LayoutDashboard,
  Lock,
  LogOut,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
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
  variant?: "attached" | "floating" | "categorized";
  styleVariant?: "default" | "categorized";
  themeColor?: string;
  /** false starts the sidebar as a collapsed icon rail. */
  defaultExpanded?: boolean;
}) {
  const [activeRoute, setActiveRoute] = useState("Dashboard");
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceOption>(WORKSPACES[0]);

  const isCategorized = variant === "categorized" || styleVariant === "categorized";

  return (
    <div className="w-full h-[680px] border border-border rounded-2xl overflow-hidden relative">
      <SidebarProvider
        key={`${variant}-${themeColor}-${defaultExpanded}`}
        color={themeColor}
        defaultExpanded={defaultExpanded}
        className="min-h-full h-full"
      >
        {/* SIDEBAR COMPONENT */}
        {isCategorized ? (
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
