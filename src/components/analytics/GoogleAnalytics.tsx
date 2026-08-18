"use client";

import Script from "next/script";
import { integrations } from "@/config/site";

/**
 * Loads Google Analytics, but only when `NEXT_PUBLIC_GA_ID` is set.
 *
 * The measurement ID used to be hardcoded to the property of the template this
 * site was built from, so every page view was reported to a third party. With
 * no ID configured, the scripts are not loaded at all.
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
