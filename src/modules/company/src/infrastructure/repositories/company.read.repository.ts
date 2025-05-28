import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyReadRepository {

    private readonly logger = new Logger(CompanyReadRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneById(
        companyId: string
    ) {

        try {

            const res = await this.client.company.findUnique({
                where: {
                    id: companyId,
                },
            });

            return res;

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};