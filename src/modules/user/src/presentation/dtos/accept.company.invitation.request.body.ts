import { IsNotEmpty, IsString } from "class-validator";

export default class AcceptCompanyInvitationRequestBody {

    @IsNotEmpty()
    @IsString()
    token: string;

};