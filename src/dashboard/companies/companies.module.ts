import { PrismaService } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { CompaniesService } from './application/companies.service';
import { CompaniesController } from './infrastructure/companies.controller';

@Module({
  imports: [],
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
