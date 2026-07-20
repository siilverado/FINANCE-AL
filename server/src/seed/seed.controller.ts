import { Controller, Get } from '@nestjs/common';

import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    // TODO: Check enviroment to avoid running seed on production
    return this.seedService.runSeed();
  }
}
