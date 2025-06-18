import { Injectable, Logger } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import { EventDispatcher } from "src/modules/shared/src/infrastructure/event.dispatcher";
import BusinessStatusChangedEvent from "../../domain/events/business.status.changed.event";
import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";
import NegotiationWriteRepository from "../../infrastructure/repositories/negotiation.write.repository";

@Injectable()
export default class CloseBusinessUseCase {

    private readonly logger = new Logger(CloseBusinessUseCase.name);

    public constructor(
        private readonly negotiationWriteRepository: NegotiationWriteRepository,
        private readonly negotiationReadRepository: NegotiationReadRepository,
        private readonly eventDispatcher: EventDispatcher,
    ) { };

    public async execute(
        businessId: string
    ) {

        try {

            const business = await this.negotiationReadRepository.findBusinessById(
                businessId
            );

            if (business == null) {

                throw new NotFoundDomainException(
                    {
                        message: "business not found"
                    }
                );

            };

            const updateBusinessByIdResponse = await this.negotiationWriteRepository.updateBusinessById(
                {
                    id: business.id,
                    updateObject: {
                        status: 'CLOSED.SUCCESS'
                    }
                }
            );

            const { id, status } = updateBusinessByIdResponse;

            const businessStatusChangedEvent = new BusinessStatusChangedEvent(
                {
                    businessId: id,
                    status,
                    occurredAt: new Date(),
                }
            );

            await this.eventDispatcher.dispatch(businessStatusChangedEvent);

            return updateBusinessByIdResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CloseBusinessUseCase.name}`,
                    message: `err closing business: ${error.message}`,
                }
            );

        };

    };

};