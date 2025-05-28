import { ApiProperty } from '@nestjs/swagger';
import { Photo } from '@prisma/client';
export class PhotoEntity implements Photo {
    @ApiProperty({
        description: 'The unique identifier for the photo',
        example: 1,
    })
    id: string;

    @ApiProperty({
        description: 'The name of the photo stored in S3',
        example: 'afgxvnbgyes23',
    })
    name: string;

    @ApiProperty({
        description: 'The ID of the associated order',
        example: 1,
    })
    orderId: string;

    @ApiProperty({
        description: 'The ID of the associated user',
        example: 1,
    })
    userId: string;

    @ApiProperty({
        description: 'The ID of the associated driver',
        example: 1,
    })
    driverId: string;

    @ApiProperty({
        description: 'The date when the photo was created',
        example: '2024-01-01T00:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The date when the photo was last updated',
        example: '2024-01-01T00:00:00Z',
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'The user who created the photo',
        example: 'user@example.com',
        required: false,
    })
    createdBy: string;

    @ApiProperty({
        description: 'The user who last updated the photo',
        example: 'user@example.com',
        required: false,
    })
    updatedBy: string;

    @ApiProperty({
        description: 'The date when the photo was deleted',
        example: '2024-01-01T00:00:00Z',
        required: false,
    })
    deletedAt: Date;

    @ApiProperty({
        description: 'The user who deleted the photo',
        example: 'user@example.com',
        required: false,
    })
    deletedBy: string;

    @ApiProperty({
        description: 'The version of the photo record',
        example: 1,
    })
    version: number;

    @ApiProperty({
        description: 'The ID of the owner of the photo',
        example: 1,
    })
    ownerId: string;

    @ApiProperty({
        description: 'The ID of the company associated with the photo',
        example: 1,
        required: false,
    })
    companyId: string;
}
