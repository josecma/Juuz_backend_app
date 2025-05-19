import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

export class PaginationCarrierPerformanceDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'The unique identifier for the associated user' })
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'Punctuality rating (1-5)' })
  @IsInt({ message: 'Punctuality must be an integer' })
  @Min(1, { message: 'Punctuality must be at least 1' })
  @Max(5, { message: 'Punctuality must be at most 5' })
  punctuality: number;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'Cargo care rating (1-5)' })
  @IsInt({ message: 'Cargo care must be an integer' })
  @Min(1, { message: 'Cargo care must be at least 1' })
  @Max(5, { message: 'Cargo care must be at most 5' })
  cargoCare: number;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'Friendliness rating (1-5)' })
  @IsInt({ message: 'Friendliness must be an integer' })
  @Min(1, { message: 'Friendliness must be at least 1' })
  @Max(5, { message: 'Friendliness must be at most 5' })
  friendliness: number;

  @ApiProperty({
    description: 'Start date for filtering records',
    example: '2024-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'End date for filtering records',
    example: '2024-12-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
