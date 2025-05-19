import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseLeaderBoardDto {
  @ApiProperty({
    description: 'El nombre de la localidad',
    example: 'Mia-Town',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'La cantidad asociada a la localidad',
    example: 100,
  })
  @IsInt()
  @Min(0)
  count: number;
}
