import { IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class DateIntervalDto {
  @IsOptional()
  @Type(()=> Date)
  @IsDate()
  minDate: Date;
  @IsOptional()
  @Type(()=> Date)
  @IsDate()
  maxDate: Date;
}
