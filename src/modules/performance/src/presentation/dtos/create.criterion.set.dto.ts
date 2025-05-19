import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriterionSetDto {
    @ApiProperty({
        description: 'Name of the criterion set',
        example: 'Code Quality Metrics',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Optional description of the criterion set',
        example: 'Evaluates code quality across multiple dimensions',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Array of criteria as tuples [order, criterionId]',
        example: [[1, 10], [2, 20]],
        type: 'array',
        items: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
        },
    })
    @IsArray()
    @IsNotEmpty()
    criteria: Array<[number, number]>;
}