export type Role = "ADMIN" | "CASHIER";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};