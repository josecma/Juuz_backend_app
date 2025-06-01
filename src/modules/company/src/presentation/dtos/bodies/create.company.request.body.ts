import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, Matches, MaxLength, ValidateNested } from "class-validator";
import Address from "src/modules/shared/src/presentation/dtos/address";

export default class CreateCompanyRequestBody {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    carrierIdentifier: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

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

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Address)
    address: Address;

};