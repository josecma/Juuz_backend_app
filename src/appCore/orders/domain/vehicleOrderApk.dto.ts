import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsAlphanumeric,
  IsEnum,
  IsBoolean,
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

export class VehicleOrderApkDto implements VehicleOrderId {
  @ApiProperty({
    description: 'The type of the vehicle',
    enum: VehicleType, // Reference to the VehicleType enum
  })
  @IsEnum(VehicleType, { message: 'Invalid vehicle type' })
  @IsOptional()
  vehicleType: VehicleType;

  @ApiProperty({
    description: 'The last number associated with the vehicle',
    example: 'LN-5678',
  })
  @IsString()
  @IsOptional()
  vehicleProblem: string;

  @ApiProperty({
    description: 'The last number associated with the vehicle',
    example: 'LN-5678',
  })
  @IsOptional()
  @IsString()
  additionalDetail: string;

  @ApiProperty({
    description: 'isTheKeysWithTheVehicle',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  isTheKeysWithTheVehicle: boolean;

  @ApiProperty({
    description: 'The year of vehicles',
    example: 1,
  })
  @IsInt()
  @IsOptional()
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
  @IsOptional()
  @IsString({ message: 'Trailer type must be a string.' })
  trailerType: string;

  @ApiProperty({
    description: 'Indicates if the load is wide.',
    example: true,
  })
  @IsOptional()
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
  @IsInt()
  modelId: string;
}
