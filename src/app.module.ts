import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FirstModule } from "./first/first.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    FirstModule,
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
export class AppModule {
}
