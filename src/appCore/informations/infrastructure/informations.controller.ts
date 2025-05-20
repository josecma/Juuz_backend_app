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
import { InformationsService } from '../application/informations.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import {
  UpdateInformationDto,
  InformationDto,
} from '../domain/information.dtos';
import { PaginationInformationDto } from '../domain/pagination-information.dto';
import { InformationEntity } from '../domain/information.entity';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Informations';
@ApiTags('Informations')
@Controller({
  path: 'informations/',
  version: '1',
})
export class InformationsController {
  constructor(private readonly service: InformationsService) { }

  /**
   * Creates a Information.
   * @param body DTO of the creation of a Information.
   * @returns The created Information or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(InformationEntity, controllerName))
  @Post()
  async createInformation(
    @Body() body: InformationDto,
    @Request() req: RequestUserId,
  ): Promise<InformationEntity> {
    return await this.service.create({
      data: {
        ...body,
        ownerId: req.user.id,
      },
    });
  }

  /**
   * Gets all Informations. It allows to filter by any field contained in the DTO object of the Information.
   * @param page Number of the page to retrieve.
   * @param limit Limit of Informations to retrieve.
   * @param filter Filter of the Informations to be retrieved in stringified JSON format.
   * @returns Informations that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(InformationEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationInformationDto,
  ): Promise<PaginatedResponse<InformationEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a Information by id.
   * @param id ID of the Information to retrieve.
   * @returns Information that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(InformationEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InformationEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a Information. It allows to update any field contained in the DTO object of the Information.
   * @param id ID of the Information to update.
   * @param UpdateInformationDto Object containing the fields to update.
   * @returns The updated Information or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(InformationEntity, controllerName))
  @Patch(':id')
  async updateInformation(
    @Param('id') id: string,
    @Body() updateInformationDto: UpdateInformationDto,
  ): Promise<InformationEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateInformationDto,
      where: { id: id },
    });
  }

  /**
   * Deletes a Information by id.
   * @param id ID of the Information to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(InformationEntity, controllerName))
  @Delete(':id')
  async deleteInformation(@Param('id') id: string): Promise<InformationEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id),
    );
  }
}
