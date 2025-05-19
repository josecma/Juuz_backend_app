import { Module } from '@nestjs/common';
import { SessionsController } from './infrastructure/sessions.controller';
import { SessionsService } from './application/sessions.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, PrismaService],
  exports: [SessionsService],
})
export class SessionsModule {}
