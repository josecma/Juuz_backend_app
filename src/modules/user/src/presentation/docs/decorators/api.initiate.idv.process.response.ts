import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiInitiateIdvProcessResponse() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Idv proccess initiated successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'Identity not found',
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}