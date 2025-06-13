import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class MakeModel {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

};