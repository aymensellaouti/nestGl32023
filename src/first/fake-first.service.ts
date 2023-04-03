import { LoggerService } from './logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeFirstService {
  constructor(private loggerService: LoggerService) {}
  hello() {
    this.loggerService.log('In Fake first');
    return 'fake hello';
  }
}
