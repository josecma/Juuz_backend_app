import { Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import SharedModule from "../shared/shared.module";
import UserModule from "../user/user.module";
import NegotiationRepository from "./src/infrastructure/negotiation.repository";
import GetTrackingChannelUseCase from "./src/application/useCases/get.tracking.channel.use.case";
import OrderModule from "../order/order.module";

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
export default class NegotiationModule { };