import { PrismaService } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { CarriesService } from './application/carries.service';
import { CarriesController } from './infrastructure/carries.controller';

@Module({
  imports: [],
  controllers: [CarriesController],
  providers: [CarriesService, PrismaService],
  exports: [CarriesService],
})
export class CarriesModule {}
