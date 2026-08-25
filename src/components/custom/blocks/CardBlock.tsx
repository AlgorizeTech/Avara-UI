"use client";

import { cn } from "@/lib/utils";
import React from "react";

// ==========================================
// 1. ROOT CARD WRAPPER
// ==========================================
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "flat";
  interactive?: boolean;
}

export function Card({
  className,
  variant = "bordered",
  interactive = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white dark:bg-[#050505] shadow-sm",
    bordered:
      "bg-white dark:bg-[#050505] border border-border shadow-sm",
    flat: "bg-muted border border-border",
  };

  return (
    <div
      className={cn(
        "rounded-xl text-foreground flex flex-col transition-all duration-200",
        variants[variant],
        interactive &&
          "hover:shadow-md hover:-translate-y-0.5 cursor-pointer hover:border-border active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 2. HEADER
// ==========================================
export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-semibold leading-none tracking-tight text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ==========================================
// 3. CONTENT AREA
// ==========================================
export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0 flex-1", className)} {...props}>
      {children}
    </div>
  );
}

// ==========================================
// 4. FOOTER
// ==========================================
export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0 mt-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}
