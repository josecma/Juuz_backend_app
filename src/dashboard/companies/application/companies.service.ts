import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CompanyStatsDto } from '../domain/companyStats.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCompaniesStats(): Promise<CompanyStatsDto> {
    const [result] = await this.prismaService.$queryRaw<CompanyStatsDto[]>`
      WITH
        current_month AS (
          SELECT COUNT(*) AS verified_count
          FROM "Company"
          WHERE "companyStatus" = 'VERIFIED'
            AND date_trunc('month', "created_at") = date_trunc('month', current_date)
            AND "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
        ),
        previous_month AS (
          SELECT COUNT(*) AS verified_count
          FROM "Company"
          WHERE "companyStatus" = 'VERIFIED'
            AND date_trunc('month', "created_at") = date_trunc('month', current_date - interval '1 month')
            AND "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
        )
      SELECT
        /* 1) Cantidad total de compañías */
        (
          SELECT COUNT(*) 
          FROM "Company"
          WHERE "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
        )::float AS "total",
        
        /* 2) Porcentaje de compañías VERIFIED (del total actual) */
        CASE 
          WHEN (
             SELECT COUNT(*) 
             FROM "Company"
             WHERE "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
          ) = 0 THEN 0
          ELSE ROUND(
            (
              (
                SELECT COUNT(*) 
                FROM "Company" 
                WHERE "companyStatus" = 'VERIFIED'
                  AND "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
              ) * 100.0
            ) / (
              SELECT COUNT(*) 
              FROM "Company"
              WHERE "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
            ),
            1
          )::float
        END AS "verifiedPercentage",
  
        /* 3) Incremento/Disminución en % de compañías VERIFIED vs mes anterior */
        CASE 
          WHEN (SELECT verified_count FROM previous_month) = 0 THEN 0
          ELSE ROUND(
            (
              (
                (SELECT verified_count FROM current_month) 
                - (SELECT verified_count FROM previous_month)
              ) * 100.0 
            ) / (SELECT verified_count FROM previous_month),
            1
          )::float
        END AS "verifiedPercentageDiffMonthly",
      
        /* 4) Porcentaje de compañías con estado HOLD (del total actual) */
        CASE 
          WHEN (
            SELECT COUNT(*) 
            FROM "Company"
            WHERE "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
          ) = 0 THEN 0
          ELSE ROUND(
            (
              (
                SELECT COUNT(*)
                FROM "Company"
                WHERE "companyStatus" = 'HOLD'
                  AND "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
              ) * 100.0
            ) / (
              SELECT COUNT(*)
              FROM "Company"
              WHERE "company_type" IN ('COMPANY', 'SHIPPER_AND_COMPANY')
            ),
            1
          )::float
        END AS "holdPercentage"
      FROM current_month, previous_month;
    `;

    return result;
  }
}
