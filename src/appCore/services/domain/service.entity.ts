import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Service } from '@prisma/client';
export class ServiceEntity implements Service {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the service',
  })
  id: number;

  @ApiProperty({
    enum: ['$Enums.ServiceEnum'],
    description: 'The name of the service',
  })
  name: $Enums.ServiceEnum;

  @ApiProperty({
    example: 'This is a service',
    description: 'The description of the service',
  })
  description: string;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the service was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the service was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this service',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this service',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description: 'The timestamp when the service was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this service (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the service data',
  })
  version: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the service',
  })
  ownerId: number;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the company associated with the service',
  })
  companyId: number;
}
