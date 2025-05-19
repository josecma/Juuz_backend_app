import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyPositiveNumber } from "src/modules/shared/src/presentation/swagger/decorators/Is.not.empty.positive.number";

export default class IdDto {

    @ApiProperty({
        description: "id",
        type: Number,
        example: 1,
    })
    @IsNotEmptyPositiveNumber()
    id: number;
};