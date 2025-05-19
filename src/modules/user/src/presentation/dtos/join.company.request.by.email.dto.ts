import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRoleEnum } from "../../domain/enums/user.role.enum";

export default class JoinCompanyRequestByEmailDto {

    @IsNotEmpty()
    @IsString()
    role: UserRoleEnum.DRIVER;

    @IsNotEmpty()
    @IsEmail()
    email: string;
};