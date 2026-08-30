import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "../auth/auth.decorators";
import { UpdateStockDto } from "./dto/stock.dto";
import { MenuService } from "./menu.service";

@Controller("menus")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get("manage")
  findForManage() {
    return this.menuService.findForManage();
  }

  @Patch(":id/sold-out")
  markSoldOut(@Param("id") id: string) {
    return this.menuService.markSoldOut(id);
  }

  @Roles(Role.ADMIN)
  @Patch(":id/stock")
  setStock(@Param("id") id: string, @Body() dto: UpdateStockDto) {
    return this.menuService.setStock(id, dto.stock);
  }
}