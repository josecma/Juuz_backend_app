import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CoordinateDto as Location } from "./coordinate.dto";

export default class PartialAddress {

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    street: string;

    @IsOptional()
    @IsString()
    zipCode: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Location)
    location: Location;
};