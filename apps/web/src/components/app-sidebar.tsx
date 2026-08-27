"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
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

  return (
    <aside className="flex w-22 shrink-0 flex-col items-center gap-0.5 rounded-3xl bg-brand py-5">
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={SPRING.snappy}
        className="mb-4 grid size-11 place-items-center"
      >
        <Image src="/logo.png" alt="De Mooiste" width={44} height={44} className="size-11" priority />
      </motion.div>

      {NAV_ITEMS.map(function renderNavItem(item) {
        return <NavItem key={item.href} item={item} isActive={pathname === item.href} />;
      })}
    </aside>
  );
}