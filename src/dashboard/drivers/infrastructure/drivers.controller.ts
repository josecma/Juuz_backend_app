import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { findOneSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { DriversService } from '../application/drivers.service';
import { DriverStatsDto } from '../domain/driverStats.dto';

const controllerName = 'Dashboard Driver';

@ApiTags('dashboard/driver')
@Controller({
  path: 'dashboard/driver',
  version: '1',
})
export class DriversController {
  constructor(private readonly service: DriversService) {}

  /**
   * Gets a order by id.
   * @param id ID of the order to retrieve.
   * @returns Company that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(DriverStatsDto, controllerName))
  @Get('/info-drivers')
  async findDrivers(): Promise<DriverStatsDto> {
    return this.service.getDriverStats();
  }
}
