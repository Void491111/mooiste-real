"use client";

import { CartPanel } from "@/features/pos/components/cart-panel";
import { CategoryChips } from "@/features/pos/components/category-chips";
import { MenuGrid } from "@/features/pos/components/menu-grid";
import { PosHeader } from "@/features/pos/components/pos-header";
import { useCartHydration } from "@/features/pos/hooks/use-cart-hydration";
import { useMenuFilter } from "@/features/pos/hooks/use-menu-filter";
import { useMenus } from "@/features/pos/hooks/use-menus";

export default function PosPage() {
  useCartHydration();

  const { menus, isLoading, error } = useMenus();
  const { keyword, setKeyword, category, setCategory, filtered } = useMenuFilter(menus);

  return (
    <>
      <main className="flex min-w-0 flex-1 flex-col gap-3">
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

      <CartPanel />
    </>
  );
}