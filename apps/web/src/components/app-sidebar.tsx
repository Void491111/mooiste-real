"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { LogOut } from "lucide-react";
import { NAV_ITEMS } from "@/config/nav.config";
import { ICON_MOTION, SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/features/pos/components/confirm-dialog";
import { logout } from "@/features/auth/api/auth.api";
import { useSession } from "@/features/auth/hooks/use-session";
import { useSessionStore } from "@/features/auth/store/session.store";
import { toast } from "sonner";
import { NotificationBell } from "@/features/notifications/components/notification-bell";

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
        className="absolute left-0 top-7.5 w-1 -translate-y-1/2 rounded-r-full bg-white"
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
          <Icon
            className={cn("size-5", isActive ? "text-white" : "text-white/60")}
          />
        </motion.span>
      </motion.span>

      <span
        className={cn(
          "text-[10px] leading-none",
          isActive ? "text-white" : "text-white/50",
        )}
      >
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const items = NAV_ITEMS.filter(function byRole(item) {
    return user !== null && item.roles.includes(user.role);
  });

  function openLogoutConfirm() {
    setIsConfirmOpen(true);
  }

  function closeLogoutConfirm() {
    setIsConfirmOpen(false);
  }

    async function handleLogout() {
    setIsConfirmOpen(false);

    try {
      await logout();
    } catch {
      toast.error("Gagal menghubungi server, sesi tetap ditutup");
    }

    setUser(null);
    router.replace("/login");
    toast.success("Berhasil keluar");
  }

  return (
    <>
      <aside className="flex h-full w-22 shrink-0 flex-col items-center bg-brand py-5">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={SPRING.snappy}
          className="mb-4 grid size-11 shrink-0 place-items-center"
        >
          <Image
            src="/logo.png"
            alt="De Mooiste"
            width={44}
            height={44}
            className="size-11"
            priority
          />
        </motion.div>

        <nav className="flex min-h-0 w-full flex-1 flex-col items-center gap-0.5 overflow-y-auto scrollbar-none">
          {items.map(function renderNavItem(item) {
            return (
              <NavItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            );
          })}
        </nav>

        {user?.role === "CASHIER" ? <NotificationBell /> : null}

        <motion.button
          type="button"
          aria-label="Keluar"
          onClick={openLogoutConfirm}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={SPRING.snappy}
          className="mt-3 grid size-10 shrink-0 place-items-center rounded-xl text-white/50 hover:text-white"
        >
          <LogOut className="size-5" />
        </motion.button>
      </aside>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Keluar dari akun?"
        description="Kamu perlu masuk lagi dengan email dan kata sandi."
        confirmLabel="Ya, keluar"
        cancelLabel="Batal"
        onCancel={closeLogoutConfirm}
        onConfirm={handleLogout}
      />
    </>
  );
}