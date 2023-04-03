import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { FirstService } from "../first/first.service";
import { FirstEntity } from "../first/first.entity";
import {v4 as uuidV4} from 'uuid';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Todo :  Do What you want
  const firstService: FirstService = app.get(FirstService);

  for (let i = 0; i < 10; i++) {
    const first = new FirstEntity();
    first.id = uuidV4();
    first.age = i + 18;
    first.name = `first + ${i}`;
    await firstService.addFirst(first);
  }
  await app.close();
}
bootstrap();
