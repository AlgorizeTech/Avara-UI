"use client";

import {
  ChartBlock,
  ChartColor,
  ChartType,
} from "@/components/custom/blocks/ChartBlock";

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
  // The legend charts show shares of a whole in a compact card, not a
  // 300px stage — they lay out like the panels they were built for.
  if (type === "donut-legend" || type === "stacked-bar") {
    const isDonut = type === "donut-legend";
    return (
      <div className="w-full flex items-center justify-center min-h-[320px] px-6 relative z-10">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-sm">
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
    <div className="w-full flex flex-col items-start justify-center min-h-[500px] relative z-10">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground">
            Annual Revenue Overview
          </h3>
          <p className="text-sm font-medium text-muted-foreground mt-1">
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
