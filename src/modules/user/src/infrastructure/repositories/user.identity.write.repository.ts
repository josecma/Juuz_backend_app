import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserIdentityWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            userId: string;
            identity: {
                type: string;
                value: string;
            };
        },
    ) {

        const {
            userId,
            identity
        } = params;

        const {
            type,
            value,
        } = identity;

        try {

            const res = await this.client.userIdentity.create(
                {
                    data: {
                        userId,
                        type,
                        value,
                    },
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    public async update(
        params: {
            id: string;
            updateObject: {
                verified?: boolean;
            };
        },
    ) {

        const {
            id,
            updateObject,
        } = params;

        try {

            const res = await this.client.userIdentity.update(
                {
                    where: {
                        id
                    },
                    data: updateObject,
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};