"use client";

import { CartBar } from "@/features/pos/components/cart-bar";
import { CartDrawer } from "@/features/pos/components/cart-drawer";
import { CartPanel } from "@/features/pos/components/cart-panel";
import { CategoryChips } from "@/features/pos/components/category-chips";
import { MenuGrid } from "@/features/pos/components/menu-grid";
import { PosHeader } from "@/features/pos/components/pos-header";
import { useCartDrawer } from "@/features/pos/hooks/use-cart-drawer";
import { useCartHydration } from "@/features/pos/hooks/use-cart-hydration";
import { useMenuFilter } from "@/features/pos/hooks/use-menu-filter";
import { useMenus } from "@/features/pos/hooks/use-menus";

export default function PosPage() {
  useCartHydration();

  const { menus, isLoading, error, refetch } = useMenus();
  const { keyword, setKeyword, category, setCategory, filtered } =
    useMenuFilter(menus);
  const drawer = useCartDrawer();

  return (
    <>
      {/* pb-16 menyisakan ruang untuk bar bawah, supaya baris menu
          terakhir tidak tertutup. Di layar lebar barnya tidak ada. */}
      <main className="flex min-w-0 flex-1 flex-col gap-3 pb-16 lg:pb-0">
        <PosHeader keyword={keyword} onKeywordChange={setKeyword} />
        <CategoryChips value={category} onChange={setCategory} />

        {isLoading ? (
          <div className="flex-1 rounded-card bg-muted/40" />
        ) : error !== null ? (
          <div className="grid flex-1 place-items-center rounded-card border border-danger-soft text-sm text-muted-foreground">
            {error}
          </div>
        ) : (
          <MenuGrid menus={filtered} />
        )}
      </main>

      <CartPanel className="hidden lg:flex" onCheckoutSuccess={refetch} />

      <CartBar onOpen={drawer.open} />

      <CartDrawer
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        onCheckoutSuccess={refetch}
      />
    </>
  );
}