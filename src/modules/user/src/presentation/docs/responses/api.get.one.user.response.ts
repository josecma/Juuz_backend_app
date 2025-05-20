import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiGetOneUserResponse() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'User obtained successfully',
            example: {
                firstName: "Manuel",
                lastName: "Gonzalez Gonzalez",
            },
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