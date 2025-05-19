import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Role } from '@prisma/client';
export class RoleEntity implements Role {
  @ApiProperty({ example: 1, description: 'The unique identifier of the role' })
  id: number;

  @ApiProperty({ description: 'name', example: 'Tester' })
  name: string;

  @ApiProperty({
    enum: ['$Enums.RolesEnum'],
    description: 'The name of the role',
  })
  type: $Enums.RolesEnum;

  @ApiProperty({
    description: 'The ID of the company.',
    example: 1,
  })
  companyId: number;

  @ApiProperty({
    description: 'A detailed description of the entity',
    example: 'This is a detailed description related to the role.',
    type: String,
  })
  description: string;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the role was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the role was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this role',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this role',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description: 'The timestamp when the role was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this role (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the role data',
  })
  version: number;

  @ApiProperty({
    example: 1,
    description: 'The version number of the owner data',
  })
  ownerId: number;
}
