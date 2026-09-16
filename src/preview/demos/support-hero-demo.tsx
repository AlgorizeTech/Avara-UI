"use client";

import { SupportHero } from "@/components/custom/blocks/SupportHeroBlock";
import { DiscordIcon, GoogleCalendarIcon, SlackIcon } from "@/components/custom/blocks/Icons";
import { cn } from "@/lib/utils";

// Portraits from Pexels (free to use).
const pexels = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const AVATARS = [2379004, 220453, 2381069, 1130626].map((id) => ({
  src: pexels(id, 120),
  alt: "",
}));

export default function SupportHeroDemo({
  reveal = "immediate",
  rounded = true,
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  rounded?: boolean;
}) {
  return (
    <SupportHero
      reveal={reveal}
      heading="AI-Driven Support To Boost Your Business Growth"
      subtitle="A platform that helps customer service leaders provide efficient, high-quality support at scale with an AI agent, improving speed and quality across all channels, 24/7."
      cta={{ label: "Book a demo", onClick: () => {} }}
      className={cn("max-w-6xl", rounded && "overflow-hidden rounded-[28px]")}
    >
      <SupportHero.Integrations
        icons={[<DiscordIcon key="d" />, <SlackIcon key="s" />, <GoogleCalendarIcon key="c" />]}
        title="Integrations"
        text="Way better at getting things done than human agents"
      />

      <SupportHero.Photo
        src={pexels(7709208)}
        alt="A support agent on a call at her laptop"
        label="Transcript"
        position="58% center"
        className="lg:row-span-2 lg:h-auto"
      />

      <SupportHero.Stat
        value={83}
        suffix="%"
        caption="Up to 83% of conversations autonomously resolved"
        image="https://images.unsplash.com/photo-1745674684463-62f62cb88d4c?q=80&w=1170&auto=format&fit=crop"
        imageAlt="A laptop on a desk showing an AI assistant asking what it can help with"
        imagePosition="70% center"
      />

      <SupportHero.Photo src={pexels(3184639)} alt="A team working through charts on a laptop" position="center 40%" />

      <SupportHero.Stat
        value={5.5}
        decimals={1}
        suffix="B"
        caption="More efficient than human representatives"
        image="https://images.unsplash.com/photo-1746883741141-04859907ef5f?q=80&w=1170&auto=format&fit=crop"
        imageAlt="A phone propped against a laptop, an AI chat open on its screen"
        imagePosition="65% center"
      />

      <SupportHero.Team
        title={
          <>
            Automated
            <br />
            Customer Service
            <br />
            Quality
          </>
        }
        avatars={AVATARS}
      />
    </SupportHero>
  );
}
