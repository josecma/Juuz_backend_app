import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// import { TripsService } from './application/trip.service';
// import { TripsController } from './infrastructure/trip.controller';
import { OrdersModule } from 'src/appCore/orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [
    // TripsController
  ],
  providers: [
    // TripsService,
    PrismaService],
  exports: [
    // TripsService
  ],
})
export class TripsModule { }
