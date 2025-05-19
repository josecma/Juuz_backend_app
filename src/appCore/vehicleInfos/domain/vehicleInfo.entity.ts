import { ApiProperty } from '@nestjs/swagger';
import { VehicleInfo } from '@prisma/client';
export class VehicleInfoEntity implements VehicleInfo {
  @ApiProperty({ example: 1, description: 'The unique identifier of the car' })
  id: number;

  @ApiProperty({
    description: 'The ID of the model detail associated with this vehicle',
    example: 1001,
    type: Number,
  })
  modelId: number;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the car was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the car was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this car',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this car',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description: 'The timestamp when the car was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this car (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the car data',
  })
  version: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the car',
  })
  ownerId: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the company associated with the car',
  })
  companyId: number;
}
