import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Point } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

type PointWithoutId = Omit<
  Point,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedAt'
  | 'deletedAt'
  | 'deletedBy'
  | 'version'
  | 'ownerId'
  | 'companyId'
  | 'longitude'
  | 'latitude'
  | 'isActive'
  | 'userId'
  | 'type'
>;

export class Coords {
  @ApiProperty({
    example: '23.32',
    description: 'Point',
  })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    example: '23.32',
    description: 'Point',
  })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
export class PointDto implements PointWithoutId {
  @ApiProperty({
    example: 'Doe',
    description: 'Point address of the user',
  })
  @IsString({ message: 'Point address must be a string' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Point city of the user',
  })
  @IsString({ message: 'Point city must be a string' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Point state of the user',
  })
  @IsNotEmpty()
  @IsString({ message: 'Point state must be a string' })
  state: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Point Name of the user',
  })
  @IsString({ message: 'Point Name must be a string' })
  pointName: string;

  @ApiProperty({
    example: '123',
    description: 'Order Id',
  })
  @IsInt()
  @IsOptional()
  orderId: string;

  @ApiProperty({
    example: '123',
    description: 'Rider Id',
  })
  @IsInt()
  @IsOptional()
  driverId: string;

  @ApiProperty({
    example: '123',
    description: 'Comunication Id',
  })
  @IsInt()
  @IsOptional()
  comunicationId: number;

  @ApiProperty({
    type: Coords,
    description: 'Coords data.',
  })
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Coords)
  coords: Coords;
}

export class UpdatePointDto extends PartialType(PointDto) { }

export class UpdatePointWhitIdDto extends PartialType(PointDto) {
  @ApiProperty({
    description: 'The ID of the subService this entity belongs to',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'id must be an integer' })
  @Min(1, { message: 'id must be a positive integer' })
  @IsNotEmpty({ message: 'id is required' })
  @IsNotEmpty()
  id: string;
}

export class UpdateUserPointDto {
  @ApiProperty({
    type: Coords,
    description: 'Coords data.',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Coords)
  coords: Coords;
}
