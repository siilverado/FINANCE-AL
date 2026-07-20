import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
  ParseFloatPipe,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/Core/auth/decorators';
import { AuthUserDTO } from 'src/Core/auth/dto';
import { RoleGuard } from 'src/Core/auth/guards';

import { CreateSportFieldDto, GetDayAvailabilityDto, UpdateSportFieldDto } from './dto';
import { SportfieldsService } from './sportfields.service';
import SportField from './entities/sportfield.entity';

@ApiTags('SportFields Endpoints')
@Controller('sportfields')
export class SportfieldsController {
  constructor(private readonly sportfieldsService: SportfieldsService) {}

  @Get()
  @ApiOkResponse({
    description: "Return all the owner's sportfields",
    schema: {
      example: [
        {
          id: '4ff167ae-c194-43de-9953-19c63e4cb31d',
          name: 'El Monumental',
          description: 'Cancha de futbol 11 de pasto natural.',
          dimensions: '90x45',
          images: ['https://donpotrero.com/img/posts/2/medidas_sm.jpg'],
          sportsComplex: {
            name: 'Centro de Alto Rendimiento Deportivo Amadeo Nuccetelli',
            sportsComplexId: 'bff07355-1d81-46af-ae2e-7f26dac671ff',
          },
          availability: [],
          sport: 'basketball',
        },
      ],
    },
  })
  @ApiNotFoundResponse({ description: 'Sportfield not found' })
  findAll(@GetUser() user: AuthUserDTO) {
    return this.sportfieldsService.findAll(user);
  }

  @Get('sport/:sport')
  @ApiOkResponse({
    description: 'Return all the sportsfields of that sport ',
    schema: {
      example: [
        {
          id: '0ae38bfb-d796-4f24-8921-495c1e98a63b',
          name: 'basketball',
          images: ['https://img.freepik.com/foto-gratis/aro-baloncesto_1127-3376.jpg'],
          sportfields: [
            {
              id: '4ff167ae-c194-43de-9953-19c63e4cb31d',
              name: 'El Monumental',
              images: ['https://donpotrero.com/img/posts/2/medidas_sm.jpg'],
            },
            {
              id: 'd5413d17-3ed5-4218-8045-41459594f02f',
              name: 'Staples Center',
              images: ['https://integralspor.com/uploads/blog/detail/162445d5fbd2b893161.jpg'],
            },
            {
              id: '0db8f823-f076-42ed-9be6-cfc43b786b1d',
              name: 'Madison Center',
              images: [
                'https://www.geoplastglobal.com/wp-content/uploads/2016/09/basket_indoor_gripper_geoplast-3.jpg',
              ],
            },
            {
              id: '1b2e3a9f-43a7-43e6-807d-42e9f689f977',
              name: 'Quality Sport',
              images: [
                'https://www.qualitysportinstalacionesdeportivas.com/wp-content/uploads/2022/05/tipos-de-superficies-de-pista-de-basket.png',
              ],
            },
            {
              id: 'b2656725-c2ab-4494-b753-9a9bf760531c',
              name: 'United Center',
              images: [
                'https://www.revistaelabasto.com.ar/wp-content/uploads/2021/03/156221395_4205449606134895_5504940228789878318_o.jpg',
              ],
            },
            {
              id: '1c3fcf21-c81d-4e4e-9248-bc376c3a3b95',
              name: 'American Airlines Center',
              images: [
                'https://www.qualitysportinstalacionesdeportivas.com/wp-content/uploads/2022/05/tipos-de-superficies-de-pista-de-basket.png',
              ],
            },
          ],
        },
      ],
    },
  })
  @ApiParam({ name: 'sport', example: 'basketball' })
  findWithSport(@Param('sport') sport: string) {
    return this.sportfieldsService.findWithSport(sport);
  }

  @Get('search')
  @ApiOkResponse({ description: 'Return all the sportfield that pass the filter ' })
  @ApiQuery({ name: 'lat' })
  @ApiQuery({ name: 'lng' })
  async search(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('rHour', ParseIntPipe) rHour: number,
    @Query('date') date: string,
    @Query('sport') sport: string,
    @Query('fieldType') fieldType: string,
  ) {
    const splittedDate = date.split('/');
    const fDate = `${splittedDate[1]}/${splittedDate[0]}/${splittedDate[2]}`;
    return await this.sportfieldsService.search(lat, lng, rHour, fDate, sport, fieldType);
  }

  @Get('owner/reservations')
  async findOwnerReservations(@GetUser() user: AuthUserDTO) {
    return this.sportfieldsService.findOwnerReservations(user);
  }

  @Get(':id/availability')
  getAvailability(@Param('id', ParseUUIDPipe) id: string) {
    return this.sportfieldsService.getAvailability(id);
  }

  @Post(':id/availability')
  getDateAvailability(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() getDayAvailabilityDto: GetDayAvailabilityDto,
  ) {
    return this.sportfieldsService.getDayAvailability(id, getDayAvailabilityDto);
  }

  @Get(':id/reservations')
  getReservations(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: AuthUserDTO) {
    return this.sportfieldsService.getReservations(id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return the Sportfield with that id', type: SportField })
  @ApiParam({ name: 'id', description: 'must be a UUID' })
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sportfieldsService.findOne(id);
  }

  @Post()
  @ApiOkResponse({
    description: 'Create the sportfield',
    schema: {
      example: {
        id: '4ff167ae-c194-43de-9953-19c63e4cb31d',
        name: 'El Monumental',
        description: 'Cancha de futbol 11 de pasto natural.',
        dimensions: '90x45',
        images: ['https://donpotrero.com/img/posts/2/medidas_sm.jpg'],
        sportsComplex: {
          name: 'Centro de Alto Rendimiento Deportivo Amadeo Nuccetelli',
          sportsComplexId: 'bff07355-1d81-46af-ae2e-7f26dac671ff',
        },
        availability: [],
        sport: 'basketball',
      },
    },
  })
  @ApiForbiddenResponse()
  @ApiBody({ type: CreateSportFieldDto })
  @ApiBearerAuth('token')
  @UseGuards(RoleGuard)
  async create(@Body() createSportFieldDto: CreateSportFieldDto, @GetUser() user: AuthUserDTO) {
    return this.sportfieldsService.create(createSportFieldDto, user.ownerId);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete the sportfield' })
  @ApiParam({ name: 'id', description: 'Must be a sportfield UUID' })
  @UseGuards(RoleGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: AuthUserDTO) {
    return this.sportfieldsService.remove(id, user.ownerId);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update the sportfield',
    schema: {
      example: {
        id: '4ff167ae-c194-43de-9953-19c63e4cb31d',
        name: 'El Monumental',
        description: 'Cancha de futbol 11 de pasto natural.',
        dimensions: '90x45',
        images: ['https://donpotrero.com/img/posts/2/medidas_sm.jpg'],
        sportsComplex: {
          name: 'Centro de Alto Rendimiento Deportivo Amadeo Nuccetelli',
          sportsComplexId: 'bff07355-1d81-46af-ae2e-7f26dac671ff',
        },
        availability: [],
        sport: 'basketball',
      },
    },
  })
  @ApiBody({ type: UpdateSportFieldDto })
  @ApiParam({ name: 'id', description: 'Must be a sportfield uuid' })
  @ApiBearerAuth('token')
  @UseGuards(RoleGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSportFieldDto: UpdateSportFieldDto,
    @GetUser() user: AuthUserDTO,
  ) {
    return this.sportfieldsService.update(id, updateSportFieldDto, user.ownerId);
  }
}
