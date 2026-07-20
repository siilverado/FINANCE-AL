import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly configService: ConfigService) {}

  async use(req: Request & { user?: any }, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = await jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      req.user = decoded;
      next();
    } catch (error) {
      this.logger.debug('Auth middleware Error');
      return res.status(UNAUTHORIZED).json({ message: 'Invalid token' });
    }
  }
}
