import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PointsController } from './infrastructure/points.controller';
import { PointsService } from './application/points.service';
import { PointsDriversController } from './infrastructure/pointDrivers.controller';
import { OrdersModule } from 'src/appCore/orders/orders.module';
import { PointCacheProvider } from './domain/pointboard.cache';
import { PointCacheService } from './application/pointCache.service';
import { PointsShippersController } from './infrastructure/pointShippers.controller';
import { AWSModule } from 'src/s3/aws.module';
import UserModule from 'src/modules/user/user.module';

@Module({
  imports: [forwardRef(() => OrdersModule), AWSModule, UserModule],
  controllers: [
    PointsController,
    PointsDriversController,
    PointsShippersController,
  ],
  providers: [
    PointsService,
    PrismaService,
    PointCacheService,
    PointCacheProvider,
  ],
  exports: [PointsService],
})
export class PointsModule { }
