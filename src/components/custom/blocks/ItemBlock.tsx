"use client";

import { cn } from "@/lib/utils";
import React from "react";

export type ItemVariant = "default" | "compact" | "card" | "bordered";

export interface ItemBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: ItemVariant;
  onClick?: () => void;
  className?: string;
}

export function ItemBlock({
  title,
  description,
  media,
  actions,
  variant = "default",
  onClick,
  className,
  ...props
}: ItemBlockProps) {
  const isClickable = !!onClick;
  const isCard = variant === "card";

  const baseClasses = cn(
    "relative flex transition-all duration-200 text-left w-full",
    isClickable &&
      "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
    isCard ? "flex-col" : "flex-row items-center gap-4",
    className,
  );

  const variantClasses = {
    default: cn(
      "p-4 rounded-xl",
      isClickable &&
        "hover:bg-muted active:scale-[0.98]",
    ),
    compact: cn(
      "p-2.5 rounded-lg gap-3",
      isClickable &&
        "hover:bg-muted active:scale-[0.98]",
    ),
    bordered: cn(
      "p-4 rounded-xl border border-border bg-white dark:bg-[#050505] shadow-sm",
      isClickable &&
        "hover:border-border hover:shadow-md active:scale-[0.98]",
    ),
    card: cn(
      "p-5 rounded-2xl border border-border bg-white dark:bg-[#050505] shadow-sm gap-4",
      isClickable &&
        "hover:shadow-md hover:-translate-y-1 hover:border-border",
    ),
  };

  const Component = isClickable ? "button" : "div";

  return (
    <Component
      className={cn(baseClasses, variantClasses[variant])}
      onClick={onClick}
      {...(isClickable ? { type: "button" } : {})}
      {...props}
    >
      {/* Media Slot */}
      {media && (
        <div
          className={cn(
            "shrink-0 flex items-center justify-center",
            isCard ? "mb-2" : "",
          )}
        >
          {media}
        </div>
      )}

      {/* Content Slot */}
      <div className="flex flex-col flex-1 min-w-0">
        <div
          className={cn(
            "font-semibold text-foreground truncate",
            variant === "compact" ? "text-sm" : "text-base",
            isCard && "text-lg mb-1 whitespace-normal",
          )}
        >
          {title}
        </div>
        {description && (
          <div
            className={cn(
              "text-muted-foreground mt-0.5",
              variant === "compact" ? "text-xs line-clamp-1" : "text-sm",
              isCard && "line-clamp-3 mt-1",
            )}
          >
            {description}
          </div>
        )}
      </div>

      {/* Actions Slot */}
      {actions && (
        <div
          className={cn(
            "shrink-0 flex items-center gap-2",
            isCard
              ? "w-full pt-4 mt-auto border-t border-border"
              : "ml-4",
          )}
          onClick={(e) => {
            // Prevent parent button click if clicking an action inside
            if (isClickable) e.stopPropagation();
          }}
        >
          {actions}
        </div>
      )}
    </Component>
  );
}
