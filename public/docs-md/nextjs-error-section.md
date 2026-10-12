export const metadata = docsPageMetadata("error-section");

# Error Section

A full-page, responsive Cyberpunk Diagnostic Terminal section designed for root application error boundaries, Next.js `error.tsx` / `global-error.tsx`, and dedicated maintenance pages.

Features a full-width terminal enclosure, diagnostic monitors, adaptive light & dark mode styling, live stacktrace inspector, and one-click incident copying.

export const usageDefault = `import { ErrorSection } from "@/components/custom/blocks/ErrorSectionBlock";

export default function ErrorPage() {
  return (
     window.location.reload()}
      onHome={() => window.location.href = "/"}
      onSupport={() => window.open("/support", "_blank")}
    />
  );
}`;

## Next.js Error Page Integration (`error.tsx`)

Drop `ErrorSection` directly into your Next.js App Router root error boundary:

```tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to error monitoring service like Sentry
    console.error("Boundary intercepted error:", error);
  }, [error]);

  return (
    
       reset()}
        onHome={() => (window.location.href = "/")}
      />
    
  );
}
```

---

**Component Path:** `[framework]\error-section\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
