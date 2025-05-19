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
import { ComunicationsService } from '../application/comunications.service';
import {
  ComunicationDto,
  UpdateComunicationDto,
} from '../domain/comunication.dtos';
import { ComunicationEntity } from '../domain/comunication.entity';
import { PaginationComunicationDto } from '../domain/pagination-comunication.dto';
import { OfertComunicationDto } from '../domain/ofertMessage.dtos';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Comunications';
@ApiTags('Comunications')
@Controller({
  path: 'comunications/',
  version: '1',
})
export class ComunicationsController {
  constructor(private readonly service: ComunicationsService) {}

  // //Solo pueden crear una coumnicacion un driver
  // /**
  //  * Creates a comunication.
  //  * @param body DTO of the creation of a comunication.
  //  * @returns The created comunication or an error.
  //  */

  // @HttpCode(HttpStatus.CREATED)
  // @ApiResponseSwagger(createSwagger(ComunicationDto, controllerName))
  // @Post()
  // async createComunication(
  //   @Body() body: ComunicationDto,
  //   @Request() req: RequestUserId,
  // ): Promise<ComunicationEntity> {
  //   if (!body.riderChanelId)
  //     body.riderChanelId = await this.service.getAblyNameChannel(body.orderId);
  //   return await this.service.create({
  //     data: { ...body, ownerId: req.user.id },
  //   });
  // }

  /**
   * Gets all comunications. It allows to filter by any field contained in the DTO object of the comunication.
   * @param page Number of the page to retrieve.
   * @param limit Limit of comunications to retrieve.
   * @param filter Filter of the comunications to be retrieved in stringified JSON format.
   * @returns comunications that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(ComunicationDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationComunicationDto,
  ): Promise<PaginatedResponse<ComunicationEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a comunication by id.
   * @param id ID of the comunication to retrieve.
   * @returns Comunication that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(ComunicationDto, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ComunicationEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a comunication. It allows to update any field contained in the DTO object of the comunication.
   * @param id ID of the comunication to update.
   * @param UpdateComunicationDto Object containing the fields to update.
   * @returns The updated comunication or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(ComunicationDto, controllerName))
  @Patch(':id')
  async updateComunication(
    @Param('id') id: string,
    @Body() updateComunicationDto: UpdateComunicationDto,
  ): Promise<ComunicationEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateComunicationDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a comunication by id.
   * @param id ID of the comunication to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(ComunicationDto, controllerName))
  @Delete(':id')
  async deleteComunication(
    @Param('id') id: string,
  ): Promise<ComunicationEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id),
    );
  }

  //  /**
  //  * Gets a comunication by id.
  //  * @param id ID of the comunication to retrieve.
  //  * @returns Comunication that matches the given id or an error.
  //  */
  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(ComunicationDto, controllerName))
  @Get('rider-comunication')
  async riderComunication(
    @Body() riderComunicationDto: OfertComunicationDto,
  ): Promise<void> {
    await this.service.riderComunication(riderComunicationDto);
  }

  //  /**
  //  * Gets a comunication by id.
  //  * @param id ID of the comunication to retrieve.
  //  * @returns Comunication that matches the given id or an error.
  //  */
  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(ComunicationDto, controllerName))
  @Get('driver-comunication')
  async driverComunication(
    @Body() driverComunicationDto: OfertComunicationDto,
  ): Promise<void> {
    await this.service.driverComunication(driverComunicationDto);
  }
}
