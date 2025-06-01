import { applyDecorators } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import CreateCompanySchema from "../schemas/create.company.schema";

export function ApiCreateCompanyDoc() {

    return applyDecorators(
        ApiBody(
            {
                type: CreateCompanySchema,
                required: true,
            }
        )
    );

};