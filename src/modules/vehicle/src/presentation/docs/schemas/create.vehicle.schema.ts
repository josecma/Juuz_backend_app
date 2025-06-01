import { ApiProperty } from "@nestjs/swagger";

export default class CreateVehicleSchema {

    @ApiProperty(
        {
            name: "vinNumber",
            type: String,
            required: true,
        }
    )
    vinNumber: string;

    @ApiProperty(
        {
            name: "year",
            type: Number,
            required: true,
        }
    )
    year: number;

    @ApiProperty(
        {
            name: "vehicleType",
            type: String,
            required: true,
        }
    )
    vehicleType: string;

    @ApiProperty(
        {
            name: "capacity",
            type: Number,
            required: true,
        }
    )
    capacity: number;

    @ApiProperty(
        {
            name: "modelId",
            type: String,
            required: true,
        }
    )
    modelId: string;

    @ApiProperty(
        {
            name: "files",
            type: {},
            required: true,
        }
    )
    files: Array<any>;

};