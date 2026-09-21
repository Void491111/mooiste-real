"use client";

import { useEffect, useMemo, useState } from "react";
import { getGuestMenus } from "../api/guest.api";
import type { GuestMenu } from "../types";

export function useGuestMenu() {
  const [menus, setMenus] = useState<GuestMenu[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function loadMenus() {
    let isActive = true;

    getGuestMenus()
      .then(function applyMenus(data) {
        if (isActive) setMenus(data);
      })
      .catch(function showError(cause: unknown) {
        if (!isActive) return;
        setError(cause instanceof Error ? cause.message : "Gagal memuat menu");
      })
      .finally(function stopLoading() {
        if (isActive) setIsLoading(false);
      });

    return function cancel() {
      isActive = false;
    };
  }, []);

  const categories = useMemo(
    function listCategories() {
      const codes = menus.map(function categoryOf(menu) {
        return menu.category;
      });

      return [...new Set(codes)];
    },
    [menus],
  );

  const visible = useMemo(
    function filterByCategory() {
      if (category === null) return menus;

      return menus.filter(function byCategory(menu) {
        return menu.category === category;
      });
    },
    [menus, category],
  );

  return { menus: visible, categories, category, setCategory, isLoading, error };
}