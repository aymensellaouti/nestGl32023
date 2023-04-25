import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { GenericCrudService } from "../generics/service/generic-crud.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterDto } from "../auth/dto/register.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService extends GenericCrudService<User>{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const user = this.userRepository.create(registerDto);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    let newUser;
    try {
      newUser = await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        'le username et le email doivent être unique',
      );
    }
    return newUser;
  }

  findByUserNameOrEmail(identifier: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{ username: identifier }, { email: identifier }],
    });
  }
}
