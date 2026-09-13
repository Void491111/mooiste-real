"use client";

import { CatalogTable } from "@/features/catalog/components/catalog-table";
import { MenuForm } from "@/features/catalog/components/menu-form";
import { useCatalog } from "@/features/catalog/hooks/use-catalog";
import { useMenuForm } from "@/features/catalog/hooks/use-menu-form";
import { Panel } from "@/components/panel";
import { SearchInput } from "@/components/search-input";

export default function CatalogPage() {
  const catalog = useCatalog();
  const form = useMenuForm(catalog.upsertRow);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5">
            <header className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-medium text-foreground">Menu</h1>

        <div className="flex items-center gap-3">
          <SearchInput
            value={catalog.keyword}
            onChange={catalog.setKeyword}
            placeholder="Cari menu atau kategori…"
            className="w-64"
            inputClassName="h-9 bg-muted"
          />

          {!form.isOpen ? (
            <button
              type="button"
              onClick={form.openCreate}
              className="h-9 shrink-0 rounded-card bg-brand px-4 text-sm text-white"
            >
              Tambah menu
            </button>
          ) : null}
        </div>
      </header>

      {form.isOpen ? (
        <MenuForm
          draft={form.draft}
          categories={catalog.categories}
          isEditing={form.editing !== null}
          isSaving={form.isSaving}
          canSubmit={form.canSubmit}
          error={form.error}
          onFieldChange={form.setField}
          onSubmit={form.submit}
          onCancel={form.close}
          isUploading={form.isUploading}
          onPickImage={form.pickImage}
          onClearImage={form.clearImage}
        />
      ) : null}

      {catalog.error ? (
        <p className="text-sm text-danger-soft">{catalog.error}</p>
      ) : null}

      <Panel>
        {catalog.isLoading ? (
          <p className="text-sm text-muted-foreground">Memuat…</p>
        ) : catalog.rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {catalog.isFiltered
              ? "Ga ada menu yang cocok."
              : "Belum ada menu."}
          </p>
        ) : (
          <CatalogTable
            rows={catalog.rows}
            busyId={catalog.busyId}
            onEdit={form.openEdit}
            onToggleActive={catalog.toggleActive}
          />
        )}
      </Panel>
    </div>
  );
}