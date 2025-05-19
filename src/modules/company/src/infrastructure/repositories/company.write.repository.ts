import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyWriteRepository {

    private readonly logger = new Logger(CompanyWriteRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly prisma: PrismaClient,
    ) { };

    public async update(
        params: {
            companyId: string;
            updateObj: {
                score: {
                    lastAvg: number;
                    lastDiv: number;
                };
            };
        }
    ) {

        const { companyId, updateObj } = params;

        const { score } = updateObj;

        try {

            const res = await this.prisma.company.update({
                where: {
                    id: Number(companyId),
                },
                data: {
                    score
                },
            });

            return res;

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};