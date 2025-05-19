import { ApiProperty } from '@nestjs/swagger';

export class DriverStatsDto {
  @ApiProperty({
    description: 'Total number of registered drivers in the system.',
    example: 1200,
    type: Number,
  })
  totalDrivers: number;

  @ApiProperty({
    description:
      'Percentage of active drivers out of the total registered drivers.',
    example: 85.5,
    type: Number,
  })
  activePercentage: number;

  @ApiProperty({
    description:
      'Percentage increase or decrease in active drivers compared to the previous month.',
    example: 3.2,
    type: Number,
  })
  activePercentageDiffMonthly: number;

  @ApiProperty({
    description: 'Percentage of inactive drivers (invited but not registered).',
    example: 14.5,
    type: Number,
  })
  inactivePercentage: number;
}
