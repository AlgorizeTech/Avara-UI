"use client";

import {
  TimelineBlock,
  TimelineItemType,
  TimelineLayout,
  TimelineVariant,
} from "@/components/custom/blocks/TimelineBlock";
import { CheckCircle2, Download, MapPin, Package, Truck } from "lucide-react";

const sampleData: TimelineItemType[] = [
  {
    id: "1",
    title: "Order Placed",
    date: "Oct 12, 10:24 AM",
    description: "We have received your order #ORD-4021.",
    icon: Package,
    status: "completed",
    action: (
      <button className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
        <Download className="w-3 h-3" />
        Receipt
      </button>
    ),
  },
  {
    id: "2",
    title: "Payment Processed",
    date: "Oct 12, 10:25 AM",
    description: "Payment successful via Credit Card.",
    icon: CheckCircle2,
    status: "completed",
  },
  {
    id: "3",
    title: "Out for Delivery",
    date: "Oct 14, 08:30 AM",
    description: "Your package is on the way.",
    icon: Truck,
    status: "current",
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium opacity-80">
          Driver is currently 4 stops away. Estimated arrival between 1:00 PM
          and 3:00 PM.
        </p>
        <div className="p-3 rounded-lg border border-dashed border-current opacity-60 text-xs font-mono">
          Tracking: FX-992184-US
          <br />
          Carrier: FedEx Express
        </div>
      </div>
    ),
  },
  {
    id: "4",
    title: "Delivered",
    date: "Pending",
    description: "Package will be left at front porch.",
    icon: MapPin,
    status: "upcoming",
  },
];

export default function TimelineDemo({
  variant = "default",
  layout = "center",
  color = "primary",
  animate = true,
}: {
  variant?: TimelineVariant;
  layout?: TimelineLayout;
  color?: string;
  animate?: boolean;
}) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" : "bg-white dark:bg-[#050505]"} p-6 sm:p-12 relative z-10 overflow-hidden`}
    >
      <div className="w-full max-w-2xl mx-auto">
        <TimelineBlock
          key={`${variant}-${layout}-${color}-${animate}`} // Force re-mount to show entry animation repeatedly
          items={sampleData}
          variant={variant}
          layout={layout}
          color={color}
          animate={animate}
        />
      </div>
    </div>
  );
}
