import { ApiProperty } from '@nestjs/swagger';
import IdentitySchema from './identity.schema';
import UserSchema from './user.schema';

export default class CreateUserSchema {

    @ApiProperty(
        {
            type: UserSchema,
            required: false,
        }
    )
    user?: UserSchema;

    @ApiProperty(
        {
            example: '12345678',
            required: false
        }
    )
    credential?: string;

    @ApiProperty(
        {
            type: [IdentitySchema],
            example: [
                {
                    type: 'email',
                    value: 'test@example.com'
                },
                {
                    type: 'custom',
                    value: 'juanito'
                }
            ]
        }
    )
    identities: IdentitySchema[];

};