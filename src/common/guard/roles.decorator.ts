import { SetMetadata } from '@nestjs/common';

export const roleConstans = {
  USER: 0,
  ADMIN: 1,
};

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
