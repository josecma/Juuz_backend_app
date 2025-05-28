import { ApiBodyOptions } from "@nestjs/swagger";
import IdentitySchema from "../schemas/identity.schema";

export default {
    type: IdentitySchema
} as ApiBodyOptions;