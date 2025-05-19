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
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { ServiceEntity } from '../domain/service.entity';
import { PaginationServiceDto } from '../domain/pagination-service.dto';
import { ServiceDto, UpdateServiceDto } from '../domain/service.dtos';
import { ServicesService } from '../application/service.service';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Services';
@ApiTags('Services')
@Controller({
  path: 'services',
  version: '1',
})
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  /**
   * Creates a service.
   * @param body DTO of the creation of a service.
   * @returns The created service or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(ServiceEntity, controllerName))
  @Post()
  async createService(
    @Body() body: ServiceDto,
    @Request() req: RequestUserId
  ): Promise<ServiceEntity> {
    return this.service.createService(body, req.user.id);
  }

  /**
   * Gets all services. It allows to filter by any field contained in the DTO object of the service.
   * @param page Number of the page to retrieve.
   * @param limit Limit of services to retrieve.
   * @param filter Filter of the services to be retrieved in stringified JSON format.
   * @returns services that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(ServiceEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationServiceDto
  ): Promise<PaginatedResponse<ServiceEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
      select: {
        name: true,
        id: true,
        subService: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * Gets a service by id.
   * @param id ID of the service to retrieve.
   * @returns Service that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(ServiceEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServiceEntity> {
    return this.service.findOne({
      ...this.service.filter(id),
      select: { name: true, subService: { select: { id: true, name: true } } },
    });
  }

  /**
   * Updates a service. It allows to update any field contained in the DTO object of the service.
   * @param id ID of the service to update.
   * @param UpdateServiceDto Object containing the fields to update.
   * @returns The updated service or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(ServiceEntity, controllerName))
  @Patch(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Request() req: RequestUserId
  ): Promise<ServiceEntity> {
    return this.service.updateService(id, updateServiceDto, req.user.id);
  }

  /**
   * Deletes a service by id.
   * @param id ID of the service to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(ServiceEntity, controllerName))
  @Delete(':id')
  async deleteService(@Param('id') id: string): Promise<ServiceEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
