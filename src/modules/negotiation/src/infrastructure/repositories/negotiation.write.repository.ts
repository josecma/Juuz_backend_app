import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable({})
export default class NegotiationWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async update(
        params: {
            findByObj: Partial<{
                userId: string;
                orderId: string;
            }>;
        }
    ) {

        try {


        } catch (error) {

            throw error;

        };

    };

};