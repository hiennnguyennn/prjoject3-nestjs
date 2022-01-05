import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private authService: AuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (role === 'user') return true;
    else if (role === 'staff')
      return this.authService.checkRole(user.id, [1, 2]);
    else if (role === 'manager')
      return this.authService.checkRole(user.id, [2]);
  }
}
