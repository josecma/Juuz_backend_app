import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { ServiceEntity } from '../domain/service.entity';
import { ServiceDto, UpdateServiceDto } from '../domain/service.dtos';

@Injectable()
export class ServicesService extends PrismaGenericService<
  ServiceEntity,
  Prisma.ServiceCreateArgs,
  Prisma.ServiceFindUniqueArgs,
  Prisma.ServiceUpdateArgs,
  Prisma.ServiceDeleteArgs,
  Prisma.ServiceFindManyArgs
> {
  private readonly logger = new Logger(ServicesService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.service);
  }

  async createService(body: ServiceDto, ownerId: string) {
    const { subServices, ...data } = body;
    const subServiceCreateNested: Prisma.SubServiceCreateNestedManyWithoutServiceInput =
      subServices
        ? {
          connect: subServices.map((subServiceId) => ({ id: subServiceId })),
        }
        : undefined;
    const serviceCreateArgs: Prisma.ServiceCreateArgs = {
      data: {
        ...data,
        ownerId: ownerId,
        subService: subServiceCreateNested,
      },
    };
    return await this.create(serviceCreateArgs);
  }

  async updateService(
    id: string,
    updateServiceDto: UpdateServiceDto,
    userID: string
  ) {
    const { subServicesToRemove, subServicesToAdd, ...data } = updateServiceDto;
    const serviceUpdateInput: Prisma.ServiceUpdateInput = {
      ...data,
      subService: {
        disconnect: subServicesToRemove
          ? subServicesToRemove.map((personId) => ({ id: personId }))
          : undefined,
        connect: subServicesToAdd
          ? subServicesToAdd.map((personId) => ({ id: personId }))
          : undefined,
      },
    };
    return this.update(this.filter(id), {
      data: serviceUpdateInput,
      where: { id: id },
    });
  }
}
