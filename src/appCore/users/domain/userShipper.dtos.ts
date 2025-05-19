import { ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

type UserWithoutId = Omit<
  User,
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
  | 'login'
  | 'logType'
  | 'stripeAccountId'
  | 'password'
  | 'pointId'
>;

export class UserShipperDto implements UserWithoutId {
  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  // @MinLength(8)
  phone: string;

  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user is active or not',
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of company Id',
  })
  @IsNumber()
  companyId: number;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @ApiProperty({
    description: 'The ID of the roleId registering the vehicle',
    example: 42,
    type: Number,
  })
  @IsInt({ message: 'roleId must be an integer' })
  @Min(1, { message: 'roleId must be a positive integer' })
  roleId: number;
}

export class UpdateUserShipperDto extends PartialType(UserShipperDto) {
  @ApiProperty({
    example: '[1,2,3]',
    description: 'Photo Ids',
  })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  photoIds: number[];
}
