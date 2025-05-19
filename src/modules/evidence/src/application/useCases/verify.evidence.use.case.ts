import { Inject, Injectable } from "@nestjs/common";
import VerifyEvidenceService from "../../domain/services/verify.evidence.service";

@Injectable({})
export default class VerifyEvidenceUseCase {

    public constructor(
        @Inject(VerifyEvidenceService)
        private readonly verifyEvidenceService: VerifyEvidenceService
    ) { };

    public async execute(
        params: {
            userId: string;
            evidenceId: string;
        }
    ): Promise<void> {

        const { userId, evidenceId } = params;

        try {

            return this.verifyEvidenceService.verify(
                { userId, evidenceId }
            );

        } catch (error) {

            throw error;

        };

    };

};