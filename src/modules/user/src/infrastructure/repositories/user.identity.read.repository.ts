import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserIdentityReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findByUserId(
        userId: string
    ) {

        try {

            const res = await this.client.userIdentity.findMany(
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

    public async findOneBy(
        params: {
            type: string;
            value: string;
        }
    ) {

        const {
            type,
            value,
        } = params;

        try {

            const res = await this.client.userIdentity.findUnique(
                {
                    where: {
                        type_value: {
                            type,
                            value,
                        },
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    public async findOneByUserId(
        params: {
            userId: string;
            type: string;
            value: string;
        }
    ) {

        const {
            type,
            value,
            userId
        } = params;

        try {

            const res = await this.client.userIdentity.findUnique(
                {
                    where: {
                        userId,
                        type_value: {
                            type,
                            value,
                        },
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};