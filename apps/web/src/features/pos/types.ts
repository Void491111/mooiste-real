import { CATEGORIES, ORDER_TYPES } from "@/config/pos.config";

export type CategoryFilter = (typeof CATEGORIES)[number]["value"];
export type Category = Exclude<CategoryFilter, "ALL">;
export type OrderType = (typeof ORDER_TYPES)[number]["value"];

export type Menu = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: Category;
    stock: number;
}

export type CartItem = {
    lineId: string;
    menuId: string;
    name: string;
    price: number;
    image: string;
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