import { Body, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { LoginDto } from "./dto/login-dto";
import * as bcrypt from 'bcrypt';
import { JwtDto } from "./dto/jwt.dto";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  register(registerDto: RegisterDto): Promise<User> {
    return this.userService.create(registerDto);
  }
  async login(loginDto: LoginDto): Promise<JwtDto> {
    const {password, username} = loginDto;
    // find User with username or email
    const user = await this.userService.findByUserNameOrEmail(username);
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    // If exist verify the password
    const isLoggedIn = await bcrypt.compare(password, user.password);
    if (!isLoggedIn) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    // delete user.password;
    const jwtPayload: JwtPayloadDto = {
      username : user.username,
      email : user.email,
      role : user.role,
    }
    return { jwt : this.jwtService.sign(jwtPayload) };
    //return the user without the password
  }
}
