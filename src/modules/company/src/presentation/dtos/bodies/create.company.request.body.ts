import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length, Matches, MaxLength } from "class-validator";

export default class CreateCompanyRequestBody {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    carrierIdentifier: string;

    @IsNotEmpty()
    @IsString()
    @Matches(
        /^\d+$/,
        {
            message: "usdot must contain only numbers"
        }
    )
    @MaxLength(
        8,
        {
            message: "usdot cannot contain more than 8 characters"
        }
    )
    usdot: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    mc: string;

    @IsOptional()
    @IsEmail()
    primaryAdminEmail: string;

    @IsOptional()
    @IsString()
    @Length(2, 2)
    countryCode: string;

    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    extension: string;

    @IsOptional()
    @IsString()
    addressLine1: string;

    @IsOptional()
    @IsString()
    addressLine2: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    @Length(2, 2)
    state: string;

    @IsOptional()
    @IsString()
    zipCode: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    cardNumber: string;

    @IsOptional()
    @IsString()
    expMonth: string;

    @IsOptional()
    @IsString()
    expYear: string;

    @IsOptional()
    @IsString()
    dotNumber: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    hours: string;

    @IsOptional()
    @IsNumberString()
    insuranceDetailsId: string;

    @IsOptional()
    @IsString()
    licenseType: string;

};