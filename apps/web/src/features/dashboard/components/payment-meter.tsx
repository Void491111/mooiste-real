import { formatMoney } from "@/lib/format";
import { shareOf, sumPayments } from "../lib/dashboard";
import type { PaymentSplit } from "../types";

const METHOD_META: Record<string, { label: string; color: string }> = {
  QRIS: { label: "QRIS", color: "var(--chart-1)" },
  CASH: { label: "Tunai", color: "var(--chart-2)" },
};

export function PaymentMeter({ payments }: { payments: PaymentSplit[] }) {
  const total = sumPayments(payments);

  if (total === 0) {
    return <p className="text-sm text-note">Belum ada pembayaran tercatat.</p>;
  }

  return (
    <div>
      <div className="flex h-3 gap-0.5 overflow-hidden rounded-full">
        {payments.map(function toSegment(item) {
          return (
            <div
              key={item.method}
              style={{
                width: `${shareOf(item.total, total)}%`,
                background: METHOD_META[item.method]?.color,
              }}
            />
          );
        })}
      </div>

      <ul className="mt-4 space-y-3">
        {payments.map(function toRow(item) {
          const meta = METHOD_META[item.method];

          return (
            <li key={item.method} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: meta?.color }}
              />
              <span className="text-sm text-foreground">
                {meta?.label ?? item.method}
              </span>
              <span className="ml-auto text-sm tabular-nums text-foreground">
                {formatMoney(item.total)}
              </span>
              <span className="w-10 text-right text-xs tabular-nums text-note">
                {shareOf(item.total, total).toFixed(0)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}