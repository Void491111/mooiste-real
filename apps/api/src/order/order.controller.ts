import { Body, Controller, Get, Param, ParseEnumPipe, Patch, Post, Query } from "@nestjs/common";
import { OrderStatus } from "@prisma/client";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { OrderService } from "./order.service";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get("queue")
  findQueue() {
    return this.orderService.findQueue();
  }

  @Get("recent")
  findRecent() {
    return this.orderService.findRecent();
  }

  @Get()
  findToday(
    @Query("status", new ParseEnumPipe(OrderStatus, { optional: true }))
    status?: OrderStatus,
  ) {
    return this.orderService.findToday(status);
  }

  @Patch(":orderId/items/:itemId/toggle")
  toggleItem(@Param("orderId") orderId: string, @Param("itemId") itemId: string) {
    return this.orderService.toggleItem(orderId, itemId);
  }

  @Patch(":orderId/status")
  setStatus(@Param("orderId") orderId: string, @Body() dto: UpdateStatusDto) {
    return this.orderService.setStatus(orderId, dto.status);
  }
}