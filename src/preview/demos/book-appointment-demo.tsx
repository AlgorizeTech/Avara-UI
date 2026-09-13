"use client";

import { useState } from "react";
import { Booker, StarRating } from "@/components/custom/blocks/BookAppointmentBlock";
import { GlassPanel, ProfilePage, type SurfaceVariant } from "@/components/custom/blocks/ProfilePageBlock";
import { cn } from "@/lib/utils";
import { Languages, Mail, MapPin, Phone } from "lucide-react";

const DOCTOR = {
  name: "Dr. Emily Chen, MD",
  specialties: "Internal medicine, Cardiology",
  practice: "Manhattan Health Associates",
  photo:
    "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  photoAlt: "Dr. Emily Chen in a white coat with a stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Patients describe Dr. Chen as thorough and easy to talk to. They value her cardiology expertise and clear explanations; a few mention delays getting a callback.",
};

const SCORES = [
  { label: "Wait time", value: 4.63 },
  { label: "Bedside manner", value: 4.19 },
  { label: "Clear explanations", value: 4.74 },
];

// Categorical hues in a fixed order; gray is reserved for "Other".
const STROKE = [
  "stroke-violet-600 dark:stroke-violet-500",
  "stroke-teal-600",
  "stroke-amber-600",
  "stroke-rose-600",
];
const SWATCH = [
  "bg-violet-600 dark:bg-violet-500",
  "bg-teal-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-zinc-400 dark:bg-zinc-500",
];

const VISIT_REASONS = [
  { label: "Hypertension management", value: 35 },
  { label: "Preventive cardiology", value: 25 },
  { label: "Heart failure monitoring", value: 22 },
  { label: "Chest pain evaluation", value: 18 },
];

const ACTIVITIES = [
  { label: "Clinical", value: 47 },
  { label: "Research", value: 24 },
  { label: "Teaching", value: 16 },
  { label: "Admin", value: 10 },
  { label: "Other", value: 3 },
];

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

