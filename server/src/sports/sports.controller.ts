import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  findAll() {
    return this.sportsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.sportsService.findOne(name);
  }
}
