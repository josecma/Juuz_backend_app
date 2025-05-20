import { ApiProperty } from "@nestjs/swagger";
import { CompanyInvitationRequestStatusEnum } from "../../../domain/enums/company.invitation.request.status.enum";

export default class RespondToCompanyInvitationSchema {

    @ApiProperty(
        {
            type: String,
            example: '4fJ8vL9z7b2a1n0x5q6w3e7r8t9y0u1i2o3p4',
            required: true,
        }
    )
    token: string;

    @ApiProperty(
        {
            enum: CompanyInvitationRequestStatusEnum,
            example: CompanyInvitationRequestStatusEnum.REJECTED,
            required: true,
        }
    )
    status: string;

};