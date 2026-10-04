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
import { accentStyle } from "@/lib/accent";
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
export default function RechartsRevenue({ color }: { color?: string } = {}) {
  const tokens = useChartTokens(color);

  return (
    <Card className="w-full max-w-3xl min-w-0 overflow-hidden" style={accentStyle(color)}>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div>
            <CardTitle className="text-base sm:text-lg">Recurring revenue</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Monthly recurring revenue and expansion</CardDescription>
          </div>
          <Badge variant="outline" className="w-fit border-primary/25 bg-primary/10 text-primary font-medium text-xs">
            +18.4%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="h-[220px] sm:h-[280px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenue} margin={{ top: 8, right: 6, bottom: 0, left: -14 }}>
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
                tick={{ fill: tokens.muted, fontSize: 11 }}
                interval="preserveStartEnd"
                minTickGap={6}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={currency}
                tick={{ fill: tokens.muted, fontSize: 11 }}
                width={38}
              />
              <Tooltip
                cursor={{ stroke: tokens.border }}
                contentStyle={{
                  background: tokens.card,
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 12,
                  color: tokens.foreground,
                  fontSize: 11,
                  padding: "8px 12px",
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
