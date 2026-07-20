import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { CreateSportsComplexDTO } from './dto/create-sports-complex.dto';
import { UpdateSportsComplexDTO } from './dto/update-sports-complex.dto';
import SportsComplex from './entities/sports-complex.entity';
import { SportsComplexService } from './sports-complex.service';
import { GetUser } from 'src/Core/auth/decorators';
import { AuthUserDTO } from 'src/Core/auth/dto';
import { RoleGuard } from 'src/Core/auth/guards';

@ApiTags('Sports-Complex endpoints')
@Controller('sports-complex')
export class SportsComplexController {
  constructor(
    private readonly sportsComplexService: SportsComplexService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  // @UseGuards(RoleGuard)
  @ApiOkResponse({ description: 'Create the Sports-Complex', type: CreateSportsComplexDTO })
  @ApiBody({ type: CreateSportsComplexDTO })
  @ApiBearerAuth('token')
  async create(
    @Body() createSportsComplexDto: CreateSportsComplexDTO,
    @GetUser() user: AuthUserDTO,
  ): Promise<SportsComplex> {
    const id: string = user.id;
    const userDB: User = await this.usersService.findOne(id);
    const owner = userDB.owner;
    if (!owner) {
      throw new Error('User is not owner');
    }
    return this.sportsComplexService.create(createSportsComplexDto, owner);
  }

  @Get()
  @ApiOkResponse({ description: 'Return all the Sport Complex', type: SportsComplex })
  async findAll(): Promise<SportsComplex[]> {
    return this.sportsComplexService.findAll();
  }

  @Get('/ownerID/:id')
  @ApiOkResponse({ description: 'Return the Complex with the indicated id' })
  @ApiParam({ name: 'id', description: 'Must be a Complex UUID ' })
  async findOne(@Param('id') id: string): Promise<SportsComplex> {
    return this.sportsComplexService.findOne(id);
  }

  @Get('/owner')
  @UseGuards(RoleGuard)
  @ApiOkResponse({ description: 'Returns the complexes of the authenticated owner' })
  async findAllOfOwner(@GetUser() user: AuthUserDTO) {
    // const id: string = user.id;
    // const user: User = await this.usersService.findOne(id);
    const owner = user.owner;
    if (!owner) {
      throw new Error('User is not owner');
    }

    return this.sportsComplexService.findAllOfOwner(owner);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SportsComplex, description: 'Update the Complex Info' })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiParam({ name: 'id', description: 'Must be the Complex UUID' })
  @ApiBody({ type: UpdateSportsComplexDTO })
  async update(
    @Param('id') id: string,
    @Body() updateSportsComplexDTO: UpdateSportsComplexDTO,
    @Req() req: Request & { user: any },
  ) {
    const idUser: string = req.user.id;
    const user: User = await this.usersService.findOne(idUser);
    const owner = user.owner;
    if (!owner) {
      throw new Error('User is not owner');
    }

    return this.sportsComplexService.update(owner.id, id, updateSportsComplexDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request & { user: any }) {
    const idUser: string = req.user.id;
    const user: User = await this.usersService.findOne(idUser);
    const owner = user.owner;
    if (!owner) {
      throw new Error('User is not owner');
    }
    return this.sportsComplexService.remove(id, owner.id);
  }
}
