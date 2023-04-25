import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { FirstService } from "../first/first.service";
import { FirstEntity } from "../first/first.entity";
import {v4 as uuidV4} from 'uuid';
import { UserService } from "../user/user.service";
import {
  randEmail,
  randPassword,
  randUserName
} from "@ngneat/falso";
import { User } from "../user/entities/user.entity";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Todo :  Do What you want
  const firstService: FirstService = app.get(FirstService);
  const userService = app.get(UserService);
  for (let i = 0; i < 10; i++) {
    const first = new FirstEntity();
    first.id = uuidV4();
    first.age = i + 18;
    first.name = `first + ${i}`;
    await firstService.addFirst(first);
  }
  for (let i = 0; i < 10; i++) {
    const user = new User();
    user.username = randUserName();
    user.email = randEmail();
    user.password = randPassword();
    await userService.create(user);
  }
  console.log('users Added To the DB....');
  await app.close();
}
bootstrap();
