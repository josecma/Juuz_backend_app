import { ApiProperty, PartialType } from '@nestjs/swagger';
import { $Enums, SubService } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

type SubServiceWithoutId = Omit<
  SubService,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedAt'
  | 'deletedAt'
  | 'deletedBy'
  | 'version'
  | 'ownerId'
  | 'companyId'
>;
export class SubServiceDto implements SubServiceWithoutId {
  @ApiProperty({
    description: 'The name of the subService',
    example: $Enums.SubServiceEnum.IRON,
    enum: $Enums.SubServiceEnum,
  })
  @IsEnum($Enums.SubServiceEnum, {
    message: 'name must be a valid enum value',
  })
  name: $Enums.SubServiceEnum;

  @ApiProperty({
    description: 'A detailed description of the entity',
    example: 'This is a detailed description of the entity.',
    type: String,
  })
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({
    description: 'The ID of the service this entity belongs to',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'serviceId must be an integer' })
  @Min(1, { message: 'serviceId must be a positive integer' })
  @IsNotEmpty({ message: 'serviceId is required' })
  @IsNotEmpty()
  serviceId: string;
}

export class UpdateSubServiceDto extends PartialType(SubServiceDto) { }
