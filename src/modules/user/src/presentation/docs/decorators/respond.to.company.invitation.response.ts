import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiRespondToCompanyInvitationResponse() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'invitation accepted or rejected successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'invitation not found',
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}