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
            example: '550e8400-e29b-41d4-a716-446655440000',
            required: true,
        }
    )
    inviteeId: string;

    @ApiProperty(
        {
            type: String,
            example: 'example@mail.com',
            required: false,
        }
    )
    email?: string;
};