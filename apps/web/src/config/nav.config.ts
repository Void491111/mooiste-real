import {
  BookOpen,
  Home,
  LayoutDashboard,
  ListOrdered,
  Package,
  ReceiptText,
  UtensilsCrossed,
} from "lucide-react";
import type { IconMotion } from "./motion.config";
import type { Role } from "@/features/auth/types";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  motion: IconMotion;
  roles: Role[];
};

/** Halaman pertama yang boleh diakses peran ini. Urutan NAV_ITEMS yang menentukan. */
export function homeHrefFor(role: Role) {
  const first = NAV_ITEMS.find(function byRole(item) {
    return item.roles.includes(role);
  });

  return first ? first.href : "/";
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dasbor", icon: LayoutDashboard, motion: "wiggle", roles: ["ADMIN"] },
  { href: "/", label: "Kasir", icon: Home, motion: "pop", roles: ["CASHIER"] },
  { href: "/queue", label: "Antrian", icon: ListOrdered, motion: "swing", roles: ["CASHIER"] },
  { href: "/orders", label: "Pesanan", icon: ReceiptText, motion: "pop", roles: ["ADMIN", "CASHIER"] },
  { href: "/inventory", label: "Stok", icon: Package, motion: "wiggle", roles: ["ADMIN", "CASHIER"] },
  { href: "/catalog", label: "Menu", icon: UtensilsCrossed, motion: "pop", roles: ["ADMIN"] },
  { href: "/report", label: "Laporan", icon: BookOpen, motion: "wiggle", roles: ["ADMIN"] },
];