import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiInitiateOtpAuthnResponse() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'otp authN initiated successfully',
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}