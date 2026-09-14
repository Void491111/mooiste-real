"use client";

import { AnimatePresence, motion } from "motion/react";
import { SquarePen, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { SPRING, VARIANTS } from "@/config/motion.config";
import { useCartRow } from "../hooks/use-cart-row";
import { lineTotal } from "../lib/cart";
import { formatMoney } from "../lib/format";
import type { CartItem } from "../types";
import { IconButton } from "./icon-button";
import { QtyStepper } from "./qty-stepper";


type Props = {
  item: CartItem;
};

export function CartRow({ item }: Props) {
  const row = useCartRow(item);

  return (
    <motion.div
      layout
      initial={VARIANTS.cartRow.initial}
      animate={VARIANTS.cartRow.animate}
      exit={VARIANTS.cartRow.exit}
      transition={SPRING.snappy}
      className="shrink-0 rounded-card bg-muted px-3 py-2"
    >
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {item.name}
          </p>
          <p className="text-xs tabular-nums text-muted-foreground">
            {formatMoney(item.price)}
          </p>
        </div>

        <QtyStepper
          qty={item.qty}
          onDecrease={row.decrease}
          onIncrease={row.increase}
          onQtyChange={row.changeQty}
          canIncrease={row.canIncrease}
          size="sm"
        />

        <p className="w-20 shrink-0 text-right text-sm font-bold tabular-nums">
          {formatMoney(lineTotal(item))}
        </p>

        <div className="flex shrink-0">
          <IconButton label="Catatan" onClick={row.toggleEdit}>
            <SquarePen className="size-4" />
          </IconButton>
          <IconButton
            label="Hapus"
            onClick={row.removeLine}
            className="hover:text-danger-soft"
          >
            <Trash2 className="size-4" />
          </IconButton>
        </div>
      </div>

      {item.note && !row.isEditing && (
        <p className="mt-1 truncate text-xs italic text-muted-foreground">
          {item.note}
        </p>
      )}

      <AnimatePresence>
        {row.isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING.snappy}
          >
            <Textarea
              autoFocus
              value={row.draftNote}
              onChange={function handleNoteChange(event) {
                row.setDraftNote(event.target.value);
              }}
              onBlur={row.commitNote}
              placeholder="Less sugar, no ice…"
              className="mt-2 min-h-16 rounded-card text-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}