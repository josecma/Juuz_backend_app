import { Module } from '@nestjs/common';
import { ComunicationsController } from './infrastructure/comunications.controller';
import { ComunicationsService } from './application/comunications.service';
import { PrismaService } from 'nestjs-prisma';
import { AblyModule } from 'src/_shared/providers/ably/ably.module';
import { OrdersModule } from 'src/appCore/orders/orders.module';

@Module({
  imports: [AblyModule, OrdersModule],
  controllers: [ComunicationsController],
  providers: [ComunicationsService, PrismaService],
  exports: [ComunicationsService],
})
export class ComunicationsModule {}
