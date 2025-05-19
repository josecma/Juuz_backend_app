import { ApiProperty } from '@nestjs/swagger';

export class TopCityDto {
  @ApiProperty({
    description: 'The name of the city.',
    example: 'New York',
  })
  city: string;

  @ApiProperty({
    description: 'The count of occurrences for this city.',
    example: 10,
  })
  city_count: number;
}

export class TopCitiesAndTotalDto {
  @ApiProperty({
    description: 'The total count of records matching the condition.',
    example: 50,
  })
  totalCount: number;

  @ApiProperty({
    description: 'The list of top cities with their respective counts.',
    type: [TopCityDto],
  })
  topCities: TopCityDto[];
}
