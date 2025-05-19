import { Module } from '@nestjs/common';
import { RolesService } from './application/roles.service';
import { PrismaService } from 'nestjs-prisma';
import { RolesController } from './infrastructure/role.controller';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService],
  exports: [RolesService],
})
export class RolesModule {}
