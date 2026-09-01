import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";
import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";
export const ROLES_KEY = "roles";

export function Public() {
  return SetMetadata(IS_PUBLIC_KEY, true);
}

export function Roles(...roles: Role[]) {
  return SetMetadata(ROLES_KEY, roles);
}

export type SessionUser = {
  sub?: string;
  id?: string;
  role: Role;
};

export const CurrentUser = createParamDecorator(
  function readSessionUser(_data: unknown, context: ExecutionContext) {
    return context.switchToHttp().getRequest().user as SessionUser;
  },
);

export function userIdOf(user: SessionUser | undefined) {
  return user?.sub ?? user?.id ?? null;
}