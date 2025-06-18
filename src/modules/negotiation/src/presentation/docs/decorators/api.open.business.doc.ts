import { applyDecorators } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import OpenBusinessSchema from "../schemas/open.business.schema";

export function ApiOpenBusinessDoc() {

    return applyDecorators(
        ApiBody(
            {
                type: OpenBusinessSchema,
                required: true,
            }
        )
    );

};