import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVsdJ9......',
    description: 'Token',
  })
  token: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVsdJ9....',
    description: 'Refresh Token',
  })
  refreshToken: string;

  @ApiProperty({
    example: '1712707972770',
    description: 'Token Expires',
  })
  tokenExpires: number;
}
