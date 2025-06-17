import { forwardRef, Inject, Module, OnModuleInit } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import UserModule from "../user/user.module";
import IEventDispatcher from "./src/application/contracts/i.event.dispatcher";
import IEventHandler from "./src/application/contracts/i.event.handler";
import FileDeletedHandler from "./src/application/eventHandlers/file.deleted.handler";
import GetPrivateUserChannelByUserIdUseCase from "./src/application/useCases/get.user.private.channel.use.case";
import FileDeletedEvent from "./src/domain/events/file.deleted.event";
import AblyAdapter from "./src/infrastructure/adapters/ably.adapter";
import HandlebarsAdapter from "./src/infrastructure/adapters/handlebars.adapter";
import NodemailerAdapter from "./src/infrastructure/adapters/nodemailer.adapter";
import S3Adapter from "./src/infrastructure/adapters/s3.adapter";
import UUIDAdapter from "./src/infrastructure/adapters/uuid.adapter";
import ChannelReadRepository from "./src/infrastructure/channel.read.repository";
import ChannelWriteRepository from "./src/infrastructure/channel.write.repository";
import { EventDispatcher } from "./src/infrastructure/event.dispatcher";
import { InfrastructureEventEmitter } from "./src/infrastructure/events/infrastructure.event.emitter";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Module({
    imports: [
        forwardRef(() => UserModule),
        DatabaseModule,
    ],
    controllers: [],
    providers: [
        S3Adapter,
        AblyAdapter,
        UUIDAdapter,
        // FCMAdapter,
        NodemailerAdapter,
        HandlebarsAdapter,
        EventDispatcher,
        GetPrivateUserChannelByUserIdUseCase,
        ChannelReadRepository,
        ChannelWriteRepository,
        FileDeletedHandler,
        EventEmitter2,
        InfrastructureEventEmitter,
    ],
    exports: [
        S3Adapter,
        AblyAdapter,
        UUIDAdapter,
        // FCMAdapter,
        NodemailerAdapter,
        HandlebarsAdapter,
        EventDispatcher,
        GetPrivateUserChannelByUserIdUseCase,
        ChannelReadRepository,
        ChannelWriteRepository,
        InfrastructureEventEmitter
    ],
})
export default class SharedModule implements OnModuleInit {

    public constructor(
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
        @Inject(FileDeletedHandler)
        private readonly fileDeletedHandler: IEventHandler,
    ) { };

    public onModuleInit() {

        this.eventDispatcher.register(
            FileDeletedEvent.eventName,
            this.fileDeletedHandler,
        );

    };

};