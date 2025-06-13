import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Order } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export class OrderEntity {
    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address of the user',
    })
    emailSecond: string;
    pickedupAt: Date;
    cancelledAt: Date;
    deliveredAt: Date;
    @ApiProperty({
        description: 'The reason for canceling the order.',
        example: 'Customer changed their mind',
        type: String,
    })
    reason: string;

    @ApiProperty({
        description: 'The ID of the subService this entity belongs to',
        example: 1,
        type: Number,
    })
    subServiceId: string;

    @ApiProperty({
        example: 'isAssistanceRequestForNow',
        description: 'true',
    })
    isAssistanceRequestForNow: boolean;

    @ApiProperty({
        example: '323 2032',
        description: 'Phone of the user',
    })
    phoneSecond: string;

    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    firstNameSecond: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    lastNameSecond: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address of the user',
    })
    email: string;

    @ApiProperty({
        example: '323 2032',
        description: 'Phone of the user',
    })
    phone: string;

    @ApiProperty({
        example: 'My order',
        description: 'NOte',
    })
    note: string;

    @ApiProperty({ enum: $Enums.OrderStatusEnum })
    status: $Enums.OrderStatusEnum;

    // @ApiProperty({ enum: $Enums.OrderSubStatus })
    subStatus: string;

    @ApiProperty({
        description: 'Payment Method',
        example: "CASH",
    })
    paymentMethod: string;

    @ApiProperty({
        example: 'Order 1',
        description: 'Aditional Info',
    })
    aditionalInfo: string;

    @ApiProperty({
        example: '12.5',
        description: 'Price per mile',
    })
    pricePerMile: Decimal;

    @ApiProperty({
        description: 'Numbers of milles',
        example: 42,
        type: Number,
    })
    milles: number;

    @ApiProperty({
        description: 'Pick-up date with time.',
        example: '2024-01-01T12:30:00',
    })
    pickUpDate: string;

    @ApiProperty({
        description: 'Delivery date with time.',
        example: '2024-01-01T12:30:00',
    })
    deliveryDate: string;

    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    lastName: string;

    @ApiProperty({
        description: 'Start date for filtering records',
        example: '2024-01-01',
    })
    expirationTime: Date;

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the order',
    })
    id: string;

    @ApiProperty({
        description: 'The ID of the service this entity belongs to',
        example: 1,
        type: Number,
    })
    serviceId: string;

    @ApiProperty({
        description: 'The ID of the user referred',
        example: 1,
        type: Number,
    })
    referredId: string;

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the departure point of the service',
    })
    departureId: string;

    @ApiProperty({
        example: 2,
        description:
            'The unique identifier of the destination point of the service',
    })
    destinationId: string;

    @ApiProperty({
        example: 3,
        description: 'The number of cars assigned to the service',
    })
    carCount: number;

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user who placed the order',
    })
    userId: string;

    @ApiProperty({ example: 50, description: 'The price of the order' })
    price: number;

    @ApiProperty({
        enum: ['$Enums.OrderStatusEnum'],
        description: 'The status of the order',
    })
    orderStatus: $Enums.OrderStatusEnum;

    @ApiProperty({
        example: 'isActive',
        description: 'true',
    })
    isActive: boolean;

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the driver assigned to the order',
    })
    driverId: string;

    @ApiProperty({
        example: '2024-04-07T10:00:00Z',
        description: 'The timestamp when the order was created',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2024-04-07T10:30:00Z',
        description: 'The timestamp when the order was last updated',
    })
    updatedAt: Date;

    @ApiProperty({
        example: 'admin',
        description: 'The username of the user who created this order',
    })
    createdBy: string;

    @ApiProperty({
        example: 'user',
        description: 'The username of the user who last updated this order',
    })
    updatedBy: string;

    @ApiProperty({
        example: '2024-04-07T11:00:00Z',
        description: 'The timestamp when the order was deleted (if applicable)',
    })
    deletedAt: Date;

    @ApiProperty({
        example: 'admin',
        description:
            'The username of the user who deleted this order (if applicable)',
    })
    deletedBy: string;

    @ApiProperty({
        example: 1,
        description: 'The version number of the order data',
    })
    version: number;

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the owner of the order',
    })
    ownerId: string;

    @ApiProperty({
        example: 1,
        description:
            'The unique identifier of the company associated with the order',
    })
    companyId: string;
}
