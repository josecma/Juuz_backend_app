import { Module } from '@nestjs/common';
import { TransfersService } from './application/transfers.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [],
  providers: [TransfersService, PrismaService],
  exports: [TransfersService],
})
export class TransfersModule {}
