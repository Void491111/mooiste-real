"use client";

import { Minus, Plus } from "lucide-react";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useGuestCheckout } from "../hooks/use-guest-checkout";
import { totalsOf } from "../lib/guest-cart";
import { useGuestCartStore } from "../store/guest-cart.store";
import { GuestSheet } from "./guest-sheet";

type Props = {
  isOpen: boolean;
  tableNumber: string;
  onClose: () => void;
};

const TYPE_TAB =
  "flex-1 rounded-card py-2 text-sm font-medium transition-colors";

export function GuestCartSheet({ isOpen, tableNumber, onClose }: Props) {
  const items = useGuestCartStore((state) => state.items);
  const setQty = useGuestCartStore((state) => state.setQty);
  const checkout = useGuestCheckout(tableNumber);

  const totals = totalsOf(items);

  return (
    <GuestSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-4 pb-5">
        <h2 className="text-base font-bold text-foreground">Pesanan kamu</h2>

        <div className="mt-3 flex flex-col gap-2">
          {items.map(function renderItem(item) {
            return (
              <div
                key={item.menuId}
                className="flex items-center gap-3 rounded-card bg-muted px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  {item.note ? (
                    <p className="truncate text-xs italic text-muted-foreground">
                      {item.note}
                    </p>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Kurangi"
                    onClick={function decrease() {
                      setQty(item.menuId, item.qty - 1);
                    }}
                    className="grid size-7 place-items-center rounded-full border border-border"
                  >
                    <Minus className="size-3" />
                  </button>

                  <span className="w-5 text-center text-sm font-semibold tabular-nums">
                    {item.qty}
                  </span>

                  <button
                    type="button"
                    aria-label="Tambah"
                    disabled={item.qty >= item.stock}
                    onClick={function increase() {
                      setQty(item.menuId, item.qty + 1);
                    }}
                    className="grid size-7 place-items-center rounded-full border border-border disabled:opacity-30"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>

                <span className="w-20 shrink-0 text-right text-sm font-bold tabular-nums">
                  {formatMoney(item.price * item.qty)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex gap-1 rounded-card bg-muted p-1">
          <button
            type="button"
            onClick={function pickDineIn() {
              checkout.setOrderType("DINE_IN");
            }}
            className={cn(
              TYPE_TAB,
              checkout.orderType === "DINE_IN"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground",
            )}
          >
            Makan di tempat
          </button>

          <button
            type="button"
            onClick={function pickTakeaway() {
              checkout.setOrderType("TAKEAWAY");
            }}
            className={cn(
              TYPE_TAB,
              checkout.orderType === "TAKEAWAY"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground",
            )}
          >
            Bawa pulang
          </button>
        </div>

        <dl className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <dt>Pajak</dt>
            <dd className="tabular-nums">{formatMoney(totals.tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-1 font-bold text-foreground">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(totals.total)}</dd>
          </div>
        </dl>

        {checkout.error !== null ? (
          <p className="mt-3 text-xs text-danger-soft">{checkout.error}</p>
        ) : null}

        <button
          type="button"
          onClick={checkout.submit}
          disabled={checkout.isSubmitting || items.length === 0}
          className="mt-4 h-13 w-full rounded-card bg-brand text-sm font-semibold text-white disabled:opacity-40"
        >
          {checkout.isSubmitting ? "Mengirim…" : "Kirim pesanan"}
        </button>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Bayar di kasir setelah pesanan dikirim.
        </p>
      </div>
    </GuestSheet>
  );
}