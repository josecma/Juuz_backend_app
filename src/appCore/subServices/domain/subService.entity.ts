import { ApiProperty } from '@nestjs/swagger';
import { $Enums, SubService } from '@prisma/client';
export class SubServiceEntity implements SubService {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the subService',
  })
  id: number;

  @ApiProperty({
    description: 'The ID of the service this entity belongs to',
    example: 1,
    type: Number,
  })
  serviceId: number;

  @ApiProperty({
    enum: ['$Enums.SubServiceEnum'],
    description: 'The name of the subService',
  })
  name: $Enums.SubServiceEnum;

  @ApiProperty({
    example: 'This is a subService',
    description: 'The description of the subService',
  })
  description: string;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the subService was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the subService was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this subService',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this subService',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description:
      'The timestamp when the subService was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this subService (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the subService data',
  })
  version: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the subService',
  })
  ownerId: number;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the company associated with the subService',
  })
  companyId: number;
}
