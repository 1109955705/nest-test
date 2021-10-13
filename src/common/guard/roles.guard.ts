import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

export const roleConstans = {
  USER: 0,
  ADMIN: 1,
};

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const NoAuth = () => SetMetadata('no-auth', true);

const matchRoles = (requireRole, userRole) => {
  return userRole > requireRole;
};

@Injectable()
export class RoleAuthGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
    if (noAuth) return true;
    const guard = RoleAuthGuard.getAuthGuard(noAuth);
    return guard.canActivate(context);
  }

  private static getAuthGuard(noAuth: boolean): IAuthGuard {
    if (noAuth) {
      return new (AuthGuard('local'))();
    } else {
      return new (AuthGuard('jwt'))();
    }
  }
}
