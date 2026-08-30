import { apiGet, apiPatch } from "@/lib/api";
import type { InventoryRow } from "../types";

export function getInventory() {
    return apiGet<InventoryRow[]>("/menus/manage");
}

export function markSoldOut(menuId: string) {
    return apiPatch<InventoryRow>("/menus/${menuId}/sold-out");
}

export function setStock(menuId: string, stock: number) {
    return apiPatch<InventoryRow>(`/menus/${menuId}/stock`, {stock});
}