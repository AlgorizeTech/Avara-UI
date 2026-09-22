"use client";

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

export default function SidebarDemo({
  variant = "attached",
  themeColor = "primary",
  defaultExpanded = true,
}: {
  variant?: "attached" | "floating";
  themeColor?: string;
  /** false starts the sidebar as a collapsed icon rail. */
  defaultExpanded?: boolean;
}) {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  return (
    <div className="w-full h-[500px] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden relative">
      <SidebarProvider
        key={`${variant}-${themeColor}-${defaultExpanded}`}
        color={themeColor}
        defaultExpanded={defaultExpanded}
      >
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
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-white hidden sm:block">
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
  );
}
