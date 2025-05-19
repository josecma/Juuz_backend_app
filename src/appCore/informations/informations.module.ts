import { Module } from '@nestjs/common';
import { InformationsService } from './application/informations.service';
import { PrismaService } from 'nestjs-prisma';
import { InformationsController } from './infrastructure/informations.controller';

@Module({
  controllers: [InformationsController],
  providers: [InformationsService, PrismaService],
  exports: [InformationsService],
})
export class InformationsModule {}
