import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PhotoIdsDto {
  @ApiProperty({
    example: ['1', '2', '3'],
    description: 'Array de IDs de fotos',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Type(() => String)
  photoIds: string[];
}
