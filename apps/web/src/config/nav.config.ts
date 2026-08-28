import { BookOpen, Home, ListOrdered, Package, ReceiptText } from "lucide-react";
import type { IconMotion } from "./motion.config";
import type { Role } from "@/features/auth/types";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  motion: IconMotion;
  roles: Role[];
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Kasir", icon: Home, motion: "bounce", roles: ["ADMIN", "CASHIER"] },
  { href: "/queue", label: "Antrian", icon: ListOrdered, motion: "swing", roles: ["ADMIN", "CASHIER"] },
  { href: "/orders", label: "Pesanan", icon: ReceiptText, motion: "pop", roles: ["ADMIN", "CASHIER"] },
  { href: "/inventory", label: "Stok", icon: Package, motion: "wiggle", roles: ["ADMIN", "CASHIER"] },
  { href: "/report", label: "Laporan", icon: BookOpen, motion: "spin", roles: ["ADMIN", "CASHIER"] },
];