import { LoggerService } from "./logger.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FirstEntity } from "./first.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FirstDto } from "./dto/first.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { paginate } from "./helpers/pagination.db-helper";

@Injectable()
export class FirstService {
  constructor(
    @InjectRepository(FirstEntity)
    private firstRepository: Repository<FirstEntity>,
    private loggerService: LoggerService) {
  }
  hello() {
    const qb = this.firstRepository.createQueryBuilder('first');
    console.log(qb);
    this.loggerService.log('In  first');
    return 'hello    ';
  }

  addFirst(first: FirstDto): Promise<FirstEntity> {
    return this.firstRepository.save(first);
  }

  getAll(paginationDto: PaginationDto): Promise<FirstEntity[]> {
    const qb = this.firstRepository.createQueryBuilder('first');
    const {page, nb} = paginationDto;
      paginate<FirstEntity>(qb, page, nb);
      return qb
        .getMany();
  }


}
