import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";

export default class FindUserDetailDto {

    @ApiProperty(
        {
            enum: RoleType,
            example: RoleType.CARRIER,
            description: "Specifies the role type",
        }
    )
    @IsEnum(RoleType)
    @IsNotEmpty()
    role: RoleType;

};