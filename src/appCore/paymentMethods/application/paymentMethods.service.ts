import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { PaymentMethodEntity } from '../domain/paymentMethod.entity';

@Injectable()
export class PaymentMethodsService extends PrismaGenericService<
  PaymentMethodEntity,
  Prisma.PaymentMethodCreateArgs,
  Prisma.PaymentMethodFindUniqueArgs,
  Prisma.PaymentMethodUpdateArgs,
  Prisma.PaymentMethodDeleteArgs,
  Prisma.PaymentMethodFindManyArgs
> {
  private readonly logger = new Logger(PaymentMethodsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.paymentMethod);
  }
}
