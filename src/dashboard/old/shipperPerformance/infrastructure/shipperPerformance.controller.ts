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
  averageSwagger,
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';

import { RequestUserId } from 'src/_shared/domain/requestId';
import { ShipperPerformanceEntity } from '../domain/shipperPerformance.entity';
import {
  ShipperPerformanceDto,
  UpdateShipperPerformanceDto,
} from '../domain/shipperPerformance.dtos';
import { ShipperPerformancesService } from '../application/shipperPerformance.service';
import { PaginationShipperPerformanceDto } from '../domain/pagination-shipperPerformance.dto';
import { AverageShipperPerformanceDto } from '../domain/averageShipperPerformance.dtos';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'ShipperPerformances';
@ApiTags('ShipperPerformances')
@Controller({
  path: 'shipper_performances/',
  version: '1',
})
export class ShipperPerformancesController {
  constructor(private readonly service: ShipperPerformancesService) {}

  /**
   * Creates a role.
   * @param body DTO of the creation of a role.
   * @returns The created role or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(ShipperPerformanceEntity, controllerName))
  @Post()
  async createShipperPerformance(
    @Body() body: ShipperPerformanceDto,
    @Request() req: RequestUserId
  ): Promise<ShipperPerformanceEntity> {
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
  @ApiResponseSwagger(findSwagger(ShipperPerformanceEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationShipperPerformanceDto
  ): Promise<PaginatedResponse<ShipperPerformanceEntity>> {
    return this.service.findAllShipperPerformances(
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
    averageSwagger(AverageShipperPerformanceDto, controllerName)
  )
  @Get('averages')
  async avareges(): Promise<AverageShipperPerformanceDto> {
    return this.service.averages();
  }

  /**
   * Gets a role by id.
   * @param id ID of the role to retrieve.
   * @returns ShipperPerformance that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(ShipperPerformanceEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ShipperPerformanceEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a role. It allows to update any field contained in the DTO object of the role.
   * @param id ID of the role to update.
   * @param UpdateShipperPerformanceDto Object containing the fields to update.
   * @returns The updated role or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(ShipperPerformanceEntity, controllerName))
  @Patch(':id')
  async updateShipperPerformance(
    @Param('id') id: string,
    @Body() updateShipperPerformanceDto: UpdateShipperPerformanceDto,
    @Request() req: RequestUserId
  ): Promise<ShipperPerformanceEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateShipperPerformanceDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a role by id.
   * @param id ID of the role to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(ShipperPerformanceEntity, controllerName))
  @Delete(':id')
  async deleteShipperPerformance(
    @Param('id') id: string
  ): Promise<ShipperPerformanceEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
