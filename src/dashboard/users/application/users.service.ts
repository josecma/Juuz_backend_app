import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserStatsDto } from '../domain/userStats.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserStats(): Promise<UserStatsDto> {
    const [result] = await this.prismaService.$queryRaw<UserStatsDto[]>`
      WITH
        /* Usuarios activos en el mes actual */
        current_month_active AS (
          SELECT COUNT(*) AS active_count
          FROM "User"
          WHERE "is_active" = true
            AND date_trunc('month', "updated_at") = date_trunc('month', current_date)
        ),
  
        /* Usuarios activos en el mes anterior */
        previous_month_active AS (
          SELECT COUNT(*) AS active_count
          FROM "User"
          WHERE "is_active" = true
            AND date_trunc('month', "updated_at") = date_trunc('month', current_date - interval '1 month')
        ),
  
        /* Usuarios inactivos (invitados pero no registrados) */
        inactive_users AS (
          SELECT COUNT(*) AS inactive_count
          FROM "User"
          WHERE "is_active" = false
            AND "email" IS NOT NULL
        )
  
      SELECT
        /* 1) Cantidad total de usuarios registrados */
        (SELECT COUNT(*) FROM "User")::float AS "totalUsers",
  
        /* 2) Porcentaje de usuarios activos (del total registrado) */
        CASE WHEN (SELECT COUNT(*) FROM "User") = 0 THEN 0
             ELSE ROUND(
               (
                 (
                   SELECT COUNT(*)
                   FROM "User"
                   WHERE "is_active" = true
                 ) * 100.0
                 / (SELECT COUNT(*) FROM "User")
               ), 1) -- Redondea a 1 decimal
        END AS "activePercentage",
  
        /* 3) Incremento/Disminución en % de usuarios activos vs mes anterior */
        CASE WHEN (SELECT active_count FROM previous_month_active) = 0 THEN 0
             ELSE ROUND(
               (
                 (
                   (SELECT active_count FROM current_month_active)
                   - (SELECT active_count FROM previous_month_active)
                 ) * 100.0
                 / (SELECT active_count FROM previous_month_active)
               ), 1) -- Redondea a 1 decimal
        END AS "activePercentageDiffMonthly",
  
        /* 4) Porcentaje de usuarios inactivos (invitados pero no registrados) */
        CASE WHEN (SELECT COUNT(*) FROM "User") = 0 THEN 0
             ELSE ROUND(
               (
                 (
                   SELECT inactive_count
                   FROM inactive_users
                 ) * 100.0
                 / (SELECT COUNT(*) FROM "User")
               ), 1) -- Redondea a 1 decimal
        END AS "inactivePercentage"
      FROM current_month_active, previous_month_active, inactive_users;
    `;

    return result;
  }
}
