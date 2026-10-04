"use client";

import { Check, Minus } from "lucide-react";
import {
  Table,
  TableBadge,
  TableBody,
  TableCell,
  TableContent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/blocks/TableBlock";

const PLANS = ["Free", "Pro", "Team"] as const;
type Plan = (typeof PLANS)[number];

// `true` is included, `false` is not, a string is the limit.
type Value = boolean | string;

const FEATURES: { feature: string; values: Record<Plan, Value> }[] = [
  { feature: "Projects", values: { Free: "3", Pro: "Unlimited", Team: "Unlimited" } },
  { feature: "Team members", values: { Free: "1", Pro: "5", Team: "Unlimited" } },
  { feature: "Storage", values: { Free: "2 GB", Pro: "100 GB", Team: "1 TB" } },
  { feature: "Custom domains", values: { Free: false, Pro: true, Team: true } },
  { feature: "Analytics", values: { Free: "Basic", Pro: "Advanced", Team: "Advanced" } },
  { feature: "Version history", values: { Free: "7 days", Pro: "90 days", Team: "Forever" } },
  { feature: "Single sign-on", values: { Free: false, Pro: false, Team: true } },
  { feature: "Priority support", values: { Free: false, Pro: true, Team: true } },
];

function PlanValue({ value }: { value: Value }) {
  if (value === true) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex size-6 items-center justify-center text-muted-foreground/60">
        <Minus className="size-3.5" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="text-foreground">{value}</span>;
}

export default function PlanComparison() {
  return (
    <Table variant="soft">
      <TableContent aria-label="Compare plans">
        <TableHeader>
          <TableRow isHeader>
            <TableHead className="min-w-44">Feature</TableHead>
            {PLANS.map((plan) => (
              <TableHead key={plan} align="center" className="min-w-28">
                <span className="inline-flex items-center gap-2">
                  {plan}
                  {plan === "Pro" && (
                    <TableBadge tone="info" dot={false} className="h-5 px-2 text-[10px] normal-case tracking-normal">
                      Popular
                    </TableBadge>
                  )}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {FEATURES.map(({ feature, values }) => (
            <TableRow key={feature}>
              <TableCell className="font-medium">{feature}</TableCell>
              {PLANS.map((plan) => (
                <TableCell key={plan} align="center">
                  <PlanValue value={values[plan]} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableContent>
    </Table>
  );
}
