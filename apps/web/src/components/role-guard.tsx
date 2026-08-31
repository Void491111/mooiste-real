"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { homeHrefFor, NAV_ITEMS } from "@/config/nav.config";
import { useSession } from "@/features/auth/hooks/use-session";

export function RoleGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useSession();

  const item = NAV_ITEMS.find(function byHref(nav) {
    return nav.href === pathname;
  });

  // Halaman yang tidak terdaftar di NAV_ITEMS dibiarkan lewat —
  // penjaga sebenarnya tetap ada di backend lewat @Roles.
  const isAllowed =
    user === null || item === undefined || item.roles.includes(user.role);

  useEffect(
    function redirectWhenNotAllowed() {
      if (user !== null && !isAllowed) {
        router.replace(homeHrefFor(user.role));
      }
    },
    [isAllowed, user, router],
  );

  if (!isAllowed) return null;

  return <>{children}</>;
}