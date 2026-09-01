"use client";

import { formatMoney } from "@/lib/format";
import type { MenuRow } from "../types";
import { MenuThumb } from "./menu-thumb";
import { ToggleSwitch } from "./toggle-switch";

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
    <tr className="border-b border-border/60 last:border-0 even:bg-muted/30">
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <MenuThumb src={row.image} name={row.name} />

          <div className="min-w-0">
            <p
              className={`truncate ${
                row.isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {row.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {row.category}
            </p>
          </div>
        </div>
      </td>

      <td className="py-3 text-right tabular-nums text-foreground">
        {formatMoney(row.price)}
      </td>

      <td className="py-3 text-right tabular-nums text-muted-foreground">
        {row.stock}
      </td>

      <td className="py-3">
        <ToggleSwitch
          checked={row.isActive}
          disabled={isBusy}
          label={`Ketersediaan ${row.name}`}
          onChange={handleToggle}
        />
      </td>

      <td className="py-3 text-right">
        <button
          type="button"
          onClick={handleEdit}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Ubah
        </button>
      </td>
    </tr>
  );
}