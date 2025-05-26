import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";

export default class RespondToCompanyInvitationRequestBody {

    @IsNotEmpty()
    @IsString()
    companyInvitationId: string;

    @IsNotEmpty()
    @IsEnum(CompanyInvitationRequestStatusEnum)
    status: CompanyInvitationRequestStatusEnum;

};