import { Injectable, Logger } from "@nestjs/common";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import StakeholderStatusChangedEvent from "../../domain/events/stakeholder.status.changed.event";
import NotifyBusinessStakeholdersUseCase from "../useCases/notify.business.stakeholders.use.case";

@Injectable({})
export default class StakeholderStatusChangedEventHandler implements IEventHandler<StakeholderStatusChangedEvent> {

    private readonly logger = new Logger(StakeholderStatusChangedEventHandler.name);

    public constructor(
        private readonly notifyBusinessStakeholdersUseCase: NotifyBusinessStakeholdersUseCase,
    ) { };

    public async handle(
        event: StakeholderStatusChangedEvent,
    ): Promise<void> {

        const {
            changedBy,
            stakeholders,
            businessId,
            status,
        } = event;

        try {

            await this.notifyBusinessStakeholdersUseCase.execute(
                {
                    stakeholders: stakeholders.filter(s => s.id !== changedBy),
                    message: {
                        businessId,
                        stakeholderId: changedBy,
                        status,
                    },
                    name: 'StakeholderStatusChangedEvent'
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${StakeholderStatusChangedEventHandler.name}`,
                    message: `err handling StakeholderStatusChangedEvent: ${error.message}`,
                }
            );

        };

    };

};
