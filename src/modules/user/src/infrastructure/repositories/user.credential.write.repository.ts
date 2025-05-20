import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserCredentialWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            userId: string,
            credential: string,
        },
    ) {

        const {
            userId,
            credential
        } = params;

        try {

            const res = await this.client.credential.create(
                {
                    data: {
                        userId,
                        value: credential,
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
            id: string,
            updateObject: {
                value?: string,
            },
        },
    ) {

        const {
            id,
            updateObject,
        } = params;

        try {

            const res = await this.client.credential.update(
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