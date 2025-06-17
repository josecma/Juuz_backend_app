import { Injectable, Logger } from "@nestjs/common";
import DoesCompanyExistService from "src/modules/company/src/domain/services/does.company.exist.service";
import { CompanyPrivateChannelDetails } from "src/modules/company/src/domain/types/company.private.channel.details";
import CompanyReadRepository from "src/modules/company/src/infrastructure/repositories/company.read.repository";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import BuildChannelNameService from "src/modules/shared/src/domain/services/build.channel.name.service";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import ChannelReadRepository from "src/modules/shared/src/infrastructure/channel.read.repository";
import ChannelWriteRepository from "src/modules/shared/src/infrastructure/channel.write.repository";

@Injectable({})
export default class GetCompanyPrivateChannelUseCase {

    private readonly logger = new Logger(GetCompanyPrivateChannelUseCase.name);

    public constructor(
        private readonly companyReadRepository: CompanyReadRepository,
        private readonly doesCompanyExistService: DoesCompanyExistService,
        private readonly ablyAdapter: AblyAdapter,
        private readonly channelWriteRepository: ChannelWriteRepository,
        private readonly channelReadRepository: ChannelReadRepository,
    ) { };

    public async execute(
        companyId: string
    ) {

        try {

            if (!this.doesCompanyExistService.doesItExist(companyId)) {

                throw new NotFoundDomainException(
                    {
                        message: `company not found`,
                    }
                );

            };

            let companyPrivateChannel = await this.channelReadRepository.findCompanyPrivateChannel(
                companyId
            );

            if (companyPrivateChannel == null) {

                const newChannelName = BuildChannelNameService.company().private().uuid().getBuiltChannelName();

                companyPrivateChannel = await this.channelWriteRepository.saveV2(
                    {
                        name: newChannelName,
                        type: 'private',
                        details: {
                            owner: {
                                id: companyId,
                                type: 'company',
                                permissions: ["subscribe"],
                            }
                        }
                    }
                );

            };

            // const userChannels = await this.channelReadRepository.findUserChannels(
            //     {
            //         userId
            //     }
            // );

            // const channels = Object.fromEntries(
            //     userChannels.map(channel => [channel.name, channel.permissions])
            // );

            const { name, details } = companyPrivateChannel;

            const { owner } = details as CompanyPrivateChannelDetails;

            const tokenAndChannels = await this.ablyAdapter.createToken(
                {
                    memberId: companyId,
                    channels: { name: owner.permissions }
                }
            );

            return {
                token: tokenAndChannels.token,
                channel: tokenAndChannels.channels,
            };

        } catch (error) {

            this.logger.error(
                {
                    source: `${GetCompanyPrivateChannelUseCase.name}`,
                    message: `err getting company private channel: ${error.message}`
                }
            );

        };

    };

};