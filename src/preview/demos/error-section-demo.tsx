"use client";

import React, { useState } from "react";
import ErrorSection from "@/components/custom/blocks/ErrorSectionBlock";

export default function ErrorSectionDemo({
  errorCode,
  title,
  description,
  errorId,
}: {
  errorCode?: string;
  title?: string;
  description?: string;
  errorId?: string;
}) {
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  return (
    <div className="relative -my-6 -mx-4 w-[calc(100%+2rem)] min-w-[calc(100%+2rem)] max-w-none flex flex-col items-center justify-center overflow-hidden">
      {notice && (
        <div className="absolute top-6 z-50 text-xs px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono shadow-lg backdrop-blur-md">
          {notice}
        </div>
      )}

      <div className="w-full">
        <ErrorSection
          errorCode={errorCode}
          title={title}
          description={description}
          errorId={errorId}
          onRetry={() => showNotice("Triggered retry action: rebooting cluster...")}
          onHome={() => showNotice("Redirecting to root homepage...")}
          onSupport={() => showNotice("Opening escalation support channel...")}
          className="w-full min-h-[560px] sm:min-h-[640px]"
        />
      </div>
    </div>
  );
}
