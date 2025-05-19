import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CarrierPerformancesService } from './application/carrierPerformance.service';
import { CarrierPerformancesController } from './infrastructure/carrierPerformance.controller';

@Module({
  controllers: [CarrierPerformancesController],
  providers: [CarrierPerformancesService, PrismaService],
  exports: [CarrierPerformancesService],
})
export class CarrierPerformancesModule {}
