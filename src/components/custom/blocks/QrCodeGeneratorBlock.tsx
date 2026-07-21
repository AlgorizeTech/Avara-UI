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

    return (
      <div ref={ref} className={cn("inline-block", className)} {...props}>
        <QRCodeSVG
          value={value}
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
