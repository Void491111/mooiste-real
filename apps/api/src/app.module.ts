import { Module } from "@nestjs/common";
import { MenuModule } from "./menu/menu.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, MenuModule],
})
export class AppModule {}
