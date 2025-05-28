import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CompanyMemberRoleEnum } from "src/modules/company/src/domain/enums/company.member.role.enum";

export default class InviteUserToCompanyRequestBody {

    @IsNotEmpty()
    @IsEnum(CompanyMemberRoleEnum)
    role: CompanyMemberRoleEnum;

    @IsOptional()
    @IsEmail()
    email: string;

};