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
import { RolesService } from '../application/roles.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdateRoleDto, RoleDto } from '../domain/role.dtos';
import { PaginationRoleDto } from '../domain/pagination-role.dto';
import { RoleEntity } from '../domain/role.entity';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Roles';
@ApiTags('Roles')
@Controller({
  path: 'roles/',
  version: '1',
})
export class RolesController {
  constructor(private readonly service: RolesService) {}

  /**
   * Creates a role.
   * @param body DTO of the creation of a role.
   * @returns The created role or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(RoleEntity, controllerName))
  @Post()
  async createRole(
    @Body() body: RoleDto,
    @Request() req: RequestUserId
  ): Promise<RoleEntity> {
    return this.service.createService(body, req.user.id, req.user.companyId);
  }

  /**
   * Gets all roles. It allows to filter by any field contained in the DTO object of the role.
   * @param page Number of the page to retrieve.
   * @param limit Limit of roles to retrieve.
   * @param filter Filter of the roles to be retrieved in stringified JSON format.
   * @returns roles that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(RoleEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationRoleDto,
    @Request() req: RequestUserId
  ): Promise<PaginatedResponse<RoleEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
      ...this.service.companyFilter(req.user.id + '', req.user.companyId),
    });
  }

  /**
   * Gets a role by id.
   * @param id ID of the role to retrieve.
   * @returns Role that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(RoleEntity, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUserId
  ): Promise<RoleEntity> {
    return this.service.findOne(
      this.service.companyFilter(req.user.id + '', req.user.companyId)
    );
  }

  /**
   * Updates a role. It allows to update any field contained in the DTO object of the role.
   * @param id ID of the role to update.
   * @param UpdateRoleDto Object containing the fields to update.
   * @returns The updated role or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(RoleEntity, controllerName))
  @Patch(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @Request() req: RequestUserId
  ): Promise<RoleEntity> {
    return this.service.updateService(
      id,
      updateRoleDto,
      req.user.id,
      req.user.companyId
    );
  }

  /**
   * Deletes a role by id.
   * @param id ID of the role to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(RoleEntity, controllerName))
  @Delete(':id')
  async deleteRole(
    @Param('id') id: string,
    @Request() req: RequestUserId
  ): Promise<RoleEntity> {
    return this.service.remove(
      this.service.companyFilter(req.user.id + '', req.user.companyId),
      this.service.companyFilter(req.user.id + '', req.user.companyId)
    );
  }
}
