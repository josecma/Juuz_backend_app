import { Inject, Module, OnModuleInit } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import OrderModule from "../order/order.module";
import SharedModule from "../shared/shared.module";
import IEventDispatcher from "../shared/src/application/contracts/i.event.dispatcher";
import IEventHandler from "../shared/src/application/contracts/i.event.handler";
import { EventDispatcher } from "../shared/src/infrastructure/event.dispatcher";
import UserModule from "../user/user.module";
import BusinessLeavedEventHandler from "./src/application/eventHandlers/business.leaved.event.handler";
import GetTrackingChannelUseCase from "./src/application/useCases/get.tracking.channel.use.case";
import BusinessLeavedEvent from "./src/domain/events/business.leaved.event";
import NegotiationRepository from "./src/infrastructure/negotiation.repository";

@Module({
    imports: [
        DatabaseModule,
        SharedModule,
        UserModule,
        OrderModule,
    ],
    controllers: [],
    providers: [
        NegotiationRepository,
        GetTrackingChannelUseCase,
    ],
    exports: [
        GetTrackingChannelUseCase,
    ]
})
export default class NegotiationModule implements OnModuleInit {

    public constructor(
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
        @Inject(BusinessLeavedEventHandler)
        private readonly businessLeavedEventHandler: IEventHandler,
    ) { };

    public async onModuleInit() {

        this.eventDispatcher.register(
            BusinessLeavedEvent.eventName,
            this.businessLeavedEventHandler,
        );

    };
};