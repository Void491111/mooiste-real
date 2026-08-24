"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { NAV_ITEMS } from "@/config/nav.config";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";

export function PosSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex w-[76px] shrink-0 flex-col items-center gap-1 rounded-3xl bg-brand py-5">
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-white/10 text-lg font-bold text-white">
                M
            </div>

            {NAV_ITEMS.map(function renderNavItem(item) {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-label={item.label}
                        className="group relative grid size-12 place-items-center"
                    >
                        {isActive && (
                             <motion.span 
                                layoutId="nav-active"
                                transition={SPRING.snappy}
                                className="absolute inset-0 rounded-xl bg-white/15"
                             />
                        )}

                        <motion.span
                            whileHover={{ scale: 1.14 }}
                            whileTap={{ scale: 0.9 }}
                            transition={SPRING.snappy}
                            className="relative"
                        >
                            <Icon className={cn("size-5", isActive ? "text-white" : "text-white/50")} />
                        </motion.span>

                        <span className="pointer-events-none absolute left-full z-20 ml-2 hidden whitespace-nowrap rounded-lg bg-neutral-900 px-2 py-1 text-xs text-white group-hover:block">
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </aside>
    );
}