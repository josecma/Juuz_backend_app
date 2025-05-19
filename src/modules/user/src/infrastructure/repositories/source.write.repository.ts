import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class SourceWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            type: string;
            value: string;
        },
    ) {

        const {
            type,
            value
        } = params;

        try {

            const res = await this.client.source.create(
                {
                    data: {
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

};