import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiCompleteIdvProcessResponse() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Idv proccess completed successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'idv not found',
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}