import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserOtpSecretReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneByUserId(
        params: {
            userId: string;
        },
    ) {

        const {
            userId,
        } = params;

        try {

            const res = await this.client.userOtpSecret.findUnique(
                {
                    where: {
                        userId,
                    },
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};