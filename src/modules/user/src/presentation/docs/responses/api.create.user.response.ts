import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiCreateUserResponse() {
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: 'User created successfully',
            example: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                firstName: 'Manuel',
                lastName: 'Gonzalez Gonzalez',
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}