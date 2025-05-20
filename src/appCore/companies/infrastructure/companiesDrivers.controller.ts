// import {
//     Body,
//     Controller,
//     HttpCode,
//     HttpStatus,
//     Request,
//     Patch,
//     Get,
//     Param,
//     Query,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import {
//     findOneSwagger,
//     findSwagger,
//     updateSwagger,
// } from 'src/_shared/infrastructure/swagger/http.swagger';
// import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
// import { CompaniesService } from '../application/companies.service';
// import { CompanyDto, UpdateCompanyDto } from '../domain/company.dtos';
// import { CompanyEntity } from '../domain/company.entity';
// import { RequestUserId } from 'src/_shared/domain/requestId';
// import { $Enums, Prisma } from '@prisma/client';
// import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
// import { PositiveNumberStringPipe } from 'src/_shared/infrastructure/validators/paramsPositeNumber.validator';
// import { UserCompanyRolesService } from 'src/appCore/userCompanyRoles/application/userCompanyRoles.service';
// import { CompanyOtpDto } from '../domain/companyOtp.dtos';
// import { AuthService } from 'src/auth/application/auth.service';
// import { UserEntity } from 'src/appCore/users/domain/user.entity';
// import { PaginationCompanyDto } from '../domain/pagination-company.dto';
// import { S3PhotoService } from 'src/s3/aplication/s3Photo.service';

// const controllerName = 'CompanyDrivers';
// @ApiTags('CompanyDrivers')
// @Controller({
//     path: 'companyDrivers/',
//     version: '1',
// })
// export class CompanyDriversController {
//     constructor(
//         private readonly service: CompaniesService,
//         private readonly userCompanyRolesService: UserCompanyRolesService,
//         private readonly authService: AuthService,
//         private readonly s3PhotoService: S3PhotoService
//     ) { }

//     /**
//      * Gets a company by id.
//      * @param id ID of the company to retrieve.
//      * @returns Company that matches the given id or an error.
//      */
//     @Get('users')
//     @HttpCode(HttpStatus.OK)
//     @ApiResponseSwagger(findSwagger(CompanyDto, controllerName))
//     async find(
//         @Request() req: RequestUserId
//     ): Promise<PaginatedResponse<CompanyEntity>> {
//         const filter: Prisma.CompanyFindManyArgs = {
//             where: {
//                 userCompanyRoles: { some: { companyId: req.user.companyId } },
//                 companyType: {
//                     in: [
//                         $Enums.CompanyType.COMPANY,
//                         $Enums.CompanyType.SHIPPER_AND_COMPANY,
//                     ],
//                 },
//             },
//             select: {
//                 userCompanyRoles: {
//                     select: {
//                         user: {
//                             select: {
//                                 id: true,
//                                 email: true,
//                                 phone: true,
//                                 firstName: true,
//                                 lastName: true,
//                                 isActive: true,
//                                 photos: {
//                                     select: { name: true },
//                                 },
//                                 createdAt: true,
//                                 updatedAt: true,
//                                 createdBy: true,
//                                 updatedBy: true,
//                                 deletedAt: true,
//                                 deletedBy: true,
//                                 version: true,
//                                 ownerId: true,
//                                 logType: true,
//                                 userCompanyRoles: {
//                                     select: {
//                                         userId: true,
//                                         companyId: true,
//                                         roleId: true,
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         };

//         const data: any = await this.service.findAll(filter);
//         for (let index = 0; index < data.data[0].userCompanyRoles.length; index++) {
//             if (
//                 data.data[0].userCompanyRoles[index].user &&
//                 data.data[0].userCompanyRoles[index].user.photos &&
//                 data.data[0].userCompanyRoles[index].user.photos.length
//             ) {
//                 const fileNames = data.data[0].userCompanyRoles[index].user.photos.map(
//                     ({ name }) => name
//                 );

//                 // Now it matches the expected string[] type:
//                 const signedUrls = await this.s3PhotoService.getSignedUrls(fileNames);
//                 const urls = Object.values(signedUrls).map((url) => ({
//                     name: url,
//                 }));
//                 data.data[0].userCompanyRoles[index].user.photos = urls;
//             }
//         }

//         return data.data[0].userCompanyRoles;
//     }

