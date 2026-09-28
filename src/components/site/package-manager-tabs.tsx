"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/site/tabs";
import { usePackageManager, type PackageManager } from "@/contexts/package-manager-context";
import { PACKAGE_MANAGER_ICONS } from "./package-manager-icons";

interface PackageManagerTabsProps {
  children: React.ReactNode;
  className?: string;
}

interface TabContentProps {
  packageManager: PackageManager;
  children: React.ReactNode;
}

// Individual tab content component
export function PMTabContent({ packageManager, children }: TabContentProps) {
  return (
    <TabsContent value={packageManager}>
      {children}
    </TabsContent>
  );
}

// Main package manager tabs component
export function PackageManagerTabs({ children, className }: PackageManagerTabsProps) {
  const { packageManager, setPackageManager } = usePackageManager();

  const packageManagers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

  const getIcon = (pm: PackageManager) => {
    const Icon = PACKAGE_MANAGER_ICONS[pm].Icon;
    return <Icon className="size-3.5" />;
  };

  return (
    <Tabs 
      value={packageManager} 
      onValueChange={(value) => setPackageManager(value as PackageManager)}
      className={className}
    >
      <TabsList>
        {packageManagers.map((pm) => (
          <TabsTrigger key={pm} value={pm} className="flex items-center gap-1.5">
            {getIcon(pm)}
            {pm}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}

// Convenience components for each package manager
export function NPMTabContent({ children }: { children: React.ReactNode }) {
  return <PMTabContent packageManager="npm">{children}</PMTabContent>;
}

export function PNPMTabContent({ children }: { children: React.ReactNode }) {
  return <PMTabContent packageManager="pnpm">{children}</PMTabContent>;
}

export function YarnTabContent({ children }: { children: React.ReactNode }) {
  return <PMTabContent packageManager="yarn">{children}</PMTabContent>;
}

export function BunTabContent({ children }: { children: React.ReactNode }) {
  return <PMTabContent packageManager="bun">{children}</PMTabContent>;
}

// Export alias for PackageManagerTabs
export { PackageManagerTabs as PMTabs };
