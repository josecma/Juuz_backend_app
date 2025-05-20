import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MassagesService } from './application/messages.service';
import { SubcservicesController } from './infrastructure/messages.controller';

@Module({
  controllers: [
    SubcservicesController
  ],
  providers: [
    MassagesService,
    PrismaService],
  exports: [
    MassagesService
  ],
})
export class MessagesModule { }
