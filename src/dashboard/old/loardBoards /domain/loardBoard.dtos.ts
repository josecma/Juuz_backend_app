import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LeaderBoardDto {
  @ApiProperty({
    description: 'El nombre de la localidad',
    example: 'Mia-Town'
  })
  @IsString()
  name: string;
}