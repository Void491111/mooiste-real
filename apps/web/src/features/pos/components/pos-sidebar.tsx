"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "@/config/nav.config";
import { ICON_MOTION, SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";

type NavItemProps = {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
};

function NavItem({ item, isActive }: NavItemProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const pillHeight = isActive ? 26 : hovered ? 14 : 0;

  function handleEnter() {
    setHovered(true);
  }

  function handleLeave() {
    setHovered(false);
  }

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex h-14 w-full items-center justify-center"
    >
      <motion.span
        animate={{ height: pillHeight }}
        transition={SPRING.snappy}
        className="absolute left-0 w-1 rounded-r-full bg-white"
      />

      <motion.span
        animate={{
          borderRadius: isActive || hovered ? 14 : 24,
          backgroundColor: isActive
            ? "rgba(255,255,255,0.16)"
            : hovered
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0)",
        }}
        transition={SPRING.snappy}
        className="grid size-11 place-items-center"
      >
        <motion.span whileHover={ICON_MOTION[item.motion]}>
          <Icon className={cn("size-5", isActive ? "text-white" : "text-white/60")} />
        </motion.span>
      </motion.span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: -8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.9 }}
            transition={SPRING.snappy}
            className="pointer-events-none absolute left-full z-30 ml-1 whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

export function PosSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[76px] shrink-0 flex-col items-center gap-1 rounded-3xl bg-brand py-5">
      <motion.div
        whileHover={{ borderRadius: 14, scale: 1.05 }}
        transition={SPRING.snappy}
        className="mb-4 grid size-11 place-items-center rounded-3xl bg-white/10 text-lg font-bold text-white"
      >
        M
      </motion.div>

      {NAV_ITEMS.map(function renderNavItem(item) {
        return <NavItem key={item.href} item={item} isActive={pathname === item.href} />;
      })}
    </aside>
  );
}