"use client";

import React from "react";
import {
  SecureEnvelope,
  type SecureEnvelopeProps,
} from "@/components/custom/blocks/SecureEnvelopeBlock";
import { accentStyle, toBlockColor } from "@/lib/accent";

export default function SecureEnvelopeDemo({
  color = "primary",
  ...props
}: SecureEnvelopeProps & { color?: string }) {
  const activeColor = toBlockColor(color);

  return (
    <div
      style={accentStyle(color)}
      className="w-full flex items-center justify-center min-h-[270px] min-[400px]:min-h-[295px] sm:min-h-[540px] px-1 sm:px-4 py-4 sm:py-8 overflow-visible"
    >
      <SecureEnvelope color={activeColor} {...props} />
    </div>
  );
}
