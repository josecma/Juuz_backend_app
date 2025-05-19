import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";

@Injectable()
export default class AverageEvaluationByCriterionRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async find(
        params: {
            role: RoleType;
            userId: string;
        }
    ) {

        const { role, userId } = params;

        try {

            const result: {
                data: {
                    evaluated: {
                        id: number;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    criteria: Array<
                        {
                            name: string;
                            avg: number;
                        }
                    >;

                }
            }[] = await this.client.$queryRaw`

                                WITH criteria_avg AS (
                                    SELECT 
                                        e."evaluated_Id",
                                        c.name AS criterion_name,
                                        AVG(s."value")::numeric(10,2) AS avg_value
                                    FROM
                                        evaluations AS e
                                        JOIN scores AS s ON s."evaluation_Id" = e.id
                                        JOIN criteria AS c ON s."criterion_Id" = c.id
                                    WHERE 
                                        e.role = ${role}::text
                                    GROUP BY e."evaluated_Id", c.name
                                )
                                SELECT 
                                    json_build_object(
                                        'evaluated', json_build_object(
                                            'id', u.id,
                                            'firstName', u."firstName",
                                            'lastName', u."lastName"
                                        ),
                                        'criteria', json_agg(
                                            json_build_object(
                                                'name', ca.criterion_name,
                                                'avg', ca.avg_value
                                            )
                                        )
                                    ) AS data
                                FROM
                                    "User" AS u
                                    JOIN criteria_avg AS ca ON ca."evaluated_Id" = u.id
                                WHERE 
                                    u.id = ${userId}::numeric
                                GROUP BY u.id;

                                `;

            return result[0].data;

        } catch (error) {

            throw error;

        };

    };

};