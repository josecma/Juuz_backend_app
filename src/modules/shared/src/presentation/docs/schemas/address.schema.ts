import { ApiProperty } from "@nestjs/swagger";
import LocationSchema from "./location.schema";

export default class AddressSchema {

    @ApiProperty(
        {
            name: "country",
            type: String,
            required: true,
        }
    )
    country: string;

    @ApiProperty(
        {
            name: "city",
            type: String,
            required: true,
        }
    )
    city: string;

    @ApiProperty(
        {
            name: "street",
            type: String,
            required: true,
        }
    )
    street: string;

    @ApiProperty(
        {
            name: "state",
            type: String,
            required: true,
        }
    )
    state: string;

    @ApiProperty(
        {
            name: "zipCode",
            type: String,
            required: true,
        }
    )
    zipCode: string;

    @ApiProperty(
        {
            name: "location",
            type: LocationSchema,
            required: true,
        }
    )
    location: LocationSchema;

};