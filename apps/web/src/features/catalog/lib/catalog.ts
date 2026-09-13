import type { MenuRow } from "../types";

export function filterMenus(rows: MenuRow[], keyword: string) {
  const term = keyword.trim().toLowerCase();

  if (term.length === 0) return rows;

  return rows.filter(function byKeyword(row) {
    return (
      row.name.toLowerCase().includes(term) ||
      row.category.toLowerCase().includes(term)
    );
  });
}