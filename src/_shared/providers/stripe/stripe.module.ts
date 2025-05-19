import { forwardRef, Module } from '@nestjs/common';
import { StripeController } from './infrastructure/stripe.controller';
import { StripeService } from './application/stripe.service';
import { PrismaService } from 'nestjs-prisma';
import { PaymentsModule } from 'src/appCore/payments/payments.module';
import { UsersModule } from 'src/appCore/users/users.module';

@Module({
  imports: [forwardRef(() => PaymentsModule), UsersModule],
  controllers: [StripeController],
  providers: [StripeService, PrismaService],
  exports: [StripeService],
})
export class StripeModule {}
