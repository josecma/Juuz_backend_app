import { ApiBodyOptions } from "@nestjs/swagger";
import RespondToCompanyInvitationSchema from "../schemas/respond.to.company.invitation.schema";

export default {
    type: RespondToCompanyInvitationSchema,
} as ApiBodyOptions;