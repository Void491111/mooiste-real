"use client";

import { CategoryChips } from "@/features/pos/components/category-chips";
import { MenuGrid } from "@/features/pos/components/menu-grid";
import { PosHeader } from "@/features/pos/components/pos-header";
import { PosSidebar } from "@/features/pos/components/pos-sidebar";
import { useCartHydration } from "@/features/pos/hooks/use-cart-hydration";
import { useMenuFilter } from "@/features/pos/hooks/use-menu-filter";
import { MENUS_MOCK } from "@/features/pos/mock/menus.mock";
import { CartPanel } from "@/features/pos/components/cart-panel";

export default function PosPage() {
  useCartHydration();

  const { keyword, setKeyword, category, setCategory, filtered } = useMenuFilter(MENUS_MOCK);

  return (
    <div className="flex h-screen gap-4 bg-background p-4">
      <PosSidebar />

      <main className="flex min-w-0 flex-1 flex-col gap-3">
        <PosHeader keyword={keyword} onKeywordChange={setKeyword} />
        <CategoryChips value={category} onChange={setCategory} />
        <MenuGrid menus={filtered} />
      </main>

      <CartPanel />
      
    </div>
  );
}