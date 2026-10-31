"use client";

import Script from "next/script";
import { integrations } from "@/config/site";

/**
 * Loads Google Analytics using `integrations.gaId` (config/site.ts), which is
 * `NEXT_PUBLIC_GA_ID` when set and this site's own property otherwise.
 */
export function GoogleAnalytics() {
  const gaId = integrations.gaId;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
