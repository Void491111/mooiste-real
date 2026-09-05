"use client";

import { Panel } from "@/components/panel";
import { formatMoney } from "@/lib/format";
import { useClosingHistory } from "../hooks/use-closing-history";
import type { ClosingHistoryRow } from "../types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DifferenceCell({ value }: { value: number }) {
  if (value === 0) {
    return <span className="text-muted-foreground">Pas</span>;
  }

  return (
    <span className="text-danger-soft">
      {value > 0 ? "+" : "−"}
      {formatMoney(Math.abs(value))}
    </span>
  );
}

function HistoryRow({ row }: { row: ClosingHistoryRow }) {
  return (
    <tr className="border-t border-border odd:bg-muted/30">
      <td className="px-4 py-2.5">{formatDate(row.businessDate)}</td>
      <td className="px-4 py-2.5 tabular-nums">{row.orderCount}</td>
      <td className="px-4 py-2.5 tabular-nums">
        {formatMoney(row.totalRevenue)}
      </td>
      <td className="px-4 py-2.5 tabular-nums">
        {formatMoney(row.expectedCash)}
      </td>
      <td className="px-4 py-2.5 tabular-nums">
        {formatMoney(row.countedCash)}
      </td>
      <td className="px-4 py-2.5 tabular-nums">
        <DifferenceCell value={row.difference} />
      </td>
      <td className="truncate px-4 py-2.5 text-muted-foreground">
        {row.closedBy}
      </td>
    </tr>
  );
}

export function ClosingHistory() {
  const { rows, isLoading } = useClosingHistory();

  if (isLoading) {
    return (
      <Panel title="Riwayat tutup kas">
        <p className="text-sm text-muted-foreground">Memuat…</p>
      </Panel>
    );
  }

  if (rows.length === 0) {
    return (
      <Panel title="Riwayat tutup kas">
        <p className="text-sm text-muted-foreground">Belum ada penutupan kas.</p>
      </Panel>
    );
  }

  return (
    <Panel title="Riwayat tutup kas" hint="30 penutupan terakhir">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[8.5rem]" />
            <col className="w-20" />
            <col className="w-36" />
            <col className="w-36" />
            <col className="w-36" />
            <col className="w-32" />
            <col />
          </colgroup>
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="px-4 pb-2 font-medium">Tanggal</th>
              <th className="px-4 pb-2 font-medium">Order</th>
              <th className="px-4 pb-2 font-medium">Omzet</th>
              <th className="px-4 pb-2 font-medium">Kas seharusnya</th>
              <th className="px-4 pb-2 font-medium">Kas dihitung</th>
              <th className="px-4 pb-2 font-medium">Selisih</th>
              <th className="px-4 pb-2 font-medium">Ditutup oleh</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(function renderRow(row) {
              return <HistoryRow key={row.id} row={row} />;
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}