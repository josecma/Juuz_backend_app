import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  findOneSwagger,
  findSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { BrandEntity } from '../domain/brand.entity';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { BrandsService } from '../aplication/brand.service';
import { PaginationBrandDto } from '../domain/pagination-brand.dto';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

const controllerName = 'Brands';
@ApiTags('Brands')
@Controller({
  path: 'brands/',
  version: '1',
})
export class BrandsController {
  constructor(private readonly service: BrandsService) {}

  /**
   * Gets a permission by id.
   * @param id ID of the permission to retrieve.
   * @returns Permission that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(BrandEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BrandEntity> {
    return this.service.findOne({
      where: this.service.filter(id).where,
      select: { name: true, models: true },
    });
  }

  /**
   * Gets all roles. It allows to filter by any field contained in the DTO object of the role.
   * @param page Number of the page to retrieve.
   * @param limit Limit of roles to retrieve.
   * @param filter Filter of the roles to be retrieved in stringified JSON format.
   * @returns roles that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(BrandEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationBrandDto
  ): Promise<PaginatedResponse<BrandEntity>> {
    return this.service.findAllBrands(
      {
        skip: pagination.page,
        take: pagination.perPage,
      },
      pagination
    );
  }

  /**
   * Gets all roles. It allows to filter by any field contained in the DTO object of the role.
   * @param page Number of the page to retrieve.
   * @param limit Limit of roles to retrieve.
   * @param filter Filter of the roles to be retrieved in stringified JSON format.
   * @returns roles that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(BrandEntity, controllerName))
  @Get('/all')
  async findAllBrand(
    @Query() pagination: PaginationDto
  ): Promise<PaginatedResponse<BrandEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }
}
