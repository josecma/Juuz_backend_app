import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class UserCompanyRepository {

    private readonly logger = new Logger(UserCompanyRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async findUserCompanyByUserId(
        params: {
            userId: string;
        },
    ) {

        const { userId } = params;

        try {

            const userCompany = await this.client.user.findUnique(
                {
                    where: {
                        id: Number(userId),
                    },
                    select: {
                        userCompanyRoles: {
                            select: {
                                company: {
                                    where: {
                                        ownerId: Number(userId),
                                    }
                                },
                            },
                        },
                    },
                }
            );

            return userCompany.userCompanyRoles.map(
                (e) => e.company
            );

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};