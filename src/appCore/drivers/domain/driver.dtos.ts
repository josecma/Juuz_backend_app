import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { Driver } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { UpdateVehicleInfoDto } from 'src/appCore/vehicleInfos/domain/vehicleInfo.dtos';

type DriverWithoutId = Omit<
  Driver,
  | 'id'
  | 'userPhoto'
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
  | 'vehicleInfoId'
  | 'userId'
>;

type CarrierWithoutId = Omit<
  Driver,
  | 'id'
  | 'userPhoto'
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
  | 'vehicleInfoId'
  | 'userId'
>;

export class DriverVehicleInfoDto {
  @ApiProperty({
    description: 'The ID of the model detail associated with this vehicle',
    example: 1001,
    type: Number,
  })
  @IsInt({ message: 'modelId must be an integer' })
  @Min(1, { message: 'modelId must be a positive integer' })
  @IsNotEmpty({ message: 'modelId is required' })
  modelId: number;
}

export class VehicleBaseDto {
  @ApiProperty({
    example: '[1,2,3]',
    description: 'Photo Ids',
  })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  photoIds: number[];

  @ApiProperty({
    description: 'The year of vehicles',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'The Vehicle Identification Number (VIN) for the vehicle',
    example: '1HGBH41JXMN109186',
    type: String,
  })
  @IsString({ message: 'vinNumber must be a string' })
  @IsNotEmpty({ message: 'vinNumber is required' })
  vinNumber: string;

  @ApiProperty({
    description: "The document identifier for the vehicle's insurance",
    example: 'INS1234567',
    type: String,
  })
  @IsString({ message: 'insuranceDoc must be a string' })
  @IsOptional()
  insuranceDoc: string;

  @ApiProperty({
    description: 'The ID of the service registering the vehicle',
    example: 42,
    type: Number,
  })
  @IsInt({ message: 'serviceId must be an integer' })
  @Min(1, { message: 'serviceId must be a positive integer' })
  @IsOptional()
  serviceId: number;

  @ApiProperty({
    description: "A unique identifier for the user's facial recognition data",
    example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
    type: String,
  })
  @IsString()
  @IsOptional()
  faceId: string;

  @ApiProperty({
    description: 'The type of vehicle being registered',
    example: 'Sedan',
    type: String,
  })
  @IsString({ message: 'vehicleType must be a string' })
  @IsNotEmpty({ message: 'vehicleType is required' })
  vehicleType: string;

  @ApiProperty({
    description: 'The passenger capacity of the vehicle',
    example: 5,
    type: Number,
  })
  @IsInt({ message: 'capacity must be an integer' })
  @Min(1, { message: 'capacity must be at least 1' })
  @Max(8, { message: 'capacity must be no more than 8' })
  @IsOptional()
  capacity: number;

  @ApiProperty({
    type: DriverVehicleInfoDto,
    description: 'Vehicle Info data.',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DriverVehicleInfoDto)
  vehicleInfo: DriverVehicleInfoDto;
}

export class DriverDto extends VehicleBaseDto implements DriverWithoutId {}

export class CarrierDto extends VehicleBaseDto implements CarrierWithoutId {
  @ApiProperty({
    description: 'The ID of the user registering the vehicle',
    example: 42,
    type: Number,
  })
  @IsInt({ message: 'userId must be an integer' })
  @Min(1, { message: 'userId must be a positive integer' })
  @IsInt()
  @IsOptional()
  userId: number;
}

export class UpdateDriverDto extends PartialType(
  OmitType(DriverDto, ['vehicleInfo'] as const)
) {
  @ApiProperty({
    type: UpdateVehicleInfoDto,
    description: 'Vehicle Info data.',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVehicleInfoDto)
  vehicleInfo: UpdateVehicleInfoDto;
}

export class UpdateCarrierDto extends PartialType(
  OmitType(CarrierDto, ['vehicleInfo'] as const)
) {
  @ApiProperty({
    type: UpdateVehicleInfoDto,
    description: 'Vehicle Info data.',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVehicleInfoDto)
  vehicleInfo: UpdateVehicleInfoDto;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the order',
  })
  @IsNumber()
  @IsPositive({ message: 'Id must be a positive number.' })
  @IsOptional()
  id: number;
}

export class CarrierWithIdDto extends UpdateDriverDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the order',
  })
  @IsNumber()
  @IsPositive({ message: 'Id must be a positive number.' })
  @IsOptional()
  id: number;
}
