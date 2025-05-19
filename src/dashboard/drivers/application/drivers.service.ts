import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DriverStatsDto } from '../domain/driverStats.dto';

@Injectable()
export class DriversService {
  constructor(private readonly prismaService: PrismaService) {}
  async getDriverStats(): Promise<DriverStatsDto> {
    const [result] = await this.prismaService.$queryRaw<DriverStatsDto[]>`
  WITH
    /* (1) Drivers activos en el mes actual */
    current_month_active AS (
      SELECT COUNT(*) AS active_count
      FROM "Driver" d
      JOIN "User" u ON d."user_id" = u."id"
      WHERE u."is_active" = TRUE
        AND date_trunc('month', u."updated_at") = date_trunc('month', current_date)
    ),

    /* (2) Drivers activos en el mes anterior */
    previous_month_active AS (
      SELECT COUNT(*) AS active_count
      FROM "Driver" d
      JOIN "User" u ON d."user_id" = u."id"
      WHERE u."is_active" = TRUE
        AND date_trunc('month', u."updated_at") = date_trunc('month', current_date - interval '1 month')
    )

  SELECT
    /* A) Cantidad total de drivers registrados en la tabla "Driver" */
    CAST((SELECT COUNT(*) FROM "Driver") AS numeric) AS "totalDrivers",

    /* B) Porcentaje de drivers activos (driver + user activo) */
    CASE WHEN (SELECT COUNT(*) FROM "Driver") = 0 THEN 0
         ELSE ROUND(
           (
             (
               SELECT COUNT(*)
               FROM "Driver" d
               JOIN "User" u ON d."user_id" = u."id"
               WHERE u."is_active" = TRUE
             ) * 100.0
             / (SELECT COUNT(*) FROM "Driver")
           )::numeric, 1) -- Redondea a 1 decimal y asegura que sea numérico
    END AS "activePercentage",

    /* C) Incremento/Disminución en % de drivers activos vs mes anterior */
    CASE WHEN (SELECT active_count FROM previous_month_active) = 0 THEN 0
         ELSE ROUND(
           (
             (
               (SELECT active_count FROM current_month_active)
               - (SELECT active_count FROM previous_month_active)
             ) * 100.0
             / (SELECT active_count FROM previous_month_active)
           )::numeric, 1) -- Redondea a 1 decimal y asegura que sea numérico
    END AS "activePercentageDiffMonthly"
  FROM current_month_active, previous_month_active;
`;
    result.inactivePercentage = 100 - result.activePercentage;
    return result;
  }
}
