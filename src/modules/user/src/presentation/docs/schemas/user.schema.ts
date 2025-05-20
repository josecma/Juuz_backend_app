import { ApiProperty } from '@nestjs/swagger';

export default class UserSchema {

    @ApiProperty(
        {
            name: "firstName",
            required: true,
        }
    )
    firstName: string;

    @ApiProperty(
        {
            name: "lastName",
            required: true,
        }
    )
    lastName: string;
}