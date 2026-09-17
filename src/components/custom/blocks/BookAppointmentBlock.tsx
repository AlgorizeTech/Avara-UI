"use client";

import { BookingCard, type Booking, type BookingSlot } from "@/components/custom/blocks/BookingCardBlock";
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";
import { GlassBackdrop, GlassPanel, type SurfaceVariant } from "@/components/custom/blocks/GlassPanelBlock";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { Languages, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

// ==========================================
// BOOK APPOINTMENT — a practitioner's page that ends in a booking
// ==========================================
// Composed entirely from library pieces: `GlassBackdrop` + `GlassPanel` for
// the surface, `HalfStars` for the scores, `ChartBlock` for the donut and the
// stacked bar, and `BookingCard` for the booking itself.

export interface Practitioner {
  /** Full name as shown in the heading, e.g. "Dr. Emily Chen, MD". */
  name: string;
  /** How the confirmation refers to them, e.g. "Dr. Chen". Falls back to `name`. */
  shortName?: string;
  /** One line under the name, e.g. "Internal medicine, Cardiology". */
  specialties: string;
  practice: string;
  photo: string;
  photoAlt?: string;
  /** Overall score out of 5 — the one loud number on the page. */
  rating: number;
  reviews: number;
  /** A short read of what patients say. */
  summary: string;
  location?: string;
  phone?: string;
  email?: string;
  languages?: string;
}

/** A named score out of 5, e.g. "Wait time". */
export interface PractitionerScore {
  label: string;
  value: number;
}

/** A labelled share of a whole, in percent. */
export interface Share {
  label: string;
  value: number;
}

/** A group of times, e.g. "Morning". */
export interface SlotGroup {
  label: string;
  slots: BookingSlot[];
}

export interface BookAppointmentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  practitioner: Practitioner;
  /** Named scores shown as stars under the summary. */
  scores?: PractitionerScore[];
  /** Fills the donut. Omit to leave that panel out. */
  visitReasons?: Share[];
  /** Fills the stacked bar. Omit to leave that panel out. */
  activities?: Share[];
  /** Time slots on offer, grouped. */
  slotGroups: SlotGroup[];
  /** Days with nothing free — struck through in the day strip. */
  unavailable?: (day: Date) => boolean;
  /**
   * Called when the person confirms. Return a promise to keep the button busy
   * until the booking is really made; a rejection returns to the form.
   */
  onBook?: (booking: Booking) => void | Promise<void>;
  /** Heading over the booking panel. */
  bookingHeading?: string;
  /** Frosted glass over an aurora, or solid cards with a shadow. */
  variant?: SurfaceVariant;
  /** The three aurora colours behind the glass. Ignored by `solid`. */
  aurora?: [string, string, string];
}

export function BookAppointment({
  practitioner,
  scores = [],
  visitReasons,
  activities,
  slotGroups,
  unavailable,
  onBook,
  bookingHeading = "Book an appointment",
  variant = "glass",
  aurora = ["#c4b5fd", "#99f6e4", "#fde68a"],
  className,
  ...props
}: BookAppointmentProps) {
  const contact = [
    { Icon: MapPin, value: practitioner.location, href: undefined },
    { Icon: Phone, value: practitioner.phone, href: practitioner.phone ? `tel:${practitioner.phone.replace(/[^\d+]/g, "")}` : undefined },
    { Icon: Mail, value: practitioner.email, href: practitioner.email ? `mailto:${practitioner.email}` : undefined },
    { Icon: Languages, value: practitioner.languages, href: undefined },
  ].filter((row) => row.value);

  return (
    <GlassBackdrop variant={variant} aurora={aurora} className={className} {...props}>
      {/* Portrait and contact */}
      <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-3">
        <GlassPanel shape="slab" className="overflow-hidden">
          <img
            src={practitioner.photo}
            alt={practitioner.photoAlt ?? practitioner.name}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover object-top"
          />
        </GlassPanel>

        {contact.length > 0 && (
          <GlassPanel className="p-5">
            <ul className="space-y-2.5 text-sm">
              {contact.map(({ Icon, value, href }) => (
                <li key={value} className="flex items-center gap-2.5">
                  <Icon className="size-4 shrink-0 text-black/50 dark:text-white/50" aria-hidden />
                  {href ? (
                    <a href={href} className="hover:underline">{value}</a>
                  ) : (
                    <span>{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </GlassPanel>
        )}
      </div>

      {/* Name, scores, charts */}
      <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-5">
        <GlassPanel shape="slab" className="flex flex-col gap-5 p-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{practitioner.name}</h1>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">{practitioner.specialties}</p>
          </div>

          <div className="flex gap-4">
            {/* The score is the one loud element on the page */}
            <div className="grid size-24 shrink-0 place-items-center rounded-[30%] bg-primary text-primary-foreground">
              <div className="text-center">
                <p className="text-3xl font-semibold leading-none tabular-nums">{practitioner.rating}</p>
                <p className="mt-1 text-[11px] opacity-80">{practitioner.reviews} reviews</p>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-black/50 dark:text-white/50">Patients say</p>
              <p className="mt-1 text-sm leading-relaxed text-black/70 dark:text-white/70">{practitioner.summary}</p>
            </div>
          </div>

          {scores.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {scores.map((s) => (
                <div key={s.label} className="shrink-0">
                  <p className="text-xs text-black/50 dark:text-white/50">{s.label}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <HalfStars
                      rating={s.value}
                      size={14}
                      showText={false}
                      activeColor="text-amber-500"
                      inactiveColor="text-black/15 dark:text-white/20"
                      role="img"
                      aria-label={`${s.label}: ${s.value.toFixed(2)} out of 5`}
                    />
                    <span className="text-sm font-semibold tabular-nums">{s.value.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassPanel>

        {visitReasons && visitReasons.length > 0 && (
          <GlassPanel className="p-6">
            <h2 className="text-sm font-semibold">Top visit reasons</h2>
            <ChartBlock
              type="donut-legend"
              data={visitReasons}
              valueSuffix="%"
              centerLabel="top reason"
              hoverLabel="of visits"
              className="mt-4"
            />
          </GlassPanel>
        )}

        {activities && activities.length > 0 && (
          <GlassPanel className="p-6">
            <h2 className="text-sm font-semibold">Where the week goes</h2>
            <ChartBlock type="stacked-bar" data={activities} valueSuffix="%" className="mt-4" />
          </GlassPanel>
        )}
      </div>

      {/* Booking */}
      {/* The BookingCard is the panel's whole inside, so its confirmation covers
          the panel edge to edge instead of stopping at the padding. */}
      <GlassPanel shape="slab" className="self-start md:col-span-6 lg:col-span-4">
        <BookingCard className="flex h-full flex-col gap-5 p-6" {...(onBook ? { onBook } : {})}>
          <h2 className="text-lg font-semibold tracking-tight">{bookingHeading}</h2>
          <BookingCard.Days {...(unavailable ? { unavailable } : {})} />
          <div className="space-y-4">
            <p className="text-sm font-semibold">Time</p>
            {slotGroups.map((group) => (
              <BookingCard.Slots key={group.label} label={group.label} slots={group.slots} />
            ))}
          </div>
          <BookingCard.Submit className="mt-auto" />
          <BookingCard.Confirmation
            withName={practitioner.shortName ?? practitioner.name}
            place={practitioner.practice}
          />
        </BookingCard>
      </GlassPanel>
    </GlassBackdrop>
  );
}

export default BookAppointment;
