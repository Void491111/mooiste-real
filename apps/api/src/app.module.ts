import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt.guard";
import { RolesGuard } from "./auth/roles.guard";
import { DashboardModule } from "./dashboard/dashboard.module";
import { MenuModule } from "./menu/menu.module";
import { OrderModule } from "./order/order.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, AuthModule, MenuModule, OrderModule, DashboardModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}