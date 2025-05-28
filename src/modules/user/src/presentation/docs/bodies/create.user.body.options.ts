import { ApiBodyOptions } from "@nestjs/swagger";
import CreateUserSchema from "../schemas/create.user.schema";

export default {
    type: CreateUserSchema,
} as ApiBodyOptions;