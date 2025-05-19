import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import NumericStringDto from "./numeric.string.dto";

export default class NumericStringListDto {

    @ApiProperty({
        description: "list of numeric string ids",
        type: [NumericStringDto],
        example: [{ id: "1" }, { id: "34" }, { id: "6" }]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NumericStringDto)
    ids: NumericStringDto[];
};