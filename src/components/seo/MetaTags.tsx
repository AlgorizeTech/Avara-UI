import { integrations } from "@/config/site";

export function MetaTags() {
  return (
    <>
      {/* Site ownership. Rendered only when configured — these were previously
          hardcoded to tokens belonging to the template this site was built
          from, which claimed ownership of this domain in someone else's Search
          Console. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / _YANDEX_ to your
          own tokens. */}
      {integrations.googleSiteVerification && (
        <meta
          name="google-site-verification"
          content={integrations.googleSiteVerification}
        />
      )}
      {integrations.yandexVerification && (
        <meta name="yandex-verification" content={integrations.yandexVerification} />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      {/* PWA Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Algorize UI" />
      <meta name="application-name" content="Algorize UI" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Icons and the manifest are declared in `metadata.icons` /
          `metadata.manifest` (src/lib/metadata.ts), not here. Next.js emits
          those <link> tags itself; hand-writing a second set produced
          duplicates, and the apple-touch-icon pointed at /logo.svg, which does
          not exist in /public. */}

      {/* Preconnect for Performance - Deduplicated */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </>
  );
}
