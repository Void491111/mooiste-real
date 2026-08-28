"use client";

import { useCallback, useEffect, useState } from "react";
import { getMenus } from "../api/menu.api";
import type { Menu } from "../types";

export function useMenus() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async function loadMenus() {
    try {
      setError(null);
      const data = await getMenus();
      setMenus(data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gagal memuat menu");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(
    function loadOnMount() {
      load();
    },
    [load],
  );

  return { menus, isLoading, error, refetch: load };
}