import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { EvaluationDto } from './evaluation.dto';

export class CreateEvaluationDto {

    @ApiProperty({
        example: 4,
        description: 'ID of the user being evaluated',
        required: true,
    })
    @IsInt()
    @IsNotEmpty()
    readonly evaluatedId: string;

    @ApiProperty({
        type: EvaluationDto,
        description: 'Evaluation data (role and scores)',
        required: true,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => EvaluationDto)
    readonly evaluation: EvaluationDto;
}