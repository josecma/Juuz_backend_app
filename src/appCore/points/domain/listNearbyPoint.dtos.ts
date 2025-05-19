import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class OnOrOffPointDto {
  @ApiProperty({
    description: 'Indicates if only active drivers should be returned',
    type: Boolean,
    required: false,
    default: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}

export class ListNearbyPointDto {
  @ApiProperty({
    description: 'Latitude of the location',
    type: String,
  })
  @IsString()
  latitude: string;

  @ApiProperty({
    description: 'Longitude of the location',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  longitude: string;

  @ApiProperty({
    description: 'Radius in miles (must be less than 20)',
    type: Number,
    minimum: 0,
    maximum: 20,
  })
  @IsString()
  @IsNotEmpty()
  radiusInMilles: string;

  // @ApiPropertyOptional({
  //   description: 'Page number for pagination.',
  //   example: 1,
  // })
  // @IsOptional()
  // @Transform(({ value }) => parseInt(value, 10))
  // @IsInt()
  // @Min(1)
  // page?: number;

  // /**
  //  * Cantidad de elementos por página para la paginación.
  //  * @example 10
  //  */
  // @ApiPropertyOptional({
  //   description: 'Number of items per page for pagination.',
  //   example: 10,
  // })
  // @IsOptional()
  // @Transform(({ value }) => parseInt(value, 10))
  // @IsInt()
  // @Min(1)
  // @Max(50) // Ajusta según tus necesidades
  // pageSize?: number;
}
