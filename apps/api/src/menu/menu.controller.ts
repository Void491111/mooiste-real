import { Controller, Get } from "@nestjs/common";
import { MenuService } from "./menu.service";

@Controller("menus")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll() {
    return this.menuService.findAll();
  }
}
