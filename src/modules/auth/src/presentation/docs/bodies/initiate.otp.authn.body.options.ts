import { ApiBodyOptions } from "@nestjs/swagger";
import InitiateOtpAuthSchema from "../schemas/initiate.otp.auth.schema";

export default {
    type: InitiateOtpAuthSchema
} as ApiBodyOptions;