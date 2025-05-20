import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable({})
export default class AuthProcessWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            method: string;
            metadata: Record<string, unknown>;
        },
    ) {

        const {
            metadata,
            method,
        } = params;

        try {

            const res = await this.client.authenticationProcess.create(
                {
                    data: {
                        metadata: metadata as Prisma.JsonValue,
                        status: 'PENDING',
                        method,
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
                status?: string;
                attempts?: number;
            };
        },
    ) {

        const {
            id,
            updateObject,
        } = params;

        try {

            const res = await this.client.authenticationProcess.update(
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