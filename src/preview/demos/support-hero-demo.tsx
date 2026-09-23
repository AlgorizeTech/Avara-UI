"use client";

import { SupportHero } from "@/components/custom/blocks/SupportHeroBlock";
import { DiscordIcon, GoogleCalendarIcon, SlackIcon } from "@/components/custom/blocks/Icons";
import { cn } from "@/lib/utils";

const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg", alt: "" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg", alt: "" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg", alt: "" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg", alt: "" },
];

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
        src={"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145139/pexels-photo-7709208-1790145143489.jpg"}
        alt="A support agent on a call at her laptop"
        label="Transcript"
        position="58% center"
        className="lg:row-span-2 lg:h-auto"
      />

      <SupportHero.Stat
        value={83}
        suffix="%"
        caption="Up to 83% of conversations autonomously resolved"
        image="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1170,c_limit/v1790159967/photo-1745674684463-62f62cb88d4c-1790159970117.jpg"
        imageAlt="A laptop on a desk showing an AI assistant asking what it can help with"
        imagePosition="70% center"
      />

      <SupportHero.Photo src={"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790159968/pexels-photo-3184639-1790159970118.jpg"} alt="A team working through charts on a laptop" position="center 40%" />

      <SupportHero.Stat
        value={5.5}
        decimals={1}
        suffix="B"
        caption="More efficient than human representatives"
        image="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1170,c_limit/v1790159967/photo-1746883741141-04859907ef5f-1790159970117.jpg"
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
