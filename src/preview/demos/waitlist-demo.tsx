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
          <Waitlist.Mark>M</Waitlist.Mark>
          <Waitlist.Countdown date={OPENS} />
          <Waitlist.Heading>Get early access to Meridian</Waitlist.Heading>
          <Waitlist.Intro>
            A calmer way to plan the week. The first thousand people on the list get in before anyone else, at no cost.
          </Waitlist.Intro>
          <Waitlist.Form onJoin={join} action="Join the waitlist" shareUrl="https://meridian.app/?ref=k7x2q" />
          <Waitlist.Proof avatars={FACES}>Joined by 4,120 people so far</Waitlist.Proof>
        </Waitlist>
      </div>
    );
  }

  if (variant === "queue") {
    return (
      <Waitlist variant="queue" reveal={reveal} className={cn("mx-auto max-w-5xl", rounded && "rounded-[28px]")}>
        <Waitlist.Heading>Every launch starts with a list. Get on this one.</Waitlist.Heading>
        <Waitlist.Intro>
          Meridian opens in small groups so every new person gets a proper welcome. Join now and we'll hold your place.
        </Waitlist.Intro>
        <Waitlist.Form onJoin={join} action="Get notified" shareUrl="https://meridian.app/?ref=k7x2q" />
        <Waitlist.Proof avatars={FACES}>10,000+ already in line</Waitlist.Proof>
        <Waitlist.Spots claimed={1240} total={2000} />
      </Waitlist>
    );
  }

  return (
    <div className="flex w-full items-center justify-center px-4 py-12">
      <Waitlist variant="card" reveal={reveal} className="w-full">
        <Waitlist.Heading>Join the waitlist</Waitlist.Heading>
        <Waitlist.Intro>Be the first to know when we open. One email, no noise.</Waitlist.Intro>
        <Waitlist.Form onJoin={join} action="Join waitlist" note="By joining you agree to hear from us about the launch." />
        <Waitlist.Proof avatars={FACES}>2,300 people ahead of you</Waitlist.Proof>
      </Waitlist>
    </div>
  );
}
