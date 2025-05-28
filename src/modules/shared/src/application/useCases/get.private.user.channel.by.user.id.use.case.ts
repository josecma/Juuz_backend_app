import { Inject, Injectable } from "@nestjs/common";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import BuildChannelNameService from "src/modules/shared/src/domain/services/build.channel.name.service";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import ChannelReadRepository from "src/modules/shared/src/infrastructure/channel.read.repository";
import ChannelWriteRepository from "src/modules/shared/src/infrastructure/channel.write.repository";
import UserReadRepository from "src/modules/user/src/infrastructure/repositories/user.read.repository";

@Injectable({})
export default class GetPrivateUserChannelByUserIdUseCase {

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
        params: {
            userId: string;
        }
    ) {

        const { userId } = params;

        try {

            if (!userId) {
                throw new BadRequestDomainException(
                    {
                        message: "user id is required",
                        source: `${GetPrivateUserChannelByUserIdUseCase.name}`,
                    }
                );
            };

            const exist = await this.userReadRepository.exist(
                userId
            );

            if (!exist) {

                throw new NotFoundDomainException(
                    {
                        message: `user with id:${userId} not found`,
                        source: `${GetPrivateUserChannelByUserIdUseCase.name}`,
                    }
                );

            };

            const privateUserChannels = await this.channelReadRepository.findUserChannelBy(
                {
                    userId,
                    subStr: "private"
                }
            );

            if (privateUserChannels.length === 0) {

                const newChannelName = BuildChannelNameService.private().uuid().getBuiltChannelName();

                await this.channelWriteRepository.save(
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
                msg: "channel successfully recovered",
                content: {
                    token: userTokenWithChannels.token,
                    channels: userChannels.map((uCh) => { return { name: uCh.name, items: uCh.items } })
                },
            };

        } catch (error) {

            throw error;

        };

    };

};