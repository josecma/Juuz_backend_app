import { ApiBodyOptions } from "@nestjs/swagger";
import CompleteOtpAuthSchema from "../schemas/complete.otp.auth.schema";

export default {
    type: CompleteOtpAuthSchema
} as ApiBodyOptions;