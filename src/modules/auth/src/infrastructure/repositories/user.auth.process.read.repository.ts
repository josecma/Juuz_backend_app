import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class UserAuthProcessReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findByUserId(
        userId: string
    ) {

        try {

            const res = await this.client.userAuthenticationProcess.findMany(
                {
                    where: {
                        userId,
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    public async findOneByAuthProcessId(
        authNProcessId: string
    ) {

        try {

            const res = await this.client.userAuthenticationProcess.findUnique(
                {
                    where: {
                        authenticationProcessId: authNProcessId,
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};