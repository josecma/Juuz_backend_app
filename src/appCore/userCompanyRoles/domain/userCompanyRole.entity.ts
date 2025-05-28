import { ApiProperty } from '@nestjs/swagger';
import { CompanyMemberRole } from '@prisma/client';
export class UserCompanyRoleEntity {
  @ApiProperty({
    description: 'Unique identifier for the user-company-role relationship.',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Identifier of the user associated with the role.',
    example: 123,
    type: Number,
  })
  userId: number;

  @ApiProperty({
    description: 'Identifier of the company associated with the role.',
    example: 456,
    type: Number,
  })
  companyId: number;

  @ApiProperty({
    description: 'Identifier of the role assigned to the user in the company.',
    example: 789,
    type: Number,
  })
  roleId: number;

  @ApiProperty({
    description: 'Timestamp when the relationship was created.',
    example: '2024-01-01T12:00:00Z',
    type: String,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the relationship was last updated.',
    example: '2024-01-02T12:00:00Z',
    type: String,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Identifier of the user who created the relationship.',
    example: 'admin',
    type: String,
  })
  createdBy: string;

  @ApiProperty({
    description: 'Identifier of the user who last updated the relationship.',
    example: 'admin',
    type: String,
  })
  updatedBy: string;

  @ApiProperty({
    description: 'Timestamp when the relationship was deleted (if applicable).',
    example: '2024-01-03T12:00:00Z',
    type: String,
    required: false,
  })
  deletedAt: Date;
  @ApiProperty({
    description:
      'Identifier of the user who deleted the relationship (if applicable).',
    example: 'admin',
    type: String,
    required: false,
  })
  deletedBy: string;

  @ApiProperty({
    description: 'Version of the user-company-role relationship.',
    example: 1,
    type: Number,
  })
  version: number;
}
