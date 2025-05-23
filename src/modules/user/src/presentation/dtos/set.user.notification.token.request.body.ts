import { IsNotEmpty, IsString } from "class-validator";

export default class SetUserNotificationTokenRequestBody {

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsString()
    platform: string;

};