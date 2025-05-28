import { ApiProperty } from "@nestjs/swagger";
import { IdentityEnum } from "../../../domain/enums/identity.enum";

export default class CompleteIdvProcessSchema {

    @ApiProperty(
        {
            enumName: "type",
            example: IdentityEnum.EMAIL,
            enum: IdentityEnum,
            description: "identity type to verify"
        }
    )
    type: IdentityEnum;

    @ApiProperty(
        {
            name: "value",
            example: "example@mail.com",
            description: "identity to verify"
        }
    )
    value: string;

    @ApiProperty(
        {
            name: "key",
            example: 1234,
            description: "key to complete identity verification process"
        }
    )
    key: string;

};