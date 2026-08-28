import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

export const IS_PUBLIC_KEY = "isPublic";
export const ROLES_KEY = "roles";

export function Public() {
  return SetMetadata(IS_PUBLIC_KEY, true);
}

export function Roles(...roles: Role[]) {
  return SetMetadata(ROLES_KEY, roles);
}