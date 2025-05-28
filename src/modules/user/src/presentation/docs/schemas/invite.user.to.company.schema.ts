import { ApiProperty } from "@nestjs/swagger";
import { CompanyMemberRoleEnum } from "src/modules/company/src/domain/enums/company.member.role.enum";

export default class InviteUserToCompanySchema {

    @ApiProperty(
        {
            enum: CompanyMemberRoleEnum,
            example: CompanyMemberRoleEnum.DRIVER,
            required: true,
        }
    )
    role: CompanyMemberRoleEnum;

    @ApiProperty(
        {
            type: String,
            example: 'example@mail.com',
            required: true,
        }
    )
    email: string;
};