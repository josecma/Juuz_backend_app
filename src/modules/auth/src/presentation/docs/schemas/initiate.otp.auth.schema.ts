import { ApiPropertyOptional } from "@nestjs/swagger";

export default class InitiateOtpAuthSchema {

    @ApiPropertyOptional({
        type: String,
        description: "User's phone number (required if email is not provided)",
        example: "+1234567890"
    })
    phoneNumber?: string;

    @ApiPropertyOptional({
        type: String,
        description: "User's email address (required if phoneNumber is not provided)",
        example: "user@example.com"
    })
    email?: string;

};