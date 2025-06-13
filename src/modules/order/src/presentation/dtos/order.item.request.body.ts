import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { OrderItemTypeEnum } from "../../domain/enums/order.item.type.enum";
import OrderVehicleRequestBody from "./order.vehicle.request.body";

export default class OrderItemRequestBody {

    @IsNotEmpty()
    @IsEnum(OrderItemTypeEnum)
    type: OrderItemTypeEnum;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => OrderVehicleRequestBody)
    content: OrderVehicleRequestBody;

};