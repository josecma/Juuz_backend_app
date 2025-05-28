import { ApiBodyOptions } from "@nestjs/swagger";
import AcceptCompanyInvitationSchema from "../schemas/accept.company.invitation.schema";

export default {
    type: AcceptCompanyInvitationSchema,
} as ApiBodyOptions;