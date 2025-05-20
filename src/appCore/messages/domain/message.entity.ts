import { ApiProperty } from '@nestjs/swagger';
import { DescriptionMessageEnum, Message } from '@prisma/client';
export class MessageEntity implements Message {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the message',
    })
    id: string;

    @ApiProperty({
        description: 'The unique identifier of the negotiation.',
        example: 123,
    })
    negotiationId: string;

    @ApiProperty({
        description:
            'The unique identifier of the user associated with the negotiation.',
        example: 456,
    })
    userId: string;

    @ApiProperty({
        description:
            'The unique identifier of the order associated with the negotiation.',
        example: 789,
    })
    orderId: string;

    @ApiProperty({
        description: 'Indicates whether the massage is unread.',
        example: true,
    })
    unread: boolean;

    @ApiProperty({
        description: DescriptionMessageEnum.CARRIER_OFERT,
        enum: DescriptionMessageEnum, // Reference to the VehicleType enum
    })
    description: DescriptionMessageEnum;

    @ApiProperty({
        example: '2024-04-07T10:00:00Z',
        description: 'The timestamp when the message was created',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2024-04-07T10:30:00Z',
        description: 'The timestamp when the message was last updated',
    })
    updatedAt: Date;

    @ApiProperty({
        example: 'admin',
        description: 'The username of the user who created this message',
    })
    createdBy: string;

    @ApiProperty({
        example: 'user',
        description: 'The username of the user who last updated this message',
    })
    updatedBy: string;

    @ApiProperty({
        example: '2024-04-07T11:00:00Z',
        description: 'The timestamp when the message was deleted (if applicable)',
    })
    deletedAt: Date;

    @ApiProperty({
        example: 'admin',
        description:
            'The username of the user who deleted this message (if applicable)',
    })
    deletedBy: string;

    @ApiProperty({
        example: 1,
        description: 'The version number of the message data',
    })
    version: number;

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the owner of the message',
    })
    ownerId: string;

    @ApiProperty({
        example: 1,
        description:
            'The unique identifier of the company associated with the message',
    })
    companyId: string;
}
