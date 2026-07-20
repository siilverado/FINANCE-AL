import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

import { GoogleAuthGuard } from './utils/Guards';

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

  @Get('status')
  user(@Req() request: Request, @Res() response: Response) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
