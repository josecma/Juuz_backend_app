import { Inject, Injectable } from "@nestjs/common";
import DoesUserExistRepository from "src/modules/user/src/infrastructure/repositories/does.user.exist.repository";
import { RoleType } from "../../domain/enums/role.type";
import BadRequestDomainException from "../../domain/exceptions/bad.request.domain.exception";
import NotFoundDomainException from "../../domain/exceptions/not.found.domain.exception";
import ChannelReadRepository from "../../infrastructure/channel.read.repository";
import AblyAdapter from "../../infrastructure/adapters/ably.adapter";

@Injectable({})
export default class GetTrackingChannelUseCase {

    public constructor(
        @Inject(ChannelReadRepository)
        private readonly channelReadRepository: ChannelReadRepository,
        @Inject(DoesUserExistRepository)
        private readonly doesUserExistRepository: DoesUserExistRepository,
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

            const exist = await this.doesUserExistRepository.exist(
                {
                    userId,
                }
            );

            if (!exist) {
                throw new NotFoundDomainException(
                    {
                        message: `user with id:${userId} not found`,
                        source: `${GetTrackingChannelUseCase.name}`,
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