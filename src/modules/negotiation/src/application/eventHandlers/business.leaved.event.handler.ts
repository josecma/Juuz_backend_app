import { Injectable, Logger } from "@nestjs/common";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import GetCompanyPrivateChannelUseCase from "src/modules/shared/src/application/useCases/get.company.private.channel.use.case";
import GetUserPrivateChannelUseCase from "src/modules/shared/src/application/useCases/get.user.private.channel.use.case";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import BusinessLeavedEvent from "../../domain/events/business.leaved.event";


@Injectable({})
export default class BusinessLeavedEventHandler implements IEventHandler<BusinessLeavedEvent> {

    private readonly logger = new Logger(BusinessLeavedEventHandler.name);

    public constructor(
        private readonly ablyAdapter: AblyAdapter,
        private readonly getUserPrivateChannelUseCase: GetUserPrivateChannelUseCase,
        private readonly getCompanyPrivateChannelUseCase: GetCompanyPrivateChannelUseCase,
    ) { };

    public async handle(
        event: BusinessLeavedEvent,
    ): Promise<void> {

        const {
            leavedBy,
            stakeholders,
            businessId,
        } = event;

        try {

            stakeholders
                .filter(s => s.id != leavedBy)
                .map(

                    async s => {

                        let channel: string;

                        switch (s.type) {

                            case 'company':

                                channel = (await this.getCompanyPrivateChannelUseCase.execute(s.id)).channel[0];

                                break;

                            case 'user':

                                channel = (await this.getUserPrivateChannelUseCase.execute(s.id)).privateUserChannel[0];

                                break;

                            default:
                                break;

                        };

                        await this.ablyAdapter.publishMessage(
                            channel,
                            {
                                leavedBy
                            },
                            'business.leaved'
                        );

                    }

                );

        } catch (error) {

            this.logger.error(
                {
                    source: `${BusinessLeavedEventHandler.name}`,
                    message: `err notifying stakeholder counterparts: ${error.message}`,
                }
            );

        }

    };

};
