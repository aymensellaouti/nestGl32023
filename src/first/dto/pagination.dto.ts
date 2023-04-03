import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {

  @IsOptional()
  @IsNumber()
  @Type((TypeVersLequelConvertir) => Number)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nb: number;
}
