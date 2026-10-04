"use client";

import { Waitlist, type WaitlistVariant } from "@/components/custom/blocks/WaitlistBlock";
import { cn } from "@/lib/utils";

const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-3785079-1790158812209.jpg",
];

// Fake the sign-up: a short wait, then the reader's place in line.
const join = () => new Promise<number>((resolve) => setTimeout(() => resolve(2341), 900));

// Six weeks out, so the countdown always has days on it.
const OPENS = new Date(Date.now() + 42 * 24 * 60 * 60 * 1000);

export default function WaitlistDemo({
  variant = "card",
  reveal = "immediate",
  rounded = true,
}: {
  variant?: WaitlistVariant;
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  rounded?: boolean;
}) {
  if (variant === "launch") {
    return (
      <div className="flex w-full items-center justify-center px-4 py-10">
        <Waitlist variant="launch" reveal={reveal} className="w-full">
          <Waitlist.Mark>T</Waitlist.Mark>
          <Waitlist.Countdown date={OPENS} />
          <Waitlist.Heading>Be first in line for Tidewell</Waitlist.Heading>
          <Waitlist.Intro>
            Planning your week, minus the stress. Our first 1,000 sign-ups get access ahead of everyone, free of charge.
          </Waitlist.Intro>
          <Waitlist.Form onJoin={join} action="Get on the list" shareUrl="https://tidewell.app/?ref=k7x2q" />
          <Waitlist.Proof avatars={FACES}>4,120 people have signed up already</Waitlist.Proof>
        </Waitlist>
      </div>
    );
  }

  if (variant === "queue") {
    return (
      <Waitlist variant="queue" reveal={reveal} className={cn("mx-auto max-w-5xl", rounded && "rounded-[28px]")}>
        <Waitlist.Heading>Great products open to a few first. Be one of them.</Waitlist.Heading>
        <Waitlist.Intro>
          Tidewell lets people in a batch at a time, so everyone gets a real onboarding. Sign up today and your place is reserved.
        </Waitlist.Intro>
        <Waitlist.Form onJoin={join} action="Notify me" shareUrl="https://tidewell.app/?ref=k7x2q" />
        <Waitlist.Proof avatars={FACES}>10,000+ people waiting</Waitlist.Proof>
        <Waitlist.Spots claimed={1240} total={2000} />
      </Waitlist>
    );
  }

  return (
    <div className="flex w-full items-center justify-center px-4 py-12">
      <Waitlist variant="card" reveal={reveal} className="w-full">
        <Waitlist.Heading>Reserve your spot</Waitlist.Heading>
        <Waitlist.Intro>Hear the moment we launch. A single email, nothing more.</Waitlist.Intro>
        <Waitlist.Form onJoin={join} action="Save my spot" note="Signing up means we may email you about the launch." />
        <Waitlist.Proof avatars={FACES}>2,300 people already queued</Waitlist.Proof>
      </Waitlist>
    </div>
  );
}
