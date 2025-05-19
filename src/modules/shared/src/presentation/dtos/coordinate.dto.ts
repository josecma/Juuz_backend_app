import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyNumber } from "../swagger/decorators/is.not.empty.number";

export class CoordinateDto {
    @ApiProperty({ example: "-73.935242", description: "longitude" })
    @IsNotEmptyNumber()
    longitude: number;

    @ApiProperty({ example: "40.730610", description: "latitude" })
    @IsNotEmptyNumber()
    latitude: number;
};
