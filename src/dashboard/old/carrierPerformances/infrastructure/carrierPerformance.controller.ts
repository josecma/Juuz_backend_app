import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
  averageSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';

import { RequestUserId } from 'src/_shared/domain/requestId';
import { CarrierPerformanceEntity } from '../domain/carrierPerformance.entity';
import {
  CarrierPerformanceDto,
  UpdateCarrierPerformanceDto,
} from '../domain/carrierPerformance.dtos';
import { CarrierPerformancesService } from '../application/carrierPerformance.service';
import { PaginationCarrierPerformanceDto } from '../domain/pagination-carrierPerformance.dto';
import { AverageCarrierPerformanceDto } from '../domain/averageCarrierPerformance.dtos';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'CarrierPerformances';
@ApiTags('CarrierPerformances')
@Controller({
  path: 'carrier_performances/',
  version: '1',
})
export class CarrierPerformancesController {
  constructor(private readonly service: CarrierPerformancesService) {}

  /**
   * Creates a role.
   * @param body DTO of the creation of a role.
   * @returns The created role or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(CarrierPerformanceEntity, controllerName))
  @Post()
  async createCarrierPerformance(
    @Body() body: CarrierPerformanceDto,
    @Request() req: RequestUserId
  ): Promise<CarrierPerformanceEntity> {
    return this.service.create({
      data: {
        ...body,
        ownerId: req.user.id,
        userId: req.user.id,
      },
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
  @ApiResponseSwagger(findSwagger(CarrierPerformanceEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationCarrierPerformanceDto
  ): Promise<PaginatedResponse<CarrierPerformanceEntity>> {
    return this.service.findAllCarrierPerformances(
      {
        skip: pagination.page,
        take: pagination.perPage,
      },
      pagination
    );
  }

  /**
   * Gets a role by id.
   * @param id ID of the role to retrieve.
   * @returns CarrierPerformance that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(
    averageSwagger(AverageCarrierPerformanceDto, controllerName)
  )
  @Get('averages')
  async avareges(): Promise<AverageCarrierPerformanceDto> {
    return this.service.averages();
  }

  /**
   * Gets a role by id.
   * @param id ID of the role to retrieve.
   * @returns CarrierPerformance that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(CarrierPerformanceEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CarrierPerformanceEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a role. It allows to update any field contained in the DTO object of the role.
   * @param id ID of the role to update.
   * @param UpdateCarrierPerformanceDto Object containing the fields to update.
   * @returns The updated role or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(CarrierPerformanceEntity, controllerName))
  @Patch(':id')
  async updateCarrierPerformance(
    @Param('id') id: string,
    @Body() updateCarrierPerformanceDto: UpdateCarrierPerformanceDto,
    @Request() req: RequestUserId
  ): Promise<CarrierPerformanceEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateCarrierPerformanceDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a role by id.
   * @param id ID of the role to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(CarrierPerformanceEntity, controllerName))
  @Delete(':id')
  async deleteCarrierPerformance(
    @Param('id') id: string
  ): Promise<CarrierPerformanceEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
