import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserHotpCounterReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneByUserOtpSecretId(
        userOtpSecretId: string,
    ) {

        try {

            const res = await this.client.userHotpCounter.findUnique(
                {
                    where: {
                        userOtpSecretId,
                    },
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};