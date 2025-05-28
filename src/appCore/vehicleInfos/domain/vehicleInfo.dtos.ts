import { ApiProperty, PartialType } from '@nestjs/swagger';
import { VehicleInfo } from '@prisma/client';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

type VehicleInfoWithoutId = Omit<
  VehicleInfo,
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
>;
export class VehicleInfoDto implements VehicleInfoWithoutId {
  @ApiProperty({
    description: 'The ID of the model detail associated with this vehicle',
    example: 1001,
    type: Number,
  })
  @IsInt({ message: 'modelId must be an integer' })
  @Min(1, { message: 'modelId must be a positive integer' })
  @IsNotEmpty({ message: 'modelId is required' })
  modelId: string;

  @ApiProperty({
    description: 'The ID of the driver detail associated with this vehicle',
    example: 1001,
    type: Number,
  })
  @IsInt({ message: 'driverId must be an integer' })
  @Min(1, { message: 'driverId must be a positive integer' })
  @IsNotEmpty({ message: 'driverId is required' })
  driverId: string;
}

export class UpdateVehicleInfoDto extends PartialType(VehicleInfoDto) { }
