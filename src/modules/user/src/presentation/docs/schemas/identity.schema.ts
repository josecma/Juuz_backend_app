import { ApiProperty } from '@nestjs/swagger';
import { IdentityEnum } from '../../../domain/enums/identity.enum';

export default class IdentitySchema {

    @ApiProperty(
        {
            enumName: "type",
            example: IdentityEnum.EMAIL,
            enum: IdentityEnum,
        }
    )
    type: IdentityEnum;

    @ApiProperty(
        {
            name: "value",
            example: "example@mail.com"
        }
    )
    value: string;

};