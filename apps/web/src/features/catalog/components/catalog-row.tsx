"use client";

import { formatMoney } from "@/lib/format";
import type { MenuRow } from "../types";
import { MenuThumb } from "./menu-thumb";

const ACTION_CLASS =
  "rounded-[var(--radius-card)] px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40";

type CatalogRowProps = {
  row: MenuRow;
  isBusy: boolean;
  onEdit: (row: MenuRow) => void;
  onToggleActive: (row: MenuRow) => void;
};

export function CatalogRow({
  row,
  isBusy,
  onEdit,
  onToggleActive,
}: CatalogRowProps) {
  function handleEdit() {
    onEdit(row);
  }

  function handleToggle() {
    onToggleActive(row);
  }

  return (
    <tr className="border-t border-border">
      <td className="py-2.5 pr-4">
        <span
          className={
            row.isActive
              ? "text-foreground"
              : "text-muted-foreground line-through"
          }
        >
          {row.name}
        </span>
      </td>

      <td className="py-2.5 pr-4 text-muted-foreground">{row.category}</td>

      <td className="whitespace-nowrap py-2.5 pr-4 text-right tabular-nums text-foreground">
        {formatMoney(row.price)}
      </td>

      <td className="py-2.5 pr-4 text-right tabular-nums text-muted-foreground">
        {row.stock}
      </td>

      <td className="py-2.5 pr-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${
              row.isActive ? "bg-stock-ok" : "bg-muted-foreground"
            }`}
          />
          {row.isActive ? "Aktif" : "Nonaktif"}
        </span>
      </td>

      <td className="py-2.5 pr-4">
        <MenuThumb src={row.image} name={row.name}/>

      </td>

      <td className="whitespace-nowrap py-2.5 text-right">
        <button type="button" onClick={handleEdit} className={ACTION_CLASS}>
          Ubah
        </button>
        <button
          type="button"
          onClick={handleToggle}
          disabled={isBusy}
          className={ACTION_CLASS}
        >
          {row.isActive ? "Nonaktifkan" : "Aktifkan"}
        </button>
      </td>
    </tr>
  );
}