import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class UserAuthProcessWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            userId: string,
            authNProcessId: string,
        },
    ) {

        const {
            userId,
            authNProcessId,
        } = params;

        try {

            const res = await this.client.userAuthenticationProcess.create(
                {
                    data: {
                        userId,
                        authenticationProcessId: authNProcessId,
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
            };
        },
    ) {

        const {
            id,
            updateObject,
        } = params;

        try {

            const res = await this.client.userAuthenticationProcess.update(
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