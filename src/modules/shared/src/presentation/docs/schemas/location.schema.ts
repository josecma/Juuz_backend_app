import { ApiProperty } from "@nestjs/swagger";

export default class LocationSchema {

    @ApiProperty(
        {
            name: "longitude",
            example: "-73.935242",
            description: "longitude of the location",
            required: true,
        }
    )
    longitude: number;

    @ApiProperty(
        {
            name: "latitude",
            example: "40.730610",
            description: "latitude of the location",
            required: true,
        }
    )
    latitude: number;

};