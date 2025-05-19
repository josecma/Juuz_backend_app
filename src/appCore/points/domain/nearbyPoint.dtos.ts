import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Coords } from './point.dtos';

export class OnOrOffPointDto {
  // @ApiProperty({
  //   description: 'Indicates if only active drivers should be returned',
  //   type: Boolean,
  //   required: false,
  //   default: true,
  // })
  // @IsNotEmpty()
  // @IsBoolean()
  // isActive: boolean;

  @ApiProperty({
    type: Coords,
    description: 'Coords data.',
  })
  //@IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Coords)
  coords: Coords;
}

export class NearbyPointDto {
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

  // @ApiProperty({
  //   description: 'Indicates if only active drivers should be returned',
  //   type: Boolean,
  //   required: false,
  //   default: true,
  // })
  // @IsOptional()
  // @IsBoolean()
  // isActive?: boolean = true; // Default value
}
