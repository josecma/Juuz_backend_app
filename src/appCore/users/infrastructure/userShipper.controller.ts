// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Patch,
//   Request,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { UsersService } from '../application/users.service';
// import {
//   deleteSwagger,
//   findOneSwagger,
//   updateSwagger,
// } from 'src/_shared/infrastructure/swagger/http.swagger';
// import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
// import { UserEntity } from '../domain/user.entity';
// import { RequestUserId } from 'src/_shared/domain/requestId';
// import { UpdateUserShipperDto } from '../domain/userShipper.dtos';

// const controllerName = 'User Shippers';
// @ApiTags('User_Shippers')
// @Controller({
//   path: 'user_shippers/',
//   version: '1',
// })
// export class UserShippersController {
//   constructor(private readonly service: UsersService) {}
//   /**
//    * Gets a Shipper by id.
//    * @param id ID of the Shipper to retrieve.
//    * @returns Rider that matches the given id or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findOneSwagger(UserEntity, controllerName))
//   @Get()
//   async findOne(@Request() req: RequestUserId): Promise<UserEntity> {
//     return this.service.findOneUser(req.user.id);
//   }

//   /**
//    * Updates a Shipper. It allows to update any field contained in the DTO object of the Shipper.
//    * @param id ID of the Shipper to update.
//    * @param UpdateUserShipperDto Object containing the fields to update.
//    * @returns The updated Shipper or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(updateSwagger(UserEntity, controllerName))
//   @Patch()
//   async updateUser(
//     @Body() updateUserShipperDto: UpdateUserShipperDto,
//     @Request() req: RequestUserId
//   ): Promise<UserEntity> {
//     return this.service.updateUser(
//       req.user.id + '',
//       updateUserShipperDto,
//       req.user.id,
//       req.user.companyId
//     );
//   }

//   /**
//    * Deletes a Shipper by id.
//    * @param id ID of the Shipper to delete.
//    * @returns Null or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(deleteSwagger(UserEntity, controllerName))
//   @Delete()
//   async deleteUser(@Request() req: RequestUserId): Promise<UserEntity> {
//     return this.service.remove(
//       this.service.filter(req.user.id + ''),
//       this.service.filter(req.user.id + '')
//     );
//   }
// }
