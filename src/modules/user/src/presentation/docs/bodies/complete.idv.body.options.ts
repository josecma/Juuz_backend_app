import { ApiBodyOptions } from "@nestjs/swagger";
import CompleteIdvProcessSchema from "../schemas/complete.idv.process.schema";

export default {
    type: CompleteIdvProcessSchema,
} as ApiBodyOptions;