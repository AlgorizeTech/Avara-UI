"use client";

import { BookingCard } from "@/components/custom/blocks/BookingCardBlock";
import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";
import { cn } from "@/lib/utils";

const MORNING = [
  { label: "9:00 AM" },
  { label: "10:00 AM" },
  { label: "11:00 AM", taken: true },
];
const AFTERNOON = [
  { label: "12:00 PM" },
  { label: "1:00 PM" },
  { label: "2:00 PM" },
  { label: "3:00 PM", taken: true },
];

function Card({ heading = "Book an appointment", className }: { heading?: string; className?: string }) {
  return (
    <BookingCard
      className={cn("flex h-full flex-col gap-5 p-6", className)}
      onBook={() => new Promise((resolve) => setTimeout(resolve, 900))}
    >
      <h2 className="text-lg font-semibold tracking-tight">{heading}</h2>
      <BookingCard.Days unavailable={(d) => d.getDay() === 0} />
      <div className="space-y-4">
        <p className="text-sm font-semibold">Time</p>
        <BookingCard.Slots label="Morning" slots={MORNING} />
        <BookingCard.Slots label="Afternoon" slots={AFTERNOON} />
      </div>
      <BookingCard.Submit className="mt-auto" />
      <BookingCard.Confirmation withName="Dr. Nair" place="Riverside Heart & Medical Group" />
    </BookingCard>
  );
}

export default function BookingCardDemo({
  surface = "card",
}: {
  /** The panel the card sits in: a plain bordered card, a glass slab, or liquid-glass refraction. */
  surface?: "card" | "glass" | "liquid-glass";
}) {
  if (surface === "liquid-glass") {
    return (
      <GlassBackdrop variant="liquid-glass" className="w-full max-w-full h-auto min-h-0 lg:h-full lg:min-h-[560px] rounded-[var(--radius-3xl,2rem)]">
        <Card className="col-span-full" />
      </GlassBackdrop>
    );
  }

  if (surface === "glass") {
    return (
      <GlassBackdrop className="w-full max-w-md rounded-[var(--radius-3xl,2rem)]">
        <GlassPanel shape="slab" className="col-span-full">
          <Card />
        </GlassPanel>
      </GlassBackdrop>
    );
  }

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-3xl border border-border bg-card text-card-foreground shadow-sm",
      )}
    >
      <Card />
    </div>
  );
}
