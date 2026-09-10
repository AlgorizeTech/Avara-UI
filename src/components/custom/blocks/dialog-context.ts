"use client";

import React, { createContext, useContext } from "react";

interface DialogContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("Dialog components must be used within a <Dialog> root.");
  return context;
}
