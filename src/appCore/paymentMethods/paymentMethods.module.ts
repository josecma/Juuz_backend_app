import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './infrastructure/paymentMethods.controller';
import { PaymentMethodsService } from './application/paymentMethods.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService, PrismaService],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
