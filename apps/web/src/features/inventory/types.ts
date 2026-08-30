export type InventoryRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  reservedQty: number;
  available: number;
  isActive: boolean;
};