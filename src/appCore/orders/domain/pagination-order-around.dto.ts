import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationOrderAroundDto extends PaginationDto {
  @ApiProperty({
    description: 'Latitude of the location',
    example: 37.7749,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the location',
    example: -122.4194,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @ApiProperty({
    description: 'Radius around the location in miles',
    example: 1000,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  radiusInMilles: number;
}
