import { ApiProperty } from '@nestjs/swagger';
import { Session } from '@prisma/client';
export class SessionEntity {
  @ApiProperty({
    description: 'The unique identifier of the session',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description:
      'The unique identifier of the user associated with this session',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'The hash of the session token',
    example: 'someHashStringHere',
  })
  hash: string;

  @ApiProperty({
    description: 'The date and time when the session was created',
    example: '2023-04-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the session was last updated',
    example: '2023-04-02T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description:
      'The date and time when the session was deleted, if applicable',
    example: '2023-04-03T00:00:00.000Z',
    nullable: true,
  })
  deletedAt: Date;
}
