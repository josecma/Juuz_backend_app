import { ApiBodyOptions } from "@nestjs/swagger";
import InviteUserToCompanySchema from "../schemas/invite.user.to.company.schema";

export default {
    type: InviteUserToCompanySchema,
} as ApiBodyOptions;