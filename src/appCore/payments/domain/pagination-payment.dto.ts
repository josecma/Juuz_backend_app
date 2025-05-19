import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

export enum GroupBy {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export class PaginationPaymentDto extends PaginationDto {
  @ApiProperty({
    description: 'Start date for filtering records',
    example: '2024-01-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date for filtering records',
    example: '2024-12-31',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Grouping interval: day, week, month, year',
    example: 'month',
  })
  @IsEnum(GroupBy)
  groupBy: GroupBy;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'The unique identifier for the associated user' })
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;
}
