"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { getCategories, getMenusForManage, setMenuActive } from "../api/catalog.api";
import type { CategoryOption, MenuRow } from "../types";
import { filterMenus } from "../lib/catalog";
import { toast } from "sonner";

export function useCatalog() {
  const [rows, setRows] = useState<MenuRow[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("")

    const visibleRows = useMemo(
    function filterByKeyword() {
      return filterMenus(rows, keyword);
    },
    [rows, keyword],
  );

  const load = useCallback(async function loadCatalog() {
    setIsLoading(true);
    setError(null);

    try {
      const [menus, options] = await Promise.all([
        getMenusForManage(),
        getCategories(),
      ]);

      setRows(menus);
      setCategories(options);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Gagal memuat menu");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(
    function loadOnMount() {
      void load();
    },
    [load],
  );

  function upsertRow(row: MenuRow) {
    setRows(function replaceOrAppend(current) {
      const exists = current.some(function byId(item) {
        return item.id === row.id;
      });

      if (!exists) return [...current, row];

      return current.map(function swap(item) {
        return item.id === row.id ? row : item;
      });
    });
  }

    async function toggleActive(row: MenuRow) {
    setBusyId(row.id);
    setError(null);

    try {
      const saved = await setMenuActive(row.id, !row.isActive);
      upsertRow(saved);

      toast.success(
        saved.isActive
          ? `${saved.name} ditampilkan di kasir`
          : `${saved.name} disembunyikan dari kasir`,
        {
          action: {
            label: "Urungkan",
            onClick: function undoToggle() {
              void toggleActive(row);
            },
          },
        },
      );
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Gagal mengubah status";

      setError(message);
      toast.error(message);
    } finally {
      setBusyId(null);
    }
  }

    return {
    rows: visibleRows,
    keyword,
    setKeyword,
    isFiltered: keyword.trim().length > 0,
    categories,
    isLoading,
    busyId,
    error,
    reload: load,
    upsertRow,
    toggleActive,
  };
}