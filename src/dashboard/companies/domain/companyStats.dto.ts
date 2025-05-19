import { ApiProperty } from '@nestjs/swagger';

export class CompanyStatsDto {
  @ApiProperty({
    description: 'Total number of companies registered in the system',
    example: 200,
  })
  total: number;

  @ApiProperty({
    description: 'Percentage of companies with VERIFIED status',
    example: 75.5,
  })
  verifiedPercentage: number;

  @ApiProperty({
    description:
      'Percentage increase or decrease in VERIFIED companies compared to the previous month',
    example: 10.2,
  })
  verifiedPercentageDiffMonthly: number;

  @ApiProperty({
    description: 'Percentage of companies with HOLD status',
    example: 5.0,
  })
  holdPercentage: number;
}
