"use client";

import { useEffect } from "react";
import SiteErrorView from "@/components/site/SiteErrorView";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log fatal layout exception to console/telemetry
    console.error("Global application runtime exception:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-neutral-50 dark:bg-[#07090e] text-neutral-900 dark:text-neutral-100">
        <SiteErrorView error={error} reset={reset} />
      </body>
    </html>
  );
}
