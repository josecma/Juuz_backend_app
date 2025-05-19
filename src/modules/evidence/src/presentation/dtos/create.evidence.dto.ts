import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CoordinateDto } from "src/modules/shared/src/presentation/dtos/coordinate.dto";
import { IsNotEmptyPositiveNumber } from "src/modules/shared/src/presentation/swagger/decorators/Is.not.empty.positive.number";
import { EvidenceType } from "../../domain/enums/evidence.type";

export default class CreateEvidenceDto {

    @ApiProperty({ example: 13, description: "order id" })
    @IsNotEmptyPositiveNumber()
    orderId: number;

    @ApiProperty({
        type: String,
        enum: EvidenceType,
        description: "Specifies the type of evidence to upload",
    })
    @IsEnum(EvidenceType)
    @IsNotEmpty()
    type: EvidenceType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: CoordinateDto, description: "coordinates" })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CoordinateDto)
    coords: CoordinateDto;

};
