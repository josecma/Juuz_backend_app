import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyScoreRepository {

    private readonly logger = new Logger(CompanyScoreRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async find(
        companyId: string
    ) {

        try {

            const findCompanyScoreResponse = await this.client.companyScore.findUnique({
                where: {
                    id: companyId,
                },
            });

            return findCompanyScoreResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyScoreRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async save(
        params: {
            companyId: string,
            currentAvg: number,
            currentDiv: number,
        },
    ) {

        const {
            companyId,
            currentAvg,
            currentDiv,
        } = params;

        try {

            const upsertCompanyScoreResponse = await this.client.companyScore.upsert(
                {
                    where: {
                        id: companyId,
                    },
                    update: {
                        lastAvg: currentAvg,
                        lastDiv: currentDiv,
                    },
                    create: {
                        companyId,
                        lastAvg: currentAvg,
                        lastDiv: currentDiv,
                    }
                }
            );

            return upsertCompanyScoreResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyScoreRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};