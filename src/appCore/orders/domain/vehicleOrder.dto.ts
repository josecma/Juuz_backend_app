import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsAlphanumeric,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { $Enums, VehicleOrder, VehicleType } from '@prisma/client';

type VehicleOrderId = Omit<
  VehicleOrder,
  | 'id'
  | 'orderPhoto'
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
  | 'orderId'
  | 'driverId'
>;

export class VehicleOrderDto implements VehicleOrderId {
  @ApiProperty({
    description: 'The type of the vehicle',
    // enum: VehicleType, // Reference to the VehicleType enum
  })
  // @IsEnum(VehicleType, { message: 'Invalid vehicle type' })
  vehicleMakeModelId: string;

  @IsNotEmpty()
  @IsString()
  vehicleType: string;

  vehicleId: string;
  @ApiProperty({
    description: 'Description of the vehicle problem.',
    example: 'The engine is making a strange noise.',
  })
  @IsString()
  @IsOptional({ message: 'Vehicle problem must not be empty.' })
  vehicleProblem: string;

  @ApiProperty({
    description: 'Additional details about the vehicle problem.',
    example: 'The noise occurs when accelerating.',
  })
  @IsString()
  @IsOptional({ message: 'Additional detail must not be empty.' })
  additionalDetail: string;

  @ApiProperty({
    description: 'Indicates if the keys are with the vehicle.',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional({ message: 'Key status must not be empty.' })
  isTheKeysWithTheVehicle: boolean;

  @ApiProperty({
    description: 'The year of vehicles',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty({
    description: 'The last number associated with the vehicle',
    example: 'LN-5678',
  })
  @IsString()
  @IsOptional()
  lastNumber: string;

  @ApiProperty({
    description: 'Additional information about the vehicle.',
    example: 'asdasd',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Additional vehicle information must be a string.' })
  additionalVehicleInformation: string;

  @ApiProperty({
    description: 'State and province code.',
    example: 'US-FL',
  })
  @IsString({ message: 'State province must be a string.' })
  @IsOptional()
  stateProvince: string;

  @ApiProperty({
    description: 'Type of the trailer.',
    example: 'open',
  })
  @IsString({ message: 'Trailer type must be a string.' })
  trailerType: string;

  @ApiProperty({
    description: 'Indicates if the load is wide.',
    example: true,
  })
  @IsBoolean({ message: 'Wide load must be a boolean.' })
  wideLoad: boolean;

  @ApiProperty({
    description: 'Service status',
    example: $Enums.VihecleOrderStatusEnum.NOT_RUNNING,
    enum: $Enums.VihecleOrderStatusEnum,
  })
  @IsOptional()
  @IsEnum($Enums.VihecleOrderStatusEnum, { message: 'Invalid state' })
  state: $Enums.VihecleOrderStatusEnum;

  @ApiProperty({
    description: 'The quantity of vehicles',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  qty: number;

  @ApiProperty({
    description: 'The color of the vehicle',
    example: 'Red',
  })
  @IsString()
  @IsOptional()
  vehicleColor: string;

  @ApiProperty({
    description: 'The license plate of the vehicle',
    example: 'ABC-1234',
  })
  @IsAlphanumeric()
  @IsOptional()
  licensePlate: string;

  @ApiPropertyOptional({
    description: 'ID of the related model',
    example: 1,
  })
  @IsOptional()
  @IsString()
  modelId: string;
}

export class UpdateVehicleOrderDto extends PartialType(VehicleOrderDto) {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the order',
  })
  @IsNumber()
  @IsPositive({ message: 'Id must be a positive number.' })
  @IsOptional()
  id: string;
}
