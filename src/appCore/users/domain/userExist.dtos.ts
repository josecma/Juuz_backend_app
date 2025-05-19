import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { UserRoleIdDto } from './userRoleId.dtos';
import { OtpDto } from 'src/auth/domain/otp.dtos';

export class UserExistDto implements UserRoleIdDto, OtpDto {
  @ApiProperty({
    description: 'The ID of the roleId registering the vehicle',
    example: 42,
    type: Number,
  })
  @IsInt({ message: 'roleId must be an integer' })
  @Min(1, { message: 'roleId must be a positive integer' })
  roleId: number;

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
