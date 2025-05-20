import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class IdvReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findPending(
        identityId: string,
    ) {

        try {

            const res = await this.client.identityVerification.findFirst(
                {
                    where: {
                        identityId,
                        status: "PENDING",
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};