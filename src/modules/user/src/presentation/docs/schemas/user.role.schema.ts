import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../../../domain/enums/user.role.enum';

export default class UserRoleSchema {

    @ApiProperty(
        {
            name: "user role",
            enum: UserRoleEnum,
            example: UserRoleEnum.CARRIER,
        }
    )
    name: UserRoleEnum;

};