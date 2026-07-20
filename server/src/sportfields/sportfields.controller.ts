import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/Core/auth/decorators';
import { UserDTO } from 'src/Core/auth/dto';
import { OwnerRoleGuard } from 'src/Core/auth/guards';

import { CreateSportFieldDto, UpdateSportFieldDto } from './dto';
import { SportfieldsService } from './sportfields.service';

@Controller('sportfields')
export class SportfieldsController {
  constructor(private readonly sportfieldsService: SportfieldsService) {}

  @Get()
  findAll(
    // @GetUser() user: UserDTO
    ) {
    // console.log(user);
    return this.sportfieldsService.findAll();
  }

  @Get('sport/:sport')
  findWithSport(
    @Param('sport') sport: string, 
  ) {
    console.log(sport);
    
    return this.sportfieldsService.findWithSport(sport);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sportfieldsService.findOne(id);
  }

  @Post()
  @UseGuards(OwnerRoleGuard)
  async create(@Body() createSportFieldDto: CreateSportFieldDto, @GetUser() user: UserDTO) {
    return this.sportfieldsService.create(createSportFieldDto);
  }

  @Delete(':id')
  @UseGuards(OwnerRoleGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: UserDTO) {
    return this.sportfieldsService.remove(id);
  }

  @Patch(':id')
  @UseGuards(OwnerRoleGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSportFieldDto: UpdateSportFieldDto,
    @GetUser() user: UserDTO,
  ) {
    return this.sportfieldsService.update(id, updateSportFieldDto);
  }
}
