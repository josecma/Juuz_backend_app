import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SubcServicesService } from './application/subServices.service';
import { SubcservicesController } from './infrastructure/subServices.controller';

@Module({
  controllers: [SubcservicesController],
  providers: [SubcServicesService, PrismaService],
  exports: [SubcServicesService],
})
export class SubServicesModule {}
