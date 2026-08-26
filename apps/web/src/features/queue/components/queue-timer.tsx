"use client";

import { cn } from "@/lib/utils";
import type { Urgency } from "../types";

const URGENCY_CLASS: Record<Urgency, string> = {
  normal: "text-muted-foreground",
  warn: "text-note",
  late: "rounded-full bg-danger-soft px-2 py-0.5 text-danger-soft-fg",
};

type Props = {
  minutes: number;
  urgency: Urgency;
};

export function QueueTimer({ minutes, urgency }: Props) {
  return (
    <span className={cn("shrink-0 text-xs tabular-nums", URGENCY_CLASS[urgency])}>
      {minutes}m
    </span>
  );
}