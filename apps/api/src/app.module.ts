import { Module } from "@nestjs/common";
import { MenuModule } from "./menu/menu.module";
import { OrderModule } from "./order/order.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, MenuModule, OrderModule],
})
export class AppModule {}