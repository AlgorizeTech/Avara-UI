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
      {/* No viewport tag: Next.js emits one itself, and a second is a duplicate. */}
      <meta name="theme-color" content="#000000" />

      {/* PWA Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Avara UI" />
      <meta name="application-name" content="Avara UI" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Icons and the manifest are declared in `metadata.icons` /
          `metadata.manifest` (src/lib/metadata.ts), not here. Next.js emits
          those <link> tags itself; hand-writing a second set produced
          duplicates, and the apple-touch-icon pointed at /logo.svg, which does
          not exist in /public. */}

      {/* Google Fonts preconnects live in ResourcePreloader; they were
          duplicated here. */}
    </>
  );
}
