import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../user/entities/user.entity";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../user/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('secret')
    });
  }
  // La payloadInterface sert à typer votre code à vous de la créer selon votre payload
  // validate jwt ce qu'on retourne ici ca va etre injecté dans la requete
  async validate(payload: JwtPayloadDto) {
    console.log('in validate');
    const user: User = await this.userService.findByUserNameOrEmail(payload.username);
  if (!user) {
    throw new UnauthorizedException();
  }
  return user;
  }
}
