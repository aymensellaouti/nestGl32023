import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoleEnum } from "../../user/entities/user.entity";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('reflector logs');
    const from = [context.getClass(), context.getHandler()];
    console.log('All',this.reflector.getAll('roles', from));
    console.log('AllAndMerge',this.reflector.getAllAndMerge('roles', from));
    console.log('AllAndOverride',this.reflector.getAllAndOverride('roles', from));
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    /* return true; */
    if (user && user.role == UserRoleEnum.admin) {
      return true;
    }
    return false;
  }
}
