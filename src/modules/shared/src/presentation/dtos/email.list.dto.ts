import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import EmailDto from "./email.dto";

export default class EmailListDto {

    @ApiProperty({
        description: "list of emails",
        type: [EmailDto],
        example: [{ email: "username1@email.com" }, { email: "username2@email.com" }]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EmailDto)
    emails: EmailDto[];
};