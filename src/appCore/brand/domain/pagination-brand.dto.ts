import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

export class PaginationBrandDto extends PaginationDto {
  @ApiProperty({ description: 'Filter brands by name prefix', example: 'Tes' })
  @IsOptional()
  @IsString()
  brandNamePrefix?: string;

  @ApiProperty({
    description: 'Filter models by name prefix',
    example: 'Model S',
  })
  @IsOptional()
  @IsString()
  modelNamePrefix?: string;

  @ApiProperty({
    description: 'Filter models by year',
    example: '2000',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @Min(1980)
  year: number;
}
