"use client";

import {
  Accordion,
  type AccordionDataItem,
} from "@/components/custom/blocks/Accordion";

const sampleData: AccordionDataItem[] = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle",
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: [
      "We offer flexible pricing plans.",
      "Basic plan starts at $9/month.",
    ],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];

/** The three faces on the "Still stuck?" card in the section layout. */
const SUPPORT_TEAM = [
  { name: "Ana R.", src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg" },
  { name: "Tom M.", src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg" },
  { name: "Mara K.", src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg" },
];

/** Questions about the library itself, for the section layout. */
const libraryFaq: AccordionDataItem[] = [
  {
    value: "frameworks",
    title: "Does it work outside Next.js?",
    icon: "Code",
    content: [
      "Every block is plain React and Tailwind. The docs show a Next.js and a React (Vite) version of each snippet, and only the few components that use next/link or next/image need a one-line swap.",
    ],
  },
  {
    value: "theming",
    title: "Can I change the colors?",
    icon: "Palette",
    content: [
      "Everything reads the shadcn theme tokens (primary, card, muted, border), so one edit to globals.css restyles all of it.",
      "The color picker above this preview is doing exactly that.",
    ],
  },
  {
    value: "updates",
    title: "How do updates reach my project?",
    icon: "RefreshCw",
    content: [
      "The CLI copies the source into your repo, so nothing changes behind your back. Re-run the install command to pull a newer version, then review the diff like any other change.",
    ],
  },
  {
    value: "license",
    title: "How is it licensed?",
    icon: "Scale",
    content: [
      "MIT. Use it in client work, products and templates, with no attribution required.",
    ],
  },
];

type Variant = "default" | "bordered" | "filled" | "ghost" | "elevated";
type Animation = "none" | "stack";
type Interaction =
  | "single"
  | "single-mandatory"
  | "multiple"
  | "multiple-non-collapsible";

function FaqSection({ animation }: { animation: Animation }) {
  return (
    <section className="w-full rounded-3xl border border-border bg-background px-4 py-8 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 sm:gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <h2 className="max-w-md font-serif text-3xl leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Questions people ask before they install.
          </h2>
          <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
            Short answers on licensing, theming and where the components run.
            If yours isn&apos;t here, we read every message.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-2xl bg-muted/60 p-4 max-w-md">
            <div className="flex shrink-0 -space-x-2">
              {SUPPORT_TEAM.map((person) => (
                <img
                  key={person.name}
                  src={person.src}
                  alt={person.name}
                  className="size-9 shrink-0 rounded-full border-2 border-background object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Still stuck?</p>
              <a
                href="#"
                className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline break-words"
              >
                Email the team, we reply within a day
              </a>
            </div>
          </div>
        </div>

        <Accordion
          accordionData={libraryFaq}
          type="single"
          collapsible
          variant="default"
          animation={animation}
          defaultValue="theming"
        />
      </div>
    </section>
  );
}

export default function AccordionDemo({
  variant = "default",
  interaction = "single",
  animation = "none",
  layout = "list",
  expandIcon,
  showAll,
}: {
  variant?: Variant;
  interaction?: Interaction;
  /** "stack" deals the items out from a pile when the accordion comes into view. */
  animation?: Animation;
  /** "section" renders the accordion inside a two-column FAQ section. */
  layout?: "list" | "section";
  /** Lucide name from the block's ICON_MAP, e.g. "Plus". */
  expandIcon?: string;
  /** Render-all mode: one short accordion per visual variant. */
  showAll?: "variants";
}) {
  const accordionType = interaction.startsWith("multiple") ? "multiple" : "single";
  const isCollapsible =
    interaction !== "single-mandatory" && interaction !== "multiple-non-collapsible";

  if (layout === "section") {
    return (
      <div className="w-full p-2 sm:p-4">
        <FaqSection key={animation} animation={animation} />
      </div>
    );
  }

  if (showAll === "variants") {
    const variants: Variant[] = ["default", "bordered", "filled", "elevated", "ghost"];

    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 p-4 md:p-8">
        {variants.map((v) => (
          <div key={v} className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground">
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                variant=&quot;{v}&quot;
              </code>
            </p>
            <Accordion
              variant={v}
              type="single"
              collapsible
              defaultValue="pricing"
              accordionData={sampleData}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-4 md:p-8">
      <Accordion
        key={`${variant}-${interaction}-${animation}-${expandIcon ?? "default"}`}
        accordionData={sampleData}
        type={accordionType}
        collapsible={isCollapsible}
        variant={variant}
        animation={animation}
        expandIcon={expandIcon}
        defaultValue={
          accordionType === "single" ? "getting-started" : ["getting-started"]
        }
      />
    </div>
  );
}
