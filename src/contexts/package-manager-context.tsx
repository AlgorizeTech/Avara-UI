"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { DEFAULT_REGISTRY_FORM, isRegistryForm, type RegistryForm } from "@/lib/registry";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export const PM_COMMANDS = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx",
} as const;

export const PM_INSTALL_COMMANDS = {
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
  bun: "bun add",
} as const;

export const PM_CREATE_COMMANDS = {
  npm: "npm create",
  pnpm: "pnpm create",
  yarn: "yarn create",
  bun: "bun create",
} as const;

interface PackageManagerContextType {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
  getCommand: (type?: "dlx" | "install" | "create") => string;
  /**
   * Whether `add` commands print the full registry URL or `@avara-ui/foo`.
   * Lives next to the package manager because it is the same kind of choice —
   * a reader picks it once and expects every command on the site to follow.
   */
  registryForm: RegistryForm;
  setRegistryForm: (form: RegistryForm) => void;
}

const PackageManagerContext = createContext<PackageManagerContextType | undefined>(undefined);

interface PackageManagerProviderProps {
  children: React.ReactNode;
}

export function PackageManagerProvider({ children }: PackageManagerProviderProps) {
  const [packageManager, setPackageManagerState] = useState<PackageManager>("npm");
  // URL by default (see DEFAULT_REGISTRY_FORM): it needs no `registry add`, so
  // the first command a reader copies works in any project.
  const [registryForm, setRegistryFormState] = useState<RegistryForm>(DEFAULT_REGISTRY_FORM);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("preferred-package-manager");
    if (saved && (saved === "npm" || saved === "pnpm" || saved === "yarn" || saved === "bun")) {
      setPackageManagerState(saved as PackageManager);
    }
    const savedForm = localStorage.getItem("preferred-registry-form");
    if (isRegistryForm(savedForm)) {
      setRegistryFormState(savedForm);
    }
  }, []);

  // Save to localStorage when changed
  const setPackageManager = (pm: PackageManager) => {
    setPackageManagerState(pm);
    localStorage.setItem("preferred-package-manager", pm);
  };

  const setRegistryForm = (form: RegistryForm) => {
    setRegistryFormState(form);
    localStorage.setItem("preferred-registry-form", form);
  };

  // Helper function to get the appropriate command
  const getCommand = (type: "dlx" | "install" | "create" = "dlx") => {
    switch (type) {
      case "dlx":
        return PM_COMMANDS[packageManager];
      case "install":
        return PM_INSTALL_COMMANDS[packageManager];
      case "create":
        return PM_CREATE_COMMANDS[packageManager];
      default:
        return PM_COMMANDS[packageManager];
    }
  };

  return (
    <PackageManagerContext.Provider
      value={{
        packageManager,
        setPackageManager,
        getCommand,
        registryForm,
        setRegistryForm,
      }}
    >
      {children}
    </PackageManagerContext.Provider>
  );
}

export function usePackageManager() {
  const context = useContext(PackageManagerContext);
  if (context === undefined) {
    throw new Error("usePackageManager must be used within a PackageManagerProvider");
  }
  return context;
}
