"use client";

import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { useInventoryRow } from "../hooks/use-inventory-row";
import type { InventoryRow as InventoryRowData } from "../types";

type Props = {
  row: InventoryRowData;
  canEditStock: boolean;
  onUpdated: (row: InventoryRowData) => void;
};

export function InventoryRow({ row, canEditStock, onUpdated }: Props) {
  const control = useInventoryRow(row, onUpdated);
  const isOut = row.available <= 0;

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }

  return (
    <tr className="border-b border-border transition-colors last:border-0 hover:bg-muted">
      <td className="px-4 py-3">
        <span className={cn("font-medium", isOut ? "text-muted-foreground" : "text-foreground")}>
          {row.name}
        </span>
      </td>

      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{row.category}</td>

      <td className="whitespace-nowrap px-4 py-3 text-right">
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
            className="ml-auto h-8 w-20 rounded-card text-right tabular-nums"
          />
        ) : (
          <span className="tabular-nums text-muted-foreground">{row.stock}</span>
        )}
      </td>

      <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-muted-foreground">
        {row.reservedQty}
      </td>

      <td className="whitespace-nowrap px-4 py-3 pr-8 text-right">
        <span
          className={cn(
            "font-semibold tabular-nums",
            isOut ? "text-danger-soft" : "text-foreground",
          )}
        >
          {row.available}
        </span>
      </td>

      <td className="px-4 py-3 text-right">
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