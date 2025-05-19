import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyReadRepository {

    private readonly logger = new Logger(CompanyReadRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneBy(
        params: {
            companyId: string;
        }
    ) {

        const { companyId } = params;

        try {

            const res = await this.client.company.findUnique({
                where: {
                    id: Number(companyId),
                },
            });

            return res;

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

    public async findOneByOwnerId(
        ownerId: String
    ) {

        try {

            const userCompany = await this.client.user.findUnique(
                {
                    where: {
                        id: Number(ownerId),
                    },
                    select: {
                        userCompanyRoles: {
                            select: {
                                company: {
                                    where: {
                                        ownerId: Number(ownerId),
                                    }
                                },
                            },
                        },
                    },
                }
            );

            return userCompany.userCompanyRoles.map(
                (e) => e.company
            )[0];

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};