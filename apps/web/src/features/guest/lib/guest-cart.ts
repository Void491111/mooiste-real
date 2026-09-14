import { POS_CONFIG } from "@/config/pos.config";
import type { GuestCartItem, GuestMenu } from "../types";

export function addItem(
  items: GuestCartItem[],
  menu: GuestMenu,
  qty: number,
  note: string,
): GuestCartItem[] {
  const existing = items.find(function byMenu(item) {
    return item.menuId === menu.id;
  });

  if (!existing) {
    return [
      ...items,
      {
        menuId: menu.id,
        name: menu.name,
        price: menu.price,
        image: menu.image,
        stock: menu.stock,
        qty: Math.min(qty, menu.stock),
        note,
      },
    ];
  }

  return items.map(function bump(item) {
    if (item.menuId !== menu.id) return item;

    return {
      ...item,
      qty: Math.min(item.qty + qty, item.stock),
      note: note.length > 0 ? note : item.note,
    };
  });
}

export function setQty(
  items: GuestCartItem[],
  menuId: string,
  qty: number,
): GuestCartItem[] {
  if (qty <= 0) {
    return items.filter(function keepOthers(item) {
      return item.menuId !== menuId;
    });
  }

  return items.map(function capToStock(item) {
    if (item.menuId !== menuId) return item;
    return { ...item, qty: Math.min(qty, item.stock) };
  });
}

export function totalsOf(items: GuestCartItem[]) {
  const subtotal = items.reduce(function sumLine(total, item) {
    return total + item.price * item.qty;
  }, 0);

  const tax = Math.round(subtotal * POS_CONFIG.tax.rate);

  const count = items.reduce(function sumQty(total, item) {
    return total + item.qty;
  }, 0);

  return { subtotal, tax, total: subtotal + tax, count };
}