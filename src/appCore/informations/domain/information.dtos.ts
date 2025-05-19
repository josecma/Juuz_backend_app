import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Information } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

type InformationWithoutId = Omit<
  Information,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedAt'
  | 'deletedAt'
  | 'deletedBy'
  | 'version'
  | 'ownerId'
  | 'companyId'
>;
export class InformationDto implements InformationWithoutId {
  @ApiProperty({
    example: 'Hause',
    description: 'Description',
  })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'The unique identifier for the order',
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'Order ID is required' })
  @IsInt({ message: 'Order ID must be an integer' })
  orderId: number;

  @ApiProperty({
    description:
      'The unique identifier for the point associated with the order',
    example: 100,
    type: Number,
  })
  @IsNotEmpty({ message: 'Point ID is required' })
  @IsInt({ message: 'Point ID must be an integer' })
  pointId: number;
}

export class UpdateInformationDto extends PartialType(InformationDto) {}
