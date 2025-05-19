import { Module } from '@nestjs/common';
import { PermissionsService } from './application/permissions.service';
import { PrismaService } from 'nestjs-prisma';
import { PermissionsController } from './infrastructure/permissions.controller';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
