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
  // We cut down the slices for pie/donut to avoid it looking too dense
  const activeData =
    type === "pie" || type === "donut" ? sampleData.slice(0, 5) : sampleData;

  return (
    <div className="w-full flex flex-col items-start justify-center min-h-[500px] relative z-10">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl font-black text-zinc-900 dark:text-white">
            Annual Revenue Overview
          </h3>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
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
