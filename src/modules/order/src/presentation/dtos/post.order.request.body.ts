import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateNested } from "class-validator";
import Address from "src/modules/shared/src/presentation/dtos/address";
import OrderItemRequestBody from "./order.item.request.body";

export default class PostOrderRequestBody {

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Address)
    departure: Address;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Address)
    destination: Address;

    @IsOptional()
    @IsPhoneNumber()
    phoneNumber?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsNotEmpty()
    @IsNumber()
    miles: number;

    @IsOptional()
    @IsString()
    note?: string;

    @IsNotEmpty()
    @IsString()
    paymentMethod: string;

    @IsNotEmpty()
    @IsString()
    rute: string;

    @IsOptional()
    @IsBoolean()
    isAssistanceRequestForNow: boolean;

    @IsNotEmpty()
    @IsDate()
    expirationTime: Date;

    @IsOptional()
    @IsDate()
    pickUpAt: Date;

    @IsOptional()
    @IsDate()
    deliveryAt: Date;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(
        1,
        {
            message: 'the array must contain at least one element'
        }
    )
    @ValidateNested(
        {
            each: true
        }
    )
    @Type(() => OrderItemRequestBody)
    items: Array<OrderItemRequestBody>;

};