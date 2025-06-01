import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";

export function ApiDeleteOneVehicleByIdDoc() {

    return applyDecorators(
        ApiOperation(
            {
                summary: "delete one vehicle by id",
            }
        ),
        ApiParam(
            {
                name: "id",
                type: String,
                description: "vehicle id",
            }
        )
    );

};