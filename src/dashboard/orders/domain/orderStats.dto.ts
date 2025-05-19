import { ApiProperty } from '@nestjs/swagger';

export class OrderStatsDto {
  @ApiProperty({
    description: 'Total number of orders in the system',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Number of orders with status IN_TRANSIT or ASSIGN',
    example: 50,
  })
  inTransitOrAssign: number;

  @ApiProperty({
    description: 'Number of orders with status PENDING',
    example: 30,
  })
  pending: number;

  @ApiProperty({
    description: 'Number of orders with status HISTORY',
    example: 20,
  })
  history: number;
}
