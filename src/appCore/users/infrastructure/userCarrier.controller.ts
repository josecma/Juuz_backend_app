// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Patch,
//   Query,
//   Request,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { UsersService } from '../application/users.service';
// import {
//   deleteSwagger,
//   findOneSwagger,
//   findSwagger,
//   updateSwagger,
// } from 'src/_shared/infrastructure/swagger/http.swagger';
// import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
// import { UserEntity } from '../domain/user.entity';
// import { RequestUserId } from 'src/_shared/domain/requestId';
// import { UpdateUserDriverDto } from '../domain/userCarrier.dtos';
// import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
// import { PaginationUserByRolDto } from '../domain/pagination-user-by-rol.dto';

// const controllerName = 'User Carriers';
// @ApiTags('User_Carriers')
// @Controller({
//   path: 'user_carriers/',
//   version: '1',
// })
// export class UserCarriersController {
//   constructor(private readonly service: UsersService) {}

//   /**
//    * Gets all users. It allows to filter by any field contained in the DTO object of the user.
//    * @param page Number of the page to retrieve.
//    * @param limit Limit of users to retrieve.
//    * @param filter Filter of the users to be retrieved in stringified JSON format.
//    * @returns users that match a given filter or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findSwagger(UserEntity, controllerName))
//   @Get('by-company')
//   async findAll(
//     @Query() pagination: PaginationUserByRolDto,
//     @Request() req: RequestUserId
//   ): Promise<PaginatedResponse<UserEntity>> {
//     return this.service.findAll({
//       skip: pagination.page,
//       take: pagination.perPage,
//       select: this.service.userselect,
//       where: {
//         userCompanyRoles: {
//           every: {
//             companyId: req.user.companyId,
//             ...(pagination.rol && { role: { type: pagination.rol } }),
//           },
//         },
//       },
//     });
//   }

//   /**
//    * Gets a Carrier by id.
//    * @param id ID of the Carrier to retrieve.
//    * @returns Rider that matches the given id or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findOneSwagger(UserEntity, controllerName))
//   @Get()
//   async findOne(@Request() req: RequestUserId): Promise<UserEntity> {
//     return this.service.findOneUser(req.user.id);
//   }

//   /**
//    * Updates a Carrier. It allows to update any field contained in the DTO object of the Carrier.
//    * @param id ID of the Carrier to update.
//    * @param UpdateUserCarrierDto Object containing the fields to update.
//    * @returns The updated Carrier or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(updateSwagger(UserEntity, controllerName))
//   @Patch()
//   async updateUser(
//     @Body() updateUserCarrierDto: UpdateUserDriverDto,
//     @Request() req: RequestUserId
//   ): Promise<UserEntity> {
//     return this.service.updateUser(
//       req.user.id + '',
//       updateUserCarrierDto,
//       req.user.id,
//       req.user.companyId
//     );
//   }

//   /**
//    * Deletes a Carrier by id.
//    * @param id ID of the Carrier to delete.
//    * @returns Null or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(deleteSwagger(UserEntity, controllerName))
//   @Delete()
//   async deleteUser(@Request() req: RequestUserId): Promise<UserEntity> {
//     return this.service.remove(
//       this.service.filter(req.user.id+''),
//       this.service.filter(req.user.id + '')
//     );
//   }
// }
