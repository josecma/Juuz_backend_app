import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import FindOneOrderByIdService from "src/modules/order/src/domain/services/find.one.order.by.id.service";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import EvidenceRepository from "../../infrastructure/evidence.repository";
import EvidenceRepositoryContract from "../contracts/repositories/evidence.repository.contract";

@Injectable({})
export default class FindEvidenceByOrderIdService {

    public constructor(
        @Inject(EvidenceRepository)
        private readonly evidenceRepository: EvidenceRepositoryContract,
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(FindOneOrderByIdService)
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
    ) { };

    public async find(
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

            const user = await this.findOneUserByIdService.find({ id: userId });

            const order = await this.findOneOrderByIdService.find({ id: orderId });

            if (order.userId != user.id && order.driverId != user.id) {

                throw new NotFoundException(`evidences not found`);

            };

            const evidences = await this.evidenceRepository.findBy(
                {
                    pagination,
                    findByObj: {
                        userId,
                        orderId,
                    }
                }
            );

            return evidences;

        } catch (error) {

            throw error;

        };

    };

};