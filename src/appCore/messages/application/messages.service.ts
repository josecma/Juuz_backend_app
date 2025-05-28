import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { MessageEntity } from '../domain/message.entity';

@Injectable()
export class MassagesService extends PrismaGenericService<
    MessageEntity,
    Prisma.MessageCreateArgs,
    Prisma.MessageFindUniqueArgs,
    Prisma.MessageUpdateArgs,
    Prisma.MessageDeleteArgs,
    Prisma.MessageFindManyArgs
> {
    private readonly logger = new Logger(MassagesService.name);
    constructor(private readonly prismaService: PrismaService) {
        super(prismaService.message);
    }

    userSelect: Prisma.UserSelect = {
        id: true,
        // email: true,
        // phone: true,
        firstName: true,
        lastName: true,
        // isActive: true,
        // photos: true,
        // driver: {
        //     select: {
        //         id: true,
        //         vinNumber: true,
        //         insuranceDoc: true,
        //         faceId: true,
        //         vehicleType: true,
        //         capacity: true,
        //         vehicleInfoId: true,
        //         vehicleInfo: true,
        // user: {
        //   select: {
        //     id: true,
        //     email: true,
        //     phone: true,
        //     firstName: true,
        //     lastName: true,
        //     isActive: true,
        //     photos: true,
        //     createdAt: true,
        //     updatedAt: true,
        //     createdBy: true,
        //     updatedBy: true,
        //     deletedAt: true,
        //     deletedBy: true,
        //     version: true,
        //     ownerId: true,
        //     logType: true,
        //     userCompanyRoles: {
        //       select: {
        //         userId: true,
        //         companyId: true,
        //         roleId: true,
        //       },
        //     },
        //   },
        // },
        // },
        // },
    };
    orderSelect: Prisma.OrderSelect = {
        id: true,
        userId: true,
        status: true,
        milles: true,
        email: true,
        note: true,
        phone: true,
        photos: {
            select: {
                id: true,
                name: true,
            },
        },
        pickUpDate: true,
        pricePerMile: true,
        deliveryDate: true,
        firstName: true,
        lastName: true,
        carCount: true,
        aditionalInfo: true,
        paymentMethod: true,
        createdAt: true,
        departure: {
            select: {
                city: true,
                address: true,
                state: true,
                pointName: true,
                id: true,
                longitude: true,
                latitude: true,
            },
        },
        destination: {
            select: {
                city: true,
                address: true,
                state: true,
                pointName: true,
                id: true,
                longitude: true,
                latitude: true,
            },
        },
        price: true,
        subStatus: true,
        subService: {
            select: {
                name: true,
                Service: {
                    select: {
                        name: true,
                    },
                },
            },
        },
        VehicleOrder: {
            select: {
                qty: true,
                vehicleColor: true,
                licensePlate: true,
                lastNumber: true,
                stateProvince: true,
                state: true,
                vehicleType: true,
                additionalVehicleInformation: true,
                trailerType: true,
                wideLoad: true,
                model: {
                    select: {
                        id: true,
                        name: true,
                        brand: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        },
        Negotiation: true,
    };
    negotiationSelect: Prisma.NegotiationSelect = {
        id: true,
        userId: true,
        driverId: true,
        orderId: true,
        offerCarrier: true,
        counterOfferShipper: true,
        order: true,
        // user: {
        //     select: {
        //         ablyChannel: {
        //             select: {
        //                 channelName: true,
        //             },
        //         },
        //     },
        // },
        // driver: {
        //     select: {
        //         ablyChannel: {
        //             select: {
        //                 channelName: true,
        //             },
        //         },
        //     },
        // },
    };
    messagesSelect: Prisma.MessageSelect = {
        // user: {
        //     select: this.userSelect,
        // },
        order: {
            select: this.orderSelect,
        },
        negotiation: {
            select: this.negotiationSelect,
        },
    };
}
