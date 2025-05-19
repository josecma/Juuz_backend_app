import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BrandsService } from './aplication/brand.service';
import { BrandsController } from './infractructure/brand.controller';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, PrismaService],
  exports: [BrandsService],
})
export class BrandsModule {}
