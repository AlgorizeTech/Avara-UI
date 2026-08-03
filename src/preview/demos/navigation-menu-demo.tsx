"use client";

import {
  NavColor,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavVariant,
} from "@/components/custom/blocks/NavigationMenu";
import { cn } from "@/lib/utils";
import { Code, Layers, Palette, Shield, Smartphone, Zap } from "lucide-react";

export default function NavigationMenuDemo({
  variant = "default",
  color = "primary",
}: {
  variant?: NavVariant;
  color?: string;
}) {
  return (
    <div
      className={`relative overflow-visible w-full flex items-start justify-center min-h-[450px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${
        variant === "glass"
          ? "bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
          : "bg-zinc-50 dark:bg-[#050505]"
      } p-3 sm:p-6 md:p-12`}
    >
      <NavigationMenu
        key={`${variant}-${color}`}
        variant={variant}
        color={color as NavColor}
      >
        <NavigationMenuList>
          <NavigationMenuItem value="features">
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* ── MOBILE-FLUID GRID WIDTH: w-[calc(100vw-2.5rem)] sm:w-[380px] md:w-[440px] lg:w-[500px] ── */}
              <ul className="grid gap-2 sm:gap-3 p-1 sm:p-2 w-[calc(100vw-2.5rem)] sm:w-[380px] md:w-[440px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink
                    href="#"
                    className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-zinc-100/50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-900 p-4 sm:p-6 no-underline outline-none focus:shadow-md"
                  >
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-900 dark:text-zinc-100 mb-3 sm:mb-4" />
                    <div className="mb-1.5 sm:mb-2 mt-2 sm:mt-4 text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      Lightning Fast
                    </div>
                    <p className="text-xs sm:text-sm leading-tight text-zinc-500 dark:text-zinc-400">
                      Experience uncompromised performance with our edge-first
                      architecture.
                    </p>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#" title="Security" icon={Shield}>
                  Advanced encryption protocols keeping your data completely
                  safe.
                </ListItem>
                <ListItem href="#" title="Developers" icon={Code}>
                  Comprehensive APIs and webhooks for endless integrations.
                </ListItem>
                <ListItem href="#" title="Customization" icon={Palette}>
                  Tailor the experience perfectly to your unique brand identity.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* ── MOBILE-FLUID GRID WIDTH: w-[calc(100vw-2.5rem)] sm:w-[360px] md:w-[420px] ── */}
              <ul className="grid w-[calc(100vw-2.5rem)] sm:w-[360px] md:w-[420px] gap-2 sm:gap-3 p-1 sm:p-2 md:grid-cols-2">
                <ListItem href="#" title="Documentation" icon={Layers}>
                  Everything you need to get up and running quickly.
                </ListItem>
                <ListItem href="#" title="Mobile Apps" icon={Smartphone}>
                  Take your workflow on the go with iOS and Android.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="pricing">
            {/* Standard link wrapped in trigger-like styles without the chevron */}
            <a
              href="#"
              className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors outline-none whitespace-nowrap"
            >
              Pricing
            </a>
          </NavigationMenuItem>

          <NavigationMenuIndicator />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

// Small helper for the preview
function ListItem({ className, title, children, icon: Icon, ...props }: any) {
  return (
    <li>
      <NavigationMenuLink
        className={cn(
          "block select-none space-y-1 rounded-md p-2.5 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 focus:bg-zinc-100 focus:text-zinc-900",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
          {Icon && <Icon className="w-4 h-4 text-zinc-500 shrink-0" />}
          {title}
        </div>
        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-zinc-500 dark:text-zinc-400 mt-1 sm:mt-1.5">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}
