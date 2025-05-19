import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable({})
export default class NegotiationRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findBy(
        params: {
            pagination?: {
                take: number;
                skip: number;
            };
            findByObj: Partial<{
                userId: string;
                orderId: string;
            }>;
        }
    ) {

        const { pagination, findByObj } = params;

        const { orderId, userId } = findByObj;

        const evidenceWhereInput: Prisma.NegotiationWhereInput = Object.assign(
            userId ? { userId: Number(userId) } : {},
            orderId ? { orderId: Number(orderId) } : {},
        );

        try {

            const negotiations = await this.client.negotiation.findMany(
                {
                    where: evidenceWhereInput,
                    include: {
                        driver: {
                            select: {
                                userCompanyRoles: {
                                    select: {
                                        company: {
                                            select: {
                                                id: true,
                                                rating: true,
                                                companyName: true,
                                                phone: true,
                                                hours: true,
                                            },
                                        },
                                    },
                                },
                                driver: {
                                    select: {
                                        vehicleInfo: {
                                            select: {
                                                model: {
                                                    select: {
                                                        name: true,
                                                        brand: {
                                                            select: {
                                                                name: true,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        order: true,
                    },
                    skip: pagination ? pagination.skip : undefined,
                    take: pagination ? pagination.take : undefined,
                },
            );

            return negotiations;

        } catch (error) {

            throw error;

        };

    };

    // public async createBusiness(
    //     params: {
    //         channelName: string;
    //         stakeholders: Array<string>;
    //     }
    // ) {

    //     const { channelName, stakeholders } = params;

    //     try {

    //         const res = await this.client.$transaction(async (tx) => {

    //             const newChannel = await tx.channel.create(
    //                 {
    //                     data: {
    //                         name: channelName,
    //                     }
    //                 }
    //             );

    //             const newBusiness = await tx.business.create(
    //                 {
    //                     data: {
    //                         channelId: newChannel.id
    //                     }
    //                 }
    //             );

    //             await tx.businessStakeholder.createMany(
    //                 {
    //                     data: stakeholders.map((userId) => {

    //                         return {
    //                             userId: Number(userId),
    //                             businessId: newBusiness.id,
    //                         };
    //                     }),
    //                 }
    //             );

    //             return await tx.business.findUnique(
    //                 {
    //                     where: {
    //                         id: newBusiness.id
    //                     },
    //                     include: {
    //                         channel: true,
    //                         stakeholders: true,
    //                     }
    //                 }
    //             );
    //         });

    //         return res;

    //     } catch (error) {
    //         throw error;
    //     }

    // };

};