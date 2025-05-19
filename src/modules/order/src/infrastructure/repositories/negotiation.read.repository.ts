import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class NegotiationReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOrderNegotiations(
        orderId: string
    ) {

        try {

            const res = await this.client.negotiation.findMany(
                {
                    where: {
                        orderId: Number(orderId),
                    }
                }
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};
