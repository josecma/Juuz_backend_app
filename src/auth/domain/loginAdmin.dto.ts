import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({
    description: 'The URL of the user, used as the username for authentication',
    example: 'https://example.com/user',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  userUrl: string;

  @ApiProperty({
    description: 'The password of the user for authentication',
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
