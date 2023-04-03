import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { of } from 'rxjs';

@Controller()
export class AppController {
  @Get()
  getHello(): any {
    return of(1, 2, 3);
  }
  @Post()
  addUser(@Body() user: any): any {
    console.log(user);
    return user.test;
  }
}
