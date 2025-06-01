import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import UpdateCompanySchema from "../schemas/update.company.schema";

export function ApiUpdateCompanyDoc() {

    return applyDecorators(
        ApiOperation(
            {
                summary: "update company",
            }
        ),
        ApiParam(
            {
                name: "id",
                description: "company id",
                type: String,

            }
        ),
        ApiBody(
            {
                type: UpdateCompanySchema,
                required: false,
            }
        )
    );

};