export default function BookAppointmentDemo({
  rounded = true,
  variant = "glass",
}: {
  /** Round the page corners — off when it fills the viewport. */
  rounded?: boolean;
  variant?: SurfaceVariant;
}) {
  return (
    <ProfilePage
      variant={variant}
      aurora={["#c4b5fd", "#99f6e4", "#fde68a"]}
      className={cn("max-w-6xl", rounded && "rounded-[36px]")}
    >
      {/* Portrait and contact */}
      <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-3">
        <GlassPanel shape="slab" className="overflow-hidden">
          <img
            src={DOCTOR.photo}
            alt={DOCTOR.photoAlt}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover object-top"
          />
        </GlassPanel>

        <GlassPanel className="p-5">
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-black/50 dark:text-white/50" />
              <span>New York, NY, {DOCTOR.practice}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-black/50 dark:text-white/50" />
              <a href="tel:+12125557890" className="hover:underline">(212) 555-7890</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-black/50 dark:text-white/50" />
              <a href="mailto:drchen@example.com" className="hover:underline">drchen@example.com</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Languages className="size-4 shrink-0 text-black/50 dark:text-white/50" />
              <span>English, Spanish</span>
            </li>
          </ul>
        </GlassPanel>
      </div>

      {/* Name, scores, charts */}
      <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-5">
        <GlassPanel shape="slab" className="flex flex-col gap-5 p-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{DOCTOR.name}</h1>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">{DOCTOR.specialties}</p>
          </div>

          <div className="flex gap-4">
            {/* The score is the one loud element on the page */}
            <div className="grid size-24 shrink-0 place-items-center rounded-[30%] bg-violet-600 text-white dark:bg-violet-500">
              <div className="text-center">
                <p className="text-3xl font-semibold leading-none tabular-nums">{DOCTOR.rating}</p>
                <p className="mt-1 text-[11px] opacity-80">{DOCTOR.reviews} reviews</p>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-black/50 dark:text-white/50">Patients say</p>
              <p className="mt-1 text-sm leading-relaxed text-black/70 dark:text-white/70">{DOCTOR.summary}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {SCORES.map((s) => (
              <div key={s.label}>
                <p className="text-xs text-black/50 dark:text-white/50">{s.label}</p>
                <StarRating className="mt-1" label={s.label} value={s.value} />
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h2 className="text-sm font-semibold">Top visit reasons</h2>
          <VisitReasons />
        </GlassPanel>

        <GlassPanel className="p-6">
          <h2 className="text-sm font-semibold">Where her week goes</h2>
          <ActivityBar />
        </GlassPanel>
      </div>

      {/* Booking */}
      <GlassPanel shape="slab" className="flex flex-col self-start p-6 md:col-span-6 lg:col-span-4">
        <h2 className="text-lg font-semibold tracking-tight">Book an appointment</h2>
        <Booker
          className="mt-5 flex flex-1 flex-col gap-6"
          onBook={() => new Promise((resolve) => setTimeout(resolve, 900))}
        >
          <Booker.Days unavailable={(d) => d.getDay() === 0} />
          <div className="space-y-4">
            <p className="text-sm font-semibold">Time</p>
            <Booker.Slots label="Morning" slots={MORNING} />
            <Booker.Slots label="Afternoon" slots={AFTERNOON} />
          </div>
          <Booker.Submit className="mt-auto" />
          <Booker.Confirmation withName="Dr. Chen" place={DOCTOR.practice} />
        </Booker>
      </GlassPanel>

    </ProfilePage>
  );
}

/* Donut: four reasons, hover a segment (or its legend row) to read it. */
function VisitReasons() {
  const [active, setActive] = useState<number | null>(null);
  const total = VISIT_REASONS.reduce((sum, r) => sum + r.value, 0); // 100, but never assume
  const R = 38;
  const C = 2 * Math.PI * R;
  const GAP = 2; // surface gap between segments, in viewBox units
  let offset = 0;

  return (
    <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
      <div className="relative size-36 shrink-0">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" role="img" aria-label="Visit reasons, share of visits">
          {VISIT_REASONS.map((r, i) => {
            const length = (C * r.value) / total;
            const el = (
              <circle
                key={r.label}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                strokeWidth={active === i ? 16 : 14}
                strokeDasharray={`${Math.max(0, length - GAP)} ${C}`}
                strokeDashoffset={-offset}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  "cursor-pointer transition-[stroke-width,opacity] duration-200",
                  STROKE[i],
                  active !== null && active !== i && "opacity-40",
                )}
              />
            );
            offset += length;
            return el;
          })}
        </svg>
        {/* Centre reads the hovered segment; at rest, the largest one */}
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-xl font-semibold tabular-nums">{VISIT_REASONS[active ?? 0].value}%</p>
            <p className="text-[10px] text-black/50 dark:text-white/50">{active === null ? "top reason" : "of visits"}</p>
          </div>
        </div>
      </div>
      <ul className="min-w-0 flex-1 space-y-2 text-sm">
        {VISIT_REASONS.map((r, i) => (
          <li
            key={r.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={cn("flex items-start gap-2.5 transition-opacity", active !== null && active !== i && "opacity-50")}
          >
            <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-full", SWATCH[i])} />
            <span className="min-w-0 flex-1 leading-snug">{r.label}</span>
            <span className="tabular-nums font-medium">{r.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* One stacked bar, 2px gaps between segments, legend below. */
function ActivityBar() {
  return (
    <div className="mt-4">
      <div className="flex h-8 gap-0.5 overflow-hidden rounded-lg" role="img" aria-label="Share of the week by activity">
        {ACTIVITIES.map((a, i) => (
          <div
            key={a.label}
            style={{ width: `${a.value}%` }}
            title={`${a.label} ${a.value}%`}
            className={cn("h-full first:rounded-l-lg last:rounded-r-lg", SWATCH[i])}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
        {ACTIVITIES.map((a, i) => (
          <li key={a.label} className="flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", SWATCH[i])} />
            <span className="text-black/70 dark:text-white/70">{a.label}</span>
            <span className="tabular-nums font-medium">{a.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
