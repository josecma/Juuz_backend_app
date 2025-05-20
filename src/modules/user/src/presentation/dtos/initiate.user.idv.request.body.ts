import { IsNotEmpty, IsString } from "class-validator";

export default class InitiateUserIdvRequestBody {

    @IsNotEmpty()
    @IsString()
    value: string;

    @IsNotEmpty()
    @IsString()
    type: string;

};