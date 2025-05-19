import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export default class CreateCategoryDto {

    @ApiProperty({
        description: "optional numeric string representing the id of the parent category",
        example: "2",
        type: [String]
    })
    @IsNotEmpty()
    @IsNumberString()
    @IsOptional()
    parentId: string;

    @ApiProperty({
        description: "name of the new category",
        example: "BMW",
        type: [String]
    })
    @IsNotEmpty()
    @IsString()
    name: string;

};