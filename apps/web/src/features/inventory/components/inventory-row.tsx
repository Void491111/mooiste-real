"use client";

import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { useInventoryRow } from "../hooks/use-inventory-row";
import { stockLevelOf } from "../lib/inventory";
import type { InventoryRow as InventoryRowData } from "../types";

type Props = {
  row: InventoryRowData;
  canEditStock: boolean;
  onUpdated: (row: InventoryRowData) => void;
};

const LEVEL_CLASS = {
  out: "text-danger-soft",
  low: "text-note",
  ok: "text-foreground",
} as const;

export function InventoryRow({ row, canEditStock, onUpdated }: Props) {
  const control = useInventoryRow(row, onUpdated);
  const level = stockLevelOf(row);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }

  return (
    <tr className="border-b border-border transition-colors last:border-0 hover:bg-muted">
      <td className="px-4 py-2.5">
        <span className={cn(level === "out" ? "text-muted-foreground" : "text-foreground")}>
          {row.name}
        </span>
      </td>

      <td className="whitespace-nowrap px-4 py-2.5 text-right">
        {canEditStock ? (
          <Input
            type="number"
            inputMode="numeric"
            value={control.draft}
            disabled={control.isSaving}
            onChange={function handleChange(event) {
              control.setDraft(event.target.value);
            }}
            onBlur={control.save}
            onKeyDown={handleKeyDown}
            className="ml-auto h-8 w-18 rounded-card text-right tabular-nums"
          />
        ) : (
          <span className="tabular-nums text-muted-foreground">{row.stock}</span>
        )}
      </td>

      <td className="whitespace-nowrap px-4 py-2.5 text-right tabular-nums text-muted-foreground">
        {row.reservedQty}
      </td>

      <td className="whitespace-nowrap px-4 py-2.5 pr-8 text-right">
        <span className={cn("font-semibold tabular-nums", LEVEL_CLASS[level])}>
          {row.available}
        </span>
        {level === "low" && <span className="ml-2 text-xs text-note">menipis</span>}
      </td>

      <td className="px-4 py-2.5 text-right">
        <motion.button
          type="button"
          disabled={control.isSaving || row.stock === 0}
          onClick={control.soldOut}
          whileTap={{ scale: 0.94 }}
          transition={SPRING.snappy}
          className="whitespace-nowrap rounded-card px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-danger-soft disabled:opacity-30"
        >
          Tandai habis
        </motion.button>
      </td>
    </tr>
  );
}