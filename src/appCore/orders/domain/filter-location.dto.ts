import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  Min,
  ValidateNested,
} from 'class-validator';
import { Coords } from 'src/appCore/points/domain/point.dtos';

export class LocationSearchDto {
  @ApiProperty({
    example: 50,
    description: 'The maximum distance from the point',
  })
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  distance: number;

  @ApiProperty({
    enum: $Enums.ServiceEnum,
    enumName: 'ServiceEnum',
    description: 'The service name',
  })
  @IsEnum($Enums.ServiceEnum)
  @IsNotEmpty()
  serviceName: $Enums.ServiceEnum;

  @ApiProperty({
    enum: $Enums.SubServiceEnum,
    enumName: 'SubServiceEnum',
    description: 'The sub-service name',
  })
  @IsEnum($Enums.SubServiceEnum)
  @IsNotEmpty()
  subServiceName: $Enums.SubServiceEnum;
}
