import { BookOpen, Home, ListOrdered, Package, ReceiptText } from "lucide-react";
import type { IconMotion } from "./motion.config";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  motion: IconMotion;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: Home, motion: "bounce" },
  { href: "/inventory", label: "Inventory", icon: Package, motion: "wiggle" },
  { href: "/queue", label: "Queue", icon: ListOrdered, motion: "swing" },
  { href: "/orders", label: "Orders", icon: ReceiptText, motion: "pop" },
  { href: "/report", label: "Report", icon: BookOpen, motion: "spin" },
];