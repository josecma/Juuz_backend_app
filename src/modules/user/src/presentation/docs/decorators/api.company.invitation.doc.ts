import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import InviteUserToCompanySchema from "../schemas/invite.user.to.company.schema";

export function ApiCompanyInvitationDoc() {
    return applyDecorators(
        ApiOperation(
            {
                summary: "a company owner invite user to his company",
                description: "a company owner invites a user to his company. This invitation includes a role they will play in the company."
            }
        ),
        ApiBody(
            {
                type: InviteUserToCompanySchema,
                required: true,
            }
        ),
        ApiResponse(
            {
                status: 200,
                description: 'user invited successfully',
            }
        ),
        ApiResponse(
            {
                status: 500,
                description: 'Internal server error',
            }
        ),
    );
};