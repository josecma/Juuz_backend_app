import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { findOneSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { CarriesService } from '../application/carries.service';
import { TopCitiesAndTotalDto } from '../domain/topCity.dto';

const controllerName = 'Dashboard Company';

@ApiTags('dashboard/carrier')
@Controller({
  path: 'dashboard/carrier',
  version: '1',
})
export class CarriesController {
  constructor(private readonly service: CarriesService) {}

  /**
   * Gets a company by id.
   * @param id ID of the company to retrieve.
   * @returns Company that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(TopCitiesAndTotalDto, controllerName))
  @Get('/top-cities-and-total')
  async findCarries(): Promise<TopCitiesAndTotalDto> {
    return this.service.getTopCitiesAndTotal();
  }
}
