import { Injectable, Logger } from "@nestjs/common";
import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";
import NegotiationWriteRepository from "../../infrastructure/repositories/negotiation.write.repository";

@Injectable()
export default class OpenBusinessUseCase {

    private readonly logger = new Logger(OpenBusinessUseCase.name);

    public constructor(
        private readonly negotiationWriteRepository: NegotiationWriteRepository,
        private readonly negotiationReadRepository: NegotiationReadRepository,
    ) { };

    public async execute(
        params: {
            objects: Array<
                {
                    id: string,
                    type: string,
                    details?: Record<string, unknown>,
                }
            >,
            stakeholders: Array<
                {
                    id: string,
                    role: string,
                    type: string,
                    details?: Record<string, unknown>,
                }
            >,
        }
    ) {

        const {
            objects,
            stakeholders,
        } = params;

        let business: {
            id: string,
            status: string,
            stakeholders: {
                id: string;
                businessId: string;
                type: string;
                details: Record<string, unknown>;
                role: string;
                stakeholderId: string;
            }[];
            objects: {
                id: string;
                businessId: string;
                type: string;
                details: Record<string, unknown>;
                objectId: string;
            }[];
            offers: {
                id: string;
                status: string;
                bidderId: string;
                businessId: string;
                type: string;
                details: Record<string, unknown>;
                offerAt: Date;
            }[],
        };

        try {

            business = await this.negotiationReadRepository.findBusiness(
                {
                    status: "open",
                    stakeholderIds: stakeholders.map(
                        s => s.id
                    ),
                    objectIds: objects.map(
                        o => o.id
                    )
                }
            );

            if (business == null) {

                business = await this.negotiationWriteRepository.saveBusiness(
                    {
                        status: "open",
                        objects,
                        stakeholders,
                    }
                );

            };

            return business;

        } catch (error) {

            this.logger.error(
                {
                    source: `${OpenBusinessUseCase.name}`,
                    message: `err opening business: ${error.message}`,
                }
            );

        };

    };

};