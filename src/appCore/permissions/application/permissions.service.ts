// import { Injectable, Logger } from '@nestjs/common';
// import { PrismaService } from 'nestjs-prisma';
// import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
// import { $Enums, Prisma } from '@prisma/client';
// import { PermissionEntity } from '../domain/permission.entity';
// import { PaginationPermissionDto } from '../domain/pagination-permission.dto';
// import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

// @Injectable()
// export class PermissionsService extends PrismaGenericService<
//   PermissionEntity,
//   Prisma.PermissionCreateArgs,
//   Prisma.PermissionFindUniqueArgs,
//   Prisma.PermissionUpdateArgs,
//   Prisma.PermissionDeleteArgs,
//   Prisma.PermissionFindManyArgs
// > {
//   private readonly logger = new Logger(PermissionsService.name);
//   constructor(private readonly prismaService: PrismaService) {
//     super(prismaService.permission);
//   }

//   async findCompanyPermision(
//     pagination: PaginationPermissionDto
//   ): Promise<PaginatedResponse<PermissionEntity>> {
//     const find: Prisma.PermissionWhereInput = {
//       role: {
//         some: {
//           name: $Enums.RolesEnum.COMPANY,
//         },
//       },
//     };
//     return this.findAll({
//       skip: pagination.page,
//       take: pagination.perPage,
//       where: find,
//     });
//   }
// }
