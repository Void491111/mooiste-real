import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CancelOrderDto {
  @IsString()
  @IsNotEmpty({ message: "Alasan pembatalan wajib diisi" })
  @MaxLength(200, { message: "Alasan maksimal 200 karakter" })
  reason!: string;
}