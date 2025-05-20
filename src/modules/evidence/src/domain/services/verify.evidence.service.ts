import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import FindOneOrderByIdService from "src/modules/order/src/domain/services/find.one.order.by.id.service";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import EvidenceRepository from "../../infrastructure/evidence.repository";
import FindOneEvidenceByIdService from "./find.one.evidence.by.id.service";

@Injectable({})
export default class VerifyEvidenceService {

    public constructor(
        @Inject(EvidenceRepository)
        private readonly evidenceRepository: EvidenceRepository,
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(FindOneOrderByIdService)
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
        @Inject(FindOneEvidenceByIdService)
        private readonly findOneEvidenceByIdService: FindOneEvidenceByIdService,
    ) { };

    public async verify(params: {
        userId: string;
        evidenceId: string;
    }): Promise<void> {

        const { userId, evidenceId } = params;

        try {

            await this.findOneUserByIdService.find({ id: userId });

            const evidence = await this.findOneEvidenceByIdService.find({ id: evidenceId });

            const orderId = evidence.orderId;

            const order = await this.findOneOrderByIdService.find({ id: orderId });

            if (order.userId.toString() !== userId) {

                throw new NotFoundException(`evidence with id: ${evidenceId} not found`);

            };

            await this.evidenceRepository.update({
                id: evidenceId,
                updateObj: {
                    status: true,
                },
            });

        } catch (error) {

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};