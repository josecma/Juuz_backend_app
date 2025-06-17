import { Inject, Injectable, Logger } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import BuildChannelNameService from "src/modules/shared/src/domain/services/build.channel.name.service";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import ChannelReadRepository from "src/modules/shared/src/infrastructure/channel.read.repository";
import ChannelWriteRepository from "src/modules/shared/src/infrastructure/channel.write.repository";
import UserReadRepository from "src/modules/user/src/infrastructure/repositories/user.read.repository";

@Injectable({})
export default class GetUserPrivateChannelUseCase {

    private readonly logger = new Logger(GetUserPrivateChannelUseCase.name);

    public constructor(
        @Inject(UserReadRepository)
        private readonly userReadRepository: UserReadRepository,
        @Inject(AblyAdapter)
        private readonly ablyAdapter: AblyAdapter,
        @Inject(ChannelWriteRepository)
        private readonly channelWriteRepository: ChannelWriteRepository,
        @Inject(ChannelReadRepository)
        private readonly channelReadRepository: ChannelReadRepository,
    ) { };

    public async execute(
        userId: string
    ) {

        try {

            const exist = await this.userReadRepository.exist(
                userId
            );

            if (!exist) {

                throw new NotFoundDomainException(
                    {
                        message: `user not found`,
                    }
                );

            };

            let privateUserChannel = await this.channelReadRepository.findUserPrivateChannel(
                userId
            );

            if (privateUserChannel == null) {

                const newChannelName = BuildChannelNameService.user().private().uuid().getBuiltChannelName();

                privateUserChannel = await this.channelWriteRepository.save(
                    {
                        userId,
                        name: newChannelName,
                        permissions: ['subscribe'],
                        items: []
                    }
                );

            };

            const userChannels = await this.channelReadRepository.findUserChannels(
                {
                    userId
                }
            );

            const channels = Object.fromEntries(
                userChannels.map(channel => [channel.name, channel.permissions])
            );

            const userTokenWithChannels = await this.ablyAdapter.createToken(
                {
                    memberId: userId,
                    channels: channels
                }
            );

            return {
                token: userTokenWithChannels.token,
                privateUserChannel,
            };

        } catch (error) {

            this.logger.error(
                {
                    source: `${GetUserPrivateChannelUseCase.name}`,
                    message: `err getting user private channel: ${error.message}`
                }
            );

        };

    };

};