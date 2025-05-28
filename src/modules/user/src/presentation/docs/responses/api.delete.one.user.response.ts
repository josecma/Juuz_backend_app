import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiDeleteOneUserResponse() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'User deleted successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'User not found',
            example: null
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}