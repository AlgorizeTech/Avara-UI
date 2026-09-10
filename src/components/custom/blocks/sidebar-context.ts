"use client";

import React, { createContext, useContext } from "react";

interface SidebarContextType {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error(
      "Sidebar components must be rendered within a SidebarProvider",
    );
  return context;
}
