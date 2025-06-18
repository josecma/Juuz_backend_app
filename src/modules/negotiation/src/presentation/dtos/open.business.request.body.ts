import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CarrierServiceBusinessRoleEnum } from "../../domain/enums/carrier.service.business.role.enum";

export default class OpenBusinessRequestBody {

    @IsNotEmpty()
    @IsEnum(CarrierServiceBusinessRoleEnum)
    role: CarrierServiceBusinessRoleEnum;

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    orderId: string;

    @IsNotEmpty()
    @IsString()
    shipperId: string;

};