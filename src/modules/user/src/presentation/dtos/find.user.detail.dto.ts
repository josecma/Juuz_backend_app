import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { RoleType } from 'src/modules/shared/src/domain/enums/role.type';

export class FindUserDetailDto {

  @ApiProperty(
    {
      enum: RoleType,
      example: RoleType.CARRIER,
      description: "Specifies the role type",
    }
  )
  @IsEnum(RoleType)
  @IsNotEmpty()
  role: RoleType;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  user?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  company?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  vehicles?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  averageEvaluationByRole?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  averageEvaluationByCriterion?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  averageEvaluationByEvaluation?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  groupAndCountOrderStatus?: boolean;

}