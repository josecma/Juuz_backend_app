import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export default class NumericStringDto {

    @ApiProperty({
        description: "numeric string id",
        type: [String],
        example: { id: "1" },
    })
    @IsNotEmpty()
    @IsNumberString()
    id: string;
};