"use client"

import { useEffect, useState } from "react";
import { getMenus } from "../api/menu.api";
import type { Menu } from "../types";

export function useMenus() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(function loadMenus() {
        let cancelled = false;

        async function fetchMenus() {
            try {
                const data = await getMenus();
                if(!cancelled) setMenus(data);
            } catch (caught) {
                if (!cancelled) {
                    setError(caught instanceof Error ? caught.message : "Gagal memuat menu");
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        fetchMenus();

        return function cancelLoad() {
            cancelled = true;;
        };
    }, []);

    return { menus, isLoading, Error };
}