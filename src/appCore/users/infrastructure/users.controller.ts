// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpException,
//   HttpStatus,
//   Inject,
//   InternalServerErrorException,
//   NotFoundException,
//   Param,
//   Patch,
//   Post,
//   Query,
//   Request
// } from '@nestjs/common';
// import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
// import { RequestUserId } from 'src/_shared/domain/requestId';
// import {
//   createSwagger,
//   deleteSwagger,
//   findOneSwagger,
//   findSwagger,
//   updateSwagger,
// } from 'src/_shared/infrastructure/swagger/http.swagger';
// import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
// import { PositiveNumberStringPipe } from 'src/_shared/infrastructure/validators/paramsPositeNumber.validator';
// import BadRequestDomainException from 'src/modules/shared/src/domain/exceptions/bad.request.domain.exception';
// import DomainException from 'src/modules/shared/src/domain/exceptions/domain.exception';
// import FindUserLocationUseCase from 'src/modules/user/src/application/useCases/find.user.location.use.case';
// import GetUserDetailUseCase from 'src/modules/user/src/application/useCases/get.user.detail.use.case';
// import JoinCompanyRequestByEmailUseCase from 'src/modules/user/src/application/useCases/join.company.request.by.email.use.case';
// import { FindUserDetailDto } from 'src/modules/user/src/presentation/dtos/find.user.detail.dto';
// import JoinCompanyRequestByEmailDto from 'src/modules/user/src/presentation/dtos/join.company.request.by.email.dto';
// import { UsersService } from '../application/users.service';
// import { PaginationUserDto } from '../domain/pagination-user.dto';
// import { UserEntity } from '../domain/user.entity';
// import { UpdateUserDriverDto, UserDriverDto } from '../domain/userCarrier.dtos';
// import { UserExistDto } from '../domain/userExist.dtos';
// import { UserRoleIdDto } from '../domain/userRoleId.dtos';

// const controllerName = 'Users';
// @ApiTags('Users')
// @Controller({
//   path: 'users/',
//   version: '1',
// })
// export class UsersController {
//   constructor(
//     private readonly service: UsersService,
//     @Inject(GetUserDetailUseCase)
//     private readonly getUserDetailUseCase: GetUserDetailUseCase,
//     @Inject(FindUserLocationUseCase)
//     private readonly findUserLocationUseCase: FindUserLocationUseCase,
//     @Inject(JoinCompanyRequestByEmailUseCase)
//     private readonly joinCompanyRequestByEmailUseCase: JoinCompanyRequestByEmailUseCase,
//   ) { }

//   /**
//    * Creates a user.
//    * @param body DTO of the creation of a user.
//    * @returns The created user or an error.
//    */

//   @HttpCode(HttpStatus.CREATED)
//   @ApiResponseSwagger(createSwagger(UserEntity, controllerName))
//   @Post()
//   async createUser(
//     @Body() body: UserDriverDto,
//     @Request() req: RequestUserId
//   ): Promise<UserEntity> {
//     return this.service.createUser(body, req.user.id, req.user.companyId);
//   }

//   /**
//    * Creates a user.
//    * @param body DTO of the creation of a user.
//    * @returns The created user or an error.
//    */

//   @HttpCode(HttpStatus.CREATED)
//   @ApiResponseSwagger(createSwagger(UserEntity, controllerName))
//   @Post('newUser')
//   async createNewUser(
//     @Request() req: RequestUserId,
//     @Body() body: UserRoleIdDto
//   ): Promise<string> {
//     return this.service.createNewUser(
//       req.user.id,
//       req.user.companyId,
//       body.roleId
//     );
//   }

//   /**
//    * Creates a user.
//    * @param body DTO of the creation of a user.
//    * @returns The created user or an error.
//    */

//   @HttpCode(HttpStatus.CREATED)
//   @ApiResponseSwagger(createSwagger(UserEntity, controllerName))
//   @Post('existUser')
//   async createExistUser(
//     @Body() body: UserExistDto,
//     @Request() req: RequestUserId
//   ): Promise<string> {
//     return this.service.createExistUser(body, req.user.companyId);
//   }

//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({
//     summary: "Get current user location status",
//     description: "Endpoint to get the current user location status",
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: "Location found successfully"
//   })
//   @ApiResponse({
//     status: HttpStatus.NOT_FOUND,
//     description: "Coordinates not found"
//   })
//   @Get("/location_status")
//   public async getStatusLocation(
//     @Request() req: RequestUserId
//   ) {

//     try {

//       const userLocation = await this.findUserLocationUseCase.execute(
//         { id: req.user.id as unknown as string }
//       );

//       if (!userLocation) {

//         throw new NotFoundException('Coordinates not found');

//       };

//       return userLocation;

//     } catch (error) {

//       if (error instanceof HttpException) {

//         throw error;

//       };

//       throw new InternalServerErrorException(error.message);

//     };

//   };

