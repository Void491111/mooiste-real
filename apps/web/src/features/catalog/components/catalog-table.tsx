import type { MenuRow } from "../types";
import { CatalogRow } from "./catalog-row";

const HEADERS = [
  { key: "name", label: "Menu", className: "text-left" },
  { key: "category", label: "Kategori", className: "text-left" },
  { key: "price", label: "Harga", className: "text-right" },
  { key: "stock", label: "Stok", className: "text-right" },
  { key: "status", label: "Status", className: "text-left" },
  { key: "action", label: "", className: "text-right" },
  { key: "image", label: "", className: "text-left" },
];

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
    <table className="w-full text-sm">
      <thead>
        <tr className="text-xs text-muted-foreground">
          {HEADERS.map(function toHeader(header) {
            return (
              <th
                key={header.key}
                className={`pb-2 pr-4 font-normal ${header.className}`}
              >
                {header.label}
              </th>
            );
          })}
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
  );
}