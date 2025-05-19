import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { SubServiceEntity } from '../domain/subService.entity';

@Injectable()
export class SubcServicesService extends PrismaGenericService<
  SubServiceEntity,
  Prisma.SubServiceCreateArgs,
  Prisma.SubServiceFindUniqueArgs,
  Prisma.SubServiceUpdateArgs,
  Prisma.SubServiceDeleteArgs,
  Prisma.SubServiceFindManyArgs
> {
  private readonly logger = new Logger(SubcServicesService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.subService);
  }
}
