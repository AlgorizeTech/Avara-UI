"use client";

import { BookAppointment } from "@/components/custom/blocks/BookAppointmentBlock";
import { type SurfaceVariant } from "@/components/custom/blocks/GlassPanelBlock";
import { cn } from "@/lib/utils";

const DOCTOR = {
  name: "Dr. Emily Chen, MD",
  shortName: "Dr. Chen",
  specialties: "Internal medicine, Cardiology",
  practice: "Manhattan Health Associates",
  photo:
    "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  photoAlt: "Dr. Emily Chen in a white coat with a stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Patients describe Dr. Chen as thorough and easy to talk to. They value her cardiology expertise and clear explanations; a few mention delays getting a callback.",
  location: "New York, NY, Manhattan Health Associates",
  phone: "(212) 555-7890",
  email: "drchen@example.com",
  languages: "English, Spanish",
};

const SCORES = [
  { label: "Wait time", value: 4.63 },
  { label: "Bedside manner", value: 4.19 },
  { label: "Clear explanations", value: 4.74 },
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
