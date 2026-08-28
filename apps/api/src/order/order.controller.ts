import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";

@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.orderService.create(dto);
    }
}