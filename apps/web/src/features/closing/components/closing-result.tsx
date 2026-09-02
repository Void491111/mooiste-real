import { formatMoney } from "@/lib/format";
import type { ClosingRecord } from "../types";

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value }: RowProps) {
  return (
    <li className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm tabular-nums text-foreground">{value}</span>
    </li>
  );
}

function differenceText(difference: number) {
  if (difference === 0) return "Pas";

  return difference < 0
    ? `Kurang ${formatMoney(Math.abs(difference))}`
    : `Lebih ${formatMoney(difference)}`;
}

export function ClosingResult({ record }: { record: ClosingRecord }) {
  return (
    <div className="rounded-card border border-border bg-card p-5">
      <p className="text-sm font-medium text-foreground">Kas sudah ditutup</p>

      <ul className="mt-4 space-y-2.5">
        <Row
          label="Tunai seharusnya"
          value={formatMoney(record.expectedCash)}
        />
        <Row label="Dihitung kasir" value={formatMoney(record.countedCash)} />
        <Row label="Selisih" value={differenceText(record.difference)} />
        <Row label="Ditutup oleh" value={record.closedBy} />
      </ul>

      {record.note ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Catatan: {record.note}
        </p>
      ) : null}
    </div>
  );
}