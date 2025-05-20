import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, VehicleOrder, VehicleType } from '@prisma/client';

/**
 * DTO for creating and updating VehicleOrder
 */
export class VehicleOrderEntity implements VehicleOrder {
  @ApiProperty({
    description: 'Unique identifier for the vehicle order',
    example: 1,
  })
  id: string;

  @ApiProperty({
    description: 'The last number associated with the vehicle',
    example: 'LN-5678',
  })
  vehicleProblem: string;

  @ApiProperty({
    description: 'The type of the vehicle',
    enum: VehicleType, // Reference to the VehicleType enum
  })
  vehicleType: VehicleType;

  @ApiProperty({
    description: 'The last number associated with the vehicle',
    example: 'LN-5678',
  })
  additionalDetail: string;

  @ApiProperty({
    description: 'isTheKeysWithTheVehicle',
    example: 'true',
  })
  isTheKeysWithTheVehicle: boolean;

  @ApiProperty({
    description: 'The year of vehicles',
    example: 1,
  })
  year: number;

  @ApiProperty({
    description: 'Service status',
    example: $Enums.VihecleOrderStatusEnum.NOT_RUNNING,
    enum: $Enums.VihecleOrderStatusEnum,
  })
  state: $Enums.VihecleOrderStatusEnum;

  @ApiProperty({
    description: 'The quantity of vehicles',
    example: 1,
  })
  qty: number;

  @ApiProperty({
    description: 'The color of the vehicle',
    example: 'Red',
  })
  vehicleColor: string;

  @ApiProperty({
    description: 'Additional information about the vehicle.',
    example: 'asdasd',
    required: false,
  })
  additionalVehicleInformation: string;

  @ApiProperty({
    description: 'State and province code.',
    example: 'US-FL',
  })
  stateProvince: string;

  @ApiProperty({
    description: 'Type of the trailer.',
    example: 'open',
  })
  trailerType: string;

  @ApiProperty({
    description: 'Indicates if the load is wide.',
    example: true,
  })
  wideLoad: boolean;

  @ApiProperty({
    description: 'The license plate of the vehicle',
    example: 'ABC-1234',
  })
  licensePlate: string;

  @ApiProperty({
    description: 'The last number associated with the vehicle',
    example: 'LN-5678',
  })
  lastNumber: string;

  @ApiPropertyOptional({
    description: 'ID of the related order',
    example: 1,
  })
  orderId: string;

  @ApiPropertyOptional({
    description: 'ID of the related model',
    example: 1,
  })
  modelId: string;

  @ApiPropertyOptional({
    description: 'ID of the related driver',
    example: 1,
  })
  driverId: string;

  @ApiProperty({
    description: 'Date and time when the vehicle order was created',
    example: '2023-07-10T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the vehicle order was last updated',
    example: '2023-07-10T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'User who created the vehicle order',
    example: 'admin',
  })
  createdBy: string;

  @ApiPropertyOptional({
    description: 'User who last updated the vehicle order',
    example: 'admin',
  })
  updatedBy: string;

  @ApiPropertyOptional({
    description: 'Date and time when the vehicle order was deleted',
    example: '2023-07-10T00:00:00.000Z',
  })
  deletedAt: Date;

  @ApiPropertyOptional({
    description: 'User who deleted the vehicle order',
    example: 'admin',
  })
  deletedBy: string;

  @ApiProperty({
    description: 'Version of the vehicle order',
    example: 0,
  })
  version: number;

  @ApiProperty({
    description: 'ID of the owner of the vehicle order',
    example: 1,
  })
  ownerId: string;

  @ApiPropertyOptional({
    description: 'ID of the related company',
    example: 1,
  })
  companyId: string;
}
