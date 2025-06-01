import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";

export function ApiGetAllCompanyVehiclesDoc() {

    return applyDecorators(
        ApiOperation(
            {
                summary: "get all company vehicles",
            }
        ),
        ApiParam(
            {
                name: "id",
                type: String,
                description: "company id"
            }
        )
    );

};