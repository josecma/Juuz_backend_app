import { ApiProperty, PartialType } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class TripDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The unique identifier for the associated user' })
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;

  @ApiProperty({
    description: 'The name of the service',
    example: $Enums.OrderStatusEnum.HISTORY,
    enum: $Enums.OrderStatusEnum,
  })
  @IsEnum($Enums.OrderStatusEnum, {
    message: 'Name must be a valid enum value',
  })
  name: $Enums.OrderStatusEnum;
}

export class UpdateTripDto extends PartialType(TripDto) {}
