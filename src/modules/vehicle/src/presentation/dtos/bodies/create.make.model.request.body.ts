import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import MakeModel from "../make.model";

export default class CreateMakeModelRequestBody {

    @IsNotEmpty()
    @IsArray()
    models: Array<MakeModel>;

}