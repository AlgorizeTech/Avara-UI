"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useCallback, type ComponentProps } from "react";

/**
 * `next/link` that prefetches when the reader reaches for the link, not when
 * it scrolls into view.
 *
 * The default viewport prefetch fires the moment a link renders, and on the
 * homepage that means every docs route the page links to — RSC payloads plus
 * each route's JavaScript — is fetched and evaluated while the page is still
 * hydrating. Here the same prefetch runs on hover, keyboard focus or touch, so
 * navigation is just as quick but the load-time work is gone.
 */
const IntentLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(
  function IntentLink(
    { href, prefetch: _prefetch, onPointerEnter, onFocus, onTouchStart, ...props },
    ref,
  ) {
    const router = useRouter();
    const target = typeof href === "string" ? href : href.pathname;
    const internal = typeof target === "string" && target.startsWith("/");

    const warm = useCallback(() => {
      if (internal) router.prefetch(target as string);
    }, [internal, router, target]);

    return (
      <Link
        ref={ref}
        href={href}
        prefetch={false}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          warm();
        }}
        onFocus={(e) => {
          onFocus?.(e);
          warm();
        }}
        onTouchStart={(e) => {
          onTouchStart?.(e);
          warm();
        }}
        {...props}
      />
    );
  },
);

export default IntentLink;
