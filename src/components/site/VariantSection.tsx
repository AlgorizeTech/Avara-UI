"use client";

import { useEffect, useState, type ReactNode } from "react";

export function VariantSection({
  variant,
  children,
}: {
  variant: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const current = document.body.getAttribute("data-active-variant");
      setActive(current === variant);
    };

    check();

    const observer = new MutationObserver(check);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-active-variant"],
    });

    return () => observer.disconnect();
  }, [variant]);

  if (active === null) return null;

  return active ? <>{children}</> : null;
}
