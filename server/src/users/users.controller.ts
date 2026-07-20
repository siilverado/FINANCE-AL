import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';

import { LoginUserDTO, RegisterUserDTO } from './dto/register-dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import User from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(
    @Body()
    registerUserDTO: RegisterUserDTO,
  ): Promise<{ user: User; token: string }> {
    return this.usersService.register(registerUserDTO);
  }

  @Post('login')
  login(
    @Body()
    loginUserDTO: LoginUserDTO,
  ): Promise<{ user: User; token: string }> {
    return this.usersService.login(loginUserDTO);
  }

  // @Get(":id")
  // findOne(@Param("id") id: string
  // ) : Promise<User> {
  //   return this.usersService.findOne(id);
  // }

  @Get('auth')
  authUser(@Request() req: Request & { user: any }): Promise<User> {
    const id = req.user.id;
    return this.usersService.findOne(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(
    @Body()
    updateUserDTO: UpdateUserDTO,
    @Param('id') id: string,
  ): // Promise<User>
  any {
    return this.usersService.update(id, updateUserDTO);
  }
}
