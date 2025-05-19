import { IsEmail, IsNotEmpty } from "class-validator";

export default class EmailDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

};