"use client";

import {
  DiscordIcon,
  MotionIcon,
  GitHubIcon,
  GsapIcon,
  LucideIcon,
  NextjsIcon,
  ReactIcon,
  SlackIcon,
  StripeIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "@/components/custom/blocks/Icons";
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";

// Two groups: seven front-end tools (three over four), then four services in one row of two by two.
const GROUPS = (
  [
    <TechStackGroup key="front-end">
      <TechStackTool name="React" icon={<ReactIcon />} />
      <TechStackTool name="Next.js" icon={<NextjsIcon fill="currentColor" />} />
      <TechStackTool name="TypeScript" icon={<TypeScriptIcon />} />
      <TechStackTool name="Tailwind CSS" icon={<TailwindIcon />} />
      <TechStackTool name="Motion" icon={<MotionIcon />} />
      <TechStackTool name="GSAP" icon={<GsapIcon />} />
      <TechStackTool name="Lucide" icon={<LucideIcon />} />
    </TechStackGroup>,
    <TechStackGroup key="services">
      <TechStackTool name="Stripe" icon={<StripeIcon />} />
      <TechStackTool name="GitHub" icon={<GitHubIcon />} />
      <TechStackTool name="Slack" icon={<SlackIcon />} />
      <TechStackTool name="Discord" icon={<DiscordIcon />} />
    </TechStackGroup>,
  ]
);

export default function TechStackDemo({
  variant = "labelled",
  interval = 3600,
  example = "default",
}: {
  /** Names beside the marks from `xl` up, or marks only between hairlines. */
  variant?: "labelled" | "compact";
  /** Milliseconds each group stays; 0 holds the first. */
  interval?: number;
  /** `default` rotates both groups; `single` is one group that holds still. */
  example?: "default" | "single";
}) {
  return (
    <div className="flex min-h-[260px] w-full items-center justify-center px-6">
      <TechStack
        key={variant}
        label="Built with"
        variant={variant}
        interval={interval}
        className={variant === "compact" ? "max-w-md" : "max-w-2xl"}
      >
        {example === "single" ? GROUPS[0] : GROUPS}
      </TechStack>
    </div>
  );
}
