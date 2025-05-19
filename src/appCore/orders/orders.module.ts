import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './infrastructure/orders.controller';
import { OrdersService } from './application/orders.service';
import { PrismaService } from 'nestjs-prisma';
import { DriversModule } from 'src/appCore/drivers/drivers.module';
import { VehicleInfosModule } from 'src/appCore/vehicleInfos/vehicleInfos.module';
import { PointsModule } from 'src/appCore/points/points.module';
import { AblyModule } from 'src/_shared/providers/ably/ably.module';
import { NegotiationsModule } from 'src/appCore/negotiations/negotiations.module';
import { S3Service } from 'src/s3/aplication/s3.service';
import { OrdersCarrierController } from './infrastructure/ordersCarrier.controller';
import { OrdersShipperController } from './infrastructure/ordersShipper.controller';
import { UsersModule } from 'src/appCore/users/users.module';
import { MessagesModule } from 'src/appCore/messages/messages.module';
import OrderModule from 'src/modules/order/order.module';
@Module({
  imports: [
    DriversModule,
    AblyModule,
    VehicleInfosModule,
    forwardRef(() => PointsModule),
    NegotiationsModule,
    UsersModule,
    MessagesModule,
    OrderModule,
  ],
  controllers: [
    OrdersController,
    OrdersCarrierController,
    OrdersShipperController,
  ],
  providers: [OrdersService, PrismaService, S3Service],
  exports: [OrdersService],
})
export class OrdersModule { }
