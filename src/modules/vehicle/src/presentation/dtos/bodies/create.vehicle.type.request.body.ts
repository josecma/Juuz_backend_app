import { IsArray, IsNotEmpty } from "class-validator";

export default class CreateVehicleTypeRequestBody {

    @IsNotEmpty()
    @IsArray()
    types: Array<string>;

}