import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class OrderRepository {

    private readonly logger = new Logger(OrderRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly prisma: PrismaClient,
    ) { };

    public async find(params?: { ids: string[]; }) {

        const { ids } = params;

        try {

            const findManyParams =
                params
                    ?
                    {
                        where: {
                            id: {
                                in: ids,
                            },
                        },
                    }
                    :
                    undefined;

            const orders = await this.prisma.order.findMany(findManyParams);

            return orders;

        } catch (error) {

            throw new Error(error);

        };

    };

    public async findOneBy(
        params: {
            id: string;
        }
    ) {

        const { id } = params;

        try {

            const order = await this.prisma.order.findUnique({
                where: {
                    id: id,
                },
                include: {
                    departure: true,
                    destination: true,
                    Negotiation: true,
                    // Negotiation: {
                    //     include: {
                    //         driver: {
                    //             include: {
                    //                 userCompanyRoles: {
                    //                     include: {
                    //                         company: true,
                    //                     },
                    //                 },
                    //                 driver: {
                    //                     include: {
                    //                         vehicleInfo: {
                    //                             include: {
                    //                                 model: {
                    //                                     include: {
                    //                                         brand: true,
                    //                                     }
                    //                                 },
                    //                             }
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         },
                    //     },
                    // },
                },

            });

            return order;

        } catch (error) {

            throw error;

        };

    };

    public async update(params: {
        id: string,
        updateObj: {
            status?: string,
            subStatus?: string,
            pickedUpAt?: Date,
            cancelledAt?: Date,
            deliveredAt?: Date,
        };
    }): Promise<any> {

        const { id, updateObj } = params;

        const { subStatus, status, pickedUpAt, cancelledAt, deliveredAt } = updateObj;

        try {

            return await this.prisma.order.update({
                where: {
                    id: id,
                },
                data: {
                    status,
                    subStatus,
                    pickedUpAt,
                    deliveredAt,
                    cancelledAt,
                },
            });

        } catch (error) {

            throw error;

        };

    };

};