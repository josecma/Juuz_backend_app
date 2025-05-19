import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  // @MinLength(8)
  @IsOptional()
  phone: string;

  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: '1123',
    description: 'Otp Number',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4)
  otpNumber: string;
}
