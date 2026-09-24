"use client";

import React from "react";
import {
  Wallet,
  type WalletProps,
} from "@/components/custom/blocks/WalletBlock";

export default function WalletDemo(props: WalletProps) {
  return (
    <div className="w-full flex items-center justify-center min-h-[520px] p-4">
      <Wallet className="w-full" {...props} />
    </div>
  );
}
