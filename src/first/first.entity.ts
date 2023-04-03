import { IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('first')
export class FirstEntity  {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  age: number;
}
