// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Param,
//   Patch,
//   Post,
//   Query,
//   Request,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { DriversService } from '../application/drivers.service';
// import {
//   createSwagger,
//   deleteSwagger,
//   findOneSwagger,
//   findSwagger,
//   updateSwagger,
// } from 'src/_shared/infrastructure/swagger/http.swagger';
// import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
// import { UpdateDriverDto, DriverDto, CarrierDto } from '../domain/driver.dtos';
// import { PaginationDriverDto } from '../domain/pagination-driver.dto';
// import { DriverEntity } from '../domain/driver.entity';
// import { RequestUserId } from 'src/_shared/domain/requestId';
// import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

// const controllerName = 'Drivers';
// @ApiTags('Drivers')
// @Controller({
//   path: 'drivers/',
//   version: '1',
// })
// export class DriversController {
//   constructor(private readonly service: DriversService) {}

//   /**
//    * Creates a driver.
//    * @param body DTO of the creation of a driver.
//    * @returns The created driver or an error.
//    */

//   @HttpCode(HttpStatus.CREATED)
//   @ApiResponseSwagger(createSwagger(DriverEntity, controllerName))
//   @Post()
//   async createDriver(@Body() body: DriverDto, @Request() req: RequestUserId) {
//     this.service.createDriver(body, req.user.id, req.user.companyId);
//   }

//   /**
//    * Creates a driver.
//    * @param body DTO of the creation of a driver.
//    * @returns The created driver or an error.
//    */

//   @HttpCode(HttpStatus.CREATED)
//   @ApiResponseSwagger(createSwagger(DriverEntity, controllerName))
//   @Post('carrier')
//   async createDriverCarrier(
//     @Body() body: CarrierDto,
//     @Request() req: RequestUserId
//   ) {
//     return this.service.createDriver(body, req.user.id, req.user.companyId);
//   }

//   /**
//    * Gets all drivers. It allows to filter by any field contained in the DTO object of the driver.
//    * @param page Number of the page to retrieve.
//    * @param limit Limit of drivers to retrieve.
//    * @param filter Filter of the drivers to be retrieved in stringified JSON format.
//    * @returns drivers that match a given filter or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findSwagger(DriverEntity, controllerName))
//   @Get()
//   async findAll(
//     @Query() pagination: PaginationDriverDto,
//     @Request() req: RequestUserId
//   ): Promise<PaginatedResponse<DriverEntity>> {
//     return this.service.findAll({
//       skip: pagination.page,
//       take: pagination.perPage,
//       where: { companyId: req.user.companyId },
//     });
//   }

//   /**
//    * Gets a driver by id.
//    * @param id ID of the driver to retrieve.
//    * @returns Driver that matches the given id or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findOneSwagger(DriverEntity, controllerName))
//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<DriverEntity> {
//     return this.service.findOne(this.service.filter(id));
//   }

//   /**
//    * Updates a driver. It allows to update any field contained in the DTO object of the driver.
//    * @param id ID of the driver to update.
//    * @param UpdateDriverDto Object containing the fields to update.
//    * @returns The updated driver or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(updateSwagger(DriverEntity, controllerName))
//   @Patch(':id')
//   async updateDriver(
//     @Param('id') id: string,
//     @Body() updateDriverDto: UpdateDriverDto,
//     @Request() req: RequestUserId
//   ): Promise<DriverEntity> {
//     return this.service.updateCreate(id, updateDriverDto, req.user.companyId);
//   }

//   /**
//    * Deletes a driver by id.
//    * @param id ID of the driver to delete.
//    * @returns Null or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(deleteSwagger(DriverEntity, controllerName))
//   @Delete(':id')
//   async deleteDriver(@Param('id') id: string): Promise<DriverEntity> {
//     return this.service.remove(
//       this.service.filter(id),
//       this.service.filter(id)
//     );
//   }
// }
