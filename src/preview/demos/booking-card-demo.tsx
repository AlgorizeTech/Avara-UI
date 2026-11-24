"use client";

import { BookingCard } from "@/components/custom/blocks/BookingCardBlock";
import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";
import { cn } from "@/lib/utils";

const SLOTS = [
  { label: "09:00" },
  { label: "10:00" },
  { label: "11:00", taken: true },
  { label: "13:00" },
  { label: "14:00" },
  { label: "15:00" },
  { label: "16:00", taken: true },
  { label: "18:00" },
  { label: "19:00" },
];

function Card({ className }: { className?: string }) {
  return (
    <BookingCard
      className={cn("p-6 sm:p-7", className)}
      onBook={() => new Promise((resolve) => setTimeout(resolve, 900))}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Book Appointment</h2>
        <BookingCard.Month />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Choose a day and time that works for you.
      </p>
      <BookingCard.Days className="-mx-1 mt-5" unavailable={(d) => d.getDay() === 0} />
      <BookingCard.Times slots={SLOTS} />
      <BookingCard.Submit className="mt-6">Book appointment</BookingCard.Submit>
      <BookingCard.Confirmation
        title="Appointment confirmed"
        description="Your appointment is booked, and a confirmation is on its way to your inbox. Please arrive 10 minutes early."
      />
    </BookingCard>
  );
}

export default function BookingCardDemo({
  surface = "card",
}: {
  /** The panel the card sits in: a plain card, a glass slab, or liquid-glass refraction. */
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
    <div className="w-full max-w-md rounded-[2rem] bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_56px_-20px_rgba(0,0,0,0.42)]">
      <Card />
    </div>
  );
}
