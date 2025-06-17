import { Injectable, Logger } from "@nestjs/common";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import BuildChannelNameService from "src/modules/shared/src/domain/services/build.channel.name.service";
import ChannelWriteRepository from "src/modules/shared/src/infrastructure/channel.write.repository";
import CompanyCreatedEvent from "../../domain/events/company.created.event";

@Injectable({})
export default class CompanyCreatedEventHandler implements IEventHandler<CompanyCreatedEvent> {

    private readonly logger = new Logger(CompanyCreatedEventHandler.name);

    public constructor(
        private readonly channelWriteRepository: ChannelWriteRepository,
    ) { };

    public async handle(
        event: CompanyCreatedEvent,
    ): Promise<void> {

        const {
            company,
            ownerId,
        } = event;

        try {

            const channelName = BuildChannelNameService.company().private().uuid().getBuiltChannelName();

            const companyPrivateChannel = await this.channelWriteRepository.saveV2(
                {
                    name: channelName,
                    type: 'private',
                    details: {
                        owner: {
                            id: company.id,
                            type: 'company',
                            permissions: ["subscribe"],
                        }
                    }
                }
            );

            this.logger.log(`private company channel created: ${channelName}`);

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyCreatedEventHandler.name}`,
                    message: `err handling company created event: ${error.message}`
                }
            );

        };

    };

};
