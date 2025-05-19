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
import { VehicleInfosService } from '../application/vehicleInfos.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import {
  UpdateVehicleInfoDto,
  VehicleInfoDto,
} from '../domain/vehicleInfo.dtos';
import { PaginationVehicleInfoDto } from '../domain/pagination-vehicleInfo.dto';
import { VehicleInfoEntity } from '../domain/vehicleInfo.entity';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'VehicleInfos';
@ApiTags('VehicleInfos')
@Controller({
  path: 'vehicle_infos/',
  version: '1',
})
export class VehicleInfosController {
  constructor(private readonly service: VehicleInfosService) {}

  /**
   * Creates a vehicleInfo.
   * @param body DTO of the creation of a vehicleInfo.
   * @returns The created vehicleInfo or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(VehicleInfoEntity, controllerName))
  @Post()
  async createVehicleInfo(
    @Body() body: VehicleInfoDto,
    @Request() req: RequestUserId
  ): Promise<VehicleInfoEntity> {
    return await this.service.create({
      data: {
        ...body,
        ownerId: req.user.id,
      },
    });
  }

  /**
   * Gets all vehicleInfos. It allows to filter by any field contained in the DTO object of the vehicleInfo.
   * @param page Number of the page to retrieve.
   * @param limit Limit of vehicleInfos to retrieve.
   * @param filter Filter of the vehicleInfos to be retrieved in stringified JSON format.
   * @returns vehicleInfos that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(VehicleInfoEntity, controllerName))
  @Get()
  async findAll(
    @Request() req: RequestUserId,
    @Query() pagination: PaginationVehicleInfoDto
  ): Promise<PaginatedResponse<VehicleInfoEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
      ...this.service.companyFilter(req.user.id + '', req.user.companyId),
    });
  }

  /**
   * Gets a vehicleInfo by id.
   * @param id ID of the vehicleInfo to retrieve.
   * @returns VehicleInfo that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(VehicleInfoEntity, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUserId
  ): Promise<VehicleInfoEntity> {
    return this.service.findOne(
      this.service.companyFilter(req.user.id + '', req.user.companyId)
    );
  }

  /**
   * Updates a vehicleInfo. It allows to update any field contained in the DTO object of the vehicleInfo.
   * @param id ID of the vehicleInfo to update.
   * @param UpdateVehicleInfoDto Object containing the fields to update.
   * @returns The updated vehicleInfo or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(VehicleInfoEntity, controllerName))
  @Patch(':id')
  async updateVehicleInfo(
    @Param('id') id: string,
    @Body() updateVehicleInfoDto: UpdateVehicleInfoDto,
    @Request() req: RequestUserId
  ): Promise<VehicleInfoEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateVehicleInfoDto,
      ...this.service.companyFilter(req.user.id + '', req.user.companyId),
    });
  }

  /**
   * Deletes a vehicleInfo by id.
   * @param id ID of the vehicleInfo to delete.
   * @returns Null or an error.
   */
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(VehicleInfoEntity, controllerName))
  @Delete(':id')
  async deleteVehicleInfo(
    @Param('id') id: string,
    @Request() req: RequestUserId
  ): Promise<VehicleInfoEntity> {
    return this.service.remove(
      this.service.companyFilter(req.user.id + '', req.user.companyId),
      this.service.companyFilter(req.user.id + '', req.user.companyId)
    );
  }
}
