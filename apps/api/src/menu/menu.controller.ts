import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role } from "@prisma/client";
import { Roles } from "../auth/auth.decorators";
import { StorageService, type UploadedImage } from "../storage/storage.service";
import { CreateMenuDto, SetActiveDto, UpdateMenuDto } from "./dto/menu.dto";
import { UpdateStockDto } from "./dto/stock.dto";
import { MenuService } from "./menu.service";

@Controller("menus")
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly storage: StorageService,
  ) {}

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get("manage")
  findForManage() {
    return this.menuService.findForManage();
  }

  @Roles(Role.ADMIN)
  @Get("categories")
  listCategories() {
    return this.menuService.listCategories();
  }

  @Roles(Role.ADMIN)
  @Post("image")
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(@UploadedFile() file: UploadedImage) {
    return this.storage.uploadMenuImage(file);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateMenuDto) {
    return this.menuService.create(dto);
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
  @Patch(":id/active")
  setActive(@Param("id") id: string, @Body() dto: SetActiveDto) {
    return this.menuService.setActive(id, dto.isActive);
  }

  // Harus paling bawah: ":id" cocok dengan apa pun, jadi kalau ditaruh
  // di atas, dia menelan "/stock", "/active", dan "/sold-out".
  @Roles(Role.ADMIN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateMenuDto) {
    return this.menuService.update(id, dto);
  }
}