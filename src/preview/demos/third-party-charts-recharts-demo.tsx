"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { Badge } from "@/components/custom/ui/badge";
import { useChartTokens } from "@/lib/chart-tokens";

const revenue = [
  { month: "Jan", mrr: 12400, expansion: 2100 },
  { month: "Feb", mrr: 14850, expansion: 2600 },
  { month: "Mar", mrr: 15900, expansion: 2400 },
  { month: "Apr", mrr: 18600, expansion: 3100 },
  { month: "May", mrr: 21050, expansion: 3800 },
  { month: "Jun", mrr: 24900, expansion: 4200 },
  { month: "Jul", mrr: 26400, expansion: 4050 },
  { month: "Aug", mrr: 29800, expansion: 5300 },
];

const currency = (value: number) => `$${(value / 1000).toFixed(1)}k`;

/**
 * Recharts draws the plot; the surrounding chrome — card, title, legend,
 * tooltip — is all Algorize UI. That split is the whole integration: the
 * chart library never renders anything the design system already owns.
 */
export default function RechartsRevenue() {
  const tokens = useChartTokens();

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Recurring revenue</CardTitle>
            <CardDescription>Monthly recurring revenue and expansion</CardDescription>
          </div>
          <Badge variant="secondary">+18.4%</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenue} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
              <defs>
                <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={tokens.series[0]} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={tokens.series[0]} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expansionFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={tokens.series[1]} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={tokens.series[1]} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke={tokens.border} vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: tokens.muted, fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={currency}
                tick={{ fill: tokens.muted, fontSize: 12 }}
              />
              <Tooltip
                cursor={{ stroke: tokens.border }}
                contentStyle={{
                  background: tokens.card,
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 12,
                  color: tokens.foreground,
                  fontSize: 12,
                }}
                formatter={(value) => currency(Number(value))}
              />
              <Area
                type="monotone"
                dataKey="mrr"
                name="MRR"
                stroke={tokens.series[0]}
                strokeWidth={2}
                fill="url(#mrrFill)"
              />
              <Area
                type="monotone"
                dataKey="expansion"
                name="Expansion"
                stroke={tokens.series[1]}
                strokeWidth={2}
                fill="url(#expansionFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
