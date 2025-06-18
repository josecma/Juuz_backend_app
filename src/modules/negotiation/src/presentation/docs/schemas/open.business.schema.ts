import { ApiProperty } from "@nestjs/swagger";

export default class OpenBusinessSchema {

    @ApiProperty(
        {
            name: "orderId",
            type: String,
            required: true,
        }
    )
    orderId: string;

    @ApiProperty(
        {
            name: "companyId",
            description: 'unique identifier for the company',
            example: 'uudd',
            type: String,
            required: true,
        }
    )
    companyId: string;

};