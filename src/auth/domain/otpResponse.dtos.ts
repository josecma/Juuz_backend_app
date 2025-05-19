import { ApiProperty } from '@nestjs/swagger';

export class OtpResponseDto {
  @ApiProperty({
    description: 'Otp number',
    example: '1112',
    type: String,
  })
  otpNumber: string;
}
