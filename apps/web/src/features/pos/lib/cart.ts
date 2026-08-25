import { POS_CONFIG } from "@/config/pos.config";
import type { CartItem, CartTotals, Menu } from "../types";

export function makeLineId(menuId: string, note: string) {
  return `${menuId}::${note.trim().toLowerCase()}`;
}

export function addItem(items: CartItem[], menu: Menu, note = ""): CartItem[] {
  const lineId = makeLineId(menu.id, note);
  const existing = items.find((item) => item.lineId === lineId);

  if (existing) return setQty(items, lineId, existing.qty + 1);

  return [
    ...items,
    {
      lineId,
      menuId: menu.id,
      name: menu.name,
      price: menu.price,
      image: menu.image,
      stock: menu.stock,
      qty: 1,
      note,
    },
  ];
}

export function setQty(items: CartItem[], lineId: string, qty: number): CartItem[] {
  if (qty <= 0) return removeItem(items, lineId);

  return items.map(function capToStock(item) {
    if (item.lineId !== lineId) return item;
    return { ...item, qty: Math.min(qty, item.stock) };
  });
}

export function removeItem(items: CartItem[], lineId: string): CartItem[] {
  return items.filter((item) => item.lineId !== lineId);
}

export function setNote(items: CartItem[], lineId: string, note: string): CartItem[] {
  const target = items.find((item) => item.lineId === lineId);
  if (!target) return items;

  const nextId = makeLineId(target.menuId, note);
  if (nextId === lineId) {
    return items.map((item) => (item.lineId === lineId ? { ...item, note } : item));
  }

  const twinQty = items.find((item) => item.lineId === nextId)?.qty ?? 0;

  return items
    .filter((item) => item.lineId !== nextId)
    .map(function mergeTwin(item) {
      if (item.lineId !== lineId) return item;
      return { ...item, lineId: nextId, note, qty: Math.min(item.qty + twinQty, item.stock) };
    });
}

export function qtyOfMenu(items: CartItem[], menuId: string) {
  return items.reduce((total, item) => (item.menuId === menuId ? total + item.qty : total), 0);
}

export function calcTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  const tax = Math.round(subtotal * POS_CONFIG.tax.rate);

  return {
    subtotal,
    tax,
    total: subtotal + tax,
    itemCount: items.reduce((total, item) => total + item.qty, 0),
  };
}

export function lineTotal(item: CartItem) {
  return item.price * item.qty;
}