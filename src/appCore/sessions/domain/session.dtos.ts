import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Session } from '@prisma/client';
import { IsInt, IsNotEmpty } from 'class-validator';

type SessionWithoutId = Omit<
    Session,
    'id' | 'hash' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
export class SessionDto implements SessionWithoutId {
    @ApiProperty({
        description:
            'The unique identifier of the user associated with this session',
        example: 1,
    })
    //@IsInt({ message: 'userId must be a number' })
    @IsNotEmpty({ message: 'userId is required' })
    userId: string;
}

export class UpdateSessionDto extends PartialType(SessionDto) { }
