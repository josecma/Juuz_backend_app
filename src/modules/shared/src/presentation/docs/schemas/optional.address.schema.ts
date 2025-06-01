import { ApiProperty } from "@nestjs/swagger";
import LocationSchema from "./location.schema";

export default class OptionalAddressSchema {

    @ApiProperty(
        {
            name: "country",
            type: String,
            required: false,
        }
    )
    country: string;

    @ApiProperty(
        {
            name: "city",
            type: String,
            required: false,
        }
    )
    city: string;

    @ApiProperty(
        {
            name: "street",
            type: String,
            required: false,
        }
    )
    street: string;

    @ApiProperty(
        {
            name: "state",
            type: String,
            required: false,
        }
    )
    state: string;

    @ApiProperty(
        {
            name: "zipCode",
            type: String,
            required: false,
        }
    )
    zipCode: string;

    @ApiProperty(
        {
            name: "location",
            type: LocationSchema,
            required: false,
        }
    )
    location: LocationSchema;

};