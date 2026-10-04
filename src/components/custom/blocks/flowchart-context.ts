"use client";

import { createContext, useContext } from "react";

interface FlowchartContextType {
  activePath: string | null;
  setActivePath: (pathId: string | null) => void;
  color: string;
}

export const FlowchartContext = createContext<FlowchartContextType | null>(null);

export function useFlowchart() {
  const context = useContext(FlowchartContext);
  if (!context) {
    throw new Error(
      "Flowchart sub-components must be used within a Flowchart root.",
    );
  }
  return context;
}
