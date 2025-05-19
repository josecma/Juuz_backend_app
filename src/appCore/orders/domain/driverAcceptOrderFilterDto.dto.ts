import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class DriverAcceptOrderFilterDto {
  @ApiProperty({ description: 'User Id identifier', example: 100 })
  @IsInt({ message: 'User Id must be an integer' })
  @Min(1, { message: 'User Id must be at least 1' })
  @IsNotEmpty()
  driverId: number;
}
