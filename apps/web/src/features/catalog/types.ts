export type MenuRow = {
  id: string;
  name: string;
  price: number;
  stock: number;
  reservedQty: number;
  available: number;
  isActive: boolean;
  categoryId: string;
  category: string;
};

export type CategoryOption = {
  id: string;
  code: string;
  label: string;
};

/** Isi form disimpan sebagai string, karena itu yang keluar dari <input>. */
export type MenuDraft = {
  name: string;
  price: string;
  categoryId: string;
  stock: string;
};