//   /**
//    * Gets all users. It allows to filter by any field contained in the DTO object of the user.
//    * @param page Number of the page to retrieve.
//    * @param limit Limit of users to retrieve.
//    * @param filter Filter of the users to be retrieved in stringified JSON format.
//    * @returns users that match a given filter or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findSwagger(UserEntity, controllerName))
//   @Get()
//   async findAll(
//     @Query() pagination: PaginationUserDto,
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
//           },
//         },
//       },
//     });
//   }

//   @ApiParam({
//     name: 'id',
//     type: Number,
//     description: 'ID of the user to retrieve details for',
//     example: 1,
//     required: true
//   })
//   @ApiQuery({
//     name: "role",
//     type: FindUserDetailDto,
//     description: "role type value"
//   })
//   @Get("/details/:id")
//   async findUserDetails(
//     @Param('id') id: string,
//     @Query() query: FindUserDetailDto,

//   ) {

//     const { role, ...queryRes } = query;

//     const {
//       user,
//       company,
//       vehicles,
//       averageEvaluationByCriterion,
//       averageEvaluationByEvaluation,
//       averageEvaluationByRole,
//       groupAndCountOrderStatus,
//     } = queryRes;

//     const include = {
//       user: query.user,
//       company: query.company,
//       vehicles: query.vehicles,
//       averageEvaluationByRole: query.averageEvaluationByRole,
//       averageEvaluationByCriterion: query.averageEvaluationByCriterion,
//       averageEvaluationByEvaluation: query.averageEvaluationByEvaluation,
//       groupAndCountOrderStatus: query.groupAndCountOrderStatus,
//     };

//     const values = Object.values(include).filter(e => e !== undefined);

//     if (values.length > 0 && !values.every(val => val === values[0])) {
//       throw new BadRequestException('query parameters must be consistent (all true or all false)');
//     };

//     try {

//       const res = await this.getUserDetailUseCase.execute(
//         {
//           userId: id,
//           role: query.role,
//           include: values.length > 0
//             ?
//             {
//               user: user === undefined ? !values[0] : user,
//               company: company === undefined ? !values[0] : company,
//               vehicles: vehicles === undefined ? !values[0] : vehicles,
//               averageEvaluationByRole: averageEvaluationByRole === undefined ? !values[0] : averageEvaluationByRole,
//               averageEvaluationByEvaluation: averageEvaluationByEvaluation === undefined ? !values[0] : averageEvaluationByEvaluation,
//               averageEvaluationByCriterion: averageEvaluationByCriterion === undefined ? !values[0] : averageEvaluationByCriterion,
//               groupAndCountOrderStatus: groupAndCountOrderStatus === undefined ? !values[0] : groupAndCountOrderStatus,
//             }
//             :
//             undefined,
//         }
//       );
//       return res;
//     } catch (error) {

//       if (error instanceof DomainException) {
//         if (error instanceof BadRequestDomainException)
//           return new BadRequestException(
//             error.toJSON()
//           );
//       };
//       throw new InternalServerErrorException(error);
//     };
//   }

//   /**
//    * Gets a user by id.
//    * @param id ID of the user to retrieve.
//    * @returns User that matches the given id or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findOneSwagger(UserEntity, controllerName))
//   @Get(':id')
//   async findOne(
//     @Param('id', PositiveNumberStringPipe) id: string,
//     @Request() req: RequestUserId
//   ): Promise<UserEntity> {
//     return this.service.findOne({
//       ...this.service.companyFilter(id, req.user.companyId),
//       select: this.service.userselect,
//     });
//   }

//   /**
//    * Updates a user. It allows to update any field contained in the DTO object of the user.
//    * @param id ID of the user to update.
//    * @param UpdateUserDto Object containing the fields to update.
//    * @returns The updated user or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(updateSwagger(UserEntity, controllerName))
//   @Patch(':id')
//   async updateUser(
//     @Param('id') id: string,
//     @Body() updateUserDto: UpdateUserDriverDto,
//     @Request() req: RequestUserId
//   ): Promise<UserEntity> {
//     return this.service.updateUser(
//       id,
//       updateUserDto,
//       req.user.id,
//       req.user.companyId
//     );
//   }

//   /**
//    * Deletes a user by id.
//    * @param id ID of the user to delete.
//    * @returns Null or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(deleteSwagger(UserEntity, controllerName))
//   @Delete(':id')
//   async deleteUser(
//     @Param('id') id: string,
//     @Request() req: RequestUserId
//   ): Promise<UserEntity> {
//     return this.service.remove(
//       this.service.companyFilter(id, req.user.companyId),
//       this.service.companyFilter(id, req.user.companyId)
//     );
//   }

//   @Post("/join/company/request/by/email")
//   public async inviteUserToCompany(
//     @Request() req: RequestUserId,
//     @Body() body: JoinCompanyRequestByEmailDto,
//   ) {

//     try {

//       await this.joinCompanyRequestByEmailUseCase.execute(
//         {

//           email: body.email,
//           inviterId: req.user.id.toString(),
//           as: body.role
//         }
//       );

//     } catch (error) {

//       throw error;

//     };

//   };

// };
