import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CompanyMemberRoleEnum } from "src/modules/company/src/domain/enums/company.member.role.enum";

export default class InviteUserToCompanyRequestBody {

    @IsNotEmpty()
    @IsEnum(CompanyMemberRoleEnum)
    role: CompanyMemberRoleEnum;

    @IsNotEmpty()
    @IsString()
    inviteeId: string;

    @IsOptional()
    @IsEmail()
    email?: string;

};