import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CoordinateDto {

    @ApiProperty(
        {
            example: "-73.935242",
            description: "longitude",
            required: true,
        }
    )
    @IsNumber()
    longitude: number;

    @ApiProperty(
        {
            example: "40.730610",
            description: "latitude",
            required: true,
        }
    )
    @IsNumber()
    latitude: number;

};
