import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeStampEntity } from "../../generics/Model/date-time-stamp.entity";
import { Exclude, Expose } from "class-transformer";

export enum UserRoleEnum {
  admin = 'admin',
  user = 'user'
}

@Entity()
export class User extends DateTimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true
  })
  username: string;
  @Column({
    unique: true
  })
  email: string;
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: "enum",
    enum: UserRoleEnum,
    default: UserRoleEnum.user
  })
  role: UserRoleEnum;
}
