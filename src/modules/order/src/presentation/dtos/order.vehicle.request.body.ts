import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class OrderVehicleRequestBody {

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    trailerType: string;

    @IsNotEmpty()
    @IsString()
    color: string;

    @IsOptional()
    @IsBoolean()
    isTheKeysWithTheVehicle?: boolean;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    modelId: string;

    @IsOptional()
    @IsString()
    information?: string;

    @IsOptional()
    @IsBoolean()
    wideLoad: boolean;

    @IsNotEmpty()
    @IsArray()
    // @ArrayMinSize(
    //     1,
    //     {
    //         message: 'the array must contain at least one element'
    //     }
    // )
    // @ValidateNested(
    //     {
    //         each: true
    //     }
    // )
    // @Type(() => OrderVehicleRequestBody)
    pictures: Array<any>;

};