import { IsNotEmpty, IsString } from "class-validator";

export default class IdentityDto {

    @IsNotEmpty()
    @IsString()
    value: string;

    @IsNotEmpty()
    @IsString()
    type: string;

};