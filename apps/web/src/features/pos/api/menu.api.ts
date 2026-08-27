import { apiGet } from "@/lib/api";
import type { Menu } from "../types";

export function getMenus() {
    return apiGet<Menu[]>("/menus");
}