"use client";

import { CategoryChips } from "@/features/pos/components/category-chips";
import { PosHeader } from "@/features/pos/components/pos-header";
import { PosSidebar } from "@/features/pos/components/pos-sidebar";
import { useMenuFilter } from "@/features/pos/hooks/use-menu-filter";
import { MENUS_MOCK } from "@/features/pos/mock/menus.mock";
import { useCartHydration } from "@/features/pos/hooks/use-cart.hydration";

export default function PosPage() {
  const { keyword, setKeyword, category, setCategory, filtered } = useMenuFilter(MENUS_MOCK);

  return (
    <div className="flex h-screen gap-4 bg-neutral-100 p-4">
      <PosSidebar />

      <main className="flex min-w-0 flex-1 flex-col gap-3">
        <PosHeader keyword={keyword} onKeywordChange={setKeyword} />
        <CategoryChips value={category} onChange={setCategory} />

        <div className="grid flex-1 place-items-center rounded-2xl border border-dashed border-neutral-300 text-sm text-neutral-400">
          Grid menu — {filtered.length} item lolos filter
        </div>
      </main>

      <aside className="grid w-85 shrink-0 place-items-center rounded-2xl border border-dashed border-neutral-300 text-sm text-neutral-400">
        Cart panel
      </aside>
    </div>
  );
}