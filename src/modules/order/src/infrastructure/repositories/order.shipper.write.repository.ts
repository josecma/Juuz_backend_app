import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { Address } from "src/modules/shared/src/domain/types/address";
import { OrderStatusEnum } from "../../domain/enums/order.status.enum";
import { OrderSubStatusEnum } from "../../domain/enums/order.sub.status.enum";
import { OrderItem } from "../../domain/types/order.item";

@Injectable()
export default class OrderShipperWriteRepository {

    private readonly logger = new Logger(OrderShipperWriteRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            ownerId: string,
            price: number,
            miles: number,
            serviceId?: string,
            subServiceId?: string,
            referredId?: string,
            note?: string,
            email?: string,
            expirationTime: Date,
            pricePerMile: number,
            reason?: string,
            phone?: string,
            firstName?: string,
            lastName?: string,
            emailSecond?: string,
            phoneSecond?: string,
            firstNameSecond?: string,
            lastNameSecond?: string,
            isAssistanceRequestForNow: boolean,
            rute: string,
            carCount?: number,
            status: OrderStatusEnum,
            subStatus: OrderSubStatusEnum,
            items: Array<OrderItem<any>>,
            departure: Address,
            destination: Address,
            pickUpAt: Date,
            deliveryAt: Date,
        }
    ) {

        const {
            departure,
            destination,
            items,
            ownerId,
            ...OrderRest
        } = params;

        try {

            await this.client.$transaction(

                async (tx) => {

                    // const mappedOrderItems = await Promise.all(

                    //     (<OrderItem<SaveVehicleItem>[]>orderItems).map(

                    //         async (orderItem) => {

                    //             const { content, ...orderItemRest } = orderItem;

                    //             const { pictures, ...contentRest } = content;

                    //             const savedFiles = await tx.file.createManyAndReturn(
                    //                 {
                    //                     data: (<SaveFile[]>pictures).map(

                    //                         (pic) => {

                    //                             const { uniqueName, size, mimeType, ...picRest } = pic;

                    //                             return {
                    //                                 ...picRest,
                    //                                 key: uniqueName,
                    //                                 mimeType,
                    //                                 size: size.toString()
                    //                             };
                    //                         }

                    //                     )
                    //                 }
                    //             );

                    //             return {
                    //                 ...orderItemRest,
                    //                 item: {
                    //                     ...contentRest,
                    //                     pictureIds: savedFiles.map(f => f.id),
                    //                 }
                    //             };

                    //         }

                    //     )

                    // );

                    const createDepartureAddress = await tx.address.create(
                        {
                            data: departure as Omit<typeof departure, "location" | "metadata"> & { location: Prisma.JsonValue }
                        }
                    );

                    const createDestinationAddress = await tx.address.create(
                        {
                            data: destination as Omit<typeof destination, "location" | "metadata"> & { location: Prisma.JsonValue }
                        }
                    );

                    await tx.order.create(
                        {
                            data: {
                                ...OrderRest,
                                departure1: {
                                    connect: {
                                        id: createDepartureAddress.id
                                    }
                                },
                                destination1: {
                                    connect: {
                                        id: createDestinationAddress.id
                                    }
                                },
                                items,
                                ownerId,
                                userId: ownerId,
                            }
                        }
                    );

                }

            );


        } catch (error) {

            this.logger.error(
                {
                    source: `${OrderShipperWriteRepository.name}.save`,
                    message: `err posting order: ${error.message}`,
                }
            );

            throw error;

        };

    };

};