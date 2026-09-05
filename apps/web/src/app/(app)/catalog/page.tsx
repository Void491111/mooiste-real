"use client";

import { CatalogTable } from "@/features/catalog/components/catalog-table";
import { MenuForm } from "@/features/catalog/components/menu-form";
import { useCatalog } from "@/features/catalog/hooks/use-catalog";
import { useMenuForm } from "@/features/catalog/hooks/use-menu-form";
import { Panel } from "@/components/panel";

export default function CatalogPage() {
  const catalog = useCatalog();
  const form = useMenuForm(catalog.upsertRow);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-medium text-foreground">Menu</h1>

        {!form.isOpen ? (
          <button
            type="button"
            onClick={form.openCreate}
            className="h-9 rounded-card bg-brand px-4 text-sm text-white"
          >
            Tambah menu
          </button>
        ) : null}
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