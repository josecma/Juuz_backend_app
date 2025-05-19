import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { RoleType } from 'src/modules/shared/src/domain/enums/role.type';
import { ScoreDto } from './score.dto';
import { UserRoleEnum } from 'src/modules/user/src/domain/enums/user.role.enum';

export class EvaluationDto {
    @ApiProperty({
        example: UserRoleEnum.CARRIER,
        enum: UserRoleEnum,
        description: 'Role being evaluated',
        required: true,
    })
    @IsEnum(UserRoleEnum)
    readonly role: UserRoleEnum;

    @ApiProperty({
        type: [ScoreDto],
        description: 'Array of scores for each criterion',
        required: true,
    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ScoreDto)
    readonly scores: ScoreDto[];
}