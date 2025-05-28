import { ApiProperty } from "@nestjs/swagger";
import { CompanyInvitationRequestStatusEnum } from "../../../domain/enums/company.invitation.request.status.enum";

export default class RespondToCompanyInvitationSchema {

    @ApiProperty(
        {
            type: String,
            example: '550e8400-e29b-41d4-a716-446655440000',
            required: true,
        }
    )
    companyInvitationId: string;

    @ApiProperty(
        {
            enum: CompanyInvitationRequestStatusEnum,
            example: CompanyInvitationRequestStatusEnum.REJECTED,
            required: true,
        }
    )
    status: string;

};