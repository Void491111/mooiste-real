import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { OrderSource } from "@prisma/client";
import { Public } from "../auth/auth.decorators";
import { MenuService } from "../menu/menu.service";
import { CreateOrderDto } from "../order/dto/create-order.dto";
import { OrderService } from "../order/order.service";
import { PrismaService } from "../prisma/prisma.service";

@Public()
@Controller("public")
export class PublicController {
  constructor(
    private readonly menuService: MenuService,
    private readonly orderService: OrderService,
    private readonly prisma: PrismaService,
  ) {}

  @Get("menus")
  findMenus() {
    return this.menuService.findAll();
  }

  // source dipaksa QR di sini, bukan diambil dari body — supaya pengunjung
  // tidak bisa membuat pesanan yang langsung berstatus lunas.
  @Post("orders")
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(
      { ...dto, source: OrderSource.QR, paymentMethod: undefined },
      null,
    );
  }

  @Get("orders/:id")
  async findOne(@Param("id") id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        number: true,
        status: true,
        total: true,
        tableNumber: true,
        cancelReason: true,
        createdAt: true,
        items: { select: { id: true, name: true, qty: true, price: true } },
      },
    });

    if (!order) {
      throw new NotFoundException("Pesanan tidak ditemukan");
    }

    return order;
  }
}