import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@carmaconcierge/shared';
import { ROLES_KEY } from '../guards/roles.guard';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
