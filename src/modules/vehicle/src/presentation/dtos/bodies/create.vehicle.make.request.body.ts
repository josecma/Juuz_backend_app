import { IsArray, IsNotEmpty, IsString } from "class-validator";

export default class CreateVehicleMakeRequestBody {

    @IsNotEmpty()
    @IsArray()
    makes: Array<string>;

}