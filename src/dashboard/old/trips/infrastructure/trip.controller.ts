// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Param,
//   Patch,
//   Query,
//   Request,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import {
//   deleteSwagger,
//   findOneSwagger,
//   findSwagger,
//   updateSwagger,
// } from 'src/_shared/infrastructure/swagger/http.swagger';
// import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';

// import { RequestUserId } from 'src/_shared/domain/requestId';
// import { TripsService } from '../application/trip.service';
// import { PaginationTripDto } from '../domain/pagination-trip.dto';
// import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
// import { OrderEntity } from 'src/appCore/orders/domain/order.entity';
// import { Prisma } from '@prisma/client';
// import { UpdateTripDto } from '../domain/tripAttention.dtos';

// const controllerName = 'Trips';
// @ApiTags('Trips')
// @Controller({
//   path: 'trips/',
//   version: '1',
// })
// export class TripsController {
//   constructor(private readonly service: TripsService) {}

//   /**
//    * .
//    * @returns .
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findSwagger(null, controllerName))
//   @Get('tripsAttention')
//   async findTrips(): Promise<any> {
//     return this.service.tripsAttention();
//   }

//   /**
//    * Gets all roles. It allows to filter by any field contained in the DTO object of the role.
//    * @param page Number of the page to retrieve.
//    * @param limit Limit of roles to retrieve.
//    * @param filter Filter of the roles to be retrieved in stringified JSON format.
//    * @returns roles that match a given filter or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findSwagger(OrderEntity, controllerName))
//   @Get()
//   async findAll(
//     @Query() pagination: PaginationTripDto,
//     @Request() req: RequestUserId
//   ): Promise<PaginatedResponse<OrderEntity>> {
//     return this.service.findAllTrips(pagination, req.user.companyId);
//   }

//   /**
//    * Gets a role by id.
//    * @param id ID of the role to retrieve.
//    * @returns Trip that matches the given id or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findOneSwagger(OrderEntity, controllerName))
//   @Get(':id')
//   async findOne(
//     @Param('id') id: string,
//     @Request() req: RequestUserId
//   ): Promise<OrderEntity> {
//     const find: Prisma.OrderFindUniqueArgs = {
//       select: this.service.select,
//       where: {
//         id: +id,
//         companyId: req.user.companyId,
//       },
//     };

//     return this.service.ordersService.findOne(find);
//   }

//   // /**
//   //  * Updates a role. It allows to update any field contained in the DTO object of the role.
//   //  * @param id ID of the role to update.
//   //  * @param UpdateTripDto Object containing the fields to update.
//   //  * @returns The updated role or an error.
//   //  */

//   // @HttpCode(HttpStatus.ACCEPTED)
//   // @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
//   // @Patch(':id')
//   // async updateTrip(
//   //   @Param('id') id: string,
//   //   @Body() updateTripDto: UpdateTripDto,
//   //   @Request() req: RequestUserId
//   // ): Promise<OrderEntity> {
//   //   return this.service.ordersService.update(
//   //     this.service.ordersService.companyFilter(id, req.user.companyId),
//   //     {
//   //       data: updateTripDto,
//   //       where: { id: +id },
//   //     }
//   //   );
//   // }

//   // /**
//   //  * Deletes a role by id.
//   //  * @param id ID of the role to delete.
//   //  * @returns Null or an error.
//   //  */

//   // @HttpCode(HttpStatus.ACCEPTED)
//   // @ApiResponseSwagger(deleteSwagger(OrderEntity, controllerName))
//   // @Delete(':id')
//   // async deleteTrip(
//   //   @Param('id') id: string,
//   //   @Request() req: RequestUserId
//   // ): Promise<OrderEntity> {
//   //   return this.service.ordersService.remove(
//   //     this.service.ordersService.companyFilter(id, req.user.companyId),
//   //     this.service.ordersService.companyFilter(id, req.user.companyId)
//   //   );
//   // }
// }
