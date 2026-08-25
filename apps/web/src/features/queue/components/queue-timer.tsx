"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Urgency } from "../types";

const URGENCY_CLASS: Record<Urgency, string> = {
  normal: "bg-muted text-muted-foreground",
  warn: "bg-selected text-foreground",
  late: "bg-danger-soft text-danger-soft-fg",
};

type Props = {
  minutes: number;
  urgency: Urgency;
};

export function QueueTimer({ minutes, urgency }: Props) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold tabular-nums",
        URGENCY_CLASS[urgency],
      )}
    >
      <Clock className="size-3.5" />
      {minutes}m
    </span>
  );
}