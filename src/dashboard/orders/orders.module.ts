import { PrismaService } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { OrdersController } from './infrastructure/orders.controller';
import { OrdersService } from './application/orders.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
  exports: [OrdersService],
})
export class OrdersModule {}
