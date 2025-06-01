import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function ApiGetUserProfileDoc() {
  return applyDecorators(
    ApiOperation(
      {
        summary: "get user profile"
      }
    )
  );
}