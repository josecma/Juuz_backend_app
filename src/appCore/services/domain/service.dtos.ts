import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { $Enums, Service } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

type ServiceWithoutId = Omit<
  Service,
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
export class ServiceDto implements ServiceWithoutId {
  @ApiProperty({
    description: 'The name of the service',
    example: $Enums.ServiceEnum.OTHERS,
    enum: $Enums.ServiceEnum,
  })
  @IsEnum($Enums.ServiceEnum, { message: 'name must be a valid enum value' })
  name: $Enums.ServiceEnum;

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
  @IsArray({ message: 'subServices must be an array of numbers' })
  @IsInt({ each: true, message: 'Each item in subServices must be an integer' })
  @ArrayNotEmpty({ message: 'subServices should not be empty' })
  @IsOptional()
  subServices: string[];
}

export class UpdateServiceDto extends OmitType(PartialType(ServiceDto), [
  'subServices',
] as const) {
  @ApiProperty({
    description: 'IDs of sub-services to add to the service',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray({ message: 'subServicesToAdd must be an array of numbers' })
  @IsInt({
    each: true,
    message: 'Each item in subServicesToAdd must be an integer',
  })
  @ArrayNotEmpty({ message: 'subServicesToAdd should not be empty' })
  @IsOptional()
  subServicesToAdd: string[];

  @ApiProperty({
    description: 'IDs of sub-services to remove from the service',
    type: [Number],
    example: [4, 5],
  })
  @IsArray({ message: 'subServicesToRemove must be an array of numbers' })
  @IsInt({
    each: true,
    message: 'Each item in subServicesToRemove must be an integer',
  })
  @ArrayNotEmpty({ message: 'subServicesToRemove should not be empty' })
  @IsOptional()
  subServicesToRemove: string[];
}

// @ApiProperty({
//   oneOf: [
//     { $ref: getSchemaPath(IdDto) },
//     { $ref: getSchemaPath(SubServiceDto) },
//   ],
// })
// @ValidateNested()
// @Type((options) => {
//   if (options.object.subService.id) {
//     return IdDto;
//   } else {
//     return SubServiceDto;
//   }
// })
// @IsOptional()
// subService?: IdDto | SubServiceDto;
