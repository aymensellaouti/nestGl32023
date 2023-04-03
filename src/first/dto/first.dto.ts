import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class FirstDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  name: string;
  @IsNumber()
  age: number;
}
