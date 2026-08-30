"use client";

import { useSession } from "@/features/auth/hooks/use-session";
import { InventoryTable } from "@/features/inventory/components/inventory-table";
import { useInventory } from "@/features/inventory/hooks/use-inventory";

export default function InventoryPage() {
  const { user } = useSession();
  const page = useInventory();

  const canEditStock = user?.role === "ADMIN";

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-3">
      <header className="flex items-baseline justify-between">
        <h1 className="text-xl font-bold text-foreground">Stok</h1>
        <p className="text-sm text-muted-foreground">
          {canEditStock ? "Ubah angka stok langsung di tabel" : "Tandai habis kalau bahan kehabisan"}
        </p>
      </header>

      {page.error !== null ? (
        <div className="grid flex-1 place-items-center rounded-card border border-danger-soft text-sm text-muted-foreground">
          {page.error}
        </div>
      ) : page.isLoading ? (
        <div className="flex-1 rounded-card bg-muted/40" />
      ) : page.isEmpty ? (
        <div className="grid flex-1 place-items-center text-sm text-muted-foreground">
          Belum ada menu
        </div>
      ) : (
        <InventoryTable
          rows={page.rows}
          canEditStock={canEditStock}
          onUpdated={page.replaceRow}
        />
      )}
    </main>
  );
}