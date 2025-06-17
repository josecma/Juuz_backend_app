import { Injectable, Logger } from "@nestjs/common";
import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";

@Injectable()
export default class IsBusinessStakeholderService {

    private readonly logger = new Logger(IsBusinessStakeholderService.name);

    public constructor(
        private readonly negotiationReadRepository: NegotiationReadRepository,
    ) { };

    public async is(
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

            const businessStakeholder = await this.negotiationReadRepository.findOneBusinessStakeholder(
                {
                    businessId,
                    stakeholderId,
                }
            );

            return businessStakeholder != null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${IsBusinessStakeholderService.name}`,
                    message: `err verifying if it's business stakeholder: ${error.message}`,
                }
            );

        };

    };

};