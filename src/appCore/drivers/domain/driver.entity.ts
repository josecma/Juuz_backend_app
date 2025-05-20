import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '@prisma/client';
export class DriverEntity implements Driver {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the vehicle',
  })
  id: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user who owns the vehicle',
  })
  userId: string;

  @ApiProperty({
    example: 'ABC123',
    description: 'The VIN (Vehicle Identification Number) of the vehicle',
  })
  vinNumber: string;

  @ApiProperty({
    description: 'The year of vehicles',
    example: 1,
  })
  year: number;

  @ApiProperty({
    example: 'http://example.com/insurance.docx',
    description:
      'The URL of the insurance document associated with the vehicle',
  })
  insuranceDoc: string;

  @ApiProperty({
    example: '123456789',
    description: 'The face ID of the vehicle owner',
  })
  faceId: string;

  @ApiProperty({ example: 'Sedan', description: 'The type of vehicle' })
  vehicleType: string;

  @ApiProperty({ example: 5, description: 'The capacity of the vehicle' })
  capacity: number;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the vehicle information associated with the vehicle',
  })
  vehicleInfoId: string;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the vehicle was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the vehicle was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this vehicle',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this vehicle',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description: 'The timestamp when the vehicle was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this vehicle (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the vehicle data',
  })
  version: number;

  @ApiProperty({
    description: 'The ID of the service registering the vehicle',
    example: 42,
    type: Number,
  })
  serviceId: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the vehicle',
  })
  ownerId: string;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the company associated with the vehicle',
  })
  companyId: string;
}
