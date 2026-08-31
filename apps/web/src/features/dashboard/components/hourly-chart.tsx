"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DASHBOARD_CONFIG } from "@/config/dashboard.config";
import { formatHourLabel, intensityOf } from "../lib/dashboard";
import type { HourlyPoint } from "../types";
import { ChartTip } from "./chart-tip";

function formatHourHeading(label: string) {
  return `Pukul ${formatHourLabel(Number(label))}`;
}

function formatOrderCount(value: number) {
  return `${value} order`;
}

export function HourlyChart({ hourly }: { hourly: HourlyPoint[] }) {
  const max = hourly.reduce(function keepMax(best, point) {
    return Math.max(best, point.orders);
  }, 0);

  return (
    <ResponsiveContainer width="100%" height={DASHBOARD_CONFIG.chartHeight}>
      <BarChart data={hourly} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid stroke="var(--chart-grid)" vertical={false} />

        <XAxis
          dataKey="hour"
          tickFormatter={formatHourLabel}
          tickLine={false}
          axisLine={false}
          interval={1}
          tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
        />

        <YAxis
          width={32}
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
        />

        <Tooltip
          cursor={{ fill: "var(--chart-grid)", opacity: 0.4 }}
          content={
            <ChartTip
              formatValue={formatOrderCount}
              formatLabel={formatHourHeading}
            />
          }
        />

        <Bar dataKey="orders" radius={[4, 4, 0, 0]} maxBarSize={28}>
          {hourly.map(function toCell(point) {
            return (
            <Cell
                key={point.hour}
                fill="var(--viz-1)"
                fillOpacity={intensityOf(point.orders, max)}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}