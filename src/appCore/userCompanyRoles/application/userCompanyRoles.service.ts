import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { UserCompanyRoleEntity } from '../domain/userCompanyRole.entity';

@Injectable()
export class UserCompanyRolesService extends PrismaGenericService<
  UserCompanyRoleEntity,
  Prisma.UserCompanyRoleCreateArgs,
  Prisma.UserCompanyRoleFindUniqueArgs,
  Prisma.UserCompanyRoleUpdateArgs,
  Prisma.UserCompanyRoleDeleteArgs,
  Prisma.UserCompanyRoleFindManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.userCompanyRole);
  }
}
