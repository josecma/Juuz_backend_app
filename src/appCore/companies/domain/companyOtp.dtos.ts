import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CompanyOtpDto {
  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
