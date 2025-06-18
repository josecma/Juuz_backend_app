import { Injectable, Logger } from "@nestjs/common";
import GetCompanyPrivateChannelUseCase from "src/modules/shared/src/application/useCases/get.company.private.channel.use.case";
import GetUserPrivateChannelUseCase from "src/modules/shared/src/application/useCases/get.user.private.channel.use.case";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import { BusinessStakeholder } from "../../domain/types/business.stakeholder";

@Injectable({})
export default class NotifyBusinessStakeholdersUseCase {

    private readonly logger = new Logger(NotifyBusinessStakeholdersUseCase.name);

    public constructor(
        private readonly ablyAdapter: AblyAdapter,
        private readonly getUserPrivateChannelUseCase: GetUserPrivateChannelUseCase,
        private readonly getCompanyPrivateChannelUseCase: GetCompanyPrivateChannelUseCase,
    ) { };

    public async execute(
        params: {
            stakeholders: Array<BusinessStakeholder<any>>,
            message: any,
            name: string,
        }
    ): Promise<void> {

        const {
            stakeholders,
            message,
            name,
        } = params;

        try {

            const notifying = stakeholders
                .map(

                    async s => {

                        let channel: string;

                        switch (s.type) {

                            case 'COMPANY':

                                channel = (await this.getCompanyPrivateChannelUseCase.execute(s.id)).channel[0];

                                break;

                            case 'USER':

                                channel = (await this.getUserPrivateChannelUseCase.execute(s.id)).privateUserChannel[0];

                                break;

                            default:

                                break;

                        }

                        await this.ablyAdapter.publishMessage(
                            channel,
                            message,
                            name
                        );

                    }

                );

            await Promise.all(notifying);

            this.logger.log("stakeholders notified successfulley");

        } catch (error) {

            this.logger.error(
                {
                    source: `${NotifyBusinessStakeholdersUseCase.name}`,
                    message: `err notifying stakeholders: ${error.message}`,
                }
            );

        };

    };

};
