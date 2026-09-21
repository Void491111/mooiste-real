"use client";

import Link from "next/link";
import { useGuestHydration } from "../hooks/use-guest-hydration";
import { useGuestOrder } from "../hooks/use-guest-order";
import { STATUS_COPY } from "../lib/guest-status";
import { useGuestCartStore } from "../store/guest-cart.store";
import { formatMoney } from "@/lib/format";

export function GuestStatus({ tableNumber }: { tableNumber: string }) {
  const isReady = useGuestHydration(tableNumber);
  const activeOrderId = useGuestCartStore((state) => state.activeOrderId);
  const { order, error } = useGuestOrder(isReady ? activeOrderId : null);

  if (!isReady) return null;

  if (activeOrderId === null) {
    return (
      <div className="mx-auto grid min-h-dvh w-full max-w-md place-items-center px-6 text-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Belum ada pesanan aktif.
          </p>
          <Link
            href={`/m/${tableNumber}`}
            className="mt-3 inline-block rounded-card bg-brand px-4 py-2 text-sm text-white"
          >
            Lihat menu
          </Link>
        </div>
      </div>
    );
  }

  if (error !== null) {
    return (
      <p className="px-6 py-10 text-center text-sm text-danger-soft">{error}</p>
    );
  }

  if (order === null) {
    return (
      <p className="px-6 py-10 text-center text-sm text-muted-foreground">
        Memuat pesanan…
      </p>
    );
  }

  const copy = STATUS_COPY[order.status];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 py-10">
      <p className="text-center text-xs uppercase tracking-wide text-muted-foreground">
        Nomor pesanan
      </p>
      <p className="text-center text-6xl font-bold tracking-tight text-foreground">
        {order.number}
      </p>

      <p className="mt-6 text-center text-base font-semibold text-foreground">
        {copy.title}
      </p>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        {order.status === "CANCELLED" && order.cancelReason
          ? `Alasan: ${order.cancelReason}`
          : copy.hint}
      </p>

      <ul className="mt-8 space-y-2 border-t border-border pt-4">
        {order.items.map(function renderItem(item) {
          return (
            <li key={item.id} className="flex justify-between text-sm">
              <span className="text-foreground">
                <span className="tabular-nums text-muted-foreground">
                  {item.qty}×
                </span>{" "}
                {item.name}
              </span>
              <span className="tabular-nums text-muted-foreground">
                {formatMoney(item.price * item.qty)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
        <span>Total</span>
        <span className="tabular-nums">{formatMoney(order.total)}</span>
      </div>

      <Link
        href={`/m/${tableNumber}`}
        className="mt-auto pt-8 text-center text-sm text-muted-foreground underline"
      >
        Kembali ke menu
      </Link>
    </div>
  );
}