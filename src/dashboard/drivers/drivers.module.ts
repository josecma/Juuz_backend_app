import { PrismaService } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { DriversController } from './infrastructure/drivers.controller';
import { DriversService } from './application/drivers.service';

@Module({
  imports: [],
  controllers: [DriversController],
  providers: [DriversService, PrismaService],
  exports: [DriversService],
})
export class DriversModule {}
