import { Injectable, Logger } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import { EventDispatcher } from "src/modules/shared/src/infrastructure/event.dispatcher";
import { BusinessStakeholderStatusEnum } from "../../domain/enums/business.stakeholder.status.enum";
import StakeholderStatusChangedEvent from "../../domain/events/stakeholder.status.changed.event";
import IsBusinessStakeholderService from "../../domain/services/is.business.stakeholder.service";
import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";
import NegotiationWriteRepository from "../../infrastructure/repositories/negotiation.write.repository";

@Injectable()
export default class AcceptBusinessUseCase {

    private readonly logger = new Logger(AcceptBusinessUseCase.name);

    public constructor(
        private readonly negotiationWriteRepository: NegotiationWriteRepository,
        private readonly negotiationReadRepository: NegotiationReadRepository,
        private readonly isBusinessStakeholderService: IsBusinessStakeholderService,
        private readonly eventDispatcher: EventDispatcher,
    ) { };

    public async execute(
        params: {
            businessId: string,
            stakeholderId: string,
            role: string,
        }
    ) {

        const {
            businessId,
            stakeholderId,
            role,
        } = params;

        try {

            if (!this.isBusinessStakeholderService.is({ stakeholderId, businessId })) {

                throw new NotFoundDomainException(
                    {
                        message: "business not found"
                    }
                );

            };

            const updateStakeholderStatusResponse = await this.negotiationWriteRepository.updateStakeholderStatus(
                {
                    businessId,
                    role,
                    stakeholderId,
                    updateObject: {
                        status: BusinessStakeholderStatusEnum.AGREED
                    }
                }
            );

            const stakeholders = await this.negotiationReadRepository.findBusinessStakeholders(businessId);

            const stakeholderStatusChangedEvent = new StakeholderStatusChangedEvent(
                {
                    businessId,
                    changedBy: stakeholderId,
                    stakeholders,
                    status: BusinessStakeholderStatusEnum.AGREED,
                    occurredAt: new Date(),
                }
            );

            await this.eventDispatcher.dispatch(stakeholderStatusChangedEvent);

            return updateStakeholderStatusResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${AcceptBusinessUseCase.name}`,
                    message: `err accepting business: ${error.message}`,
                }
            );

        };

    };

};