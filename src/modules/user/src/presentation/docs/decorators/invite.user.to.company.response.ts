import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiInviteUserToCompanyResponse() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'user invited successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'user not found',
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}