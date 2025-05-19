import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { VehicleInfoEntity } from '../domain/vehicleInfo.entity';

@Injectable()
export class VehicleInfosService extends PrismaGenericService<
  VehicleInfoEntity,
  Prisma.VehicleInfoCreateArgs,
  Prisma.VehicleInfoFindUniqueArgs,
  Prisma.VehicleInfoUpdateArgs,
  Prisma.VehicleInfoDeleteArgs,
  Prisma.VehicleInfoFindManyArgs
> {
  private readonly logger = new Logger(VehicleInfosService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.vehicleInfo);
  }
}
