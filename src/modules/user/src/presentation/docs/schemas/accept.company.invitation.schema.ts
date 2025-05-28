import { ApiProperty } from "@nestjs/swagger";

export default class AcceptCompanyInvitationSchema {

    @ApiProperty(
        {
            type: String,
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjdkZGNlYi01MDRhLTQ0OWUtODFkNy0wY2JlMzA1MGY2NDgiLCJlbWFpbCI6ImpjbWE',
            required: true,
        }
    )
    token: string;

};