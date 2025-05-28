import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiSetUserNotificationTokenResponse() {
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: 'user notification token set successfully',
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}