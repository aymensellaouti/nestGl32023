import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from "rxjs";

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before');
    const start = new Date();
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap((response) => {
        console.log(`Time:  ${new Date().getTime() - start.getTime()} ms`);
      }),
      // map((reqResponse) => ({ data: reqResponse}))
    );
  }
}
