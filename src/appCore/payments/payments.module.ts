import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaymentsService } from './application/payment.service';
import { PaymentsController } from './infrastructure/payment.controller';
import { OrdersModule } from 'src/appCore/orders/orders.module';
import { StripeModule } from 'src/_shared/providers/stripe/stripe.module';
import { PaymentsCarrierController } from './infrastructure/paymentsCarrier.controller';

@Module({
  imports: [OrdersModule, forwardRef(() => StripeModule)],
  controllers: [PaymentsController, PaymentsCarrierController],
  providers: [PaymentsService, PrismaService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
