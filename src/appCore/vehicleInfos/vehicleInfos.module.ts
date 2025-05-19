import { Module } from '@nestjs/common';
import { VehicleInfosController } from './infrastructure/vehicleInfos.controller';
import { VehicleInfosService } from './application/vehicleInfos.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [VehicleInfosController],
  providers: [VehicleInfosService, PrismaService],
  exports: [VehicleInfosService],
})
export class VehicleInfosModule {}
