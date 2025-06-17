import { Prisma } from "@prisma/client";
import AddressMapper from "src/modules/shared/src/infrastructure/mappers/address.mapper";
import OrderItemMapper from "./order.item.mapper";

export default class OrderMapper {

    static to(
        orm: Prisma.OrderGetPayload<
            {
                include: {
                    departure1: true,
                    destination1: true,
                }
            }
        >
    ) {

        const {
            departure1,
            destination1,
            items,
            ...orderRest
        } = orm;

        return {
            ...orderRest,
            departure: AddressMapper.to(departure1),
            destination: AddressMapper.to(destination1),
            items: OrderItemMapper.to(items),
        };

    };

};