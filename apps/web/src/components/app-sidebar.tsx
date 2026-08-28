"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { NAV_ITEMS } from "@/config/nav.config";
import { ICON_MOTION, SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/api/auth.api";
import { useSession } from "@/features/auth/hooks/use-session";
import { useSessionStore } from "@/features/auth/store/session.store";

type NavItemProps = {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
};

function NavItem({ item, isActive }: NavItemProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const pillHeight = isActive ? 30 : hovered ? 16 : 0;

  function handleEnter() {
    setHovered(true);
  }

  function handleLeave() {
    setHovered(false);
  }

  return (
    <Link
      href={item.href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex w-full flex-col items-center gap-1 py-2.5"
    >
      <motion.span
        animate={{ height: pillHeight }}
        transition={SPRING.snappy}
        className="absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-white"
      />

      <motion.span
        animate={{
          borderRadius: isActive || hovered ? 12 : 20,
          backgroundColor: isActive
            ? "rgba(255,255,255,0.16)"
            : hovered
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0)",
        }}
        transition={SPRING.snappy}
        className="grid size-10 place-items-center"
      >
        <motion.span whileHover={ICON_MOTION[item.motion]}>
          <Icon className={cn("size-5", isActive ? "text-white" : "text-white/60")} />
        </motion.span>
      </motion.span>

      <span className={cn("text-[10px] leading-none", isActive ? "text-white" : "text-white/50")}>
        {item.label}
      </span>
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useSession();
  const setUser = useSessionStore((state) => state.setUser);

  const items = NAV_ITEMS.filter(function byRole(item) {
    return user !== null && item.roles.includes(user.role);
  });

  async function handleLogout() {
    await logout();
    setUser(null);
    router.replace("/login");
  }

  return (
    <aside className="flex w-22 shrink-0 flex-col items-center gap-0.5 rounded-3xl bg-brand py-5">
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={SPRING.snappy}
        className="mb-4 grid size-11 place-items-center"
      >
        <Image src="/logo.png" alt="De Mooiste" width={44} height={44} className="size-11" priority />
      </motion.div>

      {items.map(function renderNavItem(item) {
        return <NavItem key={item.href} item={item} isActive={pathname === item.href} />;
      })}

      <motion.button
        type="button"
        aria-label="Keluar"
        onClick={handleLogout}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={SPRING.snappy}
        className="mt-auto grid size-10 place-items-center rounded-xl text-white/50 hover:text-white"
      >
        <LogOut className="size-5" />
      </motion.button>
    </aside>
  );
}