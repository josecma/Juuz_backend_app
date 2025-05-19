import { forwardRef, Inject, Module, OnModuleInit } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import EvidenceCreatedEvent from "../evidence/src/domain/events/evidence.created.event";
import SharedModule from "../shared/shared.module";
import IEventDispatcher from "../shared/src/application/contracts/i.event.dispatcher";
import IEventHandler from "../shared/src/application/contracts/i.event.handler";
import { EventDispatcher } from "../shared/src/infrastructure/event.dispatcher";
import UserModule from "../user/user.module";
import EvidenceCreatedHandler from "./src/application/eventHandlers/evidence.created.handler";
import UpdateOrderService from "./src/application/update.order.service";
import FindOneOrderByIdUseCase from "./src/application/useCases/find.one.order.by.id.use.case";
import OrderRepository from "./src/infrastructure/order.repository";
import FindOneOrderByIdService from "./src/domain/services/find.one.order.by.id.service";
import CancelOrderByIdUseCase from "./src/application/useCases/cancel.order.by.id.use.case";
import OrderReadRepository from "./src/infrastructure/repositories/order.read.repository";
import GetOrderNegotiationsUseCase from "./src/application/useCases/get.order.negotiations.use.case";
import NegotiationReadRepository from "./src/infrastructure/repositories/negotiation.read.repository";
import StartOrderUseCase from "./src/application/useCases/start.order.use.case";
import ChangeOrderStatusUseCase from "./src/application/useCases/change.order.status.use.case";
import UpdateOrderUseCase from "./src/application/useCases/update.order.use.case";

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => UserModule),
        forwardRef(() => SharedModule),
    ],
    controllers: [],
    providers: [
        OrderRepository,
        OrderReadRepository,
        NegotiationReadRepository,
        FindOneOrderByIdUseCase,
        UpdateOrderService,
        FindOneOrderByIdService,
        CancelOrderByIdUseCase,
        GetOrderNegotiationsUseCase,
        EvidenceCreatedHandler,
        StartOrderUseCase,
        UpdateOrderUseCase,
        ChangeOrderStatusUseCase,
    ],
    exports: [
        OrderRepository,
        OrderReadRepository,
        FindOneOrderByIdUseCase,
        UpdateOrderService,
        CancelOrderByIdUseCase,
        FindOneOrderByIdService,
        GetOrderNegotiationsUseCase,
        StartOrderUseCase,
    ],
})
export default class OrderModule implements OnModuleInit {

    public constructor(
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
        @Inject(EvidenceCreatedHandler)
        private readonly evidenceCreatedHandler: IEventHandler,
    ) { };

    public onModuleInit() {

        this.eventDispatcher.register(
            EvidenceCreatedEvent.eventName,
            this.evidenceCreatedHandler,
        );

    };

};