"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { integrations } from "@/config/site";

/**
 * Loads Google Analytics using `integrations.gaId` (config/site.ts), which is
 * `NEXT_PUBLIC_GA_ID` when set and this site's own property otherwise.
 *
 * Not inside /preview: every live example on a docs page is an iframe of that
 * route under the same root layout, so each one loaded its own copy of gtag
 * and sent its own page views — a docs page with three examples counted as
 * four visits and fetched the script four times.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const gaId = integrations.gaId;
  if (!gaId || pathname?.startsWith("/preview")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
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
