"use client";

/** TEMPORARY audit harness — deleted after the capture. */

import { Suspense, useEffect, useState } from "react";
import examples from "@/preview/audit-examples.tmp.json";
import { sandboxRegistry } from "@/preview/registry";

type Example = { component: string; demo: string; title: string; props: Record<string, unknown>; usage: string | null };
const all = examples as Example[];

declare global {
  interface Window { __setRange?: (s: number, e: number) => void; __total?: number }
}

export default function UsageAuditPage() {
  const [range, setRange] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    window.__setRange = (s, e) => setRange([s, e]);
    window.__total = all.length;
  }, []);
  return (
    <div>
      {all.slice(range[0], range[1]).map((ex, i) => {
        const index = range[0] + i;
        const Demo = sandboxRegistry[ex.demo];
        return (
          <div key={index} data-audit={index}>
            {Demo ? (
              <Suspense fallback={<span data-loading>loading</span>}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Demo {...(ex.props as any)} />
              </Suspense>
            ) : (
              <span data-missing-demo>NO DEMO: {ex.demo}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
