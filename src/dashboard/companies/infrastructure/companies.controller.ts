import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { findOneSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { CompaniesService } from '../application/companies.service';
import { CompanyStatsDto } from '../domain/companyStats.dto';

const controllerName = 'Dashboard Company';

@ApiTags('dashboard/company')
@Controller({
  path: 'dashboard/company',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  /**
   * Gets a company by id.
   * @param id ID of the company to retrieve.
   * @returns Company that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(CompanyStatsDto, controllerName))
  @Get('/info-companies')
  async findCompanies(): Promise<CompanyStatsDto> {
    return this.service.getCompaniesStats();
  }
}
