import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class OtpDto {
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
