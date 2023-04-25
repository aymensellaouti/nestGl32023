import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FirstModule } from "./first/first.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirstMiddleware } from "./first.middleware";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { preprodConfig } from "./config/preprod.config";
import { devConfig } from "./config/dev.config";

@Module({
  imports: [
    FirstModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [process.env.NODE_ENV == 'dev' ? devConfig : preprodConfig]
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestgl32023',
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware).forRoutes('');
  }
}
