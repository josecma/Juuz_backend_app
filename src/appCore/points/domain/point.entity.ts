import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Point } from '@prisma/client';
export class PointEntity implements Point {
  @ApiProperty({
    example: 'Doe',
    description: 'Point address of the user',
  })
  address: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Point city of the user',
  })
  city: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Point state of the user',
  })
  state: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user Id',
  })
  userId: number;
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the point',
  })
  id: number;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  pointName: string;

  @ApiProperty({
    description: 'Longitude of the location',
    example: -74.006,
  })
  longitude: string;

  @ApiProperty({
    description: 'Latitude of the location',
    example: 40.7128,
  })
  latitude: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the order associated with the point',
  })
  orderId: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the rider associated with the point',
  })
  driverId: number;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the point was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the point was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    enum: ['$Enums.TypePointEnum'],
    description: 'The status the comunication.',
    example: $Enums.TypePointEnum.VEHICLE,
  })
  type: $Enums.TypePointEnum;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this point',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this point',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description: 'The timestamp when the point was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this point (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the point data',
  })
  version: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the point',
  })
  ownerId: number;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the company associated with the point',
  })
  companyId: number;

  @ApiProperty({
    description: 'Indicates if the point is actively',
    example: true,
  })
  isActive: boolean;
}
