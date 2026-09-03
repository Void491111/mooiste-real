import { Body, Controller, Get, Param, ParseEnumPipe, Patch, Post, Query } from "@nestjs/common";
import { OrderStatus } from "@prisma/client";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { OrderService } from "./order.service";
import { CurrentUser, userIdOf, type SessionUser } from "../auth/auth.decorators";
import { CancelOrderDto } from "./dto/cancel-order-dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto, @CurrentUser() user: SessionUser) {
    return this.orderService.create(dto, userIdOf(user))
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
  findByDate(
    @Query("date") date?: string,
    @Query("status", new ParseEnumPipe(OrderStatus, { optional: true }))
    status?: OrderStatus,
  ) {
    return this.orderService.findByDate(date, status);
  }

  @Patch(":orderId/items/:itemId/toggle")
  toggleItem(@Param("orderId") orderId: string, @Param("itemId") itemId: string) {
    return this.orderService.toggleItem(orderId, itemId);
  }

  @Patch(":orderId/status")
  setStatus(@Param("orderId") orderId: string, @Body() dto: UpdateStatusDto) {
    return this.orderService.setStatus(orderId, dto.status);
  }

    @Patch(":orderId/cancel")
  cancel(
    @Param("orderId") orderId: string,
    @Body() dto: CancelOrderDto,
    @CurrentUser() user: SessionUser,
  ) {
    return this.orderService.cancel(orderId, dto, userIdOf(user));
  }
}