import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { GetUser } from './decorators';
import { AuthUserDTO } from './dto';

import { GoogleAuthGuard } from './utils/Guards';

@ApiTags('Auth endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(
    @Req() req: Request & { user?: any },
    @Res() res: Response,
  ): Promise<any> {
    const { user, token } = await this.usersService.findOrCreate(req.user);
    return res.redirect(`${process.env.FRONT_URL}?token=${token}`);
  }

  @Get('refresh')
  async refresh(@GetUser() user: AuthUserDTO) {
    const userDB = await this.usersService.findOne(user.id);
    return await this.usersService.generateToken(userDB);
  }
}
