import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@prisma/client';
export class ModelEntity implements Model {
  @ApiProperty({ description: 'The ID of the model', example: 1 })
  id: string;

  @ApiProperty({ description: 'The name of the model', example: 'Model X' })
  name: string;

  @ApiProperty({ description: 'The ID of the related brand', example: 1 })
  brandId: string;

  @ApiProperty({ description: 'The year of the model', example: 1 })
  year: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-08-17T12:34:56.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-08-17T12:34:56.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The user who created the record',
    example: 'user123',
    nullable: true,
  })
  createdBy: string;

  @ApiProperty({
    description: 'The user who last updated the record',
    example: 'user456',
    nullable: true,
  })
  updatedBy: string;

  @ApiProperty({
    description: 'The deletion timestamp, if soft deleted',
    example: '2024-08-17T12:34:56.000Z',
    nullable: true,
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'The user who deleted the record',
    example: 'user789',
    nullable: true,
  })
  deletedBy: string;

  @ApiProperty({ description: 'Version of the record', example: 0 })
  version: number;
}
