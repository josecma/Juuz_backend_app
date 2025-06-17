import { Injectable, Logger } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import { EventDispatcher } from "src/modules/shared/src/infrastructure/event.dispatcher";
import BusinessLeavedEvent from "../../domain/events/business.leaved.event";
import IsBusinessStakeholderService from "../../domain/services/is.business.stakeholder.service";
import NegotiationWriteRepository from "../../infrastructure/repositories/negotiation.write.repository";

@Injectable()
export default class LeaveBusinessUseCase {

    private readonly logger = new Logger(LeaveBusinessUseCase.name);

    public constructor(
        private readonly negotiationWriteRepository: NegotiationWriteRepository,
        private readonly isBusinessStakeholderService: IsBusinessStakeholderService,
        private readonly eventDispatcher: EventDispatcher,
    ) { };

    public async execute(
        params: {
            businessId: string,
            stakeholderId: string,
        }
    ) {

        const {
            businessId,
            stakeholderId,
        } = params;

        try {

            if (!this.isBusinessStakeholderService.is({ businessId, stakeholderId })) {

                throw new NotFoundDomainException(
                    {
                        message: "business not found",
                    }
                );

            };

            const updateBusinessByIdResponse = await this.negotiationWriteRepository.updateBusinessById(
                {
                    id: businessId,
                    updateObject: {
                        status: 'closed.failed'
                    }
                }
            );

            const { stakeholders, id } = updateBusinessByIdResponse;

            const businessLeavedEvent = new BusinessLeavedEvent(
                {
                    businessId: id,
                    leavedBy: stakeholderId,
                    stakeholders: stakeholders.map(s => {

                        const { stakeholderId, role, type, details } = s;

                        return {
                            id: stakeholderId,
                            role,
                            type,
                            details,
                        };

                    }),
                    occurredAt: new Date(),
                }
            );

            await this.eventDispatcher.dispatch(businessLeavedEvent);

        } catch (error) {

            this.logger.error(
                {
                    source: `${LeaveBusinessUseCase.name}`,
                    message: `err leaving business: ${error.message}`,
                }
            );

        };

    };

};