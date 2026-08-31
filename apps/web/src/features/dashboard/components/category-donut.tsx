"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS } from "@/config/dashboard.config";
import { formatMoney } from "@/lib/format";
import { shareOf } from "../lib/dashboard";
import type { CategorySlice } from "../lib/dashboard";
import { ChartTip } from "./chart-tip";

function colorOf(category: string) {
  return CATEGORY_COLORS[category] ?? "var(--chart-axis)";
}

export function CategoryDonut({ slices }: { slices: CategorySlice[] }) {
  const total = slices.reduce(function addRevenue(acc, slice) {
    return acc + slice.revenue;
  }, 0);

  if (total === 0) {
    return <p className="text-sm text-note">Belum ada penjualan.</p>;
  }

  return (
    <div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={slices}
              dataKey="revenue"
              nameKey="category"
              innerRadius="64%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="var(--card)"
              strokeWidth={2}
            >
              {slices.map(function toCell(slice) {
                return (
                  <Cell key={slice.category} fill={colorOf(slice.category)} />
                );
              })}
            </Pie>
            <Tooltip content={<ChartTip formatValue={formatMoney} />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <p className="text-sm font-medium tabular-nums text-foreground">
            {formatMoney(total)}
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {slices.map(function toRow(slice) {
          return (
            <li key={slice.category} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: colorOf(slice.category) }}
              />
              <span className="text-sm text-foreground">{slice.category}</span>
              <span className="ml-auto text-xs tabular-nums text-note">
                {shareOf(slice.revenue, total).toFixed(0)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}