import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiGetAllUsersResponse() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Users obtained successfully',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}