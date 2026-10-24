"use client";

import { cn } from "@/lib/utils";
import {
  NavbarBlock,
  NavbarColor,
  NavbarVariant,
} from "@/components/custom/blocks/NavbarBlock";
import { getThemeStyles } from "@/components/custom/blocks/navbar-theme";

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
  const isEcommerce = variant === "ecommerce-mega-nav";
  const { theme, style } = getThemeStyles(color);

  return (
    <div
      className="w-full block"
      style={{
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "15px",
        paddingRight: "0px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={style}
        className={cn(
          "relative w-full flex flex-col items-center transition-colors duration-300 rounded-2xl border border-border bg-background z-0",
          isEcommerce ? "min-h-[680px] overflow-visible" : "min-h-[400px] overflow-hidden",
        )}
      >
      {/* Decorative Orbs to show off the glass blur. These sit UNDER the navbar. */}
      {!isEcommerce && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/20 dark:bg-primary/30 blur-3xl rounded-full" />
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-rose-500/20 dark:bg-rose-500/30 blur-3xl rounded-full" />
        </div>
      )}

      <NavbarBlock
        key={`${variant}-${color}-${logoText ?? (isEcommerce ? "NUTRIFY" : "Nexus")}`}
        variant={variant}
        color={color}
        logoText={logoText ?? (isEcommerce ? "NUTRIFY" : "Nexus")}
      />

      {isEcommerce ? (
        /* Full-height theme-tinted skeleton hero stage under the mega nav */
        <div className="w-full flex-1 flex items-center relative z-0 pointer-events-none select-none px-6 sm:px-10 py-10 sm:py-14 rounded-b-[inherit] bg-[color-mix(in_oklab,var(--navbar-accent)_6%,transparent)]">
          <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 flex flex-col gap-5">
              <div className="w-32 h-6 rounded-full bg-[color-mix(in_oklab,var(--navbar-accent)_20%,transparent)]" />
              <div className="w-11/12 h-12 sm:h-14 rounded-2xl bg-[color-mix(in_oklab,var(--navbar-accent)_18%,transparent)]" />
              <div className="w-3/4 h-12 sm:h-14 rounded-2xl bg-[color-mix(in_oklab,var(--navbar-accent)_14%,transparent)] -mt-1.5" />
              <div className="w-5/6 h-4 rounded-lg bg-[color-mix(in_oklab,var(--navbar-accent)_12%,transparent)] mt-1" />
              <div className="w-2/3 h-4 rounded-lg bg-[color-mix(in_oklab,var(--navbar-accent)_10%,transparent)] -mt-2" />
              <div className="flex items-center gap-3.5 mt-3">
                <div className={cn("w-36 h-11 rounded-full opacity-80", theme.bg)} />
                <div className="w-36 h-11 rounded-full bg-[color-mix(in_oklab,var(--navbar-accent)_14%,transparent)] border border-[color-mix(in_oklab,var(--navbar-accent)_25%,transparent)]" />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-[color-mix(in_oklab,var(--navbar-accent)_16%,var(--border))]">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="w-16 h-5 rounded-md bg-[color-mix(in_oklab,var(--navbar-accent)_18%,transparent)]" />
                    <div className="w-24 h-3 rounded-md bg-[color-mix(in_oklab,var(--navbar-accent)_10%,transparent)]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="w-full h-72 sm:h-88 rounded-3xl bg-[color-mix(in_oklab,var(--navbar-accent)_14%,transparent)] border border-[color-mix(in_oklab,var(--navbar-accent)_22%,transparent)] p-5 flex flex-col justify-between">
                <div className="w-24 h-6 rounded-full bg-[color-mix(in_oklab,var(--navbar-accent)_22%,transparent)]" />
                <div className="w-full h-16 rounded-2xl bg-background/70 border border-[color-mix(in_oklab,var(--navbar-accent)_18%,transparent)] p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[color-mix(in_oklab,var(--navbar-accent)_22%,transparent)] shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="w-2/3 h-3 rounded-md bg-[color-mix(in_oklab,var(--navbar-accent)_18%,transparent)]" />
                    <div className="w-1/2 h-2.5 rounded-md bg-[color-mix(in_oklab,var(--navbar-accent)_12%,transparent)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Dummy content pushed down so it sits below the standard navbar */
        <div className="w-full max-w-5xl mx-auto mt-28 px-8 flex flex-col gap-6 opacity-40 pointer-events-none relative z-0">
          <div className="w-2/3 h-12 bg-foreground/20 rounded-xl" />
          <div className="w-1/2 h-6 bg-foreground/20 rounded-lg" />
          <div className="w-full h-32 bg-foreground/20 rounded-2xl mt-8" />
        </div>
      )}
      </div>
    </div>
  );
}
