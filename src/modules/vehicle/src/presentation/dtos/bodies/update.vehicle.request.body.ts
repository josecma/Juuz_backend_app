import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateVehicleRequestBody {

    @IsOptional()
    @IsString()
    vinNumber: string;

    @IsOptional()
    @IsNumber()
    year: number;

    @IsOptional()
    @IsString()
    vehicleType: string;

    @IsOptional()
    @IsNumber()
    capacity: number;

    @IsOptional()
    @IsString()
    modelId: string;

    @IsOptional()
    @IsArray()
    deleteIds?: Array<string>;

}