//     @HttpCode(HttpStatus.OK)
//     @ApiResponseSwagger(findSwagger(CompanyEntity, controllerName))
//     @Get('vehicles')
//     async shieperOrders(
//         @Query() pagination: PaginationCompanyDto,
//         @Request() req: RequestUserId
//     ): Promise<PaginatedResponse<CompanyEntity>> {
//         const select: Prisma.CompanySelect = {
//             id: true,
//             drivers: {
//                 select: {
//                     id: true,
//                     vinNumber: true,
//                     insuranceDoc: true,
//                     faceId: true,
//                     vehicleType: true,
//                     serviceId: true,
//                     capacity: true,
//                     userId: true,
//                     year: true,
//                     photos: { select: { name: true } },
//                     vehicleInfo: {
//                         select: {
//                             model: {
//                                 select: {
//                                     name: true,
//                                     brand: {
//                                         select: {
//                                             name: true,
//                                         },
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         };
//         const data: any = await this.service.findAll({
//             skip: pagination.page,
//             take: pagination.perPage,
//             select: select,
//             where: {
//                 id: req.user.companyId,
//                 companyType: {
//                     in: [
//                         $Enums.CompanyType.COMPANY,
//                         $Enums.CompanyType.SHIPPER_AND_COMPANY,
//                     ],
//                 },
//             },
//         });
//         for (let index = 0; index < data.data.length; index++) {
//             if (data.data[index].drivers)
//                 for (let j = 0; j < data.data[index].drivers.length; j++) {
//                     if (
//                         data.data[index].drivers[j].photos &&
//                         data.data[index].drivers[j].photos.length
//                     ) {
//                         const fileNames = data.data[index].drivers[j].photos.map(
//                             ({ name }) => name
//                         );

//                         // Now it matches the expected string[] type:
//                         const signedUrls =
//                             await this.s3PhotoService.getSignedUrls(fileNames);
//                         const urls = Object.values(signedUrls).map((url) => ({
//                             name: url,
//                         }));
//                         data.data[index].drivers[j].photos = urls;
//                     }
//                 }
//         }
//         return data;
//     }

//     /**
//      * Gets a company by id.
//      * @param id ID of the company to retrieve.
//      * @returns Company that matches the given id or an error.
//      */

//     @HttpCode(HttpStatus.OK)
//     @ApiResponseSwagger(findOneSwagger(CompanyDto, controllerName))
//     @Get()
//     async findOne(@Request() req: RequestUserId): Promise<CompanyEntity> {
//         return this.service.findOne(this.service.filter(req.user.companyId + ''));
//     }

//     /**
//      * Updates a company. It allows to update any field contained in the DTO object of the company.
//      * @param id ID of the company to update.
//      * @param UpdateCompanyDto Object containing the fields to update.
//      * @returns The updated company or an error.
//      */

//     @HttpCode(HttpStatus.ACCEPTED)
//     @ApiResponseSwagger(updateSwagger(CompanyDto, controllerName))
//     @Patch()
//     async updateCompany(
//         @Body() updateCompanyDto: UpdateCompanyDto,
//         @Request() req: RequestUserId
//     ): Promise<CompanyEntity> {
//         return this.service.updateCompanies(
//             updateCompanyDto,
//             req.user.companyId + '',
//             req.user.id + ''
//         );
//     }

//     /**
//      * Updates a company. It allows to update any field contained in the DTO object of the company.
//      * @param id ID of the company to update.
//      * @param UpdateCompanyDto Object containing the fields to update.
//      * @returns The updated company or an error.
//      */

//     @HttpCode(HttpStatus.ACCEPTED)
//     @ApiResponseSwagger(updateSwagger(CompanyDto, controllerName))
//     @Patch('add-driver-to-company/:id')
//     async addDriverToCompany(
//         @Param('id', PositiveNumberStringPipe) id: string,
//         @Request() req: RequestUserId
//     ) {
//         const create: Prisma.UserCompanyRoleCreateArgs = {
//             data: {
//                 userId: +id,
//                 companyId: req.user.companyId,
//                 roleId: 2,
//             },
//         };
//         return this.userCompanyRolesService.create(create);
//         // return this.service.updateCompanies(
//         //   this.service.filter(req.user.companyId + ''),
//         //   {
//         //     data: updateCompanyDto,
//         //     where: { id: req.user.companyId },
//         //   },
//         //   file
//         // );
//     }

//     /**
//      * Updates a company. It allows to update any field contained in the DTO object of the company.
//      * @param id ID of the company to update.
//      * @param UpdateCompanyDto Object containing the fields to update.
//      * @returns The updated company or an error.
//      */

//     @HttpCode(HttpStatus.ACCEPTED)
//     @ApiResponseSwagger(updateSwagger(CompanyDto, controllerName))
//     @Patch('invite-driver-to-company')
//     async inviteDriverToCompany(
//         @Body() signInDto: CompanyOtpDto,
//         @Request() req: RequestUserId
//     ) {
//         const data: { user: UserEntity; otp: string } =
//             await this.authService.carrierCompanySignUp(signInDto);
//         return this.service.inviteDriverToCompany(
//             signInDto,
//             req.user.companyId,
//             data.otp
//         );
//     }
// }
