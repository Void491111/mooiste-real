import type { Menu } from "../types";

export const MENUS_MOCK: Menu[] = [
  { id: "m1", name: "Kopi Gula Aren", price: 28000, image: "/menu/gula-aren.png", category: "COFFEE", stock: 73 },
  { id: "m2", name: "Cappuccino", price: 30000, image: "/menu/cappuccino.png", category: "COFFEE", stock: 12 },
  { id: "m3", name: "Americano", price: 24000, image: "/menu/americano.png", category: "COFFEE", stock: 0 },
  { id: "m4", name: "Matcha Latte", price: 32000, image: "/menu/matcha.png", category: "NON_COFFEE", stock: 8 },
  { id: "m5", name: "Croissant", price: 22000, image: "/menu/croissant.png", category: "FOOD", stock: 5 },
  { id: "m6", name: "Es Teh Manis", price: 12000, image: "/menu/es-teh.png", category: "NON_COFFEE", stock: 40 },
  { id: "m7", name: "Pisang Goreng", price: 18000, image: "/menu/pisang-goreng.png", category: "SNACK", stock: 24 },
  { id: "m8", name: "Kentang Goreng", price: 20000, image: "/menu/kentang-goreng.png", category: "SNACK", stock: 15 },
  { id: "m9", name: "Roti Bakar Coklat", price: 16000, image: "/menu/roti-bakar.png", category: "SNACK", stock: 0 },
  { id: "m10", name: "Onion Ring", price: 22000, image: "/menu/onion-ring.png", category: "SNACK", stock: 7 },
];