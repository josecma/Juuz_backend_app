import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CarrierServiceBusinessRoleEnum } from "../../domain/enums/carrier.service.business.role.enum";

export default class AcceptBusinessRequestBody {

    @IsNotEmpty()
    @IsString()
    negotiationId: string;

    @IsNotEmpty()
    @IsEnum(CarrierServiceBusinessRoleEnum)
    role: CarrierServiceBusinessRoleEnum;

};