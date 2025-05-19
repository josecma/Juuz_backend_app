import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { CoordinateDto } from "src/modules/shared/src/presentation/dtos/coordinate.dto";
import { IsNotEmptyPositiveNumber } from "src/modules/shared/src/presentation/swagger/decorators/Is.not.empty.positive.number";

export default class CreateLocationEvidenceDto {

    @ApiProperty({ example: 13, description: "order id" })
    @IsNotEmptyPositiveNumber()
    orderId: number;

    @ApiProperty({ type: CoordinateDto, description: "location coordinates" })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CoordinateDto)
    coords: CoordinateDto;

};
