"use client";

import { useEffect } from "react";
import SiteErrorView from "@/components/site/SiteErrorView";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console/telemetry
    console.error("Application runtime exception:", error);
  }, [error]);

  return <SiteErrorView error={error} reset={reset} />;
}
