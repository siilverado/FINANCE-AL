import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { LoginUserDTO, RegisterUserDTO } from './dto/register-dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import User from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users Enpoints')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBearerAuth('token')
  @ApiCreatedResponse({ description: 'User was register' })
  @ApiResponse({ status: 400, description: 'Email already registered' })
  @ApiBody({ type: RegisterUserDTO })
  register(
    @Body()
    registerUserDTO: RegisterUserDTO,
  ): Promise<{ user: User; token: string }> {
    return this.usersService.register(registerUserDTO);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User was register', type: User })
  @ApiResponse({ status: 400, description: 'Email already registered' })
  @ApiBody({ type: LoginUserDTO })
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
  @ApiResponse({ status: 200, description: 'Return User Info', type: User })
  @ApiResponse({ status: 400, description: 'User not found' })
  authUser(@Request() req: Request & { user: any }): Promise<User> {
    const id = req.user.id;
    return this.usersService.findOne(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return All the Users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Must be a user UUID',
    example: '0abb36cb-7a5e-428f-bad2-fc326c6a14f6',
  })
  update(
    @Body()
    updateUserDTO: UpdateUserDTO,
    @Param('id') id: string,
  ): // Promise<User>
  any {
    return this.usersService.update(id, updateUserDTO);
  }
}
