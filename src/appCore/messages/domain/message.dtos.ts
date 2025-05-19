import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DescriptionMessageEnum, Message } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

type MessageWithoutId = Omit<
  Message,
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
  | 'unread'
>;
export class MessageDto implements MessageWithoutId {
  @ApiProperty({
    description: 'The unique identifier of the negotiation.',
    example: 123,
  })
  @IsInt({ message: 'negotiationId must be an integer.' })
  @IsNotEmpty({ message: 'negotiationId is required.' })
  negotiationId: number;

  @ApiProperty({
    description:
      'The unique identifier of the user associated with the negotiation.',
    example: 456,
  })
  @IsInt({ message: 'userId must be an integer.' })
  @IsNotEmpty({ message: 'userId is required.' })
  userId: number;

  @ApiProperty({
    description:
      'The unique identifier of the order associated with the negotiation.',
    example: 789,
  })
  @IsInt({ message: 'orderId must be an integer.' })
  @IsNotEmpty({ message: 'orderId is required.' })
  orderId: number;

  @ApiProperty({
    description: DescriptionMessageEnum.CARRIER_OFERT,
    enum: DescriptionMessageEnum, // Reference to the VehicleType enum
  })
  @IsEnum(DescriptionMessageEnum, { message: 'Invalid vehicle type' })
  @IsNotEmpty({ message: 'description is required' })
  description: DescriptionMessageEnum;
}
export class UpdateMessageDto extends PartialType(MessageDto) {}
