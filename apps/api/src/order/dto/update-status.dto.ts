import { OrderStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateStatusDto {
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}