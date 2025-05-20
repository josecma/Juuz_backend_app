import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class OfertComunicationDto {
  @ApiProperty({ description: 'Order identifier', example: 100 })
  @IsInt({ message: 'OrderId must be an integer' })
  @Min(1, { message: 'OrderId must be at least 1' })
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: 'Driver channel identifier', example: 200 })
  @IsInt({ message: 'Chanel Id must be an integer' })
  @Min(1, { message: 'Chanel Id must be at least 1' })
  @IsNotEmpty()
  channelId: string;

  @ApiProperty({ description: 'Ofert of communications', example: 5 })
  @IsInt({ message: 'Ofert must be an integer' })
  @Min(0, { message: 'Ofert must be at least 0' })
  @IsNotEmpty()
  ofert: number;
}
