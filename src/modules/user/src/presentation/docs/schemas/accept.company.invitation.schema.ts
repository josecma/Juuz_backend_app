import { ApiProperty } from "@nestjs/swagger";
import { CompanyInvitationRequestStatusEnum } from "../../../domain/enums/company.invitation.request.status.enum";

export default class AcceptCompanyInvitationSchema {

    @ApiProperty(
        {
            type: String,
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjdkZGNlYi01MDRhLTQ0OWUtODFkNy0wY2JlMzA1MGY2NDgiLCJlbWFpbCI6ImpjbWE',
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