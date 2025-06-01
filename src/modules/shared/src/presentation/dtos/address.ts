import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CoordinateDto as Location } from "./coordinate.dto";

export default class Address {

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Location)
    location: Location;
};