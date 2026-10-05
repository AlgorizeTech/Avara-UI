"use client";

import {
  ChartBlock,
  ChartColor,
  ChartType,
  type MetricTabItem,
} from "@/components/custom/blocks/ChartBlock";
import { Mail, PenLine, UserPlus, Wallet } from "lucide-react";

// Sample Financial Data
const sampleData = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 1500 },
  { label: "Apr", value: 2400 },
  { label: "May", value: 2100 },
  { label: "Jun", value: 3200 },
  { label: "Jul", value: 2800 },
  { label: "Aug", value: 3800 },
  { label: "Sep", value: 3400 },
  { label: "Oct", value: 4200 },
  { label: "Nov", value: 3900 },
  { label: "Dec", value: 4800 },
];

// Shares of a whole, for the two legend charts.
const visitReasons = [
  { label: "Hypertension management", value: 35 },
  { label: "Preventive cardiology", value: 25 },
  { label: "Heart failure monitoring", value: 22 },
  { label: "Chest pain evaluation", value: 18 },
];

const weekActivities = [
  { label: "Clinical", value: 47 },
  { label: "Research", value: 24 },
  { label: "Teaching", value: 16 },
  { label: "Admin", value: 10 },
  { label: "Other", value: 3 },
];

// Traffic sources and Country visitors breakdown samples
const trafficSourcesData = [
  { label: "Direct", value: 3420 },
  { label: "Google Search", value: 2180 },
  { label: "GitHub", value: 1450 },
  { label: "Twitter / X", value: 890 },
  { label: "LinkedIn", value: 430 },
];

const countryVisitorsData = [
  { label: "United States", value: 4250, code: "US" },
  { label: "Germany", value: 1820, code: "DE" },
  { label: "United Kingdom", value: 1340, code: "GB" },
  { label: "India", value: 980, code: "IN" },
  { label: "Canada", value: 650, code: "CA" },
  { label: "France", value: 420, code: "FR" },
];

