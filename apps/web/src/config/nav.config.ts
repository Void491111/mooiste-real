import { BookOpen, Home, ListOrdered, Package, ReceiptText } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/queue", label: "Queue", icon: ListOrdered },
  { href: "/orders", label: "Orders", icon: ReceiptText },
  { href: "/report", label: "Report", icon: BookOpen },
] as const;