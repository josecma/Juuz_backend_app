import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { TransferEntity } from '../domain/transfer.entity';

@Injectable()
export class TransfersService extends PrismaGenericService<
  TransferEntity,
  Prisma.TransferCreateArgs,
  Prisma.TransferFindUniqueArgs,
  Prisma.TransferUpdateArgs,
  Prisma.TransferDeleteArgs,
  Prisma.TransferFindManyArgs
> {
  private readonly logger = new Logger(TransfersService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.transfer);
  }
}
