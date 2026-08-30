import { IsInt, Max, Min } from "class-validator";

export class UpdateStockDto {
    @IsInt()
    @Min(0)
    @Max(99999)
    stock!: number;
}