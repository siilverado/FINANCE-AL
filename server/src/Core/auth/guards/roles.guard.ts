import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthUserDTO } from '../dto';
import { Role } from '../role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger = new Logger(RoleGuard.name);

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: AuthUserDTO = req.user;

    if (!user) throw new ForbiddenException('Unauthorize');

    if (!user?.roles) throw new BadRequestException('Invalid User');

    if (!user.roles.includes(Role.Owner)) return false;

    return true;
  }
}
