import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty({ message: "Nama menu wajib diisi" })
  @MaxLength(60, { message: "Nama menu maksimal 60 karakter" })
  name!: string;

  @IsInt({ message: "Harga harus berupa angka" })
  @Min(0, { message: "Harga tidak boleh minus" })
  price!: number;

  @IsString()
  @IsNotEmpty({ message: "Kategori wajib dipilih" })
  categoryId!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Nama menu tidak boleh kosong" })
  @MaxLength(60, { message: "Nama menu maksimal 60 karakter" })
  name?: string;

  @IsOptional()
  @IsInt({ message: "Harga harus berupa angka" })
  @Min(0, { message: "Harga tidak boleh minus" })
  price?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;
}

export class SetActiveDto {
  @IsBoolean()
  isActive!: boolean;
}