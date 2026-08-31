import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "../auth/auth.decorators";
import { UpdateStockDto } from "./dto/stock.dto";
import { MenuService } from "./menu.service";
import { CreateMenuDto, SetActiveDto, UpdateMenuDto } from "./dto/menu.dto";


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

    @Roles(Role.ADMIN)
  @Get("categories")
  listCategories() {
    return this.menuService.listCategories();
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateMenuDto) {
    return this.menuService.create(dto);
  }

  @Roles(Role.ADMIN)
  @Patch(":id/active")
  setActive(@Param("id") id: string, @Body() dto: SetActiveDto) {
    return this.menuService.setActive(id, dto.isActive);
  }

  @Roles(Role.ADMIN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateMenuDto) {
    return this.menuService.update(id, dto);
  }
}