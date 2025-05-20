import { IsNotEmpty, IsString } from "class-validator";

export default class CompleteUserIdvRequestBody {

    @IsNotEmpty()
    @IsString()
    value: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    key: string;

};