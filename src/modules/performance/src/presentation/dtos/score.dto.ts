import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class ScoreDto {

    @ApiProperty(
        {
            example: 2,
            description: 'ID of the criterion used for score',
            required: true,
        }
    )
    @IsInt()
    @IsNotEmpty()
    id: string;

    @ApiProperty(
        {
            example: 36,
            minimum: 1,
            maximum: 100,
            description: "score",
            required: true,
        }
    )
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(100)
    readonly value: number;

    @ApiProperty(
        {
            example: 'nice job',
            required: false
        }
    )
    @IsString()
    @IsOptional()
    readonly comment?: string;

}
