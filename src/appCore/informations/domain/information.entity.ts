import { ApiProperty } from '@nestjs/swagger';
import { Information } from '@prisma/client';
export class InformationEntity implements Information {
  @ApiProperty({ example: 1, description: 'The unique identifier' })
  id: number;

  @ApiProperty({
    example: 'This is a description',
    description: 'The description',
  })
  description: string;

  @ApiProperty({
    description: 'The unique identifier for the order',
    example: 1,
    type: Number,
  })
  orderId: number;

  @ApiProperty({
    description:
      'The unique identifier for the point associated with the order',
    example: 100,
    type: Number,
  })
  pointId: number;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the data was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the data was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this data',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this data',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description: 'The timestamp when the data was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this data (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({ example: 1, description: 'The version number of the data' })
  version: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the data',
  })
  ownerId: number;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the company associated with the data',
  })
  companyId: number;
}
