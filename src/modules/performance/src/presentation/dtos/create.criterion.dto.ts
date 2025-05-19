import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateCriterionDto {
    @ApiProperty({
        description: 'Name of the criterion',
        example: 'Code Quality',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Optional description of the criterion',
        example: 'Evaluates code cleanliness and structure',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

}