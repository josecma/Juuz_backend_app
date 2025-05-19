import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { RoleEntity } from '../domain/role.entity';
import { RoleDto, UpdateRoleDto } from '../domain/role.dtos';

@Injectable()
export class RolesService extends PrismaGenericService<
  RoleEntity,
  Prisma.RoleCreateArgs,
  Prisma.RoleFindUniqueArgs,
  Prisma.RoleUpdateArgs,
  Prisma.RoleDeleteArgs,
  Prisma.RoleFindManyArgs
> {
  private readonly logger = new Logger(RolesService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.role);
  }

  async createService(body: RoleDto, ownerId: number, companyId: number) {
    const { permissions, ...data } = body;
    const permissionCreateNested: Prisma.PermissionCreateNestedManyWithoutRoleInput =
      permissions
        ? {
            connect: permissions.map((subServiceId) => ({ id: subServiceId })),
          }
        : undefined;
    const serviceCreateArgs: Prisma.RoleCreateArgs = {
      data: {
        ...data,
        ownerId: ownerId,
        permission: permissionCreateNested,
        companyId: companyId,
      },
    };
    return await this.create(serviceCreateArgs);
  }

  async updateService(
    id: string,
    updateServiceDto: UpdateRoleDto,
    userId: number,
    companyId: number
  ) {
    const { permissionsToRemove, permissionsToAdd, ...data } = updateServiceDto;
    const roleUpdateInput: Prisma.RoleUpdateInput = {
      ...data,
      permission: {
        disconnect: permissionsToRemove
          ? permissionsToRemove.map((personId) => ({ id: personId }))
          : undefined,
        connect: permissionsToAdd
          ? permissionsToAdd.map((personId) => ({ id: personId }))
          : undefined,
      },
    };
    return this.update(this.companyFilter(id + '', companyId), {
      data: roleUpdateInput,
      ...this.companyFilter(id + '', companyId),
    });
  }
}
