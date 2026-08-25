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
      className="overflow-hidden rounded-card bg-neutral-50 p-2.5"
    >
      <div className="flex gap-2.5">
        <div className="grid size-12 shrink-0 place-items-center rounded-card bg-neutral-200/60 text-lg font-bold text-neutral-400">
          {item.name.slice(0, 1)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
            <p className="shrink-0 text-sm font-bold tabular-nums">{formatMoney(lineTotal(item))}</p>
          </div>

          <p className="text-xs text-neutral-500">{formatMoney(item.price)}</p>

          {item.note && !row.isEditing && (
            <p className="mt-1 truncate text-xs italic text-neutral-500">{item.note}</p>
          )}

          <div className="mt-1.5 flex items-center justify-between">
            <QtyStepper
              qty={item.qty}
              onDecrease={row.decrease}
              onIncrease={row.increase}
              canIncrease={row.canIncrease}
            />

            <div className="flex">
              <IconButton label="Catatan" onClick={row.toggleEdit}>
                <SquarePen className="size-4" />
              </IconButton>
              <IconButton label="Hapus" onClick={row.removeLine} className="hover:text-danger-soft">
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {row.isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING.snappy}
            className="overflow-hidden"
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