const overviewMetricsData: MetricTabItem[] = [
  {
    id: "users",
    label: "New users",
    icon: <UserPlus className="size-4" />,
    change: 9.1,
    points: [
      { label: "Jan", shortLabel: "J", fullLabel: "January", value: 850 },
      { label: "Feb", shortLabel: "F", fullLabel: "February", value: 940 },
      { label: "Mar", shortLabel: "M", fullLabel: "March", value: 1050 },
      { label: "Apr", shortLabel: "A", fullLabel: "April", value: 1000 },
      { label: "May", shortLabel: "M", fullLabel: "May", value: 1120 },
      { label: "Jun", shortLabel: "J", fullLabel: "June", value: 1200 },
      { label: "Jul", shortLabel: "J", fullLabel: "July", value: 1180 },
      { label: "Aug", shortLabel: "A", fullLabel: "August", value: 1280 },
      { label: "Sep", shortLabel: "S", fullLabel: "September", value: 1094 },
    ],
  },
  {
    id: "posts",
    label: "Posts",
    icon: <PenLine className="size-4" />,
    change: 5.6,
    points: [
      { label: "Jan", shortLabel: "J", fullLabel: "January", value: 110 },
      { label: "Feb", shortLabel: "F", fullLabel: "February", value: 125 },
      { label: "Mar", shortLabel: "M", fullLabel: "March", value: 130 },
      { label: "Apr", shortLabel: "A", fullLabel: "April", value: 120 },
      { label: "May", shortLabel: "M", fullLabel: "May", value: 140 },
      { label: "Jun", shortLabel: "J", fullLabel: "June", value: 150 },
      { label: "Jul", shortLabel: "J", fullLabel: "July", value: 145 },
      { label: "Aug", shortLabel: "A", fullLabel: "August", value: 160 },
      { label: "Sep", shortLabel: "S", fullLabel: "September", value: 149 },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail className="size-4" />,
    change: 4.4,
    points: [
      { label: "Jan", shortLabel: "J", fullLabel: "January", value: 420 },
      { label: "Feb", shortLabel: "F", fullLabel: "February", value: 460 },
      { label: "Mar", shortLabel: "M", fullLabel: "March", value: 490 },
      { label: "Apr", shortLabel: "A", fullLabel: "April", value: 470 },
      { label: "May", shortLabel: "M", fullLabel: "May", value: 520 },
      { label: "Jun", shortLabel: "J", fullLabel: "June", value: 580 },
      { label: "Jul", shortLabel: "J", fullLabel: "July", value: 550 },
      { label: "Aug", shortLabel: "A", fullLabel: "August", value: 610 },
      { label: "Sep", shortLabel: "S", fullLabel: "September", value: 571 },
    ],
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: <Wallet className="size-4" />,
    currency: "USD",
    change: 7.7,
    points: [
      { label: "Jan", shortLabel: "J", fullLabel: "January", value: 52000 },
      { label: "Feb", shortLabel: "F", fullLabel: "February", value: 58000 },
      { label: "Mar", shortLabel: "M", fullLabel: "March", value: 64000 },
      { label: "Apr", shortLabel: "A", fullLabel: "April", value: 61000 },
      { label: "May", shortLabel: "M", fullLabel: "May", value: 69000 },
      { label: "Jun", shortLabel: "J", fullLabel: "June", value: 74000 },
      { label: "Jul", shortLabel: "J", fullLabel: "July", value: 71000 },
      { label: "Aug", shortLabel: "A", fullLabel: "August", value: 82000 },
      { label: "Sep", shortLabel: "S", fullLabel: "September", value: 77400 },
    ],
  },
];

export default function ChartDemo({
  type = "bar",
  color = "primary",
  showGrid = true,
  showArea = true,
}: {
  type?: ChartType;
  color?: ChartColor | string;
  showGrid?: boolean;
  showArea?: boolean;
}) {
  if (type === "metrics-overview") {
    return (
      <div className="w-full flex items-center justify-center min-h-[460px] px-2 sm:px-4 relative z-10">
        <div className="w-full max-w-4xl">
          <ChartBlock
            key={`${type}-${color}`}
            type="metrics-overview"
            metrics={overviewMetricsData}
            title="This year by month"
            caption="vs last month"
          />
        </div>
      </div>
    );
  }

  if (type === "traffic-sources") {
    return (
      <div className="w-full flex items-center justify-center min-h-[420px] px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl">
          <ChartBlock
            key={`${type}-${color}`}
            type="traffic-sources"
            data={trafficSourcesData}
            signUps={412}
            title="Traffic sources"
            caption="Today"
          />
        </div>
      </div>
    );
  }

  if (type === "visitors-by-country") {
    return (
      <div className="w-full flex items-center justify-center min-h-[420px] px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl">
          <ChartBlock
            key={`${type}-${color}`}
            type="visitors-by-country"
            data={countryVisitorsData}
            title="Visitors by country"
            caption="Today"
          />
        </div>
      </div>
    );
  }

  // The legend charts show shares of a whole in a compact card, not a
  // 300px stage — they lay out like the panels they were built for.
  if (type === "donut-legend" || type === "stacked-bar") {
    const isDonut = type === "donut-legend";
    return (
      <div className="w-full flex items-center justify-center min-h-[420px] px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl rounded-3xl border border-border/70 bg-card p-6 text-card-foreground">
          <h3 className="text-sm font-semibold">{isDonut ? "Top visit reasons" : "Where the week goes"}</h3>
          <ChartBlock
            key={`${type}-${color}`}
            type={type}
            data={isDonut ? visitReasons : weekActivities}
            valueSuffix="%"
            centerLabel="top reason"
            hoverLabel="of visits"
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  // We cut down the slices for pie/donut to avoid it looking too dense
  const activeData =
    type === "pie" || type === "donut" ? sampleData.slice(0, 5) : sampleData;

  return (
    <div className="w-full flex items-center justify-center min-h-[460px] px-2 sm:px-4 relative z-10">
      <div className="w-full max-w-4xl rounded-3xl border border-border/70 bg-card p-6 text-card-foreground">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Annual Revenue Overview
          </h3>
          <p className="text-xs font-medium text-muted-foreground mt-0.5">
            Fiscal year 2023 performance metrics.
          </p>
        </div>
        {/* The Key forces a total re-render when switching types so entrance animations re-trigger properly */}
        <ChartBlock
          key={`${type}-${color}-${showGrid}-${showArea}`}
          data={activeData}
          type={type}
          color={color}
          showGrid={showGrid}
          showArea={showArea}
          valuePrefix="$"
          height={300}
        />
      </div>
    </div>
  );
}
