import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Length, Matches, MaxLength, ValidateNested } from "class-validator";
import PartialAddress from "src/modules/shared/src/presentation/dtos/partial.address";

export default class UpdateCompanyRequestBody {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    carrierIdentifier: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
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

    @IsOptional()
    @IsString()
    @Length(8)
    mc: string;

    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PartialAddress)
    address: PartialAddress;

};