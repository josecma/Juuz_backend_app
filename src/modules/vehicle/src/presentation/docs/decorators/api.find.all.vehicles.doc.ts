import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function ApiFindAllVehiclesDoc() {

    return applyDecorators(
        ApiOperation(
            {
                summary: "get all vehicles",
            }
        ),
    );

};