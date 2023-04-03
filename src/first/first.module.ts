import { Module } from '@nestjs/common';
import { FirstController } from './first.controller';
import { FirstService } from './first.service';
import { LoggerService } from './logger.service';
import { FakeFirstService } from './fake-first.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirstEntity } from "./first.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FirstEntity])
  ],
  controllers: [FirstController],
  providers: [
    {
      provide: FirstService,
      useClass: FirstService,
    },
    LoggerService,
  ],
})
export class FirstModule {}
