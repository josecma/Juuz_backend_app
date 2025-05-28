import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiCompleteOtpAuthnResponse() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'otp authN completed successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'otp authN process not found',
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}