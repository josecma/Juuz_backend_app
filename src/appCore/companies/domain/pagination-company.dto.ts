import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

export class PaginationCompanyDto extends PaginationDto {
  @ApiProperty({
    description: 'The ID of the company',
    example: 42,
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'companyId must be an integer' })
  @Min(1, { message: 'companyId must be a positive integer' })
  @IsOptional()
  companyId: number;

  @ApiProperty({
    description: 'The ID of the user',
    example: 42,
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'userId must be an integer' })
  @Min(1, { message: 'userId must be a positive integer' })
  @IsOptional()
  userId: number;
}
