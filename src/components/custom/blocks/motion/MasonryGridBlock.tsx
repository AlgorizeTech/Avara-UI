"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { HTMLMotionProps, Variants } from "motion/react";
import React from "react";

// 1. FIXED TS ERROR: Extend HTMLMotionProps instead of React.HTMLAttributes
export interface MasonryGridProps<T>
  extends Omit<HTMLMotionProps<"div">, "children"> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columnsClassName?: string;
  gapClassName?: string;
  animateIn?: boolean;
  staggerDelay?: number;
}

export function MasonryGrid<T extends { id: string | number }>({
  items,
  renderItem,
  columnsClassName = "columns-1 sm:columns-2 md:columns-3 lg:columns-4",
  gapClassName = "gap-6",
  animateIn = true,
  staggerDelay = 0.08,
  className,
  ...props
}: MasonryGridProps<T>) {
  const itemSpacingClass = gapClassName.replace("gap-", "mb-");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(8px)",
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1,
      },
    },
  };

  return (
    <motion.div
      className={cn("w-full", columnsClassName, gapClassName, className)}
      variants={animateIn ? containerVariants : undefined}
      initial={animateIn ? "hidden" : "visible"}
      whileInView={animateIn ? "visible" : undefined}
      viewport={{ once: true, margin: "-50px" }}
      {...props}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          layout
          variants={animateIn ? itemVariants : undefined}
          // 2. FIXED GAP ISSUE: Added "inline-block w-full" to prevent margin collapse & awkward breaks
          className={cn(
            "break-inside-avoid inline-block w-full",
            itemSpacingClass,
          )}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );
}
