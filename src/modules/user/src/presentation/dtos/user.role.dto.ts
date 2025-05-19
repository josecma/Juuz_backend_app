import { IsEnum, IsNotEmpty } from "class-validator";
import { UserRoleEnum } from "../../domain/enums/user.role.enum";

export default class UserRoleDto {

    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
    name: UserRoleEnum;

};