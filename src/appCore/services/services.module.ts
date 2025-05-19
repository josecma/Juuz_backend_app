import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ServicesController } from './infrastructure/services.controller';
import { ServicesService } from './application/service.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
  exports: [ServicesService],
})
export class ServicesModule {}
