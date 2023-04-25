import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class PaginatorDto {
  @IsOptional()
  @Type(()=>Number)
  @IsNumber()
  page: number;
  @IsOptional()
  @Type(()=>Number)
  @IsNumber()
  nb: number;
}
