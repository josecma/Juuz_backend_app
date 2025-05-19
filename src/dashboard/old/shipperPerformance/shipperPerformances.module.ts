import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ShipperPerformancesService } from './application/shipperPerformance.service';
import { ShipperPerformancesController } from './infrastructure/shipperPerformance.controller';

@Module({
  controllers: [ShipperPerformancesController],
  providers: [ShipperPerformancesService, PrismaService],
  exports: [ShipperPerformancesService],
})
export class ShipperPerformancesModule {}
