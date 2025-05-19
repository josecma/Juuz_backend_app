import { ApiProperty } from '@nestjs/swagger';

class Company {
  @ApiProperty({ description: 'Name of the company', example: 'Acme Corporation' })
  name: string;

  @ApiProperty({ description: 'ID of the company', example: '12345' })
  id: string;
}

export class CompaniesInfoDto {
  @ApiProperty({ type: [Company], description: 'List of companies' })
  companies: Company[];
}