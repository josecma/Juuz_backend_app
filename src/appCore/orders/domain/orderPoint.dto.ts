import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class UpdateOrderPointDto {
  @ApiProperty({
    description: 'Indicates if the point is actively using Ably',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    description: 'Identifier for the negotiaion assigned to the order.',
    example: 502,
    required: false,
  })
  @IsInt()
  @Min(1, { message: 'The negotiaionId must be a positive integer.' })
  @Max(9999, { message: 'The negotiaionId must not exceed 9999.' })
  @IsNotEmpty()
  negotiationId: number;
}
