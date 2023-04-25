import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common";
import { FirstService } from "./first.service";
import { FirstDto } from "./dto/first.dto";
import { FirstEntity } from "./first.entity";
import { PaginationDto } from "./dto/pagination.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../user/entities/user.entity";
import { GetUser } from "../auth/decorator/get-user.decorator";

@Controller('first')
export class FirstController {

  constructor(
    private firstService: FirstService) {
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  hello(@GetUser() user): string {
    console.log(user);
    return this.firstService.hello();
  }
  @Post()
  postHello(
    @Body() data: FirstDto): Promise<FirstEntity> {
    return this.firstService.addFirst(data);
  }

  @Get('all')
  getFirsts(@Query() paginationDto: PaginationDto): Promise<FirstEntity[]> {

    return this.firstService.getAll(paginationDto);
  }
}
