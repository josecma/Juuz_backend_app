import { Inject, Injectable } from "@nestjs/common";
import FindEvidenceByOrderIdService from "../../domain/services/find.evidence.by.order.id.service";

@Injectable({})
export default class FindEvidenceByOrderIdUseCase {

    public constructor(
        @Inject(FindEvidenceByOrderIdService)
        private readonly findEvidenceByOrderIdService: FindEvidenceByOrderIdService,
    ) { };

    public async execute(
        params: {
            pagination?: {
                page: number;
                limit: number;
            };
            userId: string;
            orderId: string;
        }
    ) {

        const { pagination, userId, orderId } = params;

        try {

            const evidences = await this.findEvidenceByOrderIdService.find(
                {
                    pagination,
                    orderId,
                    userId,
                }
            );

            return evidences;

        } catch (error) {

            throw error;

        };

    };

};