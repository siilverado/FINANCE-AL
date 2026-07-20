import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { SportsService } from './sports.service';
import { Sport } from './entities/sport.entity';

@ApiTags('Sports Enpoints')
@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) { }

  @Get()
  @ApiOkResponse({
    schema: {
      example: [{
        "name": "football",
        "images": [
          "https://img.freepik.com/fotos-premium/cerca-delantero-futbol-listo-patear-pelota-fuego-estadio_207634-7.jpg?w=2000"
        ],
        "id": "cd92a17a-d865-4b1b-b871-6d8ca1dc84d2"
      },]
    }, description: "Return All the Sport"
  })
  findAll() {
    return this.sportsService.findAll();
  }

  @Get(':name')
  @ApiOkResponse({
    description: "Return all the Sports Fields for that Sport",
    schema: {
      example: [
        {
          "id": "9e5bf28f-09d2-4989-be9e-23a2e85b530d",
          "name": "basketball",
          "images": [
            "https://img.freepik.com/foto-gratis/aro-baloncesto_1127-3376.jpg"
          ],
          "sportfields": []
        }
      ]
    }
  })
  @ApiParam({ name: 'name', example: "basketball" })
  findOne(@Param('name') name: string) {
    return this.sportsService.findOne(name);
  }
}
