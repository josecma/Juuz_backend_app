import { ApiProperty } from "@nestjs/swagger";

export default class SetUserNotificationTokenSchema {

    @ApiProperty(
        {
            type: String,
            required: true,
        }
    )
    token: string;

    @ApiProperty(
        {
            name: 'platform',
            type: String,
            required: true,
        }
    )
    platform: string;

};