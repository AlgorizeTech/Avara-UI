"use client";

import React, { useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import {
  MCP_CLIENT_LABEL,
  isMcpClient,
  useMcpClient,
  type McpClient,
} from "@/contexts/mcp-client-context";

type PanelProps = {
  client: McpClient;
  children: React.ReactNode;
};

/** One client's content. Rendered by `McpClientTabs`, never on its own. */
export const McpClientPanel = ({ children }: PanelProps) => <>{children}</>;

/**
 * The client switch for the MCP guide.
 *
 * Same segmented anatomy as the GSAP / Motion switch: a tinted track, the
 * active side on an accent pill that slides between options. The panel under
 * it swaps with the same short fade, so the two switches feel like one family.
 *
 * The selection lives in `McpClientProvider`, so every switcher on the page
 * moves together. A switcher that does not offer the chosen client (the manual
 * config has no OpenCode entry) shows its first tab instead and leaves the
 * shared choice alone.
 */
export const McpClientTabs = ({ children }: { children: React.ReactNode }) => {
  const { client, setClient } = useMcpClient();
  const reduceMotion = useReducedMotion();
  // One highlight per switch, so two switches on a page never trade it.
  const id = useId();

  const panels = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<PanelProps> =>
      React.isValidElement<PanelProps>(child) && isMcpClient(child.props.client),
  );
  const clients = panels.map((panel) => panel.props.client);
  const active = clients.includes(client) ? client : clients[0];
  const activePanel = panels.find((panel) => panel.props.client === active);

  return (
    <div className="my-6">
      <div className="not-prose mb-4 max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="radiogroup"
          aria-label="AI client"
          onKeyDown={(event) => {
            // Radiogroup convention: arrows move the selection, not focus.
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const index = clients.indexOf(active);
            const step = event.key === "ArrowRight" ? 1 : -1;
            const next = clients[(index + step + clients.length) % clients.length];
            setClient(next);
            (event.currentTarget.querySelector(
              `[data-client="${next}"]`,
            ) as HTMLButtonElement | null)?.focus();
          }}
          className="inline-flex shrink-0 items-center gap-0.5 rounded-lg bg-foreground/[0.04] p-0.5"
        >
          {clients.map((name) => {
            const isActive = name === active;
            return (
              <button
                key={name}
                type="button"
                role="radio"
                data-client={name}
                aria-checked={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setClient(name)}
                className={cn(
                  "relative flex cursor-pointer items-center rounded-md px-3.5 py-1.5 text-[14px] font-medium whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                  isActive ? "text-primary" : "text-foreground/40 hover:text-foreground/70",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${id}-mcp-client`}
                    aria-hidden
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 520, damping: 42, mass: 0.8 }
                    }
                    className="absolute inset-0 rounded-md bg-primary/15"
                  />
                )}
                <span className="relative">{MCP_CLIENT_LABEL[name]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.16, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {activePanel}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
