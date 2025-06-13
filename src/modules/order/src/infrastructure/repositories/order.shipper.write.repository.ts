import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { Address } from "src/modules/shared/src/domain/types/address";
import { SaveFile } from "src/modules/shared/src/domain/types/save.file";
import { OrderStatusEnum } from "../../domain/enums/order.status.enum";
import { OrderSubStatusEnum } from "../../domain/enums/order.sub.status.enum";
import { OrderItem } from "../../domain/types/order.item";
import { SaveVehicleItem } from "../../domain/types/save.vehicle.item";

@Injectable()
export default class OrderShipperWriteRepository {

    private readonly logger = new Logger(OrderShipperWriteRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            shipperId: string,
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
            items: orderItems,
            shipperId,
            ...OrderRest
        } = params;

        try {

            await this.client.$transaction(

                async (tx) => {

                    const mappedOrderItems = await Promise.all(

                        (<OrderItem<SaveVehicleItem>[]>orderItems).map(

                            async (orderItem) => {

                                const { item, ...orderItemRest } = orderItem;

                                const { pictures, ...itemRest } = item;

                                const savedFiles = await tx.file.createManyAndReturn(
                                    {
                                        data: (<SaveFile[]>pictures).map(

                                            (pic) => {

                                                const { uniqueName, size, ...picRest } = pic;

                                                return {
                                                    ...picRest,
                                                    key: uniqueName,
                                                    size: size.toString()
                                                };
                                            }

                                        )
                                    }
                                );

                                return {
                                    ...orderItemRest,
                                    item: {
                                        ...itemRest,
                                        pictureIds: savedFiles.map(f => f.id),
                                    }
                                };

                            }

                        )

                    );

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
                                items: mappedOrderItems,
                                ownerId: shipperId,
                                shipperId,
                                userId: shipperId,
                            }
                        }
                    );

                }

            );


        } catch (error) {

            this.logger.error(
                {
                    source: `${OrderShipperWriteRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};