import { Module } from "@nestjs/common";
import { MenuModule } from "../menu/menu.module";
import { OrderModule } from "../order/order.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PublicController } from "./public.controller";

@Module({
  imports: [PrismaModule, MenuModule, OrderModule],
  controllers: [PublicController],
})
export class PublicModule {}