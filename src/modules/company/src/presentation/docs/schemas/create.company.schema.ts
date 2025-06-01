import { ApiProperty } from "@nestjs/swagger";
import AddressSchema from "src/modules/shared/src/presentation/docs/schemas/address.schema";

export default class CreateCompanySchema {

    @ApiProperty(
        {
            name: "name",
            description: 'the name of the company',
            example: 'Acme Corporation',
            type: String,
            required: true,
        }
    )
    name: string;

    @ApiProperty(
        {
            name: "carrierIdentifier",
            description: 'unique identifier for the company',
            example: 'uudd',
            type: String,
            required: true,
        }
    )
    carrierIdentifier: string;

    @ApiProperty(
        {
            name: "usdot",
            description: 'usdot number of the company',
            example: '1234567',
            type: String,
            required: true,
        }
    )
    usdot: string;

    @ApiProperty(
        {
            name: "mc",
            description: 'Motor Carrier (MC) number of the company',
            example: 'MC123456',
            type: String,
            required: true,
        }
    )
    mc: string;

    @ApiProperty(
        {
            name: "email",
            description: 'email address',
            example: 'admin@acme.com',
            type: String,
            required: true,
        }
    )
    email: string;

    @ApiProperty(
        {
            name: "phoneNumber",
            description: 'phone number of the company',
            example: '+1234567890',
            type: String,
            required: true,
        }
    )
    phoneNumber: string;

    @ApiProperty(
        {
            name: "address",
            description: 'company address',
            type: AddressSchema,
            required: true,
        }
    )
    address: AddressSchema;

};