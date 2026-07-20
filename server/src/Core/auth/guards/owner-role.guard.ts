import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OwnerRoleGuard implements CanActivate {
  private logger = new Logger(OwnerRoleGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    this.logger.debug('running roleguard');

    if (!user) throw new ForbiddenException('Unauthorize');

    if (user?.roles) throw new BadRequestException('Invalid User');

    if (user.role !== 'owner') return false;

    return true;
  }
}
