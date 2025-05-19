import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

export class PaginationShipperPerformanceDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'The unique identifier for the associated user' })
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;

  @ApiProperty({
    description: 'Average reception punctuality score(1-5)',
    example: 4.5,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'receptionPunctuality must be an integer' })
  @Min(1, { message: 'receptionPunctuality must be at least 1' })
  @Max(5, { message: 'receptionPunctuality must be at most 5' })
  receptionPunctuality: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'instructionClarity must be an integer' })
  @Min(1, { message: 'instructionClarity must be at least 1' })
  @Max(5, { message: 'instructionClarity must be at most 5' })
  @ApiProperty({
    description: 'Average instruction clarity score(1-5)',
    example: 4.2,
  })
  instructionClarity: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'accessibility must be an integer' })
  @Min(1, { message: 'accessibility must be at least 1' })
  @Max(5, { message: 'accessibility must be at most 5' })
  @ApiProperty({
    description: 'Average accessibility score(1-5)',
    example: 4.8,
  })
  accessibility: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'friendliness must be an integer' })
  @Min(1, { message: 'friendliness must be at least 1' })
  @Max(5, { message: 'friendliness must be at most 5' })
  @ApiProperty({
    description: 'Average friendliness score(1-5)',
    example: 4.8,
  })
  friendliness: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'onTimePayment must be an integer' })
  @Min(1, { message: 'onTimePayment must be at least 1' })
  @Max(5, { message: 'onTimePayment must be at most 5' })
  @ApiProperty({
    description: 'On time payment on time payment score(1-5)',
    example: 4.8,
  })
  onTimePayment: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'overallAverage must be an integer' })
  @Min(1, { message: 'overallAverage must be at least 1' })
  @Max(5, { message: 'overallAverage must be at most 5' })
  @ApiProperty({
    description: 'Overall average score(1-5)',
    example: 4.5,
  })
  overallAverage: number;
  
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
