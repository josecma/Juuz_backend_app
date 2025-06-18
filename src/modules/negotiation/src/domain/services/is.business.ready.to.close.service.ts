import { Injectable, Logger } from "@nestjs/common";
import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";
import { BusinessStakeholderStatusEnum } from "../enums/business.stakeholder.status.enum";

@Injectable()
export default class IsBusinessReadyToCloseService {

    private readonly logger = new Logger(IsBusinessReadyToCloseService.name);

    public constructor(
        private readonly negotiationReadRepository: NegotiationReadRepository,
    ) { };

    public async is(
        businessId: string
    ) {

        try {

            const businessStakeholders = await this.negotiationReadRepository.findBusinessStakeholders(
                businessId,
            );

            return businessStakeholders.every(s => s.status == BusinessStakeholderStatusEnum.AGREED);

        } catch (error) {

            this.logger.error(
                {
                    source: `${IsBusinessReadyToCloseService.name}`,
                    message: `err verifying if business is ready to close: ${error.message}`,
                }
            );

        };

    };

};