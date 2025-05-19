import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '@prisma/client';
import { ModelEntity } from './model.entity';

export class BrandEntity implements Brand {
  @ApiProperty({ description: 'The ID of the brand', example: 1 })
  id: number;

  @ApiProperty({ description: 'The name of the brand', example: 'Tesla' })
  name: string;

  @ApiProperty({
    description: 'The models that belong to the brand',
    type: [ModelEntity], // Usa el ModelResponseDto aquí
    example: [
      {
        id: 1,
        name: 'Model S',
        brandId: 1,
        createdAt: '2024-08-17T12:34:56.000Z',
        updatedAt: '2024-08-17T12:34:56.000Z',
        createdBy: 'user123',
        updatedBy: 'user456',
        deletedAt: null,
        deletedBy: null,
        version: 0,
      },
    ],
  })
  models: ModelEntity[];

  @ApiProperty({ description: 'Creation timestamp', example: '2024-08-17T12:34:56.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2024-08-17T12:34:56.000Z' })
  updatedAt: Date;

  @ApiProperty({ description: 'The user who created the record', example: 'user123', nullable: true })
  createdBy: string;

  @ApiProperty({ description: 'The user who last updated the record', example: 'user456', nullable: true })
  updatedBy: string;

  @ApiProperty({ description: 'The deletion timestamp, if soft deleted', example: '2024-08-17T12:34:56.000Z', nullable: true })
  deletedAt: Date;

  @ApiProperty({ description: 'The user who deleted the record', example: 'user789', nullable: true })
  deletedBy: string;

  @ApiProperty({ description: 'Version of the record', example: 0 })
  version: number;
}
