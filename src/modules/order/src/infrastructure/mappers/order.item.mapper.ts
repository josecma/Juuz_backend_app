import { Prisma } from "@prisma/client";
import { OrderItem } from "../../domain/types/order.item";
import { SaveVehicleItem } from "../../domain/types/save.vehicle.item";

export default class OrderItemMapper {

    static to(
        orm: Prisma.JsonArray
    ) {

        return orm.map(
            (item) => item as OrderItem<SaveVehicleItem>
        )

    };

};