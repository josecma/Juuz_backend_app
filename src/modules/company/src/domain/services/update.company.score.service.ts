import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import CompanyScoreRepository from "../../infrastructure/repositories/company.score.repository";
import DoesCompanyExistRepository from "../../infrastructure/repositories/does.company.exist.repository";

@Injectable({})
export default class UpdateCompanyScoreService {

    private readonly logger = new Logger(UpdateCompanyScoreService.name);

    public constructor(
        private readonly companyScoreRepository: CompanyScoreRepository,
        private readonly doesCompanyExistRepository: DoesCompanyExistRepository,
    ) { };

    public async update(
        params: {
            companyId: string,
            score: number,
        }
    ) {

        const {
            companyId,
            score
        } = params;

        try {

            if (score == null) {

                throw new BadRequestException("score is required");

            };

            if (
                !await this.doesCompanyExistRepository.exist(companyId)
            ) {

                throw new BadRequestException("company not found");

            };

            const findCompanyScoreResponse = await this.companyScoreRepository.find(companyId);

            let newScore: {
                currentAvg: number,
                currentDiv: number,
            } = null;

            if (findCompanyScoreResponse != null) {

                const {
                    lastAvg,
                    lastDiv,
                } = findCompanyScoreResponse;

                const lastSum = lastAvg * lastDiv;
                const currentSum = lastSum + score;
                const currentDiv = lastDiv + 1;
                const currentAvg = currentSum / currentDiv;

                newScore = {
                    currentAvg,
                    currentDiv
                };

            } else {

                newScore = {
                    currentAvg: score,
                    currentDiv: 1,
                };

            };

            const saveCompanyScoreResponse = await this.companyScoreRepository.save(
                {
                    companyId,
                    ...newScore
                }
            );

            return saveCompanyScoreResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${UpdateCompanyScoreService.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};