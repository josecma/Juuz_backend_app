import { Injectable, Logger } from "@nestjs/common";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import GetCompanyPrivateChannelUseCase from "src/modules/shared/src/application/useCases/get.company.private.channel.use.case";
import GetUserPrivateChannelUseCase from "src/modules/shared/src/application/useCases/get.user.private.channel.use.case";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import OfferMadeEvent from "../../domain/events/offer.made.event";


@Injectable({})
export default class OfferMadeEventHandler implements IEventHandler<OfferMadeEvent> {

    private readonly logger = new Logger(OfferMadeEventHandler.name);

    public constructor(
        private readonly ablyAdapter: AblyAdapter,
        private readonly getUserPrivateChannelUseCase: GetUserPrivateChannelUseCase,
        private readonly getCompanyPrivateChannelUseCase: GetCompanyPrivateChannelUseCase,
    ) { };

    public async handle(
        event: OfferMadeEvent,
    ): Promise<void> {

        const {
            madeBy,
            stakeholders,
            businessId,
        } = event;

        try {

            await Promise.all(
                stakeholders
                    .filter(s => s.id != madeBy)
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
                                    madeBy
                                },
                                'offer'
                            );

                        }

                    )
            )

        } catch (error) {

            this.logger.error(
                {
                    source: `${OfferMadeEventHandler.name}`,
                    message: `err notifying stakeholder counterparts: ${error.message}`,
                }
            );

        }

    };

};
