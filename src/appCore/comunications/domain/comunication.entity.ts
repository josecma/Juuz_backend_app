import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Comunication } from '@prisma/client';
export class ComunicationEntity implements Comunication {
  @ApiProperty({
    description: 'Unique identifier of the communication',
    example: 123,
  })
  id: number;

  @ApiProperty({ description: 'Associated order ID', example: 456 })
  orderId: number;

  @ApiProperty({ description: 'Channel ID for the driver', example: 789 })
  driverChanelId: number;
  
  @ApiProperty({ description: 'Channel ID for the rider', example: 101112 })
  riderChanelId: number;

  @ApiProperty({ description: 'Number of communications', example: 5 })
  numberOfComunications: number;

  @ApiProperty({
    enum: ['$Enums.ComunicationEnum'],
    description: 'The status the comunication.',
    example: $Enums.ComunicationEnum.OPEN,
  })
  status: $Enums.ComunicationEnum;

  @ApiProperty({
    description: 'Creation date of the communication record',
    example: '2023-04-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Creation date of the communication record',
    example: '2023-04-01T00:00:00.000Z',
  })
  @ApiProperty({
    description: 'Last update date of the communication record',
    example: '2023-04-02T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Identifier of the user who created the communication record',
    example: 'user123',
  })
  createdBy: string;

  @ApiProperty({
    description:
      'Identifier of the user who last updated the communication record',
    example: 'user456',
  })
  updatedBy: string;

  @ApiProperty({
    description: 'Deletion date of the communication record',
    example: '2023-04-03T00:00:00.000Z',
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'Identifier of the user who deleted the communication record',
    example: 'user789',
  })
  deletedBy: string;

  @ApiProperty({
    description:
      'Version number of the communication record for optimistic concurrency control',
    example: 1,
  })
  version: number;

  @ApiProperty({
    description: 'Owner ID associated with this communication',
    example: 987,
  })
  ownerId: number;

  @ApiProperty({
    description: 'Company ID associated with this communication',
    example: 654,
  })
  companyId: number;
}
