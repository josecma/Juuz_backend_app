import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

export class PaginationTripDto extends PaginationDto {
  @IsOptional()
  @ApiProperty({
    description: 'The name of the service',
    example: $Enums.OrderStatusEnum.HISTORY,
    enum: $Enums.OrderStatusEnum,
  })
  @IsEnum($Enums.OrderStatusEnum, {
    message: 'Name must be a valid enum value',
  })
  name: $Enums.OrderStatusEnum;

  @IsOptional()
  @ApiProperty({ description: 'The unique identifier for the associated user' })
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;
}
