import { Type } from "class-transformer";
import { OrderSource, OrderType } from "@prisma/client";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { PaymentMethod } from "@prisma/client";


export class CreateOrderItemDto {
  @IsString()
  menuId!: string;

  @IsInt()
  @Min(1)
  qty!: number;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  note?: string;
}

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(PaymentMethod, { message: "Cara bayar tidak dikenali "})
  paymentMethod?: PaymentMethod;

  @IsEnum(OrderType)
  type!: OrderType;

  @IsOptional()
  @IsEnum(OrderSource)
  source?: OrderSource;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  idempotencyKey?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}