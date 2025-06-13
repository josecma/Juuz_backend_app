import { Inject, Injectable } from "@nestjs/common";
import UserReadRepository from "src/modules/user/src/infrastructure/repositories/user.read.repository";
import { RoleType } from "../../domain/enums/role.type";
import BadRequestDomainException from "../../domain/exceptions/bad.request.domain.exception";
import NotFoundDomainException from "../../domain/exceptions/not.found.domain.exception";
import AblyAdapter from "../../infrastructure/adapters/ably.adapter";
import ChannelReadRepository from "../../infrastructure/channel.read.repository";

@Injectable({})
export default class GetTrackingChannelUseCase {

    public constructor(
        @Inject(ChannelReadRepository)
        private readonly channelReadRepository: ChannelReadRepository,
        @Inject(UserReadRepository)
        private readonly userReadRepository: UserReadRepository,
        @Inject(AblyAdapter)
        private readonly ablyAdapter: AblyAdapter,
    ) { };

    public async execute(
        params: {
            userId: string;
            role: RoleType;
        }
    ) {

        const { userId, role } = params;

        try {

            if (!userId) {
                throw new BadRequestDomainException(
                    {
                        message: "user id is required",
                        source: `${GetTrackingChannelUseCase.name}`,
                    }
                );
            };

            if (!role) {
                throw new BadRequestDomainException(
                    {
                        message: "role is required",
                        source: `${GetTrackingChannelUseCase.name}`,
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
                    }
                );
            };

            const channels = await this.channelReadRepository.findUserChannels(
                {
                    userId,
                }
            );

        } catch (error) {

            throw error;

        };

    };

};