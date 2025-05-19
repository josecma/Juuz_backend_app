import { ApiProperty } from '@nestjs/swagger';

export class AverageCarrierPerformanceDto {
  @ApiProperty({
    description: 'Average punctuality score',
    example: 4.5,
  })
  punctuality: number;

  @ApiProperty({
    description: 'Average cargo care score',
    example: 4.2,
  })
  cargoCare: number;

  @ApiProperty({
    description: 'Average friendliness score',
    example: 4.8,
  })
  friendliness: number;

  @ApiProperty({
    description: 'Overall average score',
    example: 4.5,
  })
  overallAverage: number;
}
