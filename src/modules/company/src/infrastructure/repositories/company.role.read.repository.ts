import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyRoleReadRepository {

    private readonly logger = new Logger(CompanyRoleReadRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneByName(
        name: string
    ) {

        try {

            const companyRole = await this.client.companyMemberRole.findUnique(
                {
                    where: {
                        name
                    },
                }
            );

            return companyRole;

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};