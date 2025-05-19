import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TopCitiesAndTotalDto } from '../domain/topCity.dto';

@Injectable()
export class CarriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTopCitiesAndTotal(): Promise<TopCitiesAndTotalDto> {
    const result = await this.prismaService.$queryRaw<
      { city: string; city_count: number; total_count: number }[]
    >`
      SELECT 
          city,
          COUNT(*) AS city_count,
          (SELECT COUNT(*) 
           FROM "Point" 
           WHERE is_active = true AND type = 'COMPANY') AS total_count
      FROM "Point"
      WHERE is_active = true AND type = 'COMPANY'
      GROUP BY city
      ORDER BY city_count DESC
      LIMIT 3;
    `;

    const totalCount = Number(result[0]?.total_count) || 0;

    return {
      totalCount,
      topCities: result.map(({ city, city_count }) => ({
        city,
        city_count: Number(city_count),
      })),
    };
  }
}
