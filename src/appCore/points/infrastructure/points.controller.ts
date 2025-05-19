import {
  Body,
  Controller,
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
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdatePointDto, PointDto } from '../domain/point.dtos';
import { PaginationPointDto } from '../domain/pagination-point.dto';
import { PointEntity } from '../domain/point.entity';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PointsService } from '../application/points.service';

const controllerName = 'Points';
@ApiTags('Points')
@Controller({
  path: 'points/',
  version: '1',
})
export class PointsController {
  constructor(private readonly service: PointsService) {}

  /**
   * Creates a Point.
   * @param body DTO of the creation of a Point.
   * @returns The created Point or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(PointEntity, controllerName))
  @Post()
  async createPoint(
    @Body() body: PointDto,
    @Request() req: RequestUserId
  ): Promise<any> {
    return await this.service.create(body, req.user.id);
  }

  /**
   * Gets all Points. It allows to filter by any field contained in the DTO object of the Point.
   * @param page Number of the page to retrieve.
   * @param limit Limit of Points to retrieve.
   * @param filter Filter of the Points to be retrieved in stringified JSON format.
   * @returns Points that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(PointEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationPointDto
  ): Promise<PointEntity[]> {
    return this.service.findAll(pagination);
  }

  /**
   * Gets a Point by id.
   * @param id ID of the Point to retrieve.
   * @returns Point that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(PointEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PointEntity> {
    return this.service.findOne(parseInt(id));
  }

  // /**
  //  * Updates a Point. It allows to update any field contained in the DTO object of the Point.
  //  * @param id ID of the Point to update.
  //  * @param UpdatePointDto Object containing the fields to update.
  //  * @returns The updated Point or an error.
  //  */

  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiResponseSwagger(updateSwagger(PointEntity, controllerName))
  // @Patch(':id')
  // async updatePoint(
  //   @Param('id') id: string,
  //   @Body() updatePointDto: UpdatePointDto
  // ): Promise<any> {
  //   return this.service.update(parseInt(id), updatePointDto);
  // }

  // /**
  //  * Deletes a Point by id.
  //  * @param id ID of the Point to delete.
  //  * @returns Null or an error.
  //  */

  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiResponseSwagger(deleteSwagger(PointEntity, controllerName))
  // @Delete(':id')
  // async deletePoint(@Param('id') id: string): Promise<PointEntity> {
  //   return this.service.remove(
  //     this.service.filter(id),
  //     this.service.filter(id),
  //   );
  // }
}
