import { useCallback, useEffect, useRef, useState } from "react";

// The clipboard hook behind CopyButton / CopyField, kept out of the component
// file so that file stays a components-only module (React Fast Refresh).

export type CopyStatus = "idle" | "copied" | "error";

/**
 * Copies text to the clipboard and reports a status that resets itself after
 * `timeout` ms. Falls back to a hidden textarea + execCommand where the async
 * Clipboard API is unavailable (older browsers, non-secure origins).
 */
export function useCopyToClipboard(timeout = 2000) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(
    async (text: string) => {
      let ok = false;
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          ok = true;
        }
      } catch {
        ok = false;
      }
      if (!ok && typeof document !== "undefined") {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          ok = document.execCommand("copy");
        } catch {
          ok = false;
        }
        document.body.removeChild(ta);
      }
      setStatus(ok ? "copied" : "error");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus("idle"), timeout);
      return ok;
    },
    [timeout],
  );

  return { copy, status, copied: status === "copied" };
}
