import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FirstService } from "./first.service";
import { FirstDto } from "./dto/first.dto";
import { FirstEntity } from "./first.entity";
import { PaginationDto } from "./dto/pagination.dto";

@Controller('first')
export class FirstController {

  constructor(
    private firstService: FirstService) {
  }
  @Get()
  hello(): string {
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
