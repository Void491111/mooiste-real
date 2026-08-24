import type { Menu } from "../types";

export const MENUS_MOCK: Menu[] = [
  { id: "m1", name: "Kopi Gula Aren", price: 28000, image: "/menu/gula-aren.png", category: "COFFEE", stock: 73 },
  { id: "m2", name: "Cappuccino", price: 30000, image: "/menu/cappuccino.png", category: "COFFEE", stock: 12 },
  { id: "m3", name: "Americano", price: 24000, image: "/menu/americano.png", category: "COFFEE", stock: 0 },
  { id: "m4", name: "Matcha Latte", price: 32000, image: "/menu/matcha.png", category: "NON_COFFEE", stock: 8 },
  { id: "m5", name: "Croissant", price: 22000, image: "/menu/croissant.png", category: "FOOD", stock: 5 },
  { id: "m6", name: "Es Teh Manis", price: 12000, image: "/menu/es-teh.png", category: "NON_COFFEE", stock: 40 },
];