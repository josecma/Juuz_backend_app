import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class CreateVehicleRequestBody {

    @IsNotEmpty()
    @IsString()
    vinNumber: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsNotEmpty()
    @IsString()
    vehicleType: string;

    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @IsNotEmpty()
    @IsString()
    modelId: string;

    @IsOptional()
    deleteIds: never;

}