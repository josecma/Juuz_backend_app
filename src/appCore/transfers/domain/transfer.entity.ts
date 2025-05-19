import { ApiProperty } from '@nestjs/swagger';
import { Transfer } from '@prisma/client';
export class TransferEntity implements Transfer {
  @ApiProperty({
    description: 'The unique identifier of the transfer',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'A brief description of the transfer.',
    example: 'Payment for invoice #1234',
  })
  description: string;

  @ApiProperty({
    description: 'The amount of money to be transferred.',
    example: 150.75,
  })
  amount: number;

  @ApiProperty({
    description: 'The currency in which the transfer is made.',
    example: 'USD',
  })
  currency: string;

  @ApiProperty({
    description: 'The ID of the associated payment.',
    example: 1,
  })
  paymentId: number;

  @ApiProperty({
    description: 'The ID of the company making the transfer.',
    example: 2,
  })
  companyId: number;

  @ApiProperty({
    description: 'The ID of the account receiving the transfer.',
    example: 3,
  })
  accountId: number;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the user was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this user',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this user',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description: 'The timestamp when the user was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this user (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the user data',
  })
  version: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the user',
  })
  ownerId: number;
}
