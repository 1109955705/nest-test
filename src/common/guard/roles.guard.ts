import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const roleConstans = {
  USER: 0,
  ADMIN: 1,
};

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

const matchRoles = (requireRole, userRole) => {
  return userRole > requireRole;
};
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    console.log('RolesGuard', request.originalUrl, request.body);

    const user = {
      roles: 0,
    };
    return matchRoles(Roles, user.roles);
  }
}
