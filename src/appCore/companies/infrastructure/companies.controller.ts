// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     HttpCode,
//     HttpStatus,
//     Param,
//     Patch,
//     Post,
//     Query,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import {
//     createSwagger,
//     deleteSwagger,
//     findOneSwagger,
//     findSwagger,
//     updateSwagger,
// } from 'src/_shared/infrastructure/swagger/http.swagger';
// import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
// import { CompaniesService } from '../application/companies.service';
// import {
//     CompanyDto,
//     UpdateCompanyDto,
//     UpdateStatusCompanyDto,
// } from '../domain/company.dtos';
// import { CompanyEntity } from '../domain/company.entity';
// import { PaginationCompanyDto } from '../domain/pagination-company.dto';
// import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
// import { $Enums, Prisma } from '@prisma/client';

// const controllerName = 'Companies';
// @ApiTags('Companies')
// @Controller({
//     path: 'companies/',
//     version: '1',
// })
// export class CompaniesController {
//     constructor(private readonly service: CompaniesService) { }

//     /**
//      * Creates a company.
//      * @param body DTO of the creation of a company.
//      * @returns The created company or an error.
//      */

//     @HttpCode(HttpStatus.CREATED)
//     @ApiResponseSwagger(createSwagger(CompanyDto, controllerName))
//     @Post()
//     async createCompany(@Body() body: CompanyDto): Promise<CompanyEntity> {
//         return await this.service.create({ data: body });
//     }

//     /**
//      * Gets all companies. It allows to filter by any field contained in the DTO object of the company.
//      * @param page Number of the page to retrieve.
//      * @param limit Limit of companies to retrieve.
//      * @param filter Filter of the companies to be retrieved in stringified JSON format.
//      * @returns companies that match a given filter or an error.
//      */

//     @HttpCode(HttpStatus.OK)
//     @ApiResponseSwagger(findSwagger(CompanyDto, controllerName))
//     @Get()
//     async findAll(
//         @Query() pagination: PaginationCompanyDto
//     ): Promise<PaginatedResponse<CompanyEntity>> {
//         let where: Prisma.CompanyWhereInput = {};

//         if (pagination.companyId) {
//             where = { id: pagination.companyId };
//         }
//         if (pagination.userId) {
//             where.userCompanyRoles = {
//                 every: {
//                     userId: pagination.userId,
//                 },
//             };
//         }
//         where['companyType'] = {
//             in: [$Enums.CompanyType.COMPANY, $Enums.CompanyType.SHIPPER_AND_COMPANY],
//         };
//         return this.service.findAll({
//             skip: pagination.page,
//             take: pagination.perPage,
//             select: this.service.select,
//             where,
//         });
//     }

//     /**
//      * Gets a company by id.
//      * @param id ID of the company to retrieve.
//      * @returns Company that matches the given id or an error.
//      */

//     @HttpCode(HttpStatus.OK)
//     @ApiResponseSwagger(findOneSwagger(CompanyDto, controllerName))
//     @Get(':id')
//     async findOne(@Param('id') id: string): Promise<CompanyEntity> {
//         return this.service.findOne(this.service.filter(id));
//     }

//     /**
//      * Updates a company. It allows to update any field contained in the DTO object of the company.
//      * @param id ID of the company to update.
//      * @param UpdateCompanyDto Object containing the fields to update.
//      * @returns The updated company or an error.
//      */

//     @HttpCode(HttpStatus.ACCEPTED)
//     @ApiResponseSwagger(updateSwagger(CompanyDto, controllerName))
//     @Patch(':id')
//     async updateCompany(
//         @Param('id') id: string,
//         @Body() updateCompanyDto: UpdateCompanyDto
//     ): Promise<CompanyEntity> {
//         return this.service.update(this.service.filter(id), {
//             data: updateCompanyDto,
//             where: { id: +id },
//         });
//     }

//     /**
//      * Updates a company. It allows to update any field contained in the DTO object of the company.
//      * @param id ID of the company to update.
//      * @param UpdateCompanyDto Object containing the fields to update.
//      * @returns The updated company or an error.
//      */

//     @HttpCode(HttpStatus.ACCEPTED)
//     @ApiResponseSwagger(updateSwagger(CompanyDto, controllerName))
//     @Patch('company-status/:id')
//     async updateStateCompany(
//         @Param('id') id: string,
//         @Body() updateCompanyDto: UpdateStatusCompanyDto
//     ): Promise<CompanyEntity> {
//         return this.service.update(this.service.filter(id), {
//             data: { companyStatus: updateCompanyDto.companyStatus },
//             where: { id: +id },
//         });
//     }

//     /**
//      * Deletes a company by id.
//      * @param id ID of the company to delete.
//      * @returns Null or an error.
//      */

//     @HttpCode(HttpStatus.ACCEPTED)
//     @ApiResponseSwagger(deleteSwagger(CompanyDto, controllerName))
//     @Delete(':id')
//     async deleteCompany(@Param('id') id: string): Promise<CompanyEntity> {
//         return this.service.remove(
//             this.service.filter(id),
//             this.service.filter(id)
//         );
//     }
// }
