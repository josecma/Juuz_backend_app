import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CompanyDto {
  @ApiProperty({ example: 12 })
  id: number;

  @ApiProperty({ example: 'Some Company Name', nullable: true })
  @IsOptional()
  @IsString()
  companyName: string | null;
}

class PermissionDto {
  @ApiProperty({ example: '/' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'GET' })
  @IsString()
  action: string;
}

export class UserInformationDto {
  @ApiProperty({ example: 13 })
  id: number;

  @ApiProperty({ example: 'user@example.com', nullable: true })
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: '1231231564' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'John', nullable: true })
  @IsOptional()
  @IsString()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', nullable: true })
  @IsOptional()
  @IsString()
  lastName: string | null;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: 'http://example.com/photo.jpg', nullable: true })
  @IsOptional()
  @IsString()
  userPhoto: string | null;

  @ApiProperty({ type: [CompanyDto] })
  @ValidateNested({ each: true })
  @Type(() => CompanyDto)
  companies: CompanyDto[];

  @ApiProperty({ type: [PermissionDto] })
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}
