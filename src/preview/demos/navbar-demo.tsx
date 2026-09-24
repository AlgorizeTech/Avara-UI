"use client";

import {
  NavbarBlock,
  NavbarColor,
  NavbarVariant,
} from "@/components/custom/blocks/NavbarBlock";

export default function NavbarDemo({
  variant = "floating",
  color = "primary",
  logoText,
}: {
  variant?: NavbarVariant;
  color?: NavbarColor;
  /** Wordmark shown on the left (or centre, in the "centered" variant). */
  logoText?: string;
}) {
  return (
    <div className="relative overflow-hidden w-full flex flex-col items-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-border bg-background z-0">
      {/* Decorative Orbs to show off the glass blur. These sit UNDER the navbar. */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/20 dark:bg-primary/30 blur-3xl rounded-full" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-rose-500/20 dark:bg-rose-500/30 blur-3xl rounded-full" />
      </div>

      <NavbarBlock
        key={`${variant}-${color}-${logoText ?? "Nexus"}`}
        variant={variant}
        color={color}
        logoText={logoText}
      />

      {/* Dummy content pushed down so it sits below the navbar, not hidden underneath it */}
      <div className="w-full max-w-5xl mx-auto mt-28 px-8 flex flex-col gap-6 opacity-40 pointer-events-none relative z-0">
        <div className="w-2/3 h-12 bg-foreground/20 rounded-xl" />
        <div className="w-1/2 h-6 bg-foreground/20 rounded-lg" />
        <div className="w-full h-32 bg-foreground/20 rounded-2xl mt-8" />
      </div>
    </div>
  );
}
