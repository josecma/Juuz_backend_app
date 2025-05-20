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
import { SubcServicesService } from '../application/subServices.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdateSubServiceDto, SubServiceDto } from '../domain/subService.dtos';
import { PaginationSubServiceDto } from '../domain/pagination-subService.dto';
import { SubServiceEntity } from '../domain/subService.entity';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Subcservices';
@ApiTags('Subcservices')
@Controller({
  path: 'subServices/',
  version: '1',
})
export class SubcservicesController {
  constructor(private readonly service: SubcServicesService) { }

  /**
   * Creates a subService.
   * @param body DTO of the creation of a subService.
   * @returns The created subService or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(SubServiceEntity, controllerName))
  @Post()
  async createSubService(
    @Body() body: SubServiceDto,
    @Request() req: RequestUserId
  ): Promise<SubServiceEntity> {
    const { ...data } = body;

    return await this.service.create({
      data: {
        ...data,
        ownerId: req.user.id,
      },
    });
  }

  /**
   * Gets all subServices. It allows to filter by any field contained in the DTO object of the subService.
   * @param page Number of the page to retrieve.
   * @param limit Limit of subServices to retrieve.
   * @param filter Filter of the subServices to be retrieved in stringified JSON format.
   * @returns subServices that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(SubServiceEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationSubServiceDto
  ): Promise<PaginatedResponse<SubServiceEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a subService by id.
   * @param id ID of the subService to retrieve.
   * @returns SubService that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(SubServiceEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubServiceEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a subService. It allows to update any field contained in the DTO object of the subService.
   * @param id ID of the subService to update.
   * @param UpdateSubServiceDto Object containing the fields to update.
   * @returns The updated subService or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(SubServiceEntity, controllerName))
  @Patch(':id')
  async updateSubService(
    @Param('id') id: string,
    @Body() updateSubServiceDto: UpdateSubServiceDto
  ): Promise<SubServiceEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateSubServiceDto,
      where: { id: id },
    });
  }

  /**
   * Deletes a subService by id.
   * @param id ID of the subService to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(SubServiceEntity, controllerName))
  @Delete(':id')
  async deleteSubService(@Param('id') id: string): Promise<SubServiceEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
