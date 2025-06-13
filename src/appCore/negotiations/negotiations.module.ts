import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AblyService } from 'src/_shared/providers/ably/application/ably.service';
import { MessagesModule } from 'src/appCore/messages/messages.module';
import NegotiationModule from 'src/modules/negotiation/negotiation.module';
import OrderModule from 'src/modules/order/order.module';
// import { NegotiationsService } from './application/negotiations.service';
// import { NegotiationsController } from './infrastructure/negotiations.controller';
// import { NegotiationsCarrierController } from './infrastructure/negotiationsCarrier.controller';
// import { NegotiationsShipperController } from './infrastructure/negotiationsShipper.controller';

@Module({
  imports: [
    MessagesModule,
    OrderModule,
    NegotiationModule
  ],
  controllers: [
    // NegotiationsController,
    // NegotiationsCarrierController,
    // NegotiationsShipperController,
  ],
  providers: [
    // NegotiationsService,
    PrismaService,
    AblyService
  ],
  exports: [
    // NegotiationsService
  ],
})
export class NegotiationsModule { }
