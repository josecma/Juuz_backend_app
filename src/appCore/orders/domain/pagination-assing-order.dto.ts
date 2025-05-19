import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

export class PaginationAssingOrderDto extends PaginationDto {
  @ApiProperty({
    enum: $Enums.OrderStatusEnum,
    enumName: 'OrderStatusEnum',
    description: 'The status of the order.',
    example: $Enums.OrderStatusEnum.IN_TRANSIT,
    required: false,
  })
  @IsOptional()
  status: $Enums.OrderStatusEnum;
}
