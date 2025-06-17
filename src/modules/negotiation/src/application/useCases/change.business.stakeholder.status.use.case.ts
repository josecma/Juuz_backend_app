import { Injectable, Logger } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import { BusinessStakeholderStatusEnum } from "../../domain/enums/business.stakeholder.status.enum";
import IsBusinessStakeholderService from "../../domain/services/is.business.stakeholder.service";
import NegotiationWriteRepository from "../../infrastructure/repositories/negotiation.write.repository";

@Injectable()
export default class ChangeBusinessStakeholderStatusUseCase {

    private readonly logger = new Logger(ChangeBusinessStakeholderStatusUseCase.name);

    public constructor(
        private readonly negotiationWriteRepository: NegotiationWriteRepository,
        private readonly isBusinessStakeholderService: IsBusinessStakeholderService,
    ) { };

    public async execute(
        params: {
            businessId: string,
            stakeholderId: string,
            role: string,
            status: BusinessStakeholderStatusEnum,
        }
    ) {

        const {
            businessId,
            stakeholderId,
            status,
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
                        status
                    }
                }
            );

            return updateStakeholderStatusResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${ChangeBusinessStakeholderStatusUseCase.name}`,
                    message: `err changing business stakeholder status: ${error.message}`,
                }
            );

        };

    };

};