import { IsEmail, IsNotEmpty, IsPhoneNumber, ValidateIf } from "class-validator";

export default class InitiateOtpAuthRequestBody {

    @ValidateIf(o => !o.email)
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber?: string;

    @ValidateIf(o => !o.phoneNumber)
    @IsNotEmpty()
    @IsEmail()
    email?: string;

};