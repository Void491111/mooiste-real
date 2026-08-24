"use client";

import { useMemo, useState} from "react";
import type { CategoryFilter, Menu } from "../types";

export function useMenuFilter(menus: Menu[]) {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState<CategoryFilter>("ALL");

    const filtered = useMemo(
        function filterMenus() {
            const query = keyword.trim().toLocaleLowerCase();

            return menus.filter(function matchMenu(menu) {
                const byCategory = category === "ALL" || menu.category === category;
                const byKeyword = !query || menu.name.toLocaleLowerCase().includes(query);
                return byCategory && byKeyword;
            });
        },
        [menus, keyword, category],
    );

    return { keyword, setKeyword, category, setCategory, filtered };
}