"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DASHBOARD_CONFIG } from "@/config/dashboard.config";
import { formatMoney } from "@/lib/format";
import { formatCompactMoney, formatDayLabel } from "../lib/dashboard";
import type { DailyPoint } from "../types";
import { ChartTip } from "./chart-tip";

export function RevenueChart({ daily }: { daily: DailyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={DASHBOARD_CONFIG.chartHeight}>
      <AreaChart data={daily} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="var(--chart-grid)" vertical={false} />

        <XAxis
          dataKey="date"
          tickFormatter={formatDayLabel}
          tickLine={false}
          axisLine={false}
          minTickGap={24}
          tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
        />

        <YAxis
          width={56}
          tickFormatter={formatCompactMoney}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
        />

        <Tooltip
          cursor={{ stroke: "var(--chart-axis)", strokeWidth: 1 }}
          content={
            <ChartTip formatValue={formatMoney} formatLabel={formatDayLabel} />
          }
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--brand)"
          strokeWidth={2}
          fill="url(#revenueFill)"
          activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--card)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}