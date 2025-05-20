import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber, ValidateIf } from "class-validator";

export default class CompleteOtpAuthRequestBody {

    @ValidateIf(o => !o.email)
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber?: string;

    @ValidateIf(o => !o.phoneNumber)
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsNumberString()
    key: string;

};