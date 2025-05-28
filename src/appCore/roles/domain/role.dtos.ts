import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { $Enums, } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

type RoleWithoutId = Omit<
  {},
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
export class RoleDto implements RoleWithoutId {
  @ApiProperty({ description: 'Name', example: 'Tester' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The name of the service',
    example: '',
  })
  @IsEnum({}, { message: 'name must be a valid enum value' })
  type: '';

  @ApiProperty({
    description: 'A detailed description of the entity',
    example:
      'This is a detailed description related to the service or service.',
    type: String,
  })
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({
    description: 'IDs of sub-services to remove from the service',
    type: [Number],
    example: [4, 5],
  })
  @IsArray({ message: 'permissions must be an array of numbers' })
  @IsInt({ each: true, message: 'Each item in permissions must be an integer' })
  @ArrayNotEmpty({ message: 'permissions should not be empty' })
  @IsOptional()
  permissions: number[];
}

export class UpdateRoleDto extends OmitType(PartialType(RoleDto), [
  'permissions',
] as const) {
  @ApiProperty({
    description: 'IDs of sub-services to add to the service',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray({ message: 'permissionsToAdd must be an array of numbers' })
  @IsInt({
    each: true,
    message: 'Each item in permissionsToAdd must be an integer',
  })
  @ArrayNotEmpty({ message: 'permissionsToAdd should not be empty' })
  @IsOptional()
  permissionsToAdd: number[];

  @ApiProperty({
    description: 'IDs of sub-services to remove from the service',
    type: [Number],
    example: [4, 5],
  })
  @IsArray({ message: 'permissionsToRemove must be an array of numbers' })
  @IsInt({
    each: true,
    message: 'Each item in permissionsToRemove must be an integer',
  })
  @ArrayNotEmpty({ message: 'permissionsToRemove should not be empty' })
  @IsOptional()
  permissionsToRemove: number[];
}
