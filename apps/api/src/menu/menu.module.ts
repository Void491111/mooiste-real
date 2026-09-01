import { Module } from "@nestjs/common";
import { StorageModule } from "../storage/storage.module";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";

@Module({
  imports: [StorageModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}