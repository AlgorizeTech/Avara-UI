"use client";

import React from "react";
import { ArrowRight, Check, Layers, Sparkles, Terminal, Zap } from "lucide-react";
import { TemplatePage, type TemplatePreviewTab } from "@/components/site/TemplatePage";
import { cn } from "@/lib/utils";

function PreviewShell({
  theme,
  children,
}: {
  theme: "light" | "dark";
  children: React.ReactNode;
}) {
  const isDark = theme === "dark";
  return (
    <div
      className={cn(
        "min-h-[440px] w-full p-6 sm:p-8",
        isDark ? "bg-[#0b0d12] text-zinc-100" : "bg-[#fafafa] text-zinc-900",
      )}
    >
      {/* Mini Navbar */}
      <div
        className={cn(
          "flex items-center justify-between border-b pb-4 mb-8",
          isDark ? "border-white/10" : "border-zinc-200",
        )}
      >
        <div className="flex items-center gap-2 font-semibold text-sm tracking-tight">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            K
          </span>
          <span>Kinetix</span>
        </div>
        <div
          className={cn(
            "hidden sm:flex items-center gap-5 text-xs",
            isDark ? "text-zinc-400" : "text-zinc-600",
          )}
        >
          <span>Features</span>
          <span>Pricing</span>
          <span>Changelog</span>
          <span>About</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-md px-2.5 py-1 text-[11px] font-medium",
              isDark ? "bg-white/10 text-white" : "bg-zinc-900 text-white",
            )}
          >
            Get started
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}

