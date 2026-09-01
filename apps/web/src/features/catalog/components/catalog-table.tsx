import type { MenuRow } from "../types";
import { CatalogRow } from "./catalog-row";

type CatalogTableProps = {
  rows: MenuRow[];
  busyId: string | null;
  onEdit: (row: MenuRow) => void;
  onToggleActive: (row: MenuRow) => void;
};

export function CatalogTable({
  rows,
  busyId,
  onEdit,
  onToggleActive,
}: CatalogTableProps) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada menu.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-sm">
        {/*
          Lebar kolom dipatok di sini. Tanpa ini browser mengukur lebar
          dari isi tiap sel, jadi begitu satu status berubah panjangnya,
          semua kolom di kanannya ikut bergeser.
          Kolom pertama sengaja tanpa lebar — dia yang mengambil sisanya.
        */}
        <colgroup>
          <col />
          <col className="w-32" />
          <col className="w-20" />
          <col className="w-28" />
          <col className="w-20" />
        </colgroup>

        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="pb-3 text-left font-normal">Menu</th>
            <th className="pb-3 text-right font-normal">Harga</th>
            <th className="pb-3 text-right font-normal">Stok</th>
            <th className="pb-3 text-left font-normal">Tersedia</th>
            <th className="pb-3 text-right font-normal">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(function toRow(row) {
            return (
              <CatalogRow
                key={row.id}
                row={row}
                isBusy={busyId === row.id}
                onEdit={onEdit}
                onToggleActive={onToggleActive}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}