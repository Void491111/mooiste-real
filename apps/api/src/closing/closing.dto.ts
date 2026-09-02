import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateClosingDto {
  @IsInt({ message: "Jumlah uang harus berupa angka" })
  @Min(0, { message: "Jumlah uang tidak boleh minus" })
  countedCash!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: "Catatan maksimal 200 karakter" })
  note?: string;

  @IsOptional()
  @IsString()
  date?: string;
}