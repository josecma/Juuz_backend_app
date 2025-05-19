import { Inject, Injectable, Logger } from "@nestjs/common";
import { OrderStatusEnum, OrderSubStatus, PrismaClient } from "@prisma/client";

@Injectable()
export default class OrderRepository {

    private readonly logger = new Logger(OrderRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly prisma: PrismaClient,
    ) { };

    public async find(params?: { ids: number[]; }) {

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

        const {
            id
        } = params;

        try {

            const order = await this.prisma.order.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    departure: true,
                    destination: true,
                    Negotiation: {
                        include: {
                            driver: {
                                include: {
                                    userCompanyRoles: {
                                        include: {
                                            company: true,
                                        },
                                    },
                                    driver: {
                                        include: {
                                            vehicleInfo: {
                                                include: {
                                                    model: {
                                                        include: {
                                                            brand: true,
                                                        }
                                                    },
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                        },
                    },
                },

            });

            return order;

        } catch (error) {

            throw error;

        };

    };

    public async update(params: {
        id: string;
        updateObj: {
            status?: string;
            subStatus?: string;
        };
    }) {

        const { id, updateObj } = params;

        const { subStatus, status } = updateObj;

        try {

            const res = await this.prisma.order.update({
                where: {
                    id: Number(id),
                },
                data: {
                    status: (status as OrderStatusEnum),
                    subStatus: (subStatus as OrderSubStatus)
                },
            });

            return res;

        } catch (error) {

            throw error;

        };

    };

};