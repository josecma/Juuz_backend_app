import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export default class EmailDto {

    @ApiProperty({
        description: "email",
        type: [String],
        example: { email: "username@email.com" },
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
};