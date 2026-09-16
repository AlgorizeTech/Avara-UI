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
        src={pexels(1681010)}
        alt="A young man in a red jacket looking into the distance"
        label="Transcript"
        position="center 35%"
        className="lg:row-span-2 lg:h-auto"
      />

      <SupportHero.Stat value={83} suffix="%" caption="Up to 83% of conversations autonomously resolved" tone="lime" />

      <SupportHero.Photo
        src={pexels(3767392)}
        alt="A woman with headphones around her neck, smiling"
        position="center 30%"
      />

      <SupportHero.Stat value={5.5} decimals={1} suffix="B" caption="More efficient than human representatives" />

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