const KINETIX_PAGES: TemplatePreviewTab[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
    render: (theme) => {
      const isDark = theme === "dark";
      return (
        <PreviewShell theme={theme}>
          <div className="mx-auto max-w-2xl text-center pt-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium",
                isDark
                  ? "border-white/10 bg-white/5 text-zinc-300"
                  : "border-zinc-200 bg-white text-zinc-700",
              )}
            >
              <Sparkles className="size-3 text-primary" />
              Kinetix 2.0 — Autonomous Release Pipelines
            </span>
            <h3 className="mt-5 text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
              Ship product workflows at the speed of thought
            </h3>
            <p
              className={cn(
                "mt-3 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto",
                isDark ? "text-zinc-400" : "text-zinc-600",
              )}
            >
              Orchestrate deployments, monitor telemetry, and automate rollbacks
              from one calm, keyboard-first workspace built for modern engineering teams.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                Start free trial <ArrowRight className="size-3.5" />
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-medium",
                  isDark
                    ? "border-white/10 bg-white/5 text-zinc-200"
                    : "border-zinc-200 bg-white text-zinc-800",
                )}
              >
                Book a demo
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              { icon: Zap, label: "99.99% Uptime", desc: "Global edge routing with instant failover" },
              { icon: Terminal, label: "CLI First", desc: "Install pipelines in a single command" },
              { icon: Layers, label: "Modular Blocks", desc: "Every section decoupled & typed" },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  "rounded-xl border p-4 text-left",
                  isDark
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-zinc-200 bg-white",
                )}
              >
                <item.icon className="size-4 text-primary mb-2" />
                <p className="text-xs font-semibold">{item.label}</p>
                <p
                  className={cn(
                    "mt-1 text-[11px] leading-relaxed",
                    isDark ? "text-zinc-400" : "text-zinc-600",
                  )}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </PreviewShell>
      );
    },
  },
  {
    id: "features",
    label: "Features",
    path: "/features",
    render: (theme) => {
      const isDark = theme === "dark";
      return (
        <PreviewShell theme={theme}>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Built for high-velocity SaaS teams
            </h3>
            <p
              className={cn(
                "mt-2 text-xs sm:text-sm",
                isDark ? "text-zinc-400" : "text-zinc-600",
              )}
            >
              Everything needed to launch, measure, and iterate without boilerplate.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Real-time Observability", detail: "Live request traces, latency histograms, and instant anomaly alerts." },
                { title: "Branch Previews", detail: "Every pull request gets an isolated preview URL in under 15 seconds." },
                { title: "Role-Based Access", detail: "Fine-grained team permissions, SSO, and audit logs out of the box." },
                { title: "MDX Documentation", detail: "Author changelogs and product guides directly alongside your code." },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className={cn(
                    "rounded-xl border p-4",
                    isDark ? "border-white/10 bg-white/[0.03]" : "border-zinc-200 bg-white",
                  )}
                >
                  <p className="text-xs font-semibold">{feat.title}</p>
                  <p className={cn("mt-1.5 text-[11px] leading-relaxed", isDark ? "text-zinc-400" : "text-zinc-600")}>
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PreviewShell>
      );
    },
  },
  {
    id: "pricing",
    label: "Pricing",
    path: "/pricing",
    render: (theme) => {
      const isDark = theme === "dark";
      return (
        <PreviewShell theme={theme}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Simple, predictable pricing
              </h3>
              <p className={cn("mt-1.5 text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>
                Start free and scale as your team grows.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: "Starter", price: "$0", perks: ["3 projects", "Community support", "10k events/mo"] },
                { name: "Pro", price: "$29", featured: true, perks: ["Unlimited projects", "Priority support", "1M events/mo"] },
                { name: "Enterprise", price: "$99", perks: ["Custom SLA", "Dedicated cluster", "SSO & SAML"] },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "rounded-xl border p-4 flex flex-col justify-between",
                    plan.featured
                      ? "border-primary bg-primary/10"
                      : isDark
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-zinc-200 bg-white",
                  )}
                >
                  <div>
                    <p className="text-xs font-semibold">{plan.name}</p>
                    <p className="mt-2 text-2xl font-bold">{plan.price}</p>
                    <ul className="mt-3 space-y-1.5">
                      {plan.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-1.5 text-[11px]">
                          <Check className="size-3 text-primary shrink-0" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PreviewShell>
      );
    },
  },
  {
    id: "changelog",
    label: "Changelog",
    path: "/changelog",
    render: (theme) => {
      const isDark = theme === "dark";
      return (
        <PreviewShell theme={theme}>
          <div className="max-w-2xl mx-auto space-y-5">
            <h3 className="text-xl font-semibold tracking-tight">Changelog</h3>
            {[
              { version: "v2.4.0", date: "Nov 2026", title: "Edge Telemetry & Replay", body: "Added real-time edge trace replay and reduced bundle footprint by 18%." },
              { version: "v2.3.0", date: "Oct 2026", title: "MDX Content Layer", body: "Unified blog posts and release notes into a typed MDX content collection." },
            ].map((entry) => (
              <div
                key={entry.version}
                className={cn(
                  "rounded-xl border p-4",
                  isDark ? "border-white/10 bg-white/[0.03]" : "border-zinc-200 bg-white",
                )}
              >
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono font-medium text-primary">
                    {entry.version}
                  </span>
                  <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>{entry.date}</span>
                </div>
                <p className="mt-2 text-xs font-semibold">{entry.title}</p>
                <p className={cn("mt-1 text-[11px]", isDark ? "text-zinc-400" : "text-zinc-600")}>
                  {entry.body}
                </p>
              </div>
            ))}
          </div>
        </PreviewShell>
      );
    },
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    render: (theme) => {
      const isDark = theme === "dark";
      return (
        <PreviewShell theme={theme}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Crafting developer tools that stay out of your way
            </h3>
            <p className={cn("mt-3 text-xs sm:text-sm leading-relaxed", isDark ? "text-zinc-400" : "text-zinc-600")}>
              We started Kinetix with a simple belief: infrastructure software should feel as
              intentional and responsive as the best consumer apps.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { stat: "40k+", label: "Deployments / day" },
                { stat: "120ms", label: "Median edge latency" },
                { stat: "99.99%", label: "Global availability" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={cn(
                    "rounded-xl border p-4 text-center",
                    isDark ? "border-white/10 bg-white/[0.03]" : "border-zinc-200 bg-white",
                  )}
                >
                  <p className="text-lg font-bold text-primary">{s.stat}</p>
                  <p className={cn("mt-1 text-[11px]", isDark ? "text-zinc-400" : "text-zinc-600")}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PreviewShell>
      );
    },
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    render: (theme) => {
      const isDark = theme === "dark";
      return (
        <PreviewShell theme={theme}>
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold tracking-tight">Get in touch</h3>
            <p className={cn("mt-1.5 text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>
              Have questions about enterprise plans or custom integrations?
            </p>
            <div className="mt-5 space-y-3">
              {["Work email", "Company name", "How can we help?"].map((placeholder) => (
                <div
                  key={placeholder}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-xs",
                    isDark
                      ? "border-white/10 bg-white/[0.03] text-zinc-500"
                      : "border-zinc-200 bg-white text-zinc-400",
                  )}
                >
                  {placeholder}
                </div>
              ))}
              <div className="rounded-lg bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">
                Send message
              </div>
            </div>
          </div>
        </PreviewShell>
      );
    },
  },
  {
    id: "404",
    label: "404",
    path: "/404",
    render: (theme) => {
      const isDark = theme === "dark";
      return (
        <PreviewShell theme={theme}>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="font-mono text-4xl font-bold text-primary">404</span>
            <h3 className="mt-3 text-lg font-semibold">Page not found</h3>
            <p className={cn("mt-1.5 text-xs max-w-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>
              The route you requested could not be located. Return to the home page to continue.
            </p>
            <span className="mt-5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
              Back to home
            </span>
          </div>
        </PreviewShell>
      );
    },
  },
];

export function KinetixTemplateView() {
  return (
    <TemplatePage
      category="SaaS & AI"
      tier="Free"
      isNew
      title="Kinetix"
      description="A complete marketing site for an AI or SaaS product, with feature showcases, pricing, changelog, and light and dark themes."
      demoDomain="https://evora-estates.vercel.app"
      pages={KINETIX_PAGES}
      whatYouGet={{
        description:
          "The full source code of the site in the preview, as a Next.js project you own and change freely. Version 1.0.0.",
        techStack: [
          { name: "Next.js", version: "16", iconKey: "nextjs" },
          { name: "React", version: "19", iconKey: "react" },
          { name: "Tailwind CSS", version: "v4", iconKey: "tailwind" },
          { name: "TypeScript", iconKey: "typescript" },
          { name: "Motion", iconKey: "motion" },
          { name: "MDX", iconKey: "mdx" },
        ],
        features: [
          "Light and dark modes powered by CSS design tokens",
          "Live theme customizer with adjustable accent and radius",
          "Seven responsive pages built with Next.js App Router",
          "Typed React 19 & Tailwind CSS v4 component architecture",
          "MDX-ready changelog and documentation routes",
          "Motion-safe animations respecting reduced-motion settings",
          "SEO metadata, sitemap, and robots.txt preconfigured",
          "Clean source code you own with lifetime template updates",
        ],
      }}
      pagesOverview={{
        subtitle:
          "Seven ready-to-ship routes designed for both light and dark themes.",
        items: [
          {
            id: "home",
            number: "01",
            path: "/",
            title: "Home",
            description:
              "Hero section, primary actions, and core product highlights.",
          },
          {
            id: "features",
            number: "02",
            path: "/features",
            title: "Features",
            description:
              "Observability, branch previews, RBAC, and MDX documentation cards.",
          },
          {
            id: "pricing",
            number: "03",
            path: "/pricing",
            title: "Pricing",
            description:
              "Starter, Pro, and Enterprise tiers with clear feature breakdowns.",
          },
          {
            id: "changelog",
            number: "04",
            path: "/changelog",
            title: "Changelog",
            description:
              "Versioned release notes with dates and tagged updates.",
          },
          {
            id: "about",
            number: "05",
            path: "/about",
            title: "About",
            description:
              "Company story alongside key availability and latency metrics.",
          },
          {
            id: "contact",
            number: "06",
            path: "/contact",
            title: "Contact",
            description:
              "Inquiry form for enterprise plans and custom integrations.",
          },
          {
            id: "404",
            number: "07",
            path: "/404",
            title: "404",
            description:
              "Branded not-found screen with a quick return to the home route.",
          },
        ],
      }}
      pricingSection={{
        subtitle:
          "Both are one payment, with every update to this template included.",
        options: [
          {
            label: "This template",
            badge: "Single license",
            price: "$40",
            description: "The complete Kinetix SaaS template on its own, ready to customize and deploy.",
            features: [
              "Full Next.js 16 & React 19 source code",
              "All 8 pages in light & dark themes",
              "MDX blog, changelog & theme customizer",
              "Commercial license for unlimited projects",
              "Lifetime updates for this template",
            ],
            ctaLabel: "Buy for $40",
          },
          {
            label: "All Access",
            badge: "Best value",
            price: "$80",
            description:
              "This template, every template to come, and every Pro block and component.",
            features: [
              "Everything in This template",
              "Every future website template included",
              "All Pro UI components & marketing blocks",
              "Priority support & early-access drops",
              "Unlimited commercial & client projects",
            ],
            ctaLabel: "Get All Access",
            featured: true,
          },
        ],
      }}
      afterYouBuy={{
        subtitle:
          "You're taken to your downloads right after checkout. Come back any time with the email you bought with.",
        steps: [
          "Download the zip and unpack it.",
          "Install and start it (Node.js 20.9 or newer).",
          <span key="step-3">
            Put your product in{" "}
            <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              lib/site.ts
            </code>{" "}
            and the words in{" "}
            <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              content/
            </code>
            . The README walks through the rest.
          </span>,
        ],
        terminalCommand: "npm install\nnpm run dev",
      }}
    />
  );
}
