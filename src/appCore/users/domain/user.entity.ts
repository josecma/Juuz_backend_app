import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class UserEntity implements User {
    password: string;
    @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
    id: string;

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the stripe account',
    })
    stripeAccountId: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address of the user',
    })
    email: string;

    @ApiProperty({
        example: true,
    })
    verified: boolean;

    @ApiProperty({
        example: '323 2032',
        description: 'Phone of the user',
    })
    phone: string;

    @ApiProperty({
        description: 'The ID of the service registering the vehicle',
        example: 42,
        type: Number,
    })
    serviceId: number;

    @ApiProperty({
        description: 'The ID of the point related to user',
        example: 42,
        type: Number,
    })
    pointId: number;

    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    lastName: string;

    @ApiProperty({
        example: true,
        description: 'Indicates whether the user account is active or not',
    })
    isActive: boolean;

    @ApiProperty({
        example: 'http://example.com/user/photo.jpg',
        description: "The URL of the user's photo",
    })
    userPhoto: string;

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

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of role Id',
    })
    roleId: number;

    @ApiProperty({
        example: 1,
        description:
            'The unique identifier of the company associated with the user',
    })
    companyId: number;

    //   @ApiProperty({
    //     description: 'The type of log entry',
    //     enum: RolesEnum,
    //     example: RolesEnum.COMPANY,
    //   })
    //   logType: RolesEnum;
}
