import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { JwtStrategy } from "./strategy/Jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        signOptions: {
          expiresIn: 3600
        },
        secret: config.get('secret')
      }),
      inject: [ConfigService]
    })
  ]
})
export class AuthModule {}
