import type { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: { sub: string; name: string; role: Role };
    }
  }
}

export {};