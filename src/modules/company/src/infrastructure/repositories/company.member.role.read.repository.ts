import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyMemberRoleReadRepository {

    private readonly logger = new Logger(CompanyMemberRoleReadRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneByName(
        name: string
    ) {

        try {

            const companyMemberRole = await this.client.companyMemberRole.findUnique(
                {
                    where: {
                        name
                    },
                }
            );

            return companyMemberRole;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyMemberRoleReadRepository.name}`,
                    message: error.message
                }
            );

            throw error;

        };

    };

};