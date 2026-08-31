"use client";

import { DASHBOARD_CONFIG } from "@/config/dashboard.config";

type RangePickerProps = {
  days: number;
  onChange: (days: number) => void;
};

export function RangePicker({ days, onChange }: RangePickerProps) {
  return (
    <div className="flex gap-1 rounded-full border border-border p-1">
      {DASHBOARD_CONFIG.ranges.map(function toButton(range) {
        const isActive = range.days === days;

        return (
          <button
            key={range.days}
            type="button"
            onClick={function selectRange() {
              onChange(range.days);
            }}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              isActive
                ? "bg-selected text-foreground"
                : "text-note hover:text-foreground"
            }`}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}