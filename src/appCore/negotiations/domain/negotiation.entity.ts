import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Negotiation } from '@prisma/client';
export class NegotiationEntity implements Negotiation {
    @ApiProperty({
        enum: ['$Enums.LastNegotiatonEnums'],
        description: 'The status the comunication.',
        example: $Enums.LastNegotiatonEnums.CARRIER,
    })
    lastNegotiaton: $Enums.LastNegotiatonEnums;
    @ApiProperty({ example: 12 })
    id: string;

    @ApiProperty({
        description: 'The price of the negotiation.',
        example: 10.5,
    })
    price: number;

    @ApiProperty({
        description: 'The ID of the user.',
        example: 1,
    })
    userId: string;

    @ApiProperty({
        description: 'The ID of the company.',
        example: 1,
    })
    companyId: string;

    @ApiProperty({
        description: 'The ID of the driver.',
        example: 2,
    })
    driverId: string;

    @ApiProperty({
        description: 'The ID of the order.',
        example: 3,
    })
    orderId: string;

    @ApiProperty({
        description: 'The offer made by the carrier.',
        example: 500.0,
    })
    offerCarrier: number;

    @ApiProperty({
        description: 'The counteroffer made by the shipper.',
        example: 450.0,
    })
    counterOfferShipper: number;

    @ApiProperty({
        description: 'Negotiation status',
        example: $Enums.NegotiationStatus.OPEN,
        enum: $Enums.NegotiationStatus,
    })
    status: $Enums.NegotiationStatus;
}
