import type { CATEGORIES } from "@/config/pos.config";
import type { OrderType } from "@/types/shared";

export type CategoryFilter = (typeof CATEGORIES)[number]["value"];
export type Category = Exclude<CategoryFilter, "ALL">;

export type { OrderType };

export type Menu = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  category: Category;
  stock: number;
};

export type CartItem = {
  lineId: string;
  menuId: string;
  name: string;
  price: number;
  image: string | null;
  stock: number;
  qty: number;
  note: string;
};

export type CartTotals = {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
};