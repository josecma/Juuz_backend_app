import { forwardRef, Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import UserModule from "../user/user.module";
import GetPrivateUserChannelByUserIdUseCase from "./src/application/useCases/get.private.user.channel.by.user.id.use.case";
import AblyAdapter from "./src/infrastructure/adapters/ably.adapter";
import FCMAdapter from "./src/infrastructure/adapters/fcm.adapter";
import HandlebarsAdapter from "./src/infrastructure/adapters/handlebars.adapter";
import NodemailerAdapter from "./src/infrastructure/adapters/nodemailer.adapter";
import S3Adapter from "./src/infrastructure/adapters/s3.adapter";
import UUIDAdapter from "./src/infrastructure/adapters/uuid.adapter";
import ChannelReadRepository from "./src/infrastructure/channel.read.repository";
import ChannelWriteRepository from "./src/infrastructure/channel.write.repository";
import { EventDispatcher } from "./src/infrastructure/event.dispatcher";
import RequestWriteRepository from "./src/infrastructure/repositories/request.write.repository";

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
        FCMAdapter,
        NodemailerAdapter,
        HandlebarsAdapter,
        EventDispatcher,
        GetPrivateUserChannelByUserIdUseCase,
        ChannelReadRepository,
        ChannelWriteRepository,
        RequestWriteRepository,
    ],
    exports: [
        S3Adapter,
        AblyAdapter,
        UUIDAdapter,
        FCMAdapter,
        NodemailerAdapter,
        HandlebarsAdapter,
        EventDispatcher,
        GetPrivateUserChannelByUserIdUseCase,
        ChannelReadRepository,
        ChannelWriteRepository,
        RequestWriteRepository,
    ],
})
export default class SharedModule { };