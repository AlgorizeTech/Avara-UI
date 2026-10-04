"use client";

import { BookAppointment } from "@/components/custom/blocks/BookAppointmentBlock";
import { type SurfaceVariant } from "@/components/custom/blocks/GlassPanelBlock";
import { cn } from "@/lib/utils";

const DOCTOR = {
  name: "Dr. Priya Nair, MD",
  shortName: "Dr. Nair",
  specialties: "Cardiology and general internal medicine",
  practice: "Riverside Heart & Medical Group",
  photo:
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_687,c_limit/v1790145142/photo-1638202993928-7267aad84c31-1790145143494.jpg",
  photoAlt: "Portrait of Dr. Priya Nair wearing a lab coat and stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Reviewers call Dr. Nair careful and approachable. Her heart-care knowledge and plain-spoken answers stand out; some note slow replies to phone messages.",
  location: "Brooklyn, NY, Riverside Heart & Medical Group",
  phone: "(718) 555-0142",
  email: "drnair@example.com",
  languages: "English, Hindi",
};

const SCORES = [
  { label: "Punctuality", value: 4.63 },
  { label: "Warmth and care", value: 4.19 },
  { label: "Explains things well", value: 4.74 },
];

const VISIT_REASONS = [
  { label: "Blood pressure care", value: 35 },
  { label: "Heart health check-ups", value: 25 },
  { label: "Heart failure follow-up", value: 22 },
  { label: "Chest pain workup", value: 18 },
];

const ACTIVITIES = [
  { label: "Clinic", value: 47 },
  { label: "Studies", value: 24 },
  { label: "Mentoring", value: 16 },
  { label: "Paperwork", value: 10 },
  { label: "Other", value: 3 },
];

const SLOT_GROUPS = [
  {
    label: "Morning",
    slots: [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }],
  },
  {
    label: "Afternoon",
    slots: [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }],
  },
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
    <BookAppointment
      variant={variant}
      practitioner={DOCTOR}
      scores={SCORES}
      visitReasons={VISIT_REASONS}
      activities={ACTIVITIES}
      slotGroups={SLOT_GROUPS}
      unavailable={(d) => d.getDay() === 0}
      onBook={() => new Promise((resolve) => setTimeout(resolve, 900))}
      className={cn("max-w-6xl", rounded && "rounded-[36px]")}
    />
  );
}
