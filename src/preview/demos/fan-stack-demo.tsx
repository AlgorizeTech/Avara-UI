"use client";

import {
  FanStack,
  FanStackCard,
  FanStackDescription,
  FanStackPoint,
  FanStackPoints,
  FanStackStep,
  FanStackThumb,
  FanStackTitle,
} from "@/components/custom/blocks/FanStackBlock";
import { useRef } from "react";

const steps = [
  {
    id: "criteria",
    step: "01",
    name: "Criteria",
    body: "What a qualified candidate looks like for this role: the must-haves, the deal-breakers, and the details your client actually cares about.",
    points: [
      "Yes-or-no must-have questions",
      "A question set for each role",
      "Trigger questions decide who gets interviewed",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1768055105012-4c53791b2877?q=80&w=800&auto=format&fit=crop",
      alt: "A hand ticking off items on a handwritten checklist",
    },
  },
  {
    id: "screening",
    step: "02",
    name: "Screening",
    body: "Every applicant uploads a CV and answers the same yes-or-no questions. Anyone who misses a must-have stops here, with a polite reply.",
    points: [
      "The same questions for every applicant",
      "CVs collected up front",
      "A polite reply when a must-have is missed",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1698047681432-006d2449c631?q=80&w=800&auto=format&fit=crop",
      alt: "A recruiter reading a candidate's CV",
    },
  },
  {
    id: "interview",
    step: "03",
    name: "Interview",
    body: "Qualified candidates go straight into a structured interview, at any hour. You get the recording and every answer.",
    points: ["Starts right after screening", "Any device, any hour", "Recorded for your review"],
    photo: {
      src: "https://images.unsplash.com/photo-1758691463620-188ca7c1a04f?q=80&w=800&auto=format&fit=crop",
      alt: "A video call on a laptop screen",
    },
  },
];

export default function HiringFlowStack() {
  // The stack scrolls inside this box. On a full page, drop the box and
  // `scrollerRef` and the window drives it.
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollerRef} className="h-[680px] w-full overflow-y-auto overflow-x-hidden bg-background">
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Criteria. Screening. Interview.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Requirements, a fair screen for every applicant and a real first interview, joined
            into one flow. Scroll to deal the steps into place.
          </p>
        </header>

        <FanStack scrollerRef={scrollerRef} className="mt-12">
          {steps.map((step) => (
            <FanStackCard key={step.id}>
              <FanStackTitle>
                <FanStackStep>{step.step}</FanStackStep> {step.name}
              </FanStackTitle>
              <FanStackDescription>{step.body}</FanStackDescription>
              <FanStackPoints>
                {step.points.map((point) => (
                  <FanStackPoint key={point}>{point}</FanStackPoint>
                ))}
              </FanStackPoints>
              <FanStackThumb>
                <img src={step.photo.src} alt={step.photo.alt} width={800} height={618} loading="lazy" />
              </FanStackThumb>
            </FanStackCard>
          ))}
        </FanStack>

        <p className="mx-auto mt-10 max-w-xl text-center text-[1.0625rem] text-muted-foreground">
          One first round instead of three handoffs.
        </p>
      </section>
    </div>
  );
}
