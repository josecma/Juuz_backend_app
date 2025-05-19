import { ApiProperty } from '@nestjs/swagger';

export class UserStatsDto {
  @ApiProperty({
    description: 'Total number of registered users in the system.',
    example: 1500,
    type: Number,
  })
  totalUsers: number;

  @ApiProperty({
    description:
      'Percentage of active users out of the total registered users.',
    example: 75.5,
    type: Number,
  })
  activePercentage: number;

  @ApiProperty({
    description:
      'Percentage increase or decrease in active users compared to the previous month.',
    example: -5.2,
    type: Number,
  })
  activePercentageDiffMonthly: number;

  @ApiProperty({
    description:
      'Percentage of users who are inactive (invited but not registered).',
    example: 24.5,
    type: Number,
  })
  inactivePercentage: number;
}
