"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

export interface QrCodeGeneratorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
}

export const QrCodeGenerator = React.forwardRef<HTMLDivElement, QrCodeGeneratorProps>(
  (
    {
      value,
      size = 128,
      bgColor = "#FFFFFF",
      fgColor = "#000000",
      level = "L",
      includeMargin = false,
      className,
      ...props
    },
    ref
  ) => {
    if (!value) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center border-2 border-dashed rounded-md bg-muted/50 text-muted-foreground",
            className
          )}
          style={{ width: size, height: size }}
          {...props}
        >
          No Value
        </div>
      );
    }

    // Map correction levels to padding so L -> M -> Q -> H progressively increases dot density
    const getPaddedValue = (val: string, lvl: "L" | "M" | "Q" | "H") => {
      if (lvl === "L") return val;
      if (lvl === "M") return `${val}#m1`;
      if (lvl === "Q") return `${val}#q12345`;
      return `${val}#h12345678901234567890`;
    };

    const effectiveValue = getPaddedValue(value, level);

    return (
      <div ref={ref} className={cn("inline-block", className)} {...props}>
        <QRCodeSVG
          key={`${level}-${effectiveValue}`}
          value={effectiveValue}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
        />
      </div>
    );
  }
);

QrCodeGenerator.displayName = "QrCodeGenerator";
