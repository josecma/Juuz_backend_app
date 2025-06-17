import { Injectable, Logger } from "@nestjs/common";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import GetCompanyPrivateChannelUseCase from "src/modules/shared/src/application/useCases/get.company.private.channel.use.case";
import GetUserPrivateChannelUseCase from "src/modules/shared/src/application/useCases/get.user.private.channel.use.case";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import StakeholderStatusChangedEvent from "../../domain/events/stakeholder.status.changed.event";


@Injectable({})
export default class StakeholderStatusChangedEventHandler implements IEventHandler<StakeholderStatusChangedEvent> {

    private readonly logger = new Logger(StakeholderStatusChangedEventHandler.name);

    public constructor(
        private readonly ablyAdapter: AblyAdapter,
        private readonly getUserPrivateChannelUseCase: GetUserPrivateChannelUseCase,
        private readonly getCompanyPrivateChannelUseCase: GetCompanyPrivateChannelUseCase,
    ) { };

    public async handle(
        event: StakeholderStatusChangedEvent,
    ): Promise<void> {

        const {
            changedBy,
            stakeholders,
            businessId,
        } = event;

        try {

            await Promise.all(
                stakeholders
                    .filter(s => s.id != changedBy)
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

                            }

                            await this.ablyAdapter.publishMessage(
                                channel,
                                {
                                    changedBy
                                },
                                'status'
                            );

                        }

                    )
            )

        } catch (error) {

            this.logger.error(
                {
                    source: `${StakeholderStatusChangedEventHandler.name}`,
                    message: `err notifying stakeholder counterparts: ${error.message}`,
                }
            );

        }

    };

};
