export type GuestMenu = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  category: string;
  stock: number;
};

export type GuestCartItem = {
  menuId: string;
  name: string;
  price: number;
  image: string | null;
  stock: number;
  qty: number;
  note: string;
};

export type GuestOrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "IN_PROGRESS"
  | "READY"
  | "DONE"
  | "CANCELLED"
  | "EXPIRED";

export type GuestOrder = {
  id: string;
  number: string;
  status: GuestOrderStatus;
  total: number;
  tableNumber: string | null;
  cancelReason: string | null;
  createdAt: string;
  items: { id: string; name: string; qty: number; price: number }[];
};