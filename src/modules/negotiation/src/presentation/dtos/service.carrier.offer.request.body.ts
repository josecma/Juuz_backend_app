import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import MonetaryOfferRequestBody from "./monetary.offer.request.body";

export default class ServiceCarrierOfferRequestBody {

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    orderId: string;

    @IsNotEmpty()
    @IsString()
    to: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => MonetaryOfferRequestBody)
    price: MonetaryOfferRequestBody;

};