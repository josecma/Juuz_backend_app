import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import CreateVehicleSchema from "../schemas/create.vehicle.schema";

export function ApiCreateVehicleDoc() {

    return applyDecorators(
        ApiOperation(
            {
                summary: "create a new vehicle",
            }
        ),
        ApiConsumes('multipart/form-data'),
        ApiBody(
            {
                type: CreateVehicleSchema,
                required: true,
            }
        )
    );

};