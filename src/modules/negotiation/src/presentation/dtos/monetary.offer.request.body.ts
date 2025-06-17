import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class MonetaryOfferRequestBody {

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    currency: string;

};