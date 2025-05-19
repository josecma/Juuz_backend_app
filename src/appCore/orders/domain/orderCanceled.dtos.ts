import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelOrderDto {
  @ApiProperty({
    description: 'The reason for canceling the order.',
    example: 'Customer changed their mind',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
