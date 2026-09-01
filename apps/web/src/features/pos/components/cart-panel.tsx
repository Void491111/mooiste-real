"use client";

import { AnimatePresence, motion } from "motion/react";
import { ShoppingBag, Trash2 } from "lucide-react";
import { SPRING } from "@/config/motion.config";
import { useCartPanel } from "../hooks/use-cart-panel";
import { useCheckout } from "../hooks/use-checkout";
import { CartRow } from "./cart-row";
import { CartSummary } from "./cart-summary";
import { ConfirmDialog } from "./confirm-dialog";
import { IconButton } from "./icon-button";
import { OrderTypeTabs } from "./order-type-tabs";
import { cn } from "@/lib/utils";

type Props = {
  class: string;
  onCheckoutSuccess?: () => void;
};

export function CartPanel({ onCheckoutSuccess }: Props) {
  const panel = useCartPanel();
  const submit = useCheckout(onCheckoutSuccess);

  const isDisabled = !panel.isReady || panel.isEmpty || submit.isSubmitting;

  return (
    <aside className="flex w-85 shrink-0 flex-col gap-3 rounded-card bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-foreground">Pesanan</h2>
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
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground/40">
          <ShoppingBag className="size-10" />
          <p className="text-sm">Belum ada pesanan</p>
          {submit.lastNumber !== null && (
            <p className="text-xs text-stock-ok">Order {submit.lastNumber} terkirim</p>
          )}
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

      {submit.error !== null && (
        <p className="rounded-card bg-danger-soft px-3 py-2 text-xs text-danger-soft-fg">
          {submit.error}
        </p>
      )}

      <CartSummary totals={panel.totals} />

      <motion.div whileTap={isDisabled ? undefined : { scale: 0.98 }} transition={SPRING.snappy}>
        <button
          type="button"
          suppressHydrationWarning
          disabled={isDisabled}
          onClick={submit.checkout}
          className="h-12 w-full rounded-card bg-brand text-base font-bold text-white transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submit.isSubmitting ? "Memproses…" : "Checkout"}
        </button>
      </motion.div>

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