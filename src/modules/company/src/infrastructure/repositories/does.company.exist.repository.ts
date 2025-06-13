import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class DoesCompanyExistRepository {

    private readonly logger = new Logger(DoesCompanyExistRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async exist(
        companyId: string,
    ): Promise<boolean> {

        try {

            const count = await this.client.company.count(
                {
                    where: {
                        id: companyId,
                    },
                }
            );

            return count > 0;

        } catch (error) {

            this.logger.error(
                {
                    source: `${DoesCompanyExistRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};