"use client";

import type { ChangeEvent } from "react";
import { todayIso } from "../lib/orders";

type Props = {
  value: string;
  onChange: (date: string) => void;
};

export function OrderDatePicker({ value, onChange }: Props) {
  const today = todayIso();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  function goToday() {
    onChange(today);
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={value}
        max={today}
        onChange={handleChange}
        className="h-9 rounded-card border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-selected-ring"
      />

      {value !== today ? (
        <button
          type="button"
          onClick={goToday}
          className="h-9 rounded-card border border-border px-3 text-xs text-muted-foreground hover:text-foreground"
        >
          Hari ini
        </button>
      ) : null}
    </div>
  );
}