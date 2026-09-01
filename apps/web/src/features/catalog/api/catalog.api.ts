import { apiGet, apiPatch, apiPost, apiUpload } from "@/lib/api";
import type { CategoryOption, MenuRow } from "../types";

export function getMenusForManage() {
  return apiGet<MenuRow[]>("/menus/manage");
}

export function getCategories() {
  return apiGet<CategoryOption[]>("/menus/categories");
}

export function createMenu(body: {
  name: string;
  price: number;
  categoryId: string;
  stock: number;
  image: string;
}) {
  return apiPost<MenuRow>("/menus", body);
}

export function updateMenu(
  id: string,
  body: { name: string; price: number; categoryId: string; image: string; },
) {
  return apiPatch<MenuRow>(`/menus/${id}`, body);
}

export function setMenuActive(id: string, isActive: boolean) {
  return apiPatch<MenuRow>(`/menus/${id}/active`, { isActive });
}

export function uploadMenuImage(file: File) {
  return apiUpload< {url: string }>("/menus/image", file) 
}