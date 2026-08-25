"use client";

import { AnimatePresence, motion } from "motion/react";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPRING } from "@/config/motion.config";
import { useCartPanel } from "../hooks/use-cart-panel";
import { CartRow } from "./cart-row";
import { CartSummary } from "./cart-summary";
import { ConfirmDialog } from "./confirm-dialog";
import { IconButton } from "./icon-button";
import { OrderTypeTabs } from "./order-type-tabs";

export function CartPanel() {
  const panel = useCartPanel();

  return (
    <aside className="flex w-[340px] shrink-0 flex-col gap-3 rounded-card bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-neutral-900">Pesanan</h2>
          <motion.span
            key={panel.totals.itemCount}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={SPRING.crisp}
            className="grid size-6 place-items-center rounded-full bg-foreground text-xs font-bold text-background"
          >
            {panel.totals.itemCount}
          </motion.span>
        </div>

        {!panel.isEmpty && (
          <IconButton label="Kosongkan pesanan" onClick={panel.askClear} className="hover:text-danger-soft">
            <Trash2 className="size-4" />
          </IconButton>
        )}
      </div>

      <OrderTypeTabs value={panel.orderType} onChange={panel.setOrderType} />

      {panel.isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-neutral-300">
          <ShoppingBag className="size-10" />
          <p className="text-sm">Belum ada pesanan</p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {panel.items.map(function renderRow(item) {
              return <CartRow key={item.lineId} item={item} />;
            })}
          </AnimatePresence>
        </div>
      )}

      <CartSummary totals={panel.totals} />

      <Button
        disabled={panel.isEmpty}
        className="h-12 w-full rounded-card bg-brand text-base font-bold hover:bg-brand-soft"
      >
        Checkout
      </Button>

      <ConfirmDialog
        open={panel.isClearOpen}
        title="Kosongkan pesanan?"
        description={`${panel.totals.itemCount} item bakal dihapus dari pesanan ini. Aksi ini ga bisa dibatalin.`}
        confirmLabel="Ya, kosongkan"
        destructive
        onCancel={panel.cancelClear}
        onConfirm={panel.confirmClear}
      />
    </aside>
  );
}