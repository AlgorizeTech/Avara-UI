"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import { useMemo } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { useChartTokens } from "@/lib/chart-tokens";

/**
 * Chart.js is tree-shaken: every scale, element and plugin you use has to be
 * registered once. Do it at module scope, not inside the component — a
 * register call in a render body runs on every update.
 */
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const channels = ["Organic", "Referral", "Social", "Email", "Paid"];
const sessions = [18400, 9200, 7600, 5400, 4100];

export default function ChartJsTraffic() {
  const tokens = useChartTokens();

  /**
   * Options are rebuilt when the tokens change, which is what makes the
   * chart follow the theme switch — Chart.js paints to a canvas and cannot
   * inherit anything from CSS.
   */
  const barOptions = useMemo<ChartOptions<"bar">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tokens.card,
          titleColor: tokens.foreground,
          bodyColor: tokens.muted,
          borderColor: tokens.border,
          borderWidth: 1,
          padding: 12,
          displayColors: false,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: tokens.border },
          ticks: { color: tokens.muted, font: { size: 12 } },
        },
        y: {
          grid: { color: tokens.border },
          border: { display: false },
          ticks: { color: tokens.muted, font: { size: 12 } },
        },
      },
    }),
    [tokens],
  );

  const doughnutOptions = useMemo<ChartOptions<"doughnut">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: tokens.muted,
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 8,
            padding: 16,
            font: { size: 12 },
          },
        },
        tooltip: {
          backgroundColor: tokens.card,
          titleColor: tokens.foreground,
          bodyColor: tokens.muted,
          borderColor: tokens.border,
          borderWidth: 1,
          padding: 12,
        },
      },
    }),
    [tokens],
  );

  return (
    <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Sessions by channel</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <Bar
              options={barOptions}
              data={{
                labels: channels,
                datasets: [
                  {
                    label: "Sessions",
                    data: sessions,
                    backgroundColor: tokens.series[0],
                    hoverBackgroundColor: tokens.series[5],
                    borderRadius: 6,
                    maxBarThickness: 40,
                  },
                ],
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Share of traffic</CardTitle>
          <CardDescription>Same data, proportional view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <Doughnut
              options={doughnutOptions}
              data={{
                labels: channels,
                datasets: [
                  {
                    data: sessions,
                    backgroundColor: tokens.series,
                    borderColor: tokens.card,
                    borderWidth: 3,
                  },
                ],
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
