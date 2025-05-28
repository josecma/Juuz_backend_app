import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class DoesCompanyExistRepository {

    private readonly loger = new Logger(DoesCompanyExistRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async exist(
        params: {
            companyId: string;
        },
    ): Promise<boolean> {

        const { companyId } = params;

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

            throw error;

        };

    };

};