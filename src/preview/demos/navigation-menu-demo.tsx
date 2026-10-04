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
      className={`relative overflow-visible w-full flex items-start justify-center min-h-[450px] ${
        variant === "glass"
          ? "bg-cover bg-center rounded-2xl p-3 sm:p-6 md:p-12"
          : ""
      }`}
      style={
        variant === "glass"
          ? {
              backgroundImage:
                'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
            }
          : undefined
      }
    >
      {variant === "glass" && (
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
      )}
      <NavigationMenu
        key={`${variant}-${color}`}
        variant={variant}
        color={color as NavColor}
      >
        <NavigationMenuList>
          <NavigationMenuItem value="features">
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* ── MOBILE ULTRA-COMPACT GRID WIDTH ── */}
              <ul className="grid gap-1 p-1 w-[calc(100vw-3.5rem)] max-w-[240px] sm:max-w-[440px] sm:w-[380px] md:w-[440px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="hidden lg:block lg:row-span-3">
                  <NavigationMenuLink
                    href="#"
                    className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-[color-mix(in_oklab,var(--nav-accent)_5%,transparent)] to-[color-mix(in_oklab,var(--nav-accent)_16%,transparent)] p-3 sm:p-6 no-underline outline-none focus:shadow-md"
                  >
                    <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-foreground mb-2 sm:mb-4" />
                    <div className="mb-1 sm:mb-2 mt-1 sm:mt-4 text-sm sm:text-lg font-semibold text-foreground">
                      Lightning Fast
                    </div>
                    <p className="text-[11px] sm:text-sm leading-snug sm:leading-tight text-muted-foreground">
                      Experience uncompromised performance with our edge-first
                      architecture.
                    </p>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#" title="Security" icon={Shield}>
                  Advanced encryption protocols.
                </ListItem>
                <ListItem href="#" title="Developers" icon={Code}>
                  APIs & webhooks.
                </ListItem>
                <ListItem href="#" title="Customization" icon={Palette}>
                  Tailor experience.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* ── MOBILE ULTRA-COMPACT GRID WIDTH ── */}
              <ul className="grid w-[calc(100vw-3.5rem)] max-w-[240px] sm:max-w-[420px] sm:w-[360px] md:w-[420px] gap-1 p-1 md:grid-cols-2">
                <ListItem href="#" title="Documentation" icon={Layers}>
                  Quick setup guide.
                </ListItem>
                <ListItem href="#" title="Mobile Apps" icon={Smartphone}>
                  iOS & Android.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="pricing">
            {/* Standard link wrapped in trigger-like styles without the chevron */}
            <a
              href="#"
              className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-1.5 rounded-full px-2 sm:px-4 py-1 sm:py-2 text-[11px] sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors outline-none whitespace-nowrap"
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
function ListItem({ className, title, children, icon: Icon, active, ...props }: any) {
  return (
    <li>
      <NavigationMenuLink
        active={active}
        className={cn(
          "block select-none space-y-1 rounded-md p-2.5 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground shrink-0" />}
          {title}
        </div>
        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground mt-1 sm:mt-1.5">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}
