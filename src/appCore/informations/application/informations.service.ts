import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { InformationEntity } from '../domain/information.entity';

@Injectable()
export class InformationsService extends PrismaGenericService<
  InformationEntity,
  Prisma.InformationCreateArgs,
  Prisma.InformationFindUniqueArgs,
  Prisma.InformationUpdateArgs,
  Prisma.InformationDeleteArgs,
  Prisma.InformationFindManyArgs
> {
  private readonly logger = new Logger(InformationsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.information);
  